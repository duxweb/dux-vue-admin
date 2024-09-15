import clsx from 'clsx'
import { ceil } from 'lodash-es'
import { NTooltip } from 'naive-ui'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export const DuxStatsSimple = defineComponent({
  name: 'DuxStatsSimple',
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

export const DuxStatsSimpleItem = defineComponent({
  name: 'DuxStatsSimpleItem',
  props: {
    title: String,
    desc: String,
    value: Number as PropType<number | string>,
    rate: Number as PropType<number | string>,
    type: {
      type: String as PropType<'up' | 'down'>,
      default: 'up',
    },
  },
  setup(props) {
    return () => (
      <div class="p-4 flex flex-col gap-3 border border-gray-2 rounded bg-gray-1">
        <div class="flex justify-between">
          <div class="flex items-center gap-2">
            <div class="bg-gray-2 rounded flex items-center justify-center p-1">
              <div class="i-tabler:eye size-4"></div>
            </div>
            {props?.title}
          </div>
          <div class="text-gray-7">
            <NTooltip>
              {{
                trigger: () => <div class="i-tabler:info-circle"></div>,
                default: () => props.desc,
              }}
            </NTooltip>
          </div>
        </div>
        <div class="col-span-2 flex flex-col gap-1 justify-end">
          <div class="flex gap-3 items-center">
            <div class="font-bold text-2xl">
              {props.value}
            </div>
            <div class={clsx([
              'flex gap-1 items-center text-sm px-1.5 rounded',
              props.type === 'up' ? 'text-primary' : 'text-warning',
              props.type === 'up' ? 'bg-primary/10' : 'bg-warning/10 ',
            ])}
            >
              {props.rate}
              <div class={clsx([
                ' w-3 h-3',
                props.type === 'up' ? 'i-tabler:arrow-up-right' : 'i-tabler:arrow-down-left',
              ])}
              />
            </div>
          </div>
        </div>

      </div>
    )
  },
})
