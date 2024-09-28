import { useWindowSize } from '@vueuse/core'
import { NButton, NCard, NForm } from 'naive-ui'
import { computed, defineAsyncComponent, defineComponent, ref, Transition } from 'vue'
import { useRouter } from 'vue-router'
import type { AsyncComponentLoader, PropType } from 'vue'
import { useTabStore } from '../../stores'
import { DuxPageFull } from '../layout'
import { DuxStep } from '../step'
import { useForm } from './useForm'

export interface DuxStepFormItem {
  title: string
  icon?: string
  component: AsyncComponentLoader
}

export const DuxStepForm = defineComponent({
  name: 'DuxStepForm',
  props: {
    title: String,
    url: String,
    id: [String, Number],
    invalidate: String,
    steps: {
      type: Array as PropType<DuxStepFormItem[]>,
      default: [],
    },
  },
  setup(props) {
    const tab = useTabStore()
    const router = useRouter()

    const { loading, model, onSubmit, onReset } = useForm({
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

    const step = ref(0)

    const dynamicComponent = computed(() => {
      return defineAsyncComponent(props.steps[step.value].component)
    })

    const onNext = () => {
      step.value = Math.min(step.value + 1, props.steps.length - 1)
    }

    const onPrev = () => {
      step.value = Math.max(step.value - 1, 0)
    }

    const isLast = computed(() => {
      return step.value === props.steps.length - 1
    })

    const isFirst = computed(() => {
      return step.value === 0
    })

    return () => (
      <DuxPageFull>
        <NCard segmented contentClass="p-0! flex-1 h-1" class="h-full flex flex-col" headerClass="px-6! py-4!">
          {{
            header: () => (
              <DuxStep current={step.value} options={props.steps} />
            ),
            default: () => (
              <NForm model={model} labelPlacement={width.value > 768 ? 'left' : 'top'} labelWidth={width.value > 768 ? 100 : 0} class="h-full">
                <n-scrollbar>
                  <div class="p-6">
                    <Transition name="fade" mode="out-in" appear>
                      <dynamicComponent.value model={model} />
                    </Transition>
                  </div>
                </n-scrollbar>
              </NForm>
            ),
            action: () => (
              <div class="flex justify-end gap-4">
                {!isFirst.value && <NButton tertiary loading={loading.value} onClick={onPrev}>上一步</NButton>}
                {!isLast.value && <NButton type="primary" loading={loading.value} onClick={onNext}>下一步</NButton>}
                {isLast.value && <NButton type="primary" loading={loading.value} onClick={onSubmit}>提交</NButton>}
              </div>
            ),
          }}
        </NCard>
      </DuxPageFull>
    )
  },
})
