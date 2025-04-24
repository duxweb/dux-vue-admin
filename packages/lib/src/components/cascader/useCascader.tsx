import { useQuery } from '@tanstack/vue-query'
import { ref, type Ref, toRef, watch } from 'vue'
import { treeToArr, useClient } from '../../hooks'

interface UseCascaderProps {
  url?: Ref<string | undefined> | string
  params?: Ref<Record<string, any>> | Record<string, any>
  invalidate?: string
}
export function useCascader({ url, params, invalidate }: UseCascaderProps) {
  const client = useClient()
  const expanded = ref<(string | number)[]>([])

  const urlRef = toRef(url || '')
  const paramsRef = toRef(params || {})

  const getList = () => {
    return client.get({
      url: urlRef.value as string,
      params: paramsRef.value as Record<string, any>,
    })
  }

  const req = useQuery({
    queryKey: [invalidate || urlRef, paramsRef],
    queryFn: getList,
  })

  watch(req.data, (v) => {
    expanded.value = treeToArr(v?.data || [], 'id', 'children')
  }, {
    immediate: true,
  })

  return {
    options: req.data,
    loading: req.isFetching,
    expanded,
  }
}
