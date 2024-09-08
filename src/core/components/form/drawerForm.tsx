import { NButton, NForm, NScrollbar } from 'naive-ui'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { useForm } from './useForm'
import type { JsonFormItemSchema } from './handler'
import { DuxJsonForm } from './jsonForm'

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
      <div class="flex-1 h-1 flex flex-col">
        <div class="flex-1 h-1">
          <NScrollbar>
            <NForm model={model} labelPlacement="top" class="p-6">
              <DuxJsonForm model={model} schema={schema} data={data} />
            </NForm>
          </NScrollbar>
        </div>
        <div class="flex-none border-t border-gray-4 p-4 flex justify-end gap-2">
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
        </div>
      </div>

    )
  },
})
