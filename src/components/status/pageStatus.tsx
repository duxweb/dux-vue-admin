import { NCard } from 'naive-ui'
import { defineComponent } from 'vue'

export const DuxPageStatus = defineComponent({
  name: 'DuxPageStatus',
  props: {
    title: String,
    desc: String,
  },
  setup(props, { slots }) {
    return () => (
      <NCard class="h-full  min-h-400px" content-class="h-full w-full flex-1 flex items-center justify-center">
        <div class="flex flex-col gap-6 justify-center items-center py-10">
          <div class="w-50">
            {slots.default?.()}
          </div>
          <div class="flex flex-col items-center justify-center gap-2">
            <div class="text-lg font-bold">
              { props?.title }
            </div>
            <div class="opacity-50">
              { props?.desc }
            </div>
          </div>
          <div class="flex justify-center items-center gap-4">
            {slots.action?.()}
          </div>
        </div>
      </NCard>
    )
  },
})
