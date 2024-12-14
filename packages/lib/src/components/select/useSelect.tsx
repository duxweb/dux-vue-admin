import { actionDelegationMiddleware, usePagination } from 'alova/client'
import { NPagination } from 'naive-ui'
import { ref, watch } from 'vue'
import { useClient } from '../../hooks'

type value = Array<string | number> | string | number | null | undefined

interface UseSelectProps {
  value: value
  url?: string
  params?: Record<string, any>
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

  const list = ref<Record<string, any>[]>([])

  const {
    loading,
    data,
    page,
    pageSize,
    pageCount,
  } = usePagination(
    (page, pageSize) => getList(page, pageSize),
    {
      watchingStates: [keyword, () => params],
      debounce: 300,
      // immediate: false,
      total: res => res.meta?.total || 0,
      data: res => res.data,
      initialData: {
        total: 0,
        data: [],
      },
      initialPage: 1,
      initialPageSize: pagination ? 10 : 0,
      middleware: actionDelegationMiddleware(url || ''),
    },
  )

  watch(data, (val) => {
    list.value = val
  })

  const onceStatus = ref(false)

  watch(() => value, (val) => {
    if (onceStatus.value || !val) {
      return
    }
    client.get({
      url,
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
