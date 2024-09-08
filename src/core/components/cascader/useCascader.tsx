import { useWatcher } from 'alova/client'
import type { Ref } from 'vue'
import { useClient } from '@/core/hooks'

interface UseCascaderProps {
  url?: Ref<string>
  params?: Ref<Record<string, any>>
}
export function useCascader({ url, params }: UseCascaderProps) {
  const client = useClient()

  const getList = () => {
    return client.get({
      url: url.value,
      params: params.value,
    })
  }

  const { loading, data } = useWatcher(
    () => getList(),
    [url, params],
    {
      immediate: true,
    },
  )

  return {
    options: data,
    loading,
  }
}
