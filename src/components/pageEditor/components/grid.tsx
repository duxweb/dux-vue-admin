import clsx from 'clsx'
import { NFormItem, NInputNumber } from 'naive-ui'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { DuxGrid } from '../../layout'
import { DuxWidgetEditorPreview } from '../editor/preview'
import { WidgetEditorSettingCard } from '../editor/setting'
import type { PageEditorData } from '../editor/hook'

export const WidgetEditorGrid = defineComponent({
  name: 'WidgetEditorGrid',
  props: {
    options: Object,
    children: {
      type: Array as PropType<PageEditorData[]>,
      default: [],
    },
    onChildren: Function,
  },
  setup(props) {
    return () => (
      <DuxGrid cols={props.options?.col} spac={props.options?.spac}>

        {[...Array.from({ length: props?.options?.col || 2 })].map((_v, i) => (
          <div class={clsx([
            (!props.children[i] || Object.keys(props.children[i]).length === 0) ? 'rounded border border-dashed border-gray-6' : '',

          ])}
          >
            <DuxWidgetEditorPreview
              modelValue={(props.children[i]) as any}
              onUpdate={(v) => {
                props.children[i] = v
                props.onChildren?.(props.children)
                // nextTick()
              }}
            />
          </div>
        ))}

      </DuxGrid>
    )
  },
})

export const WidgetEditorGridSetting = defineComponent({
  name: 'WidgetEditorGridSetting',
  props: {
    modelValue: {
      type: Object,
      default: {},
    },
  },
  setup({ modelValue }, { emit }) {
    return () => (
      <div class="">
        <WidgetEditorSettingCard title="布局配置" icon="i-tabler:grid-4x4">
          <NFormItem label="网格数" path="col">
            <NInputNumber
              value={modelValue.col}
              onUpdateValue={(v) => {
                modelValue.col = v
                emit('update:modelValue', v)
              }}
            />
          </NFormItem>
          <NFormItem label="间隔值" path="spac">
            <NInputNumber
              value={modelValue.spac}
              onUpdateValue={(v) => {
                modelValue.spac = v
                emit('update:modelValue', v)
              }}
            />
          </NFormItem>
        </WidgetEditorSettingCard>
      </div>
    )
  },
})
