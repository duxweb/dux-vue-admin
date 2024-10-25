import type { ComposerTranslation } from 'vue-i18n'
import type { PageEditorComponent } from '../../pageEditor/editor/hook'
import { useVModel } from '@vueuse/core'
import { NCheckbox, NFormItem, NInput, NInputNumber } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxRadio } from '../../radio'
import { DuxFormEditorItem, DuxFormEditorRule } from './base'

const FormEditorInput = defineComponent({
  name: 'FormEditorInput',
  props: {
    options: Object,
  },
  setup(props) {
    return () => (
      <NFormItem label={props.options?.label}>
        <NInput {...props.options?.attr} inputProps={{ autocomplete: 'new-password' }} />
      </NFormItem>
    )
  },
})

const FormEditorInputSetting = defineComponent({
  name: 'FormEditorInputSetting',
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
          <NFormItem label={t('components.formEditor.input.type')}>
            <DuxRadio
              v-model:value={data.value.attr.type}
              defaultValue="input"
              options={[
                { label: t('components.formEditor.input.text'), value: 'text' },
                { label: t('components.formEditor.input.textarea'), value: 'textarea' },
                { label: t('components.formEditor.input.password'), value: 'password' },
              ]}
            />
          </NFormItem>

          <NFormItem label={t('components.formEditor.input.placeholder')}>
            <NInput
              v-model:value={data.value.attr.placeholder}
            />
          </NFormItem>
          <NFormItem label={t('components.formEditor.input.minLength')}>
            <NInputNumber
              v-model:value={data.value.attr.minlength}
            />
          </NFormItem>

          <NFormItem label={t('components.formEditor.input.maxLength')}>
            <NInputNumber
              v-model:value={data.value.attr.maxlength}
            />
          </NFormItem>
          <NFormItem label={t('components.formEditor.input.prefix')}>
            <NInput
              v-model:value={data.value.attr['v-slot:prefix']}
            />
          </NFormItem>
          <NFormItem label={t('components.formEditor.input.suffix')}>
            <NInput
              v-model:value={data.value.attr['v-slot:suffix']}
            />
          </NFormItem>

          <NFormItem label={t('components.formEditor.common.status')}>
            <div class="w-full grid grid-cols-2">
              <NCheckbox
                label={t('components.formEditor.input.readonly')}
                v-model:checked={data.value.attr.readonly}
              />
              <NCheckbox
                label={t('components.formEditor.common.disabled')}
                v-model:checked={data.value.attr.disabled}
              />
              <NCheckbox
                label={t('components.formEditor.input.clearable')}
                v-model:checked={data.value.attr.clearable}
              />
              <NCheckbox
                label={t('components.formEditor.input.showCount')}
                v-model:checked={data.value.attr.showCount}
              />
            </div>
          </NFormItem>

        </WidgetEditorSettingCard>
        <DuxFormEditorRule v-model:value={data.value.rule} />
      </div>
    )
  },
})

export function duxFormEditorInput(t: ComposerTranslation): PageEditorComponent {
  return {
    name: 'input',
    icon: 'i-tabler:cursor-text',
    label: t('components.formEditor.input.name'),
    group: 'form',
    component: props => <FormEditorInput {...props} />,
    setting: props => <FormEditorInputSetting {...props} />,
    settingDefault: {
      label: t('components.formEditor.input.name'),
      name: 'text',
      attr: {
        type: 'text',
      },
      rule: [],
    },
  }
}
