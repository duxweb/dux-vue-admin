import type { ComposerTranslation } from 'vue-i18n'
import type { PageEditorComponent } from '../../pageEditor/editor/hook'
import { useVModel } from '@vueuse/core'
import { NButton, NFormItem, NSelect, NSwitch } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useModal } from '../../modal'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxFormItem } from '../formItem'
import { DuxFormEditorItem, DuxFormEditorRule } from './base'

const FormSelect = defineComponent({
  name: 'FormSelect',
  props: {
    options: Object,
  },
  setup(props) {
    return () => (
      <DuxFormItem label={props.options?.label}>
        <NSelect {...props.options?.attr} />
      </DuxFormItem>
    )
  },
})

const FormSelectSetting = defineComponent({
  name: 'FormSelectSetting',
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

          <NFormItem label={t('components.formEditor.select.multiple')} labelPlacement="left" showFeedback={false}>
            <div class="flex flex-1 justify-end">
              <NSwitch v-model:value={data.value.attr.multiple} />
            </div>
          </NFormItem>

          <NFormItem label={t('components.formEditor.common.disabled')} labelPlacement="left" showFeedback={false}>
            <div class="flex flex-1 justify-end">
              <NSwitch v-model:value={data.value.attr.disabled} />
            </div>
          </NFormItem>

          <NFormItem label={t('components.formEditor.select.clearable')} labelPlacement="left" showFeedback={false}>
            <div class="flex flex-1 justify-end">
              <NSwitch v-model:value={data.value.attr.clearable} />
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
                  desc: t('components.formEditor.common.optionsDescription'),
                  value: data.value.attr.options,
                  onChange: (value) => {
                    data.value.attr.options = value
                  },
                  options: [
                    {
                      label: t('components.formEditor.common.labelField'),
                      value: 'label',
                    },
                    {
                      label: t('components.formEditor.common.valueField'),
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

export function duxFormEditorSelect(t: ComposerTranslation): PageEditorComponent {
  return {
    name: 'select',
    icon: 'i-tabler:select',
    label: t('components.formEditor.select.name'),
    group: 'select',
    component: props => <FormSelect {...props} />,
    setting: props => <FormSelectSetting {...props} />,
    settingDefault: {
      label: t('components.formEditor.select.name'),
      name: 'select',
      attr: {
        options: [],
        clearable: true,
      },
      rule: [],
    },
  }
}
