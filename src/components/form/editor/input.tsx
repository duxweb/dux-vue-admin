import { useVModel } from '@vueuse/core'
import { NCheckbox, NFormItem, NInput, NInputNumber } from 'naive-ui'
import { defineComponent } from 'vue'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxRadio } from '../../radio'
import { DuxFormEditorItem, DuxFormEditorRule } from './common'
import type { PageEditorComponent } from '../../pageEditor/editor/hook'

const FormEditorInput = defineComponent({
  name: 'FormEditorInput',
  props: {
    options: Object,
  },
  setup(props) {
    return () => (
      <NFormItem label={props.options?.label}>
        <NInput {...props.options?.attr} inputProps={{ autocomplete: 'new-password' }} />
      </NFormItem>
    )
  },
})

const FormEditorInputSetting = defineComponent({
  name: 'FormEditorInputSetting',
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
            <DuxRadio
              v-model:value={data.value.attr.type}
              defaultValue="input"
              options={[
                { label: '文本框', value: 'text' },
                { label: '多行', value: 'textarea' },
                { label: '密码', value: 'password' },
              ]}
            />
          </NFormItem>

          <NFormItem label="占位文本">
            <NInput
              v-model:value={data.value.attr.placeholder}
            />
          </NFormItem>
          <NFormItem label="最小字数">
            <NInputNumber
              v-model:value={data.value.attr.minlength}
            />
          </NFormItem>

          <NFormItem label="最大字数">
            <NInputNumber
              v-model:value={data.value.attr.maxlength}
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
              <NCheckbox
                label="统计字数"
                v-model:checked={data.value.attr.showCount}
              />
            </div>
          </NFormItem>

        </WidgetEditorSettingCard>
        <DuxFormEditorRule v-model:value={data.value.rule} />
      </div>
    )
  },
})

export function duxFormEditorInput(): PageEditorComponent {
  return {
    name: 'input',
    icon: 'i-tabler:cursor-text',
    label: '文本框',
    group: 'form',
    component: props => <FormEditorInput {...props} />,
    setting: props => <FormEditorInputSetting {...props} />,
    settingDefault: {
      label: '文本框',
      name: 'text',
      attr: {
        type: 'text',
      },
      rule: [],
    },
  }
}
