import { NFormItem } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxRadio } from '../../radio'

export const DuxFormEditorSettingPage = defineComponent({
  name: 'DuxFormEditorSettingPage',
  props: {
    'value': {
      type: Object,
      default: {},
    },
    'update:modelValue': Function,
  },
  setup({ value }) {
    const { t } = useI18n()

    return () => (
      <>

        <div class="flex flex-col gap-2">

          <WidgetEditorSettingCard title={t('components.formEditor.page.name')}>
            <NFormItem label={t('components.formEditor.page.placement')} path="labelPlacement">

              <DuxRadio
                v-model:value={value.labelPlacement}
                defaultValue="left"
                options={[
                  { label: t('components.formEditor.page.left'), value: 'left' },
                  { label: t('components.formEditor.page.top'), value: 'top' },
                ]}
              />
            </NFormItem>
          </WidgetEditorSettingCard>

        </div>
      </>
    )
  },
})
