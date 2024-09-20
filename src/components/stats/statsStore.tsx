import clsx from 'clsx'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export const DuxStatsStore = defineComponent({
  name: 'DuxStatsStore',
  props: {
    title: String,
    col: {
      type: Number,
      default: 4,
    },
    onClick: Function,
  },
  setup(props, { slots }) {
    return () => (
      <div class="bg-primary rounded p-4">
        <div class="mb-2 text-white flex justify-between items-center">
          <div>{props.title}</div>
          <div>
            {props.onClick && <div onClick={() => props.onClick?.()} class="i-tabler:settings size-4 cursor-pointer"></div>}
          </div>
        </div>
        <div class={clsx([
          'bg-gray-1 rounded grid gap-y-2 py-2',
          `grid-cols-${props.col}`,
        ])}
        >
          {slots.default?.()}
        </div>
      </div>
    )
  },
})

export const DuxStatsStoreItem = defineComponent({
  name: 'DuxStatsStoreItem',
  props: {
    label: String,
    value: String as PropType<number | string>,
  },
  setup(props, { slots }) {
    return () => (
      <div class="flex flex-col items-center">
        <div class="text-gray-7 text-sm">
          {props.label}
        </div>
        <div>
          {slots.default?.()}
        </div>
      </div>
    )
  },
})
