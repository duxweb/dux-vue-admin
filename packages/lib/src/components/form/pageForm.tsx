import { useWindowSize } from '@vueuse/core'
import { NButton, NCard, NForm } from 'naive-ui'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import type { PropType } from 'vue'
import { useTabStore } from '../../stores'
import { DuxPageFull } from '../layout'
import { DuxJsonForm } from './jsonForm'
import { useForm } from './useForm'
import type { JsonFormItemSchema } from './handler'

export const DuxPageForm = defineComponent({
  name: 'DuxPageForm',
  props: {
    model: Object,
    title: String,
    data: Object as PropType<Record<string, any>>,
    schema: Object as PropType<JsonFormItemSchema[]>,
    url: String,
    id: [String, Number],
    invalidate: String,
  },
  setup(props, { slots }) {
    const tab = useTabStore()
    const router = useRouter()

    const { loading, onSubmit, onReset, model } = useForm({
      url: props.url,
      id: props.id,
      invalidate: props.invalidate,
      success: () => {
        if (!props.id && tab.current) {
          tab.delTab(tab.current, v => router.push(v.path || ''))
        }
        else {
          onReset()
        }
      },
    })

    const { width } = useWindowSize()

    return () => (
      <DuxPageFull>
        <NCard title={props.title} segmented contentClass="p-0! flex-1 h-1" class="h-full flex flex-col" headerClass="px-6! py-4!">
          {{
            default: () => (
              <NForm model={model} labelPlacement={width.value > 768 ? 'left' : 'top'} labelWidth={width.value > 768 ? 100 : 0} class="h-full">
                <n-scrollbar>
                  <div class="p-6">
                    {slots.default?.(model)}
                    <DuxJsonForm model={model} data={props.data} schema={props.schema} />
                  </div>
                </n-scrollbar>
              </NForm>
            ),
            action: () => (
              <div class="flex justify-end gap-4">
                <NButton tertiary loading={loading.value} onClick={onReset}>重置</NButton>
                <NButton type="primary" loading={loading.value} onClick={onSubmit}>提交</NButton>
              </div>
            ),
          }}
        </NCard>
      </DuxPageFull>
    )
  },
})
