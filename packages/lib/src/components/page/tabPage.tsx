import { useVModel } from '@vueuse/core'
import clsx from 'clsx'
import { NCard, NScrollbar } from 'naive-ui'
import { defineComponent, provide } from 'vue'
import { DuxFullPage } from './fullPage'

export const DuxTabPage = defineComponent({
  name: 'DuxTabPage',
  props: {
    value: String,
    defaultValue: String,
  },
  setup(props, { slots, emit }) {
    const value = useVModel(props, 'value', emit, {
      passive: true,
      defaultValue: props.defaultValue || '0',
    })
    provide('value', value)

    return () => (
      <DuxFullPage>
        <NCard
          class="h-full"
          contentClass="p-0! h-1"
        >
          <div class="h-full flex">
            <div class="flex-none bg-gray-2/30 w-30 lg:w-50 border-r border-gray-2 py-2 transition-all flex flex-col">
              {slots?.header?.()}
              <div class="flex-1 min-h-1">
                <NScrollbar>
                  <div class="flex flex-col gap-1 p-2">
                    { slots?.default?.()?.map((item, key) => (
                      <div
                        key={key}
                        class={clsx([
                          'px-4 py-2  cursor-pointer flex gap-2 rounded  items-center',
                          item.props?.value === value.value ? 'bg-primary/10 text-primary' : 'border-transparent',
                        ])}
                        onClick={() => {
                          value.value = item.props?.value
                        }}
                      >
                        {item.props?.icon && <div class={item.props.icon}></div>}
                        {item.props?.label}
                      </div>
                    ))}
                  </div>
                </NScrollbar>
              </div>
            </div>
            <div class="flex-1 min-w-0 flex flex-col mx-4">
              <div class="text-lg font-bold border-b border-gray-2 p-4 flex-none">{slots?.default?.()?.find(v => v.props?.value === value.value)?.props?.label}</div>
              {slots.default?.()}
            </div>
          </div>
        </NCard>
      </DuxFullPage>
    )
  },
})
