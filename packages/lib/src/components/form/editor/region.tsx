import type { PageEditorComponent } from '../../pageEditor/editor/hook'
import { useVModel } from '@vueuse/core'
import { NCheckbox, NFormItem, NInput } from 'naive-ui'
import { defineComponent } from 'vue'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxRegion } from '../../region'
import { DuxFormEditorItem, DuxFormEditorRule } from './common'

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

    return () => (
      <div class="">

        <DuxFormEditorItem v-model:value={props.value} />

        <WidgetEditorSettingCard title="组件配置">

          <NFormItem label="Url">
            <NInput v-model:value={data.value.attr.url} />
          </NFormItem>
          <NFormItem label="标签字段">
            <NInput v-model:value={data.value.attr.labelField} />
          </NFormItem>

          <NFormItem label="值字段">
            <NInput v-model:value={data.value.attr.valueField} />
          </NFormItem>

          <NFormItem label="组件状态">
            <div class="w-full grid grid-cols-2">
              <NCheckbox
                label="禁用"
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

export function duxFormEditorRegion(): PageEditorComponent {
  return {
    name: 'region',
    icon: 'i-tabler:directions',
    label: '地区选择器',
    group: 'select',
    component: props => <Comp {...props} />,
    setting: props => <Setting {...props} />,
    settingDefault: {
      label: '地区选择器',
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
