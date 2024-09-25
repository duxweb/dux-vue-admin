import { useVModel } from '@vueuse/core'
import { NButton, NFormItem, NSelect, NSwitch } from 'naive-ui'
import { defineComponent } from 'vue'
import { useModal } from '../../modal'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxFormEditorItem, DuxFormEditorRule } from './common'
import type { PageEditorComponent } from '../../pageEditor/editor/hook'

const FormSelect = defineComponent({
  name: 'FormSelect',
  props: {
    options: Object,
  },
  setup(props) {
    return () => (
      <NFormItem label={props.options?.label}>
        <NSelect {...props.options?.attr} />
      </NFormItem>
    )
  },
})

const FormSelectSetting = defineComponent({
  name: 'FormSelectSetting',
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

          <NFormItem label="只读" labelPlacement="left" showFeedback={false}>
            <div class="flex flex-1 justify-end">
              <NSwitch v-model:value={data.value.attr.readonly} />
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
                component: () => import('./options'),
                componentProps: {
                  desc: '您可以使用 "label"、"value" 来定义 json 数组选项',
                  value: data.value.attr.options,
                  onChange: (value) => {
                    data.value.attr.options = value
                  },
                  options: [
                    {
                      label: '选项名',
                      value: 'label',
                    },
                    {
                      label: '选型值',
                      value: 'value',
                    },
                  ],
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

export function duxFormEditorSelect(): PageEditorComponent {
  return {
    name: 'select',
    icon: 'i-tabler:select',
    label: '选择器',
    group: 'select',
    component: props => <FormSelect {...props} />,
    setting: props => <FormSelectSetting {...props} />,
    settingDefault: {
      label: '选择器',
      name: 'select',
      attr: {
        options: [],
        clearable: true,
      },
      rule: [],
    },
  }
}
