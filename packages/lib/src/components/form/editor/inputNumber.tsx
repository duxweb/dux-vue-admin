import type { ComposerTranslation } from 'vue-i18n'
import type { PageEditorComponent } from '../../pageEditor/editor/hook'
import { useVModel } from '@vueuse/core'
import { NCheckbox, NFormItem, NInput, NInputNumber } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxFormEditorItem, DuxFormEditorRule } from './base'

const FormEditorInputNumber = defineComponent({
  name: 'FormEditorInputNumber',
  props: {
    options: Object,
  },
  setup(props) {
    const attr = props.options?.attr
    return () => (
      <NFormItem label={props.options?.label}>
        <div class="flex-1">
          <NInputNumber {...attr}>
            {{
              prefix: attr['v-slot:prefix'] ? () => attr['v-slot:prefix'] : undefined,
              suffix: attr['v-slot:suffix'] ? () => attr['v-slot:suffix'] : undefined,
            }}
          </NInputNumber>
        </div>
      </NFormItem>
    )
  },
})

const FormEditorInputNumberSetting = defineComponent({
  name: 'FormEditorInputNumberSetting',
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
      <div>
        <DuxFormEditorItem v-model:value={props.value} />

        <WidgetEditorSettingCard title={t('components.formEditor.config')}>

          <NFormItem label={t('components.formEditor.inputNumber.placeholder')}>
            <NInput
              v-model:value={data.value.attr.placeholder}
            />
          </NFormItem>
          <NFormItem label={t('components.formEditor.inputNumber.min')}>
            <NInputNumber
              v-model:value={data.value.attr.min}
            />
          </NFormItem>

          <NFormItem label={t('components.formEditor.inputNumber.max')}>
            <NInputNumber
              v-model:value={data.value.attr.max}
            />
          </NFormItem>

          <NFormItem label={t('components.formEditor.inputNumber.prefix')}>
            <NInput
              v-model:value={data.value.attr['v-slot:prefix']}
            />
          </NFormItem>
          <NFormItem label={t('components.formEditor.inputNumber.suffix')}>
            <NInput
              v-model:value={data.value.attr['v-slot:suffix']}
            />
          </NFormItem>

          <NFormItem label={t('components.formEditor.common.status')}>
            <div class="w-full grid grid-cols-2">
              <NCheckbox
                label={t('components.formEditor.inputNumber.readonly')}
                v-model:checked={data.value.attr.readonly}
              />
              <NCheckbox
                label={t('components.formEditor.common.disabled')}
                v-model:checked={data.value.attr.disabled}
              />
              <NCheckbox
                label={t('components.formEditor.inputNumber.clearable')}
                v-model:checked={data.value.attr.clearable}
              />
            </div>
          </NFormItem>

        </WidgetEditorSettingCard>

        <DuxFormEditorRule v-model:value={data.value.rule} />
      </div>
    )
  },
})

export function duxFormEditorInputNumber(t: ComposerTranslation): PageEditorComponent {
  return {
    name: 'inputNumber',
    icon: 'i-tabler:number',
    label: t('components.formEditor.inputNumber.name'),
    group: 'form',
    component: props => <FormEditorInputNumber {...props} />,
    setting: props => <FormEditorInputNumberSetting {...props} />,
    settingDefault: {
      label: t('components.formEditor.inputNumber.name'),
      name: 'number',
      attr: {
      },
      rule: [],
    },
  }
}
