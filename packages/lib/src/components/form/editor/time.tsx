import type { PageEditorComponent } from '../../pageEditor/editor/hook'
import { useVModel } from '@vueuse/core'
import { NFormItem, NInput, NSwitch, NTimePicker } from 'naive-ui'
import { defineComponent } from 'vue'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxFormEditorItem, DuxFormEditorRule } from './common'

const Comp = defineComponent({
  props: {
    options: Object,
  },
  setup(props) {
    const attr = props.options?.attr
    return () => (
      <NFormItem label={props.options?.label}>
        <div class="flex-1">
          <NTimePicker {...attr} />
        </div>
      </NFormItem>
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

    return () => (
      <div class="">

        <DuxFormEditorItem v-model:value={props.value} />

        <WidgetEditorSettingCard title="组件配置">

          <NFormItem label="格式">

            <NInput v-model:value={data.value.attr.format} />

          </NFormItem>

          <NFormItem label="12小时制" labelPlacement="left" showFeedback={false}>
            <div class="flex flex-1 justify-end">
              <NSwitch v-model:value={data.value.attr.use12Hours} />
            </div>
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

export function duxFormEditorTime(): PageEditorComponent {
  return {
    name: 'time',
    icon: 'i-tabler:calendar-due',
    label: '时间选择',
    group: 'form',
    component: props => <Comp {...props} />,
    setting: props => <Setting {...props} />,
    settingDefault: {
      label: '时间选择',
      name: 'time',
      attr: {
        use12Hours: false,
      },
      rule: [],
    },
  }
}
