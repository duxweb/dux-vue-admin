import clsx from 'clsx'
import { ceil } from 'lodash-es'
import { NCard } from 'naive-ui'
import { defineComponent } from 'vue'

export interface DuxStatsTodoItemProps {
  title: string
  value: string | number
  data: Array<DuxStatsTodoDataProps>
}

export interface DuxStatsTodoDataProps {
  title: string
  value: string | number
}

export const DuxStatsTodoItem = defineComponent({
  name: 'DuxStatsTodoItem',
  props: {
    title: String,
    value: [String, Number],
    data: Array<DuxStatsTodoDataProps>,
  },
  setup(props) {
    return () => (
      <div class="flex flex-col gap-1">
        <div class="text-base">
          {props.title}
        </div>
        <div class="text-2xl font-bold">
          {props.value || '0'}
        </div>
        <div class="flex flex-col gap-1">
          {props.data?.map((item, key) => (
            <div class="flex gap-2" key={key}>
              <div class="text-gray-7 w-18">
                {item.title}
              </div>
              <div class="text-primary">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
})

export const DuxStatsTodo = defineComponent({
  name: 'DuxStatsTodo',
  props: {
    title: String,
    desc: String,
    value: [String, Number],
    data: Array<DuxStatsTodoItemProps>,
    col: {
      type: Number,
      default: 4,
    },
  },
  setup(props, { slots }) {
    return () => (
      <NCard>
        <div class={clsx([
          'grid grid-cols-2 gap-2 gap-2',
          `md:grid-cols-${ceil(props.col / 2)}`,
          `xl:grid-cols-${props.col}`,
        ])}
        >
          {props.data?.map((item, key) => (
            <DuxStatsTodoItem
              title={item?.title}
              value={item?.value || '0'}
              data={item?.data}
              key={key}
            />
          ))}
          {slots.default?.()}
        </div>
      </NCard>
    )
  },
})
