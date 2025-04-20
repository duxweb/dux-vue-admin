import type { Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { NPagination } from 'naive-ui'
import { computed, ref, watch } from 'vue'
import { useClient } from '../../hooks'

type value = Array<string | number> | string | number | null | undefined

interface UseSelectProps {
  value: value
  url?: Ref<string | undefined>
  params?: Ref<Record<string, any>>
  valueField?: string
  pagination?: boolean
  invalidate?: string
}
export function useSelect({ url, params, pagination, value, valueField = 'value', invalidate }: UseSelectProps) {
  const client = useClient()
  const keyword = ref()

  const list = ref<Record<string, any>[]>([])

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

  const {
    data,
    isLoading: loading,
  } = useQuery({
    queryKey: [invalidate || url?.value, queryParams],
    queryFn: () => getList(),
  })

  watch(data, (val) => {
    list.value = val?.data || []

    const meta = val?.meta || {}
    const total = meta?.total || 0
    pageCount.value = Math.ceil(total / pageSize.value)
  }, { immediate: true })

  const onceStatus = ref(false)

  watch(() => value, (val) => {
    if (onceStatus.value || !val) {
      return
    }
    client.get({
      url: url?.value,
      params: {
        id: Array.isArray(val) ? val.join(',') : val,
      },
    }).then((res) => {
      onceStatus.value = true
      res?.data?.forEach((item) => {
        if (list.value?.findIndex(v => v[valueField] === item[valueField]) === -1) {
          list.value?.splice(0, 0, item)
        }
      })
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

  return {
    onSearch,
    options: list,
    Pagination,
    loading,
  }
}
