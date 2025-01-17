import type { AsyncComponentLoader, PropType } from 'vue'
import { useVModel } from '@vueuse/core'
import { NButton, NCard } from 'naive-ui'
import { computed, defineAsyncComponent, defineComponent, ref, Transition } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useTabStore } from '../../stores'
import { DuxFullPage } from '../page'
import { DuxStep } from '../step/step'
import { DuxForm } from './form'
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
    invalidate: [String, Array] as PropType<string | string[]>,
    model: Object as PropType<Record<string, any>>,
    steps: {
      type: Array as PropType<DuxStepFormItem[]>,
      default: [],
    },
  },
  extends: DuxForm,
  setup(props, { emit }) {
    const tab = useTabStore()
    const router = useRouter()

    const modelData = useVModel(props, 'model', emit, {
      passive: true,
      defaultValue: {},
    })

    const { loading, model, onSubmit, onReset } = useForm({
      url: props.url,
      id: props.id,
      invalidate: props.invalidate,
      model: modelData,
      success: () => {
        if (!props.id && tab.current) {
          tab.delTab(tab.current, v => router.push(v.url || ''))
        }
        else {
          onReset()
        }
      },
    })

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

    const { t } = useI18n()

    return () => (
      <DuxFullPage>
        <NCard segmented contentClass="p-0! flex-1 h-1" class="h-full flex flex-col" headerClass="px-6! py-4!">
          {{
            header: () => (
              <DuxStep current={step.value} options={props.steps} />
            ),
            default: () => (
              <div class="h-full">
                <n-scrollbar>
                  <DuxForm {...props}>
                    <div class="p-6">
                      <Transition name="fade" mode="out-in" appear>
                        <dynamicComponent.value model={model} />
                      </Transition>
                    </div>
                  </DuxForm>
                </n-scrollbar>
              </div>
            ),
            action: () => (
              <div class="flex justify-end gap-4">
                {!isFirst.value && (
                  <NButton tertiary loading={loading.value} onClick={onPrev}>
                    {t('buttons.prev')}
                  </NButton>
                )}
                {!isLast.value && (
                  <NButton type="primary" loading={loading.value} onClick={onNext}>
                    {t('buttons.next')}
                  </NButton>
                )}
                {isLast.value && (
                  <NButton type="primary" loading={loading.value} onClick={onSubmit}>
                    {t('buttons.submit')}
                  </NButton>
                )}
              </div>
            ),
          }}
        </NCard>
      </DuxFullPage>
    )
  },
})
