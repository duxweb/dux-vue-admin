import type { PropType } from 'vue'
import type { JsonFormItemSchema } from './handler'
import { useVModel } from '@vueuse/core'
import { NButton, NCard, NTabs } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useTabStore } from '../../stores'
import { DuxFullPage } from '../page'
import { DuxForm } from './form'
import { useForm } from './useForm'

export const DuxTabForm = defineComponent({
  name: 'DuxTabForm',
  props: {
    model: Object as PropType<Record<string, any>>,
    title: String,
    data: Object as PropType<Record<string, any>>,
    schema: Object as PropType<JsonFormItemSchema[]>,
    url: String,
    id: [String, Number],
    invalidate: String,
    tab: String,
  },
  extends: DuxForm,
  setup(props, { slots, emit }) {
    const tab = useTabStore()
    const router = useRouter()
    const { t } = useI18n()

    const modelData = useVModel(props, 'model', emit, {
      passive: true,
      defaultValue: {},
    })

    const { loading, onSubmit, onReset } = useForm({
      url: props.url,
      id: props.id,
      invalidate: props.invalidate,
      model: modelData,
      success: () => {
        if (!props.id && tab.current) {
          tab.delTab(tab.current, v => router.push(v.url || ''))
        }
        else {
          onReset()
        }
      },
    })

    return () => (
      <DuxFullPage>
        <div class="flex flex-col gap-4 h-full">
          <NCard
            class="h-full"
            contentClass="p-0! h-1 flex flex-col"
          >
            <NTabs type="line" class="flex-1 h-1" tabClass="p-4!" paneClass="flex-1 h-1 overflow-auto p-4!" defaultValue={props.tab}>
              <DuxForm {...props}>
                {slots.default?.()}
              </DuxForm>
            </NTabs>
            <div class="border-t border-gray-2 p-4 flex justify-end gap-4">
              <NButton tertiary loading={loading.value} onClick={onReset}>
                {t('buttons.rest')}
              </NButton>
              <NButton type="primary" loading={loading.value} onClick={onSubmit}>
                {t('buttons.submit')}
              </NButton>
            </div>
          </NCard>
        </div>
      </DuxFullPage>
    )
  },
})
