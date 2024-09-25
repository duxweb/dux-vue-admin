import { useVModel } from '@vueuse/core'
import { NButton, NFormItem, NInput, NRadio, NRadioGroup, NSwitch } from 'naive-ui'
import { defineComponent } from 'vue'
import { useModal } from '../../modal'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxFormEditorItem, DuxFormEditorRule } from './common'
import type { PageEditorComponent } from '../../pageEditor/editor/hook'

const FormRadio = defineComponent({
  name: 'FormRadio',
  props: {
    options: Object,
  },
  setup(props) {
    return () => (
      <NFormItem label={props.options?.label}>
        <NRadioGroup {...props.options?.attr} value={props.options?.attr?.defaultValue}>
          {props.options?.attr?.options?.map((item, index) => <NRadio key={index} value={item.value}>{item.label}</NRadio>)}
        </NRadioGroup>

      </NFormItem>
    )
  },
})

const FormRadioSetting = defineComponent({
  name: 'FormRadioSetting',
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

          <NFormItem label="默认值" showFeedback={false}>
            <NInput
              v-model:value={data.value.attr.defaultValue}
            />
          </NFormItem>

          <NFormItem label="禁用" labelPlacement="left" showFeedback={false}>
            <div class="flex flex-1 justify-end">
              <NSwitch v-model:value={data.value.attr.disabled} />
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

export function duxFormEditorRadio(): PageEditorComponent {
  return {
    name: 'radio',
    icon: 'i-tabler:circle-dot',
    label: '单选',
    group: 'select',
    component: props => <FormRadio {...props} />,
    setting: props => <FormRadioSetting {...props} />,
    settingDefault: {
      label: '单选',
      name: 'radio',
      attr: {
        options: [
          {
            label: '选项一',
            value: '1',
          },
          {
            label: '选项二',
            value: '2',
          },
        ],
        defaultValue: '1',
      },
      rule: [],
    },
  }
}
