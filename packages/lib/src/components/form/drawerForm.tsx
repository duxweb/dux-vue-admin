import type { PropType, Ref } from 'vue'
import type { JsonFormItemSchema } from './handler'
import { NButton, NForm } from 'naive-ui'
import { defineComponent, toRef } from 'vue'
import { DuxDrawerPage } from '../drawer'
import { DuxJsonForm } from './jsonForm'
import { useForm } from './useForm'

export const DuxDrawerForm = defineComponent({
  name: 'DuxDrawerForm',
  props: {
    onConfirm: Function as PropType<(value: any) => void>,
    onClose: Function as PropType<() => void>,
    data: Object as PropType<Record<string, any>>,
    model: Object as PropType<Ref<Record<string, any>>>,
    schema: Object as PropType<JsonFormItemSchema[]>,
    url: String,
    id: [String, Number],
    invalidate: String,
  },
  setup(props) {
    const modelData = toRef(props, 'model')
    const { loading, model, onSubmit, onReset } = useForm({
      url: props.url,
      id: props.id,
      invalidate: props.invalidate,
      model: modelData,
      success: (res) => {
        if (!props.id) {
          onReset()
        }
        else {
          props.onConfirm?.(res)
        }
      },
    })

    return () => (
      <DuxDrawerPage>
        {{
          default: () => (
            <NForm model={model} labelPlacement="top" class="p-6">
              <DuxJsonForm model={model} schema={props.schema} data={props.data} />
            </NForm>
          ),
          action: () => (
            <>
              <NButton
                tertiary
                onClick={() => {
                  props.onClose?.()
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
