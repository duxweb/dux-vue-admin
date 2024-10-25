import type { PropType, Ref } from 'vue'
import type { JsonFormItemSchema } from './handler'
import { useWindowSize } from '@vueuse/core'
import { NButton, NCard, NForm, NTabs } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useTabStore } from '../../stores'
import { DuxFullPage } from '../page'
import { useForm } from './useForm'

export const DuxTabForm = defineComponent({
  name: 'DuxTabForm',
  props: {
    model: Object as PropType<Ref<Record<string, any>>>,
    title: String,
    data: Object as PropType<Record<string, any>>,
    schema: Object as PropType<JsonFormItemSchema[]>,
    url: String,
    id: [String, Number],
    invalidate: String,
    tab: String,
  },
  setup(props, { slots }) {
    const tab = useTabStore()
    const router = useRouter()
    const { t } = useI18n()

    const { loading, onSubmit, onReset, model } = useForm({
      url: props.url,
      id: props.id,
      invalidate: props.invalidate,
      model: props.model,
      success: () => {
        if (!props.id && tab.current) {
          tab.delTab(tab.current, v => router.push(v.path || ''))
        }
        else {
          onReset()
        }
      },
    })
    const { width } = useWindowSize()

    return () => (
      <DuxFullPage>
        <NForm model={model} labelPlacement={width.value > 768 ? 'left' : 'top'} labelWidth={width.value > 768 ? 100 : 0} class="h-full">
          <NCard
            class="h-full"
            contentClass="p-0! h-1 flex flex-col"
          >
            <NTabs type="line" class="flex-1 h-1" tabClass="p-4!" paneClass="flex-1 h-1 overflow-auto p-4!" defaultValue={props.tab}>
              {slots.default?.()}
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
        </NForm>
      </DuxFullPage>
    )
  },
})
