import type { PropType, VNode } from 'vue'
import type { PageEditorComponent, PageEditorGroup, PageEditorSettingPage, UseEditorResult, UseEditorValue } from './editor/hook'
import { useVModel } from '@vueuse/core'
import clsx from 'clsx'
import { cloneDeep } from 'lodash-es'
import { NScrollbar } from 'naive-ui'
import ShortUniqueId from 'short-unique-id'
import { defineComponent, provide, ref, watch } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useI18n } from 'vue-i18n'
import { WidgetEditorGrid, WidgetEditorGridSetting } from './components/grid'
import { useEditor } from './editor/hook'
import { DuxWidgetEditorPreview } from './editor/preview'
import { WidgetEditorSetting } from './editor/setting'

export const DuxPageEditor = defineComponent({
  name: 'DuxPageEditor',
  props: {
    value: Object as PropType<UseEditorValue | undefined>,
    groups: Array as PropType<PageEditorGroup[]>,
    components: Array as PropType<PageEditorComponent[]>,
    settingPage: Object as PropType<PageEditorSettingPage>,
    actionRender: Function as PropType<(editor?: UseEditorResult) => VNode>,
  },
  setup(props, { emit }) {
    const editor = useEditor({ settingPage: props.settingPage })
    const { t } = useI18n()
    provide('editor.use', editor)

    // 注册分组与组件
    watch([() => props.components, () => props.groups], () => {
      editor.clearGroup()
      editor.clearComponent()

      // 注册默认分组
      editor.addGroup({
        name: 'layout',
        label: t('components.pageEditor.group.layout'),
        icon: 'i-tabler:layout',
      })

      props.groups?.forEach((group) => {
        editor.addGroup(group)
      })

      editor.addComponent({
        name: 'grid',
        icon: 'i-tabler:grid-4x4',
        label: t('components.pageEditor.grid.name'),
        group: 'layout',
        nested: true,
        component: props => <WidgetEditorGrid {...props} />,
        setting: props => <WidgetEditorGridSetting {...props} />,
        settingDefault: {
          col: 2,
          spac: 2,
        },
      })

      props.components?.forEach((component) => {
        editor.addComponent(component)
      })
    }, { immediate: true, deep: true })

    // 选中分组
    const groupSelect = ref<string>()

    // 复制组件
    const { randomUUID } = new ShortUniqueId({ length: 10 })
    const compDragClone = (element) => {
      return {
        key: randomUUID(),
        name: element.name,
        options: cloneDeep(element.settingDefault),
      } as any
    }

    const model = useVModel(props, 'value', emit, {
      passive: true,
    })

    watch(model, () => {
      editor.value.value = model.value || {
        config: {},
        data: [],
      }
    }, { deep: true, immediate: true })

    return () => (
      <div class="flex-1 h-1 px-2 flex flex-row pb-2 text-sm">
        <div class="flex-none flex flex-col gap-2 bg-gray-1/50 rounded-sm p-2 shadow-sm">
          <MainMenuItem
            title={t('components.pageEditor.group.all')}
            icon="i-tabler:hexagons"
            active={!groupSelect.value}
            onClick={() => {
              groupSelect.value = undefined
            }}
          />
          {editor.group.value?.map((item, key) => (
            <MainMenuItem
              key={key}
              active={groupSelect.value === item.name}
              title={item.label}
              icon={item.icon}
              onClick={() => {
                groupSelect.value = item.name
              }}
            />
          ))}
        </div>
        <div class="flex-none bg-gray-1 rounded-sm text-xs shadow-sm w-180px" id="comp-list">
          <NScrollbar>
            <div class="flex flex-col gap-4 p-2">
              {editor.tree.value?.filter((group) => {
                if (groupSelect.value) {
                  return group.name === groupSelect.value
                }
                return true
              }).map(group => (
                <div key={group.name} class="flex flex-col gap-2">
                  <div class="bg-gray/10 border border-gray/15 rounded p-2 flex justify-center">
                    {group.label}
                  </div>
                  <VueDraggable
                    modelValue={group.children || []}
                    animation={150}
                    group={
                      {
                        name: 'widget',
                        pull: 'clone',
                        put: false,
                      }
                    }
                    sort={false}
                    clone={compDragClone}
                    class="grid grid-cols-2 items-start gap-2 "
                  >
                    {group.children?.map(item => (
                      <div key={item.name} class="border border-gray-2 rounded-sm p-2 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-2  edit-drag">
                        <div class={clsx([
                          'size-6',
                          item.icon,
                        ])}
                        >
                        </div>
                        <div class="truncate whitespace-nowrap px-2 overflow-hidden">{item.label}</div>
                      </div>
                    ))}
                  </VueDraggable>
                </div>
              ))}
            </div>
          </NScrollbar>
        </div>
        <div
          class="flex-1 bg-gray-1 mx-2 shadow-sm flex flex-col items-center p-6 overflow-auto"
          style={{
            backgroundImage: 'linear-gradient(rgba(var(--n-gray-color-1)) 14px,transparent 0),linear-gradient(90deg,transparent 14px, rgba(var(--n-gray-color-8)) 0)',
            backgroundSize: '15px 15px, 15px 15px',
          }}
        >

          <div
            class="max-w-2xl w-full flex-1 bg-gray-1 shadow p-2"
            onClick={() => {
              editor.selected.value = undefined
            }}
          >
            <DuxWidgetEditorPreview modelValue={editor.value.value?.data} onUpdate={v => editor.value.value.data = v} />
          </div>
        </div>
        <WidgetEditorSetting actionRender={props.actionRender} />

      </div>
    )
  },
})

interface MainMenuItemProps {
  title: string
  icon: string
  onClick?: () => void
  active?: boolean
}

function MainMenuItem({ title, icon, active, onClick }: MainMenuItemProps) {
  return (
    <div
      class={clsx([
        'flex flex-col gap-1 items-center px-2 py-2 hover:bg-primary/10 cursor-pointer rounded-sm min-w-70px',
        active ? 'bg-primary/10' : '',
      ])}
      onClick={onClick}
    >
      <div class={clsx([
        'size-4',
        icon,
      ])}
      >
      </div>
      <div class="truncate whitespace-nowrap">{title}</div>
    </div>
  )
}
