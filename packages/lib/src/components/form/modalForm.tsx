import type { PropType } from 'vue'
import type { JsonFormItemSchema } from './handler'
import { NButton } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { DuxModalPage } from '../modal'
import { DuxJsonForm } from './jsonForm'
import { useForm } from './useForm'

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
  setup(props) {
    const { loading, model, onSubmit } = useForm({
      url: props.url,
      id: props.id,
      invalidate: props.invalidate,
      success: (res) => {
        props.onConfirm?.(res)
      },
    })
    const { t } = useI18n()

    return () => (
      <DuxModalPage>
        {{
          default: () => (
            <div class="p-4">

              <DuxJsonForm model={model} schema={props.schema} data={props.data} />

            </div>
          ),
          action: () => (
            <>
              <NButton
                type="tertiary"
                loading={loading.value}
                onClick={() => {
                  props.onClose?.()
                }}
              >
                {t('components.formEditor.buttons.cancel')}
              </NButton>
              <NButton
                type="primary"
                loading={loading.value}
                onClick={() => {
                  onSubmit()
                }}
              >
                {t('components.formEditor.buttons.confirm')}
              </NButton>
            </>
          ),
        }}
      </DuxModalPage>

    )
  },
})
