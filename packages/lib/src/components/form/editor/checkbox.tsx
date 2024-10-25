import type { ComposerTranslation } from 'vue-i18n'
import type { PageEditorComponent } from '../../pageEditor/editor/hook'
import { useVModel } from '@vueuse/core'
import { NButton, NCheckbox, NCheckboxGroup, NDynamicInput, NFormItem, NSwitch } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useModal } from '../../modal'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxFormEditorItem, DuxFormEditorRule } from './base'

const FormCheckbox = defineComponent({
  name: 'FormCheckbox',
  props: {
    options: Object,
  },
  setup(props) {
    return () => (
      <NFormItem label={props.options?.label}>
        <NCheckboxGroup {...props.options?.attr} value={props.options?.attr?.defaultValue}>
          {props.options?.attr?.options?.map((item, index) => <NCheckbox key={index} value={item.value}>{item.label}</NCheckbox>)}
        </NCheckboxGroup>

      </NFormItem>
    )
  },
})

const FormCheckboxSetting = defineComponent({
  name: 'FormCheckboxSetting',
  props: {
    value: {
      type: Object,
      default: {},
    },
  },
  setup(props, { emit }) {
    const data = useVModel(props, 'value', emit)
    const modal = useModal()
    const { t } = useI18n()

    return () => (
      <div class="">

        <DuxFormEditorItem v-model:value={props.value} />

        <WidgetEditorSettingCard title={t('components.formEditor.config')}>

          <NFormItem label={t('components.formEditor.common.defaultValue')} showFeedback={false}>
            <NDynamicInput v-model:value={data.value.attr.defaultValue} />
          </NFormItem>

          <NFormItem label={t('components.formEditor.common.disabled')} labelPlacement="left" showFeedback={false}>
            <div class="flex flex-1 justify-end">
              <NSwitch v-model:value={data.value.attr.disabled} />
            </div>
          </NFormItem>

        </WidgetEditorSettingCard>

        <WidgetEditorSettingCard title={t('components.formEditor.options')}>

          <NButton
            block
            dashed
            renderIcon={() => <div class="i-tabler:edit"></div>}
            onClick={() => {
              modal.show({
                title: t('components.formEditor.common.data'),
                component: () => import('./options'),
                componentProps: {
                  desc: t('components.formEditor.checkbox.optionsDescription'),
                  value: data.value.attr.options,
                  onChange: (value) => {
                    data.value.attr.options = value
                  },
                  options: [
                    {
                      label: t('components.formEditor.common.optionLabel'),
                      value: 'label',
                    },
                    {
                      label: t('components.formEditor.common.optionValue'),
                      value: 'value',
                    },
                  ],
                },

              })
            }}
          >
            {t('components.formEditor.common.data')}
          </NButton>

        </WidgetEditorSettingCard>

        <DuxFormEditorRule v-model:value={data.value.rule} />
      </div>
    )
  },
})

export function duxFormEditorCheckbox(t: ComposerTranslation): PageEditorComponent {
  return {
    name: 'checkbox',
    icon: 'i-tabler:square-check',
    label: t('components.formEditor.checkbox.name'),
    group: 'select',
    component: props => <FormCheckbox {...props} />,
    setting: props => <FormCheckboxSetting {...props} />,
    settingDefault: {
      label: t('components.formEditor.checkbox.name'),
      name: 'checkbox',
      attr: {
        options: [
          {
            label: 'option 1',
            value: '1',
          },
          {
            label: 'option 2',
            value: '2',
          },
        ],
        defaultValue: [],
      },
      rule: [],
    },
  }
}
