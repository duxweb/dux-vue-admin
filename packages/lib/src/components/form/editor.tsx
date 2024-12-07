import type { PageEditorComponent, PageEditorGroup, UseEditorResult } from '../pageEditor/editor/hook'
import { NButton } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
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
  setup(props, { emit }) {
    const { t } = useI18n()
    const groups = computed<PageEditorGroup[]>(() => {
      return [
        {
          name: 'form',
          label: t('components.formEditor.group.form'),
          icon: 'i-tabler:forms',
        },
        {
          name: 'select',
          label: t('components.formEditor.group.select'),
          icon: 'i-tabler:select',
        },
        {
          name: 'async',
          label: t('components.formEditor.group.async'),
          icon: 'i-tabler:loader',
        },
      ]
    })

    const components = computed<PageEditorComponent[]>(() => {
      return [
        duxFormEditorInput(t),
        duxFormEditorInputNumber(t),
        duxFormEditorCascader(t),
        duxFormEditorCascaderAsync(t),
        duxFormEditorCheckbox(t),
        duxFormEditorSelect(t),
        duxFormEditorColor(t),
        duxFormEditorRadio(t),
        duxFormEditorDate(t),
        duxFormEditorDynamicInput(t),
        duxFormEditorRegion(t),
        duxFormEditorSelectAsync(t),
        duxFormEditorSider(t),
        duxFormEditorSwitch(t),
        duxFormEditorTime(t),
        duxFormEditorTreeSelect(t),
        duxFormEditorDynamicTags(t),
        duxFormEditorAIEditor(t),
        duxFormEditorMentionAsync(t),
        duxFormEditorTreeSelectAsync(t),
        duxFormEditorTransferAsync(t),
      ]
    })

    return () => (
      <DuxPageEditor
        {...props}
        groups={groups.value}
        components={components.value}
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
                {t('components.formEditor.common.jsonOut')}
              </NButton>
            </div>
            {props.onSave && (
              <div class="flex-1">
                <NButton type="primary" block onClick={() => props.onSave?.(edit)}>
                  {t('buttons.save')}
                </NButton>
              </div>
            )}
          </div>
        )}

      />
    )
  },
})
