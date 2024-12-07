import type { ComposerTranslation } from 'vue-i18n'
import type { PageEditorComponent } from '../../pageEditor/editor/hook'
import { useVModel } from '@vueuse/core'
import { NButton, NFormItem, NInput, NRadio, NRadioGroup, NSwitch } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useModal } from '../../modal'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxFormItem } from '../formItem'
import { DuxFormEditorItem, DuxFormEditorRule } from './base'

const FormRadio = defineComponent({
  name: 'FormRadio',
  props: {
    options: Object,
  },
  setup(props) {
    return () => (
      <DuxFormItem label={props.options?.label}>
        <NRadioGroup {...props.options?.attr} value={props.options?.attr?.defaultValue}>
          {props.options?.attr?.options?.map((item, index) => <NRadio key={index} value={item.value}>{item.label}</NRadio>)}
        </NRadioGroup>

      </DuxFormItem>
    )
  },
})

const FormRadioSetting = defineComponent({
  name: 'FormRadioSetting',
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
            <NInput
              v-model:value={data.value.attr.defaultValue}
            />
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
                  desc: t('components.formEditor.radio.optionsDescription'),
                  value: data.value.attr.options,
                  onChange: (value) => {
                    data.value.attr.options = value
                  },
                  options: [
                    {
                      label: t('components.formEditor.radio.labelField'),
                      value: 'label',
                    },
                    {
                      label: t('components.formEditor.radio.valueField'),
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

export function duxFormEditorRadio(t: ComposerTranslation): PageEditorComponent {
  return {
    name: 'radio',
    icon: 'i-tabler:circle-dot',
    label: t('components.formEditor.radio.name'),
    group: 'select',
    component: props => <FormRadio {...props} />,
    setting: props => <FormRadioSetting {...props} />,
    settingDefault: {
      label: t('components.formEditor.radio.name'),
      name: 'radio',
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
        defaultValue: '1',
      },
      rule: [],
    },
  }
}
