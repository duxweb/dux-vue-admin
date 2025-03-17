import type { PropType } from 'vue'
import type { JsonFormItemSchema } from './handler'
import { useVModel } from '@vueuse/core'
import { NButton } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { DuxModalPage } from '../modal'
import { DuxForm } from './form'
import { DuxJsonForm } from './jsonForm'
import { useForm } from './useForm'

export const DuxModalForm = defineComponent({
  name: 'DuxModalForm',
  props: {
    onConfirm: Function as PropType<(value: any) => void>,
    onClose: Function as PropType<() => void>,
    model: Object as PropType<Record<string, any>>,
    data: Object as PropType<Record<string, any>>,
    schema: Object as PropType<JsonFormItemSchema[]>,
    url: String,
    id: [String, Number],
    invalidate: [String, Array] as PropType<string | string[]>,
    initData: Object as PropType<Record<string, any>>,
  },
  extends: DuxForm,
  setup(props, { emit, slots }) {
    const modelData = useVModel(props, 'model', emit, {
      passive: true,
      defaultValue: {},
    })

    const formUrl = computed(() => props.url)

    const { loading, model, onSubmit } = useForm({
      url: formUrl,
      id: props.id,
      invalidate: props.invalidate,
      model: modelData,
      initData: props.initData,
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
              <DuxForm {...props} layout="top">
                {slots.default?.(props)}
                <DuxJsonForm model={model} schema={props.schema} data={props.data} />
              </DuxForm>
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
                {t('buttons.cancel')}
              </NButton>
              {slots.action?.(props)}
              <NButton
                type="primary"
                loading={loading.value}
                onClick={() => {
                  onSubmit()
                }}
              >
                {t('buttons.confirm')}
              </NButton>
            </>
          ),
        }}
      </DuxModalPage>

    )
  },
})
