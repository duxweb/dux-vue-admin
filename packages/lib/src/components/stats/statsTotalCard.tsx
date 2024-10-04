import type { PropType } from 'vue'
import clsx from 'clsx'
import { ceil } from 'lodash-es'
import { NButton, NCard } from 'naive-ui'
import { defineComponent } from 'vue'

export const DuxStatsTotalCard = defineComponent({
  name: 'DuxStatsTotalCard',
  props: {
    col: {
      type: Number,
      default: 4,
    },
  },
  setup(props, { slots }) {
    return () => (
      <div class={clsx([
        'grid grid-cols-1 gap-4',
        `md:grid-cols-${ceil(props.col / 2)}`,
        `xl:grid-cols-${props.col}`,
      ])}
      >
        {slots.default?.()}
      </div>
    )
  },
})

export const DuxStatsTotalCardItem = defineComponent({
  name: 'DuxStatsTotalCardItem',
  props: {
    title: String,
    desc: String,
    value: [Number, String] as PropType<number | string>,
    rate: [Number, String] as PropType<number | string>,
    type: {
      type: String as PropType<'up' | 'down'>,
      default: 'up',
    },
    icon: String,
    onClick: Function,
  },
  setup(props) {
    return () => (
      <NCard
        segmented={{
          footer: true,
        }}
        footerClass="!py-4 bg-gray-2/50 rounded-b"
      >
        {{
          default: () => (
            <div class="flex gap-2 justify-between">
              <div class="flex flex-col gap-1">
                <div class="text-gray-7">
                  {props.title}
                </div>
                <div class="text-2xl font-bold">
                  {props.value}
                </div>
              </div>
              <div>
                <div class="bg-gray-2 rounded flex items-center justify-center p-2">
                  <div class={clsx([
                    'size-5',
                    props.icon,
                  ])}
                  >
                  </div>
                </div>
              </div>
            </div>
          ),
          footer: () => (
            <div class="flex justify-between">
              <div class="flex gap-1 items-center">
                <div class={clsx([
                  ' w-3 h-3',
                  props.type === 'up' ? 'text-primary' : 'text-warning',
                  props.type === 'up' ? 'i-tabler:arrow-up-right' : 'i-tabler:arrow-down-left',
                ])}
                />
                <div class={props.type === 'up' ? 'text-primary' : 'text-warning'}>
                  {props.rate}
                </div>

                <div class="text-gray-6 ml-2">{props.desc}</div>
              </div>

              {props?.onClick && (
                <div>
                  <NButton text onClick={() => props.onClick?.()}>更多</NButton>
                </div>
              )}
            </div>
          ),
        }}
      </NCard>
    )
  },
})
