import type { TransferOption } from 'naive-ui'
import { useWatcher } from 'alova/client'
import { NSpace, NSpin, NTag } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { DuxTransferAsync } from '../../../components/transfer'
import { useClient } from '../../../hooks'

export const ShowTransferAsync = defineComponent({
  name: 'ShowTransferAsync',
  extends: DuxTransferAsync,
  setup(props) {
    const options = ref<TransferOption[]>([])
    const client = useClient()

    const getList = () => {
      return client.get({
        url: props.url,
        params: props.params,
      })
    }

    const { loading } = useWatcher(
      () => getList(),
      [() => props.url, () => props.params],
      {
        immediate: true,
      },
    ).onSuccess((res) => {
      options.value = res?.data?.data?.map((row) => {
        const item: Record<string, any> = {
          label: row[props.labelField],
          value: row[props.valueField],
          raw: row,
        }
        return item
      }) || []
    })

    const getOptionLabel = (value: string | number) => {
      const option = options.value.find(opt => opt.value === value)
      return option?.label || value
    }

    return () => (
      <div class="flex items-center">
        <NSpace>
          <NSpin show={loading}>
            {props.value?.map(v => (
              <NTag key={v} type="info">
                {getOptionLabel(v)}
              </NTag>
            )) || '-'}
          </NSpin>
        </NSpace>
      </div>
    )
  },
})
