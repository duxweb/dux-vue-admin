import type { PageEditorComponent } from '../../pageEditor/editor/hook'
import { useVModel } from '@vueuse/core'
import { NFormItem, NInput } from 'naive-ui'
import { defineComponent } from 'vue'
import { DuxAiEditor } from '../../editor'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxFormEditorItem, DuxFormEditorRule } from './common'

const Comp = defineComponent({
  props: {
    options: Object,
  },
  setup(props) {
    return () => (
      <NFormItem label={props.options?.label}>
        <DuxAiEditor {...props.options?.attr} />
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

        <WidgetEditorSettingCard title="组件选项">

          <NFormItem label="上传地址" feedback="默认自动处理">
            <NInput v-model:value={data.value.attr.uploadUrl} />
          </NFormItem>

        </WidgetEditorSettingCard>
        <DuxFormEditorRule v-model:value={data.value.rule} />
      </div>
    )
  },
})

export function duxFormEditorAIEditor(): PageEditorComponent {
  return {
    name: 'editor',
    icon: 'i-tabler:pencil',
    label: '编辑器',
    group: 'form',
    component: props => <Comp {...props} />,
    setting: props => <Setting {...props} />,
    settingDefault: {
      label: '编辑器',
      name: 'editor',
      attr: {
      },
      rule: [],
    },
  }
}
