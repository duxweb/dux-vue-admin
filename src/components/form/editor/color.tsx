import { useVModel } from '@vueuse/core'
import { NColorPicker, NFormItem, NSwitch } from 'naive-ui'
import { defineComponent } from 'vue'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxFormEditorItem, DuxFormEditorRule } from './common'
import type { PageEditorComponent } from '../../pageEditor/editor/hook'

const FormColor = defineComponent({
  name: 'FormColor',
  props: {
    options: Object,
  },
  setup(props) {
    const attr = props.options?.attr
    return () => (
      <NFormItem label={props.options?.label}>
        <div class="flex-1">
          <NColorPicker {...attr} />
        </div>
      </NFormItem>
    )
  },
})

const FormColorSetting = defineComponent({
  name: 'FormColorSetting',
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
          <NFormItem label="透明度" labelPlacement="left" showFeedback={false}>
            <div class="flex flex-1 justify-end">
              <NSwitch v-model:value={data.value.attr.showAlpha} />
            </div>
          </NFormItem>

        </WidgetEditorSettingCard>
        <DuxFormEditorRule v-model:value={data.value.rule} />
      </div>
    )
  },
})

export function duxFormEditorColor(): PageEditorComponent {
  return {
    name: 'color',
    icon: 'i-tabler:palette',
    label: '颜色选择器',
    group: 'form',
    component: props => <FormColor {...props} />,
    setting: props => <FormColorSetting {...props} />,
    settingDefault: {
      label: '颜色选择器',
      name: 'color',
      attr: {
        showAlpha: true,
      },
      rule: [],
    },
  }
}
