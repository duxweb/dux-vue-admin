import type { PropType, Ref, VNode } from 'vue'
import clsx from 'clsx'
import { NFormItem, NTooltip } from 'naive-ui'
import { computed, defineComponent, inject, ref, watch } from 'vue'
import { useValidationContext } from './useValidation'

export const DuxFormItem = defineComponent({
  name: 'DuxFormItem',
  props: {
    field: {
      type: String,
    },
    label: String,
    rules: String,
    tooltip: String,
    desc: [Object, String] as PropType<VNode | string>,
    help: [Object, String] as PropType<VNode | string>,
  },
  extends: NFormItem,
  setup(props, { slots }) {
    const valid = useValidationContext()
    const isError = computed(() => {
      if (!props.field) {
        return false
      }
      return (valid?.validation?.value[props.field]?.errors?.length || 0) > 0
    })

    const layout = inject<Ref<'left' | 'top' | 'config'>>('formLayout', ref('top'))
    const labelWidth = inject<Ref<number | string>>('formLabelWidth', ref(80))
    const labelAlign = inject<Ref<'left' | 'center' | 'right'>>('formLabelAlign', ref('left'))

    watch(() => props.field, () => {
      if (!props.field) {
        return
      }
      valid?.add(props.field)
    }, { immediate: true })

    return () => (
      <div class={clsx([
        'gap-2 w-full text-sm',
        layout?.value === 'left' && 'flex md:flex-row flex-col items-center',
        layout?.value === 'top' && 'flex flex-col',
        layout?.value === 'config' && 'grid grid-cols-1 md:grid-cols-5 items-start',
      ])}
      >
        {props.label && (
          <div class={clsx([
            layout?.value === 'config' && 'md:col-span-1 flex-col',
            layout?.value === 'left' && `md:w-[${labelWidth?.value}px]`,
          ])}
          >
            <div class={clsx([
              'flex gap-2 items-center',
              labelAlign?.value === 'center' && 'justify-center',
              labelAlign?.value === 'right' && 'justify-end',
            ])}
            >
              {props.required && (
                <div class="text-error leading-1 mt-1">
                  *
                </div>
              )}
              <div>{props.label}</div>
              {props.tooltip && (
                <NTooltip>
                  {{
                    default: () => props.tooltip,
                    trigger: () => (
                      <div class="i-tabler:info-circle" />
                    ),
                  }}
                </NTooltip>
              )}
            </div>
            {layout?.value === 'config' && props.desc && (
              <div class="text-gray-6">
                {props.desc}
              </div>
            )}
          </div>
        )}
        <div class={clsx([
          'flex-1 flex flex-col gap-2',
          isError.value ? 'text-error' : '',
        ])}
        >
          <div>
            {slots.default?.()}
          </div>
          {props.field && isError.value && (
            <div class="text-error flex gap-1 items-center">
              <div class="i-tabler:info-circle" />
              {valid?.validation.value[props.field]?.message}
            </div>
          )}
          {props.help && (
            <div class="text-gray-5">
              {props.help}
            </div>
          )}
        </div>
      </div>
    )
  },
})
