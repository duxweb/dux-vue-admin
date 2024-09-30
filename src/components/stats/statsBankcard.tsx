import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export interface DuxStatsBankcardInfo {
  type: string
  title: string
  name: string
  no: string
}

export const DuxStatsBankcard = defineComponent({
  name: 'DuxStatsBankcard',
  props: {
    info: Object as PropType<DuxStatsBankcardInfo>,
  },
  setup({ info }) {
    return () => (
      <div class="w-75 h-40 relative">
        <div class="absolute flex items-center">
          <div class="relative w-70 h-40 p-4 bg-primary rounded-lg flex flex-col gap-4 justify-between text-white text-opacity-90 z-1 text-sm overflow-hidden">
            <div class="flex justify-between items-center">
              <h2 class="">{info?.type}</h2>
              <p class="">{info?.title}</p>
            </div>
            <div class="flex flex-col gap-1">
              <div class="opacity-60">{info?.name}</div>
              <div>{info?.no}</div>
            </div>
            <div class="absolute -right-6 -bottom-8">
              <div class="i-tabler:credit-card-filled size-30 opacity-20">
              </div>
            </div>
          </div>
          <div class="w-60 h-30 bg-primary-2 rounded-lg absolute ml-15"></div>
          <div class="w-65 h-35 bg-primary-4 rounded-lg absolute ml-8"></div>
        </div>
      </div>
    )
  },
})
