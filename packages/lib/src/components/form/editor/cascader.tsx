import type { PageEditorComponent } from '../../pageEditor/editor/hook'
import { useVModel } from '@vueuse/core'
import { NButton, NCascader, NFormItem, NSwitch } from 'naive-ui'
import { defineComponent } from 'vue'
import { useModal } from '../../modal'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxFormEditorItem, DuxFormEditorRule } from './common'

const FormCascader = defineComponent({
  name: 'FormCascader',
  props: {
    options: Object,
  },
  setup(props) {
    return () => (
      <NFormItem label={props.options?.label}>
        <NCascader {...props.options?.attr} />
      </NFormItem>
    )
  },
})

const FormCascaderSetting = defineComponent({
  name: 'FormCascaderSetting',
  props: {
    value: {
      type: Object,
      default: {},
    },
  },
  setup(props, { emit }) {
    const data = useVModel(props, 'value', emit)
    const modal = useModal()

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

          <NButton
            block
            dashed
            renderIcon={() => <div class="i-tabler:edit"></div>}
            onClick={() => {
              modal.show({
                title: '编辑数据',
                component: () => import('./json'),
                componentProps: {
                  desc: '您可以使用 "label"、"value" 和 "children" 来定义 json 数组选项',
                  value: JSON.stringify(data.value.attr.options, null, 2),
                  onChange: (value) => {
                    try {
                      data.value.attr.options = JSON.parse(value)
                    }
                    catch {}
                  },
                },
              })
            }}
          >
            编辑数据
          </NButton>

        </WidgetEditorSettingCard>

        <DuxFormEditorRule v-model:value={data.value.rule} />
      </div>
    )
  },
})

export function duxFormEditorCascader(): PageEditorComponent {
  return {
    name: 'cascader',
    icon: 'i-tabler:list-tree',
    label: '级联选择器',
    group: 'select',
    component: props => <FormCascader {...props} />,
    setting: props => <FormCascaderSetting {...props} />,
    settingDefault: {
      label: '级联选择器',
      name: 'cascader',
      attr: {
        options: [],
        clearable: true,
      },
      rule: [],
    },
  }
}
