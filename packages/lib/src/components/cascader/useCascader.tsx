import { actionDelegationMiddleware, useWatcher } from 'alova/client'
import { ref, type Ref } from 'vue'
import { treeToArr, useClient } from '../../hooks'

interface UseCascaderProps {
  url?: Ref<string | undefined>
  params?: Ref<Record<string, any>>
  invalidate?: string
}
export function useCascader({ url, params, invalidate }: UseCascaderProps) {
  const client = useClient()
  const expanded = ref<(string | number)[]>([])

  const getList = () => {
    return client.get({
      url: url?.value,
      params: params?.value,
    })
  }

  const { loading, data, onSuccess } = useWatcher(
    () => getList(),
    [url, params],
    {
      middleware: actionDelegationMiddleware(invalidate || url?.value || ''),
      immediate: true,
    },
  )

  onSuccess((v) => {
    expanded.value = treeToArr(v.data?.data || [], 'id', 'children')
  })

  return {
    options: data,
    loading,
    expanded,
  }
}
