import { useVModel } from '@vueuse/core'
import { NDynamicInput, NFormItem, NInputNumber, NSwitch } from 'naive-ui'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { DuxWidgetEditorPreview } from '../../pageEditor/editor/preview'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxFormEditorItem, DuxFormEditorRule } from './common'
import type { PageEditorComponent, PageEditorData } from '../../pageEditor/editor/hook'

const FormDynamicInput = defineComponent({
  name: 'DynamicInput',
  props: {
    options: Object,
    children: {
      type: Array as PropType<PageEditorData[]>,
      default: [],
    },
    onChildren: Function,
  },
  setup(props) {
    const attr = props.options?.attr
    return () => (
      <NFormItem label={props.options?.label}>
        <div class="flex-1 w-full">
          <NDynamicInput {...attr} value={[{}]}>
            {{
              default: () => (
                <DuxWidgetEditorPreview
                  class="w-full flex gap-2 rounded-sm border border-dashed border-gray-6 p-2"
                  modelValue={(props.children) as any}
                  onUpdate={(v) => {
                    // props.children[i] = v
                    props.onChildren?.(v)
                  }}
                />
              ),
            }}
          </NDynamicInput>
        </div>
      </NFormItem>
    )
  },
})

const FormDynamicInputSetting = defineComponent({
  name: 'FormDynamicInputSetting',
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
          <NFormItem label="最小项">
            <NInputNumber
              v-model:value={data.value.attr.min}
            />
          </NFormItem>

          <NFormItem label="最大项">
            <NInputNumber
              v-model:value={data.value.attr.max}
            />
          </NFormItem>

          <NFormItem label="禁用" labelPlacement="left" showFeedback={false}>
            <div class="flex flex-1 justify-end">
              <NSwitch v-model:value={data.value.attr.disabled} />
            </div>
          </NFormItem>

        </WidgetEditorSettingCard>
        <DuxFormEditorRule v-model:value={data.value.rule} />
      </div>
    )
  },
})

export function duxFormEditorDynamicInput(): PageEditorComponent {
  return {
    name: 'dynamicInput',
    icon: 'i-tabler:calendar-due',
    label: '动态输入',
    group: 'form',
    component: props => <FormDynamicInput {...props} />,
    setting: props => <FormDynamicInputSetting {...props} />,
    nested: true,
    settingDefault: {
      label: '动态输入',
      name: 'dynamicInput',
      attr: {
      },
      rule: [],
    },
  }
}
