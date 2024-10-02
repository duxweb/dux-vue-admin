import { defineComponent } from 'vue'
import { DuxPageEditor } from '../pageEditor/editor'
import { duxFormEditorCascader } from './editor/cascader'
import { duxFormEditorCheckbox } from './editor/checkbox'
import { duxFormEditorColor } from './editor/color'
import { duxFormEditorDate } from './editor/date'
import { duxFormEditorDynamicInput } from './editor/dynamicInput'
import { duxFormEditorInput } from './editor/input'
import { duxFormEditorInputNumber } from './editor/inputNumber'
import { DuxFormEditorSettingPage } from './editor/page'
import { duxFormEditorRadio } from './editor/radio'
import { duxFormEditorSelect } from './editor/select'
import type { PageEditorComponent, PageEditorGroup } from '../pageEditor/editor/hook'

export const DuxFormEditor = defineComponent({
  name: 'DuxFormEditor',
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
        icon: 'i-tabler:forms',
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
    ]

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
      />
    )
  },
})
