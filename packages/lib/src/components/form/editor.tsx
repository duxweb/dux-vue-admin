import type { PageEditorComponent, PageEditorGroup, UseEditorResult } from '../pageEditor/editor/hook'
import { NButton } from 'naive-ui'
import { defineComponent } from 'vue'
import { useModal } from '../modal'
import { DuxPageEditor } from '../pageEditor/editor'
import { duxFormEditorCascader } from './editor/cascader'
import { duxFormEditorCascaderAsync } from './editor/cascaderAsync'
import { duxFormEditorCheckbox } from './editor/checkbox'
import { duxFormEditorColor } from './editor/color'
import { duxFormEditorDate } from './editor/date'
import { duxFormEditorDynamicInput } from './editor/dynamicInput'
import { duxFormEditorDynamicTags } from './editor/dynamicTags'
import { duxFormEditorAIEditor } from './editor/editor'
import { duxFormEditorInput } from './editor/input'
import { duxFormEditorInputNumber } from './editor/inputNumber'
import { duxFormEditorMentionAsync } from './editor/mentionAsync'
import { DuxFormEditorSettingPage } from './editor/page'
import { duxFormEditorRadio } from './editor/radio'
import { duxFormEditorRegion } from './editor/region'
import { duxFormEditorSelect } from './editor/select'
import { duxFormEditorSelectAsync } from './editor/selectAsync'
import { duxFormEditorSider } from './editor/sider'
import { duxFormEditorSwitch } from './editor/switch'
import { duxFormEditorTime } from './editor/time'
import { duxFormEditorTransferAsync } from './editor/transferAsync'
import { duxFormEditorTreeSelect } from './editor/treeSelect'
import { duxFormEditorTreeSelectAsync } from './editor/treeSelectAsync'

export const DuxFormEditor = defineComponent({
  name: 'DuxFormEditor',
  props: {
    onSave: Function,
  },
  extends: DuxPageEditor,
  setup(props) {
    const groups: PageEditorGroup[] = [
      {
        name: 'form',
        label: '输入',
        icon: 'i-tabler:forms',
      },
      {
        name: 'select',
        label: '选择',
        icon: 'i-tabler:select',
      },
      {
        name: 'async',
        label: '异步',
        icon: 'i-tabler:loader',
      },
    ]

    const components: PageEditorComponent[] = [
      duxFormEditorInput(),
      duxFormEditorInputNumber(),
      duxFormEditorCascader(),
      duxFormEditorSelect(),
      duxFormEditorColor(),
      duxFormEditorCheckbox(),
      duxFormEditorRadio(),
      duxFormEditorDate(),
      duxFormEditorDynamicInput(),
      duxFormEditorRegion(),
      duxFormEditorSelectAsync(),
      duxFormEditorCascaderAsync(),
      duxFormEditorSider(),
      duxFormEditorSwitch(),
      duxFormEditorTime(),
      duxFormEditorTreeSelect(),
      duxFormEditorDynamicTags(),
      duxFormEditorAIEditor(),
      duxFormEditorMentionAsync(),
      duxFormEditorTreeSelectAsync(),
      duxFormEditorTransferAsync(),
    ]

    const modal = useModal()

    return () => (
      <DuxPageEditor
        {...props}
        groups={groups}
        components={components}
        settingPage={{
          component: params => <DuxFormEditorSettingPage {...params} />,
          default: {
            labelPlacement: 'left',
          },
        }}
        actionRender={(edit?: UseEditorResult) => (
          <div class="flex gap-2 mb-2">
            <div class="flex-1">
              <NButton
                type="primary"
                secondary
                block
                onClick={() => {
                  modal.show({
                    title: 'Json Schema',
                    component: () => import('./editorJson'),
                    componentProps: {
                      value: edit?.value?.value.data || [],

                    },
                  })
                }}
              >
                Json 输出
              </NButton>
            </div>
            {props.onSave && (
              <div class="flex-1">
                <NButton type="primary" block onClick={() => props.onSave?.(edit)}>
                  保存
                </NButton>
              </div>
            )}
          </div>
        )}

      />
    )
  },
})
