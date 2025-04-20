import type { TransferOption } from 'naive-ui'
import { useQuery } from '@tanstack/vue-query'
import { useVModel } from '@vueuse/core'
import { NAvatar, NSpin, NTransfer } from 'naive-ui'
import { defineComponent, ref, watch } from 'vue'
import { useClient } from '../../hooks'

export const DuxTransferAsync = defineComponent({
  name: 'DuxTransferAsync',
  props: {
    url: String,
    params: {
      type: Object,
    },
    labelField: {
      type: String,
      default: 'name',
    },
    valueField: {
      type: String,
      default: 'id',
    },
    imageField: {
      type: String,
    },
    descField: {
      type: String,
    },
    invalidate: {
      type: String,
    },
  },
  extends: NTransfer,
  setup(props, { emit }) {
    const model = useVModel(props, 'value', emit, {
      passive: true,
      defaultValue: props.defaultValue,
    })

    const options = ref<TransferOption[]>([])
    const client = useClient()

    const getList = () => {
      return client.get({
        url: props.url,
        params: props.params,
      })
    }

    const req = useQuery({
      queryKey: [props.invalidate || props.url, props.params],
      queryFn: getList,
    })

    watch(req.data, (res) => {
      options.value = res?.data?.map((row) => {
        const item: Record<string, any> = {
          label: row[props.labelField],
          value: row[props.valueField],
          raw: row,
        }
        return item
      }) || []
    })

    return () => (
      <div class="w-full">
        <NSpin show={req.isLoading.value}>
          <NTransfer
            {...props}
            v-model:value={model.value}
            options={options.value}
            renderTargetLabel={({ option }: { option: Record<string, any> }) => {
              if (props.imageField || props.descField) {
                return (
                  <div class="flex gap-2 items-center py-2">
                    {props.imageField && (
                      <NAvatar round src={option?.raw[props.imageField]} size={32} />
                    )}
                    <div class="flex-1 flex flex-col justify-center">
                      <div>{option?.raw[props.labelField]}</div>
                      {props.descField && <div class="text-gray-6">{option?.raw[props.descField]}</div>}
                    </div>
                  </div>
                )
              }
              else {
                return option?.raw[props.labelField]
              }
            }}
          />
        </NSpin>
      </div>
    )
  },
})
