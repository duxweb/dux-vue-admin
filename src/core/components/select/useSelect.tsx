import { usePagination } from 'alova/client'
import type { Ref } from 'vue'
import { ref, watch } from 'vue'
import { NPagination } from 'naive-ui'
import { useClient } from '../../hooks'

type value = Array<string | number> | string | number | null

interface UseSelectProps {
  url?: string
  params?: Record<string, any>
  value?: Ref<value>
  valueField?: string
  pagination?: boolean
}
export function useSelect({ url, params, pagination, value, valueField = 'value' }: UseSelectProps) {
  const client = useClient()
  const keyword = ref()

  const getList = (page: number, pageSize: number) => {
    return client.get({
      url,
      params: { page, pageSize, keyword: keyword.value, ...params },
    })
  }

  const {
    loading,
    data,
    page,
    pageSize,
    pageCount,
    insert,
  } = usePagination(
    (page, pageSize) => getList(page, pageSize),
    {
      watchingStates: [keyword],
      debounce: 300,
      // immediate: false,
      total: (res) => {
        return res.meta?.total || 0
      },
      data: res => res.data,
      initialData: {
        total: 0,
        data: [],
      },
      initialPage: 1,
      initialPageSize: pagination ? 10 : 0,
    },
  )

  const onceStatus = ref(false)

  watch(value, (val) => {
    if (onceStatus.value || !val) {
      return
    }
    client.get({
      url,
      params: {
        id: val,
      },
    }).then((res) => {
      onceStatus.value = true
      res?.data?.forEach((item) => {
        if (data.value?.findIndex(v => v[valueField] === item[valueField]) === -1) {
          insert(item, 0)
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
    options: data,
    Pagination,
    loading,
  }
}
