import { NButton, NCard } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ButtonProps } from 'naive-ui'

export interface DuxStatsAccountOption {
  label: string
  type: ButtonProps['type']
  onClick: () => void
}

export const DuxStatsAccount = defineComponent({
  name: 'DuxStatsAccount',
  props: {
    title: String,
    desc: String,
    value: Number,
    local: String,
    options: Array<DuxStatsAccountOption>,
  },
  setup(props) {
    const i18n = useI18n()

    return () => (
      <NCard title={props.title} headerClass="!text-base">
        <div class="flex flex-col gap-4">
          <div class="flex gap-2 items-center">
            <div class="text-2xl">
              {i18n.n(props.value || 0, 'currency', props.local || i18n.locale.value)}
            </div>
            <div class="text-gray-6 text-sm mt-1">{props.desc}</div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            {props.options?.map(option => (
              <NButton secondary type={option.type} onClick={option.onClick}>
                {option.label}
              </NButton>
            ))}
          </div>
        </div>
      </NCard>
    )
  },
})
