import type { PropType } from 'vue'
import type { JsonFormItemSchema } from './handler'
import { useVModel } from '@vueuse/core'
import clsx from 'clsx'
import { NButton, NCard } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useTabStore } from '../../stores'
import { DuxFullPage } from '../page'
import { DuxForm } from './form'
import { DuxJsonForm } from './jsonForm'
import { useForm } from './useForm'

export const DuxPageForm = defineComponent({
  name: 'DuxPageForm',
  props: {
    title: String,
    model: Object as PropType<Record<string, any>>,
    data: Object as PropType<Record<string, any>>,
    schema: Object as PropType<JsonFormItemSchema[]>,
    url: String,
    id: [String, Number],
    invalidate: [String, Array] as PropType<string | string[]>,
    divider: Boolean,
    edit: Boolean,
  },
  extends: DuxForm,
  setup(props, { slots, emit }) {
    const tab = useTabStore()
    const router = useRouter()
    const modelData = useVModel(props, 'model', emit, {
      passive: true,
      defaultValue: {},
    })

    const { loading, onSubmit, onReset, model } = useForm({
      url: props.url,
      id: props.id,
      invalidate: props.invalidate,
      model: modelData,
      edit: props.edit,
      success: () => {
        if (!props.id && tab.current && !props.edit) {
          tab.delTab(tab.current, v => router.push(v.url || ''))
        }
      },
    })

    const { t } = useI18n()

    return () => (
      <DuxFullPage>
        <NCard title={props.title} segmented contentClass="p-0! flex-1 min-h-1" class="h-full flex flex-col" headerClass="px-6! py-4!">
          {{
            default: () => (
              <div class="h-full">
                <n-scrollbar>
                  <DuxForm {...props}>
                    <div class={clsx([
                      'px-6 flex flex-col',
                      props.divider ? 'py-4  divide-y divide-gray-2' : 'py-4',
                    ])}
                    >
                      {slots.default?.(model)}
                      <DuxJsonForm model={model} data={props.data} schema={props.schema} />
                    </div>
                  </DuxForm>
                </n-scrollbar>
              </div>
            ),
            action: () => (
              <div class="flex justify-end gap-4">
                <NButton tertiary loading={loading.value} onClick={onReset}>
                  {t('buttons.rest')}
                </NButton>
                <NButton type="primary" loading={loading.value} onClick={onSubmit}>
                  {t('buttons.submit')}
                </NButton>
              </div>
            ),
          }}
        </NCard>
      </DuxFullPage>
    )
  },
})
