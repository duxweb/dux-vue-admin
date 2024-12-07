import type { PropType } from 'vue'
import type { ComposerTranslation } from 'vue-i18n'
import type { PageEditorComponent, PageEditorData } from '../../pageEditor/editor/hook'
import { useVModel } from '@vueuse/core'
import { NDynamicInput, NFormItem, NInputNumber, NSwitch } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { DuxWidgetEditorPreview } from '../../pageEditor/editor/preview'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxFormItem } from '../formItem'
import { DuxFormEditorItem, DuxFormEditorRule } from './base'

const FormDynamicInput = defineComponent({
  name: 'DynamicInput',
  props: {
    options: Object,
    children: {
      type: Array as PropType<PageEditorData[]>,
      default: [],
    },
    onChildren: Function,
  },
  setup(props) {
    const attr = props.options?.attr

    return () => (
      <DuxFormItem label={props.options?.label}>
        <div class="flex-1 w-full">
          <NDynamicInput {...attr} value={[{}]}>
            {{
              default: () => (
                <DuxWidgetEditorPreview
                  class="w-full flex gap-2 rounded-sm border border-dashed border-gray-6 p-2"
                  modelValue={(props.children) as any}
                  onUpdate={(v) => {
                    // props.children[i] = v
                    props.onChildren?.(v)
                  }}
                />
              ),
            }}
          </NDynamicInput>
        </div>
      </DuxFormItem>
    )
  },
})

const FormDynamicInputSetting = defineComponent({
  name: 'FormDynamicInputSetting',
  props: {
    value: {
      type: Object,
      default: {},
    },
  },
  setup(props, { emit }) {
    const data = useVModel(props, 'value', emit)
    const { t } = useI18n()

    return () => (
      <div class="">

        <DuxFormEditorItem v-model:value={props.value} />

        <WidgetEditorSettingCard title={t('components.formEditor.config')}>
          <NFormItem label={t('components.formEditor.dynamicInput.min')}>
            <NInputNumber
              v-model:value={data.value.attr.min}
            />
          </NFormItem>

          <NFormItem label={t('components.formEditor.dynamicInput.max')}>
            <NInputNumber
              v-model:value={data.value.attr.max}
            />
          </NFormItem>

          <NFormItem label={t('components.formEditor.common.disabled')} labelPlacement="left" showFeedback={false}>
            <div class="flex flex-1 justify-end">
              <NSwitch v-model:value={data.value.attr.disabled} />
            </div>
          </NFormItem>

        </WidgetEditorSettingCard>
        <DuxFormEditorRule v-model:value={data.value.rule} />
      </div>
    )
  },
})

export function duxFormEditorDynamicInput(t: ComposerTranslation): PageEditorComponent {
  return {
    name: 'dynamic-input',
    icon: 'i-tabler:calendar-due',
    label: t('components.formEditor.dynamicInput.name'),
    group: 'form',
    component: props => <FormDynamicInput {...props} />,
    setting: props => <FormDynamicInputSetting {...props} />,
    nested: true,
    settingDefault: {
      label: t('components.formEditor.dynamicInput.name'),
      name: 'dynamic-input',
      attr: {
      },
      rule: [],
    },
  }
}
