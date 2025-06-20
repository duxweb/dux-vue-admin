import type { Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { NPagination } from 'naive-ui'
import { computed, ref, toRef, watch } from 'vue'
import { useClient } from '../../hooks'

type value = Array<string | number> | string | number | null | undefined

interface UseSelectProps {
  value: value | Ref<value>
  url?: Ref<string | undefined>
  params?: Ref<Record<string, any>>
  valueField?: string
  pagination?: boolean
  invalidate?: string
}
export function useSelect(props: UseSelectProps) {
  const { url, params, pagination, valueField = 'value', invalidate } = props
  const client = useClient()
  const keyword = ref()

  const valueRef = toRef(props, 'value')

  const list = ref<Record<string, any>[]>([])
  const singleList = ref<Record<string, any>[]>([])

  const page = ref(1)
  const pageSize = ref(pagination ? 10 : 0)
  const pageCount = ref(0)

  const queryParams = computed(() => {
    return {
      page: page.value,
      pageSize: pageSize.value,
      keyword: keyword.value,
      ...params?.value,
    }
  })

  const getList = () => {
    return client.get({
      url: url?.value,
      params: queryParams.value,
    })
  }

  const urlRef = toRef(url || '')

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: [invalidate || urlRef, queryParams],
    queryFn: () => getList(),
  })

  watch(data, (val) => {
    list.value = val?.data || []

    const meta = val?.meta || {}
    const total = meta?.total || 0
    pageCount.value = Math.ceil(total / pageSize.value)
  }, { immediate: true })

  const hasLoadedValue = ref(false)

  watch(valueRef, (val) => {
    if (!val || !url?.value || hasLoadedValue.value) {
      return
    }

    hasLoadedValue.value = true

    client.get({
      url: url.value,
      params: {
        id: Array.isArray(val) ? val.join(',') : val,
      },
    }).then((res) => {
      singleList.value = res?.data || []
    })
  }, { immediate: true })

  const onSearch = (v) => {
    keyword.value = v
  }

  const Pagination = () => (
    pagination
      ? (
          <div class="flex justify-center">
            <NPagination
              page={page.value}
              pageSize={pageSize.value}
              pageCount={pageCount.value}
              pageSlot={3}
              onUpdatePage={(v) => {
                page.value = v
              }}
            />
          </div>
        )
      : null
  )

  const loading = computed(() => {
    if (data.value) {
      return false
    }
    return isLoading.value
  })

  const options = computed(() => {
    const seen = new Set()
    // 合并单个数据列表和主列表（单个数据优先）
    const allItems = [...(singleList.value || []), ...(list.value || [])]

    // 去重处理
    return allItems.filter((item) => {
      const key = String(item[valueField])
      if (seen.has(key)) {
        return false
      }
      seen.add(key)
      return true
    })
  })

  return {
    onSearch,
    options,
    Pagination,
    loading,
  }
}
