import { NButton } from 'naive-ui'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { DuxWindowFooter } from '../window'
import { DuxJsonForm } from './jsonForm'
import { useForm } from './useForm'
import type { JsonFormItemSchema } from './handler'

export const DuxModalForm = defineComponent({
  name: 'DuxModalForm',
  props: {
    onConfirm: Function as PropType<(value: any) => void>,
    onClose: Function as PropType<() => void>,

    data: Object as PropType<Record<string, any>>,
    schema: Object as PropType<JsonFormItemSchema[]>,
    url: String,
    id: [String, Number],
    invalidate: String,
  },
  setup({ schema, data, invalidate, url, id, onConfirm, onClose }) {
    const { loading, model, onSubmit, onReset } = useForm({
      url,
      id,
      invalidate,
      success: (res) => {
        if (!id) {
          onReset()
        }
        else {
          onConfirm?.(res)
        }
      },
    })

    return () => (
      <>
        <div class="p-4">
          <DuxJsonForm model={model} schema={schema} data={data} />
        </div>
        <DuxWindowFooter>
          <NButton
            type="tertiary"
            loading={loading.value}
            onClick={() => {
              onClose?.()
            }}
          >
            取消
          </NButton>
          <NButton
            type="primary"
            loading={loading.value}
            onClick={() => {
              onSubmit()
            }}
          >
            确定
          </NButton>
        </DuxWindowFooter>
      </>
    )
  },
})