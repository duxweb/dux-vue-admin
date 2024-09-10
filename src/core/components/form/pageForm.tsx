import { useWindowSize } from '@vueuse/core'
import { NButton, NCard, NForm } from 'naive-ui'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import type { PropType } from 'vue'
import { useTabStore } from '../../stores'
import { DuxException } from '../layout/exception'
import { DuxJsonForm } from './jsonForm'
import { useForm } from './useForm'
import type { JsonFormItemSchema } from './handler'

export const DuxPageForm = defineComponent({
  name: 'DuxPageForm',
  props: {
    title: String,
    data: Object as PropType<Record<string, any>>,
    schema: Object as PropType<JsonFormItemSchema[]>,
    url: String,
    id: [String, Number],
    invalidate: String,
  },
  setup({ title, data, schema, invalidate, url, id }) {
    const tab = useTabStore()
    const router = useRouter()

    const { loading, model, onSubmit, onReset } = useForm({
      url,
      id,
      invalidate,
      success: () => {
        if (id) {
          tab.delTab(tab.current, v => router.push(v.path || ''))
        }
        else {
          onReset()
        }
      },
    })

    const { width } = useWindowSize()

    return () => (
      <DuxException>
        <NCard title={title} segmented contentClass="p-0! flex-1 h-1" class="h-full flex flex-col" headerClass="px-6! py-4!">
          {{
            default: () => (
              <NForm model={model} labelPlacement={width.value > 768 ? 'left' : 'top'} labelWidth={width.value > 768 ? 100 : 0} class="h-full">
                <n-scrollbar>
                  <div class="p-6">
                    <DuxJsonForm model={model} data={data} schema={schema} />
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
      </DuxException>
    )
  },
})
