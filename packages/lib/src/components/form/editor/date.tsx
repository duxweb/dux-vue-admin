import { useVModel } from '@vueuse/core'
import { NDatePicker, NFormItem, NSelect, NSwitch } from 'naive-ui'
import { defineComponent } from 'vue'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxFormEditorItem, DuxFormEditorRule } from './common'
import type { PageEditorComponent } from '../../pageEditor/editor/hook'

const FormDate = defineComponent({
  name: 'FormDate',
  props: {
    options: Object,
  },
  setup(props) {
    const attr = props.options?.attr
    return () => (
      <NFormItem label={props.options?.label}>
        <div class="flex-1">
          <NDatePicker {...attr} />
        </div>
      </NFormItem>
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

    return () => (
      <div class="">

        <DuxFormEditorItem v-model:value={props.value} />

        <WidgetEditorSettingCard title="组件配置">

          <NFormItem label="输入类型">

            <NSelect
              v-model:value={data.value.attr.type}
              options={[
                {
                  label: '日期',
                  value: 'date',
                },
                {
                  label: '日期范围',
                  value: 'daterange',
                },
                {
                  label: '日期时间',
                  value: 'datetime',
                },
                {
                  label: '日期时间范围',
                  value: 'datetimerange',
                },
                {
                  label: '月',
                  value: 'month',
                },
                {
                  label: '月范围',
                  value: 'monthrange',
                },
                {
                  label: '年',
                  value: 'year',
                },
                {
                  label: '年范围',
                  value: 'yearrange',
                },
                {
                  label: '季度',
                  value: 'quarter',
                },
                {
                  label: '季度范围',
                  value: 'quarterrange',
                },
                {
                  label: '周',
                  value: 'week',
                },
              ]}
            />

          </NFormItem>

          <NFormItem label="禁用" labelPlacement="left" showFeedback={false}>
            <div class="flex flex-1 justify-end">
              <NSwitch v-model:value={data.value.attr.disabled} />
            </div>
          </NFormItem>

          <NFormItem label="可清除" labelPlacement="left" showFeedback={false}>
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

export function duxFormEditorDate(): PageEditorComponent {
  return {
    name: 'date',
    icon: 'i-tabler:calendar-due',
    label: '日期选择',
    group: 'form',
    component: props => <FormDate {...props} />,
    setting: props => <FormDateSetting {...props} />,
    settingDefault: {
      label: '日期选择',
      name: 'date',
      attr: {
        type: 'date',
      },
      rule: [],
    },
  }
}
