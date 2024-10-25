import type { PropType } from 'vue'
import type { PageEditorData } from '../editor/hook'
import clsx from 'clsx'
import { NFormItem, NInputNumber } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { DuxGrid } from '../../layout'
import { DuxWidgetEditorPreview } from '../editor/preview'
import { WidgetEditorSettingCard } from '../editor/setting'

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
  setup({ modelValue }) {
    const { t } = useI18n()

    return () => (
      <div class="">
        <WidgetEditorSettingCard title={t('components.pageEditor.grid.title')} icon="i-tabler:grid-4x4">
          <NFormItem label={t('components.pageEditor.grid.col')} path="col">
            <NInputNumber
              v-model:value={modelValue.col}
            />
          </NFormItem>
          <NFormItem label={t('components.pageEditor.grid.spac')} path="spac">
            <NInputNumber
              v-model:value={modelValue.spac}
            />
          </NFormItem>
        </WidgetEditorSettingCard>
      </div>
    )
  },
})
