import type { PageEditorComponent } from '../../pageEditor/editor/hook'
import { useVModel } from '@vueuse/core'
import { NFormItem, NInput, NSwitch } from 'naive-ui'
import { defineComponent } from 'vue'
import { DuxCascaderAsync } from '../../cascader'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxFormEditorItem, DuxFormEditorRule } from './common'

const Comp = defineComponent({
  props: {
    options: Object,
  },
  setup(props) {
    return () => (
      <NFormItem label={props.options?.label}>
        <DuxCascaderAsync {...props.options?.attr} />
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

          <NFormItem label="多选" labelPlacement="left" showFeedback={false}>
            <div class="flex flex-1 justify-end">
              <NSwitch v-model:value={data.value.attr.multiple} />
            </div>
          </NFormItem>
          <NFormItem label="关联选择" labelPlacement="left" showFeedback={false}>
            <div class="flex flex-1 justify-end">
              <NSwitch v-model:value={data.value.attr.cascade} />
            </div>
          </NFormItem>

          <NFormItem label="显示路径" labelPlacement="left" showFeedback={false}>
            <div class="flex flex-1 justify-end">
              <NSwitch v-model:value={data.value.attr.showPath} />
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

        <WidgetEditorSettingCard title="组件选项">

          <NFormItem label="Url">
            <NInput v-model:value={data.value.attr.url} />
          </NFormItem>

          <NFormItem label="标签字段">
            <NInput v-model:value={data.value.attr.labelField} />
          </NFormItem>

          <NFormItem label="值字段">
            <NInput v-model:value={data.value.attr.valueField} />
          </NFormItem>

        </WidgetEditorSettingCard>

        <DuxFormEditorRule v-model:value={data.value.rule} />
      </div>
    )
  },
})

export function duxFormEditorCascaderAsync(): PageEditorComponent {
  return {
    name: 'cascaderAsync',
    icon: 'i-tabler:list-tree',
    label: '异步级联器',
    group: 'async',
    component: props => <Comp {...props} />,
    setting: props => <Setting {...props} />,
    settingDefault: {
      label: '异步级联器',
      name: 'cascaderAsync',
      attr: {
        url: '',
        valueField: 'id',
        labelField: 'title',
        clearable: true,
        pagination: true,
      },
      rule: [],
    },
  }
}
