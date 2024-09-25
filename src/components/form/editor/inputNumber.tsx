import { useVModel } from '@vueuse/core'
import { NCheckbox, NFormItem, NInput, NInputNumber } from 'naive-ui'
import { defineComponent } from 'vue'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxFormEditorItem, DuxFormEditorRule } from './common'
import type { PageEditorComponent } from '../../pageEditor/editor/hook'

const FormEditorInputNumber = defineComponent({
  name: 'FormEditorInputNumber',
  props: {
    options: Object,
  },
  setup(props) {
    const attr = props.options?.attr
    return () => (
      <NFormItem label={props.options?.label}>
        <div class="flex-1">
          <NInputNumber {...attr}>
            {{
              prefix: attr['v-slot:prefix'] ? () => attr['v-slot:prefix'] : undefined,
              suffix: attr['v-slot:suffix'] ? () => attr['v-slot:suffix'] : undefined,
            }}
          </NInputNumber>
        </div>
      </NFormItem>
    )
  },
})

const FormEditorInputNumberSetting = defineComponent({
  name: 'FormEditorInputNumberSetting',
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

          <NFormItem label="占位文本" path="文本">
            <NInput
              v-model:value={data.value.attr.placeholder}
            />
          </NFormItem>
          <NFormItem label="最小值">
            <NInputNumber
              v-model:value={data.value.attr.min}
            />
          </NFormItem>

          <NFormItem label="最大值">
            <NInputNumber
              v-model:value={data.value.attr.max}
            />
          </NFormItem>

          <NFormItem label="前缀文本">
            <NInput
              v-model:value={data.value.attr['v-slot:prefix']}
            />
          </NFormItem>
          <NFormItem label="后缀文本">
            <NInput
              v-model:value={data.value.attr['v-slot:suffix']}
            />
          </NFormItem>

          <NFormItem label="组件状态">
            <div class="w-full grid grid-cols-2">
              <NCheckbox
                label="只读"
                v-model:checked={data.value.attr.readonly}
              />
              <NCheckbox
                label="禁用"
                v-model:checked={data.value.attr.disabled}
              />
              <NCheckbox
                label="可清除"
                v-model:checked={data.value.attr.clearable}
              />
            </div>
          </NFormItem>

        </WidgetEditorSettingCard>

        <DuxFormEditorRule v-model:value={data.value.rule} />
      </div>
    )
  },
})

export function duxFormEditorInputNumber(): PageEditorComponent {
  return {
    name: 'inputNumber',
    icon: 'i-tabler:number',
    label: '数字框',
    group: 'form',
    component: props => <FormEditorInputNumber {...props} />,
    setting: props => <FormEditorInputNumberSetting {...props} />,
    settingDefault: {
      label: '数字框',
      name: 'number',
      attr: {
      },
      rule: [],
    },
  }
}
