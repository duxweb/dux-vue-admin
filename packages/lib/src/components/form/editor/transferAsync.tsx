import type { ComposerTranslation } from 'vue-i18n'
import type { PageEditorComponent } from '../../pageEditor/editor/hook'
import { useVModel } from '@vueuse/core'
import { NFormItem, NInput, NSwitch } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxTransferAsync } from '../../transfer'
import { DuxFormItem } from '../formItem'
import { DuxFormEditorItem, DuxFormEditorRule } from './base'

const Comp = defineComponent({
  props: {
    options: Object,
  },
  setup(props) {
    return () => (
      <DuxFormItem label={props.options?.label}>
        <DuxTransferAsync {...props.options?.attr} />
      </DuxFormItem>
    )
  },
})

const Setting = defineComponent({
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

          <NFormItem label={t('components.formEditor.tree.disabled')} labelPlacement="left" showFeedback={false}>
            <div class="flex flex-1 justify-end">
              <NSwitch v-model:value={data.value.attr.clearable} />
            </div>
          </NFormItem>

        </WidgetEditorSettingCard>

        <WidgetEditorSettingCard title={t('components.formEditor.options')}>

          <NFormItem label={t('components.formEditor.selectAsync.url')}>
            <NInput v-model:value={data.value.attr.url} />
          </NFormItem>
          <NFormItem label={t('components.formEditor.selectAsync.labelField')}>
            <NInput v-model:value={data.value.attr.labelField} />
          </NFormItem>

          <NFormItem label={t('components.formEditor.selectAsync.valueField')}>
            <NInput v-model:value={data.value.attr.valueField} />
          </NFormItem>

          <NFormItem label={t('components.formEditor.selectAsync.imageField')}>
            <NInput v-model:value={data.value.attr.imageField} />
          </NFormItem>

          <NFormItem label={t('components.formEditor.selectAsync.descField')}>
            <NInput v-model:value={data.value.attr.descField} />
          </NFormItem>

        </WidgetEditorSettingCard>

        <DuxFormEditorRule v-model:value={data.value.rule} />
      </div>
    )
  },
})

export function duxFormEditorTransferAsync(t: ComposerTranslation): PageEditorComponent {
  return {
    name: 'transferAsync',
    icon: 'i-tabler:transfer',
    label: t('components.formEditor.transferAsync.name'),
    group: 'async',
    component: props => <Comp {...props} />,
    setting: props => <Setting {...props} />,
    settingDefault: {
      label: t('components.formEditor.transferAsync.name'),
      name: 'transferAsync',
      attr: {
        url: '',
        valueField: 'id',
        labelField: 'title',
        clearable: true,
      },
      rule: [],
    },
  }
}
