import type { PageEditorComponent } from '../../pageEditor/editor/hook'
import { useVModel } from '@vueuse/core'
import { NDynamicTags, NFormItem, NInputNumber, NSwitch } from 'naive-ui'
import { defineComponent } from 'vue'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxFormEditorItem, DuxFormEditorRule } from './common'

const Comp = defineComponent({
  props: {
    options: Object,
  },
  setup(props) {
    return () => (
      <NFormItem label={props.options?.label}>
        <NDynamicTags {...props.options?.attr} />
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

          <NFormItem label="禁用" labelPlacement="left" showFeedback={false}>
            <div class="flex flex-1 justify-end">
              <NSwitch v-model:value={data.value.attr.disabled} />
            </div>
          </NFormItem>

        </WidgetEditorSettingCard>

        <WidgetEditorSettingCard title="组件选项">

          <NFormItem label="最大数量">
            <NInputNumber v-model:value={data.value.attr.max} />
          </NFormItem>

        </WidgetEditorSettingCard>
        <DuxFormEditorRule v-model:value={data.value.rule} />
      </div>
    )
  },
})

export function duxFormEditorDynamicTags(): PageEditorComponent {
  return {
    name: 'dynamicTags',
    icon: 'i-tabler:tag',
    label: '标签输入',
    group: 'form',
    component: props => <Comp {...props} />,
    setting: props => <Setting {...props} />,
    settingDefault: {
      label: '标签输入',
      name: 'dynamicTags',
      attr: {
      },
      rule: [],
    },
  }
}
