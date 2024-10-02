import clsx from 'clsx'
import { defineComponent } from 'vue'

export const DuxCardHeader = defineComponent({
  name: 'DuxCardHeader',
  props: {
    title: String,
    desc: String,
    icon: String,
    iconColor: String,
  },
  setup(props, { slots }) {
    return () => (
      <div class="flex gap-2 bg-gray-1 rounded shadow-sm p-4 gap-2 items-center justify-between">
        <div class="flex gap-2 items-center">
          <div>
            <div class={clsx([
              'p-2 rounded text-white',
              `bg-${props.iconColor}`,
            ])}
            >
              <div class={clsx([
                'size-6',
                props.icon,
              ])}
              />
            </div>
          </div>
          <div class="flex flex-col">
            <div class="text-lg">
              {props.title}
            </div>
            <div class="text-sm text-gray-7">
              {props.desc}
            </div>
          </div>
        </div>

        <div class="flex gap-2">
          {slots.default?.()}
        </div>
      </div>
    )
  },
})
