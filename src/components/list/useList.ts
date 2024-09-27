import { usePagination } from 'alova/client'
import type { Ref } from 'vue'
import { useClient } from '../../hooks'

interface UseListProps {
  url?: string
  defaultPageSize?: number
  filter?: Ref<Record<string, any>>
  cacheTime?: number
}

export function useList({ url, filter, cacheTime = Infinity, defaultPageSize = 20 }: UseListProps) {
  const client = useClient()
  const {
    loading,
    data,
    page,
    pageSize,
    pageCount,
    total,
  } = usePagination(
    (page, pageSize) => {
      return client.get({
        url,
        params: {
          page,
          pageSize,
          ...filter?.value,
        },
        config: {
          cacheFor: cacheTime,
        },
      })
    },
    {
      initialData: {
        total: 0,
        data: [],
      },
      initialPage: 1,
      initialPageSize: defaultPageSize,
      total: res => res.meta?.total || 0,
      data: res => res.data || [],
      watchingStates: [() => filter],
    },
  )

  const onPrevPage = () => {
    page.value--
  }

  const onNextPage = () => {
    page.value++
  }

  const onPageSize = (v: number) => {
    pageSize.value = v
  }

  const onPage = (v: number) => {
    page.value = v
  }

  return {
    loading,
    data,
    page,
    pageSize,
    pageCount,
    total,
    onPrevPage,
    onNextPage,
    onPageSize,
    onPage,
  }
}
