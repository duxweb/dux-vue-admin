import clsx from 'clsx'
import { NButton, NPopover } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import { useThemeStore } from '../../../stores'

export const Color = defineComponent({
  name: 'Color',
  setup() {
    const themeStore = useThemeStore()
    const { color } = storeToRefs(themeStore)

    return () => (
      <NPopover
        trigger="click"
      >
        {{
          default: () => (
            <div class="py-1 flex flex-row gap-3">
              {themeStore.colorList.map((v, k) => (
                <div
                  key={k}
                  class={clsx([
                    `w-5 h-5 bg-[${v}] rounded-full outline-offset-2 outline-1 outline-[${v}] cursor-pointer`,
                    color.value === v ? 'outline' : 'outline-none',
                  ])}
                  onClick={() => {
                    themeStore.toggleColor(v)
                  }}
                >
                </div>
              ))}
            </div>
          ),
          trigger: () => (
            <NButton quaternary circle>
              <div class="h-5 w-5 i-tabler:palette" />
            </NButton>
          ),
        }}
      </NPopover>
    )
  },
})
