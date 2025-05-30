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
    edit: Boolean,
    invalidate: [String, Array] as PropType<string | string[]>,
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
      edit: props.edit,
      success: () => {
        if (!props.id && tab.current && !props.edit) {
          tab.delTab(tab.current, v => router.push(v.url || ''))
        }
      },
    })

    return () => (
      <DuxFullPage>
        <DuxForm {...props} class="flex flex-col gap-4 h-full">
          <NCard
            class="h-full"
            contentClass="p-0! h-1 flex flex-col"
          >
            <NTabs type="line" class="flex-1 min-h-1 flex flex-col" tabClass="p-4!" paneClass="flex-1 min-h-1 overflow-auto p-4! w-auto!" defaultValue={props.tab}>
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
        </DuxForm>
      </DuxFullPage>
    )
  },
})
