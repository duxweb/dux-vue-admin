import type { ComposerTranslation } from 'vue-i18n'
import type { PageEditorComponent } from '../../pageEditor/editor/hook'
import { useVModel } from '@vueuse/core'
import { NFormItem, NInput, NSwitch } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxTreeSelectAsync } from '../../treeSelect'
import { DuxFormItem } from '../formItem'
import { DuxFormEditorItem, DuxFormEditorRule } from './base'

const Comp = defineComponent({
  props: {
    options: Object,
  },
  setup(props) {
    return () => (
      <DuxFormItem label={props.options?.label}>
        <DuxTreeSelectAsync {...props.options?.attr} />
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

          <NFormItem label={t('components.formEditor.cascader.clearable')} labelPlacement="left" showFeedback={false}>
            <div class="flex flex-1 justify-end">
              <NSwitch v-model:value={data.value.attr.clearable} />
            </div>
          </NFormItem>

        </WidgetEditorSettingCard>

        <WidgetEditorSettingCard title={t('components.formEditor.options')}>

          <NFormItem label={t('components.formEditor.treeSelectAsync.url')}>
            <NInput v-model:value={data.value.attr.url} />
          </NFormItem>
          <NFormItem label={t('components.formEditor.treeSelectAsync.labelField')}>
            <NInput v-model:value={data.value.attr.labelField} />
          </NFormItem>

          <NFormItem label={t('components.formEditor.treeSelectAsync.keyField')}>
            <NInput v-model:value={data.value.attr.keyField} />
          </NFormItem>

        </WidgetEditorSettingCard>

        <DuxFormEditorRule v-model:value={data.value.rule} />
      </div>
    )
  },
})

export function duxFormEditorTreeSelectAsync(t: ComposerTranslation): PageEditorComponent {
  return {
    name: 'treeSelectAsync',
    icon: 'i-tabler:binary-tree',
    label: t('components.formEditor.treeSelectAsync.name'),
    group: 'async',
    component: props => <Comp {...props} />,
    setting: props => <Setting {...props} />,
    settingDefault: {
      label: t('components.formEditor.treeSelectAsync.name'),
      name: 'treeSelectAsync',
      attr: {
        url: '',
        keyField: 'id',
        labelField: 'name',
        clearable: true,
      },
      rule: [],
    },
  }
}
