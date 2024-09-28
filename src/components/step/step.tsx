import clsx from 'clsx'
import { defineComponent } from 'vue'

export interface DuxStepOption {
  title: string
  icon?: string
}

export const DuxStep = defineComponent({
  name: 'DuxStep',
  props: {
    current: {
      type: Number,
      default: 0,

    },
    options: Array<DuxStepOption>,
  },
  setup(props) {
    return () => (
      <div class="pb-8">
        <div class="relative">
          <ol class="grid grid-cols-3 text-sm font-medium text-gray-500">
            {props.options?.map((item, index) => (
              <li
                key={index}
                class={clsx([
                  'relative flex justify-start z-1',
                  index === 0 ? 'justify-start' : index + 1 === props.options?.length ? 'justify-end' : 'justify-center',
                  index <= props.current && 'text-primary',
                ])}
              >
                <span class={clsx([
                  'absolute -bottom-[1.75rem]  rounded-full text-gray-1',
                  index === 0 ? 'start-0' : index + 1 === props.options?.length ? 'end-0' : 'left-1/2 -translate-x-1/2 ',
                  index <= props.current ? 'bg-primary' : 'bg-gray-6',
                ])}
                >
                  <svg
                    class="size-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>

                {item.title}

              </li>
            ))}
          </ol>
          <div class="absolute mt-4 block h-1 w-full rounded-lg bg-gray-3 z-0"></div>
        </div>
      </div>
    )
  },
})
