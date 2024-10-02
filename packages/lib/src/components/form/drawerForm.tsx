import { NButton, NForm } from 'naive-ui'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { DuxDrawerPage } from '../drawer'
import { DuxJsonForm } from './jsonForm'
import { useForm } from './useForm'
import type { JsonFormItemSchema } from './handler'

export const DuxDrawerForm = defineComponent({
  name: 'DuxDrawerForm',
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
      <DuxDrawerPage>
        {{
          default: () => (
            <NForm model={model} labelPlacement="top" class="p-6">
              <DuxJsonForm model={model} schema={schema} data={data} />
            </NForm>
          ),
          action: () => (
            <>
              <NButton
                tertiary
                onClick={() => {
                  onClose?.()
                }}
                loading={loading.value}
              >
                取消
              </NButton>
              <NButton
                type="primary"
                onClick={() => {
                  onSubmit()
                }}
                loading={loading.value}
              >
                确定
              </NButton>
            </>
          ),
        }}
      </DuxDrawerPage>

    )
  },
})
