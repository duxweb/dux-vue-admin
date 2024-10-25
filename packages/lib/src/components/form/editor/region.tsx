import type { ComposerTranslation } from 'vue-i18n'
import type { PageEditorComponent } from '../../pageEditor/editor/hook'
import { useVModel } from '@vueuse/core'
import { NCheckbox, NFormItem, NInput } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxRegion } from '../../region'
import { DuxFormEditorItem, DuxFormEditorRule } from './base'

const Comp = defineComponent({
  name: 'FormRegion',
  props: {
    options: Object,
  },
  setup(props) {
    return () => (
      <NFormItem label={props.options?.label}>
        <DuxRegion {...props.options?.attr} />
      </NFormItem>
    )
  },
})

const Setting = defineComponent({
  name: 'FormRegionSetting',
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

          <NFormItem label={t('components.formEditor.region.Url')}>
            <NInput v-model:value={data.value.attr.url} />
          </NFormItem>
          <NFormItem label={t('components.formEditor.region.labelField')}>
            <NInput v-model:value={data.value.attr.labelField} />
          </NFormItem>

          <NFormItem label={t('components.formEditor.region.valueField')}>
            <NInput v-model:value={data.value.attr.valueField} />
          </NFormItem>

          <NFormItem label={t('components.formEditor.common.status')}>
            <div class="w-full grid grid-cols-2">
              <NCheckbox
                label={t('components.formEditor.common.disabled')}
                v-model:checked={data.value.attr.disabled}
              />
            </div>
          </NFormItem>

        </WidgetEditorSettingCard>

        <DuxFormEditorRule v-model:value={data.value.rule} />
      </div>
    )
  },
})

export function duxFormEditorRegion(t: ComposerTranslation): PageEditorComponent {
  return {
    name: 'region',
    icon: 'i-tabler:directions',
    label: t('components.formEditor.region.name'),
    group: 'select',
    component: props => <Comp {...props} />,
    setting: props => <Setting {...props} />,
    settingDefault: {
      label: t('components.formEditor.region.name'),
      name: 'region',
      attr: {
        url: '/region',
        valueField: 'id',
        labelField: 'name',
      },
      rule: [],
    },
  }
}
