import type { PropType } from 'vue'
import { useVModel } from '@vueuse/core'
import clsx from 'clsx'
import { NTooltip } from 'naive-ui'
import { defineComponent } from 'vue'

interface DuxRadioOption {
  label?: string
  value?: string | number | boolean
  icon?: string
  tooltip?: string
}

export const DuxRadio = defineComponent({
  name: 'DuxRadio',
  props: {
    defaultValue: [String, Number, Boolean],
    value: [String, Number, Boolean],
    onUpdateValue: Function,
    options: Array as PropType<DuxRadioOption[]>,
  },
  setup(props, { emit }) {
    const model = useVModel(props, 'value', emit, {
      defaultValue: props.defaultValue,
      passive: true,
    })

    return () => (
      <div class="w-full flex flex-row divide-x divide-gray-2 bg-gray/20 rounded  text-center p-1  h-34px">
        {props.options?.map((item, key) => (
          <div
            key={key}
            class={clsx([
              'flex-1 flex justify-center items-center cursor-pointer gap-1 rounded-sm shadow-sm',
              item.value === model.value && 'bg-gray-1',
            ])}
            onClick={() => {
              props.onUpdateValue?.(item.value)
              model.value = item.value
            }}
          >
            {item.tooltip
              ? (
                  <NTooltip>
                    {{
                      default: () => item.tooltip,
                      trigger: () => (
                        <>
                          {item.icon && (
                            <div class={clsx([
                              'w-4',
                              item.icon,
                            ])}
                            />
                          )}
                          {item.label && (
                            <div>
                              {item.label}
                            </div>
                          )}
                        </>
                      ),
                    }}
                  </NTooltip>
                )
              : (
                  <>
                    {item.icon && (
                      <div class={clsx([
                        'w-4',
                        item.icon,
                      ])}
                      />
                    )}
                    {item.label && (
                      <div>
                        {item.label}
                      </div>
                    )}
                  </>
                )}

          </div>
        ))}
      </div>
    )
  },
})
