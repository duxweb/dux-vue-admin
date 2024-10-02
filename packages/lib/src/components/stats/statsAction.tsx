import clsx from 'clsx'
import { defineComponent } from 'vue'

export const DuxStatsAction = defineComponent({
  name: 'DuxStatsAction',
  props: {
    title: String,
    icon: String,
    value: [String, Number],
  },
  setup(props, { slots }) {
    return () => (
      <div class="flex flex-col p-4 gap-2 bg-gray-1 rounded shadow-sm relative overflow-hidden">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <div class="text-gray-7">
              {props.title}
            </div>
          </div>
          <div class="flex gap-2">
            {slots.default?.()}
          </div>
        </div>
        <div class="text-2xl font-medium">
          {props.value}
        </div>

        <div class={clsx([
          'size-26 text-gray-7/13 absolute -bottom-7 -right-7 pointer-events-none',
          props.icon,
        ])}
        />
      </div>
    )
  },
})
