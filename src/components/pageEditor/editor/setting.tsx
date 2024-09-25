import { computed, defineComponent, inject } from 'vue'
import type { UseEditorResult } from './hook'

export const WidgetEditorSetting = defineComponent({
  name: 'WidgetEditorSetting',
  props: {
  },
  setup() {
    const editor = inject<UseEditorResult>('editor.use')

    const curData = computed(() => {
      return editor?.getData(editor.selected.value)
    })
    const curComponent = computed(() => {
      return editor?.components.value?.find(item => item.name === curData.value?.name)
    })

    return () => (
      <div class="flex-none px-2 bg-gray-1 rounded-sm p-2 shadow-sm max-w-full w-220px overflow-y-auto" key={curData.value?.key}>
        {curComponent.value?.setting?.({
          'value': curData.value?.options,
          'update:modelValue': (v) => {
            if (!curData?.value) {
              return
            }
            curData.value.options = v
          },
        })
        || editor?.settingPage?.component?.({
          'value': editor.value.value.config,
          'update:modelValue': (v) => {
            editor.value.value.config = v
          },
        })}
      </div>
    )
  },
})

export const WidgetEditorSettingCard = defineComponent({
  name: 'WidgetEditorSettingCard',
  props: {
    title: String,
    icon: String,
  },
  setup(props, { slots }) {
    return () => (
      <div class="flex flex-col">
        <div class="bg-gray-2 rounded py-2 px-4 flex justify-center items-center gap-2">
          <div>{props.title}</div>
        </div>
        <div class="py-2">
          {slots.default?.()}
        </div>
      </div>
    )
  },
})
