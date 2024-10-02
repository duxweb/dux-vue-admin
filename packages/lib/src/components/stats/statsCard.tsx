import clsx from 'clsx'
import { NCard } from 'naive-ui'
import { defineComponent } from 'vue'

export const DuxStatsCard = defineComponent({
  name: 'DuxStatsCard',
  props: {
    title: String,
    headClass: String,
    contentClass: String,
  },
  setup(props, { slots }) {
    return () => (
      <NCard
        segmented={{ content: true }}
        headerClass={clsx([
          props.headClass || '!py-4',
        ])}
        contentClass={props.contentClass}
      >
        {{
          header: () => (
            <div class="flex items-center gap-2">
              <div class="text-base">
                {props.title}
              </div>
              <div class="flex-1 font-normal">
                {slots.tools?.()}
              </div>
              <div class="font-normal text-sm">
                {slots.extend?.()}
              </div>
            </div>
          ),
          default: () => slots.default?.(),
        }}
      </NCard>

    )
  },
})
