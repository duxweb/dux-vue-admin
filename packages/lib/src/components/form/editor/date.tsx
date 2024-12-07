import type { ComposerTranslation } from 'vue-i18n'
import type { PageEditorComponent } from '../../pageEditor/editor/hook'
import { useVModel } from '@vueuse/core'
import { NDatePicker, NFormItem, NSelect, NSwitch } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxFormItem } from '../formItem'
import { DuxFormEditorItem, DuxFormEditorRule } from './base'

const FormDate = defineComponent({
  name: 'FormDate',
  props: {
    options: Object,
  },
  setup(props) {
    const attr = props.options?.attr
    return () => (
      <DuxFormItem label={props.options?.label}>
        <div class="flex-1">
          <NDatePicker {...attr} />
        </div>
      </DuxFormItem>
    )
  },
})

const FormDateSetting = defineComponent({
  name: 'FormDateSetting',
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

          <NFormItem label={t('components.formEditor.config')}>

            <NSelect
              v-model:value={data.value.attr.type}
              options={[
                {
                  label: t('components.formEditor.date.date'),
                  value: 'date',
                },
                {
                  label: t('components.formEditor.date.dateRange'),
                  value: 'daterange',
                },
                {
                  label: t('components.formEditor.date.dateTime'),
                  value: 'datetime',
                },
                {
                  label: t('components.formEditor.date.dateTimeRange'),
                  value: 'datetimerange',
                },
                {
                  label: t('components.formEditor.date.month'),
                  value: 'month',
                },
                {
                  label: t('components.formEditor.date.monthRange'),
                  value: 'monthrange',
                },
                {
                  label: t('components.formEditor.date.year'),
                  value: 'year',
                },
                {
                  label: t('components.formEditor.date.yearRange'),
                  value: 'yearrange',
                },
                {
                  label: t('components.formEditor.date.quarter'),
                  value: 'quarter',
                },
                {
                  label: t('components.formEditor.date.quarterRange'),
                  value: 'quarterrange',
                },
                {
                  label: t('components.formEditor.date.week'),
                  value: 'week',
                },
              ]}
            />

          </NFormItem>

          <NFormItem label={t('components.formEditor.common.disabled')} labelPlacement="left" showFeedback={false}>
            <div class="flex flex-1 justify-end">
              <NSwitch v-model:value={data.value.attr.disabled} />
            </div>
          </NFormItem>

          <NFormItem label={t('components.formEditor.date.clearable')} labelPlacement="left" showFeedback={false}>
            <div class="flex flex-1 justify-end">
              <NSwitch v-model:value={data.value.attr.clearable} />
            </div>
          </NFormItem>

        </WidgetEditorSettingCard>
        <DuxFormEditorRule v-model:value={data.value.rule} />
      </div>
    )
  },
})

export function duxFormEditorDate(t: ComposerTranslation): PageEditorComponent {
  return {
    name: 'date',
    icon: 'i-tabler:calendar-due',
    label: t('components.formEditor.date.name'),
    group: 'form',
    component: props => <FormDate {...props} />,
    setting: props => <FormDateSetting {...props} />,
    settingDefault: {
      label: t('components.formEditor.date.name'),
      name: 'date',
      attr: {
        type: 'date',
      },
      rule: [],
    },
  }
}
