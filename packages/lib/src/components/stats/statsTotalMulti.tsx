import type { PropType } from 'vue'
import clsx from 'clsx'
import { ceil } from 'lodash-es'
import { NCard } from 'naive-ui'
import { defineComponent } from 'vue'

export const DuxStatsTotalMulti = defineComponent({
  name: 'DuxStatsMulti',
  props: {
    title: String,
    col: {
      type: Number,
      default: 4,
    },
  },
  setup(props, { slots }) {
    return () => (
      <NCard title={props.title} headerClass="!text-base">
        <div class={clsx([
          'grid grid-cols-2 gap-2',
          `md:grid-cols-${ceil(props.col / 2)}`,
          `xl:grid-cols-${props.col}`,
        ])}
        >
          {slots.default?.()}
        </div>
      </NCard>
    )
  },
})

export const DuxStatsTotalMultiItem = defineComponent({
  name: 'DuxStatsTotalMultiItem',
  props: {
    title: String,
    desc: String,
    value: [Number, String] as PropType<number | string>,
    rate: [Number, String] as PropType<number | string>,
    type: {
      type: String as PropType<'up' | 'down'>,
      default: 'up',
    },
  },
  setup(props) {
    return () => (
      <div class="flex flex-col gap-1">
        <div class="text-gray-7">
          {props.title}
        </div>
        <div class="text-2xl font-bold">
          {props.value}
        </div>
        <div class={clsx([
          'flex gap-1 items-center text-sm ',
          props.type === 'up' ? 'text-primary' : 'text-warning',
        ])}
        >
          <div class="text-gray-7">
            {props.desc}
          </div>
          <div>
            {props.rate}
          </div>
          <div class={clsx([
            ' w-3 h-3',
            props.type === 'up' ? 'i-tabler:caret-up-filled' : 'i-tabler:caret-down-filled',
          ])}
          />
        </div>
      </div>
    )
  },
})
