import type { ComposerTranslation } from 'vue-i18n'
import type { PageEditorComponent } from '../../pageEditor/editor/hook'
import { useVModel } from '@vueuse/core'
import { NColorPicker, NFormItem, NSwitch } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxFormItem } from '../formItem'
import { DuxFormEditorItem, DuxFormEditorRule } from './base'

const FormColor = defineComponent({
  name: 'FormColor',
  props: {
    options: Object,
  },
  setup(props) {
    const attr = props.options?.attr
    return () => (
      <DuxFormItem label={props.options?.label}>
        <div class="flex-1">
          <NColorPicker {...attr} />
        </div>
      </DuxFormItem>
    )
  },
})

const FormColorSetting = defineComponent({
  name: 'FormColorSetting',
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

          <NFormItem label={t('components.formEditor.common.disabled')} labelPlacement="left" showFeedback={false}>
            <div class="flex flex-1 justify-end">
              <NSwitch v-model:value={data.value.attr.disabled} />
            </div>
          </NFormItem>
          <NFormItem label={t('components.formEditor.color.showAlpha')} labelPlacement="left" showFeedback={false}>
            <div class="flex flex-1 justify-end">
              <NSwitch v-model:value={data.value.attr.showAlpha} />
            </div>
          </NFormItem>

        </WidgetEditorSettingCard>
        <DuxFormEditorRule v-model:value={data.value.rule} />
      </div>
    )
  },
})

export function duxFormEditorColor(t: ComposerTranslation): PageEditorComponent {
  return {
    name: 'color',
    icon: 'i-tabler:palette',
    label: t('components.formEditor.color.name'),
    group: 'form',
    component: props => <FormColor {...props} />,
    setting: props => <FormColorSetting {...props} />,
    settingDefault: {
      label: t('components.formEditor.color.name'),
      name: 'color',
      attr: {
        showAlpha: true,
      },
      rule: [],
    },
  }
}
