import type { ButtonProps } from 'naive-ui'
import type { PropType } from 'vue'
import clsx from 'clsx'
import { ceil } from 'lodash-es'
import { NCard, NTabPane, NTabs } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export const DuxStatsTotalTab = defineComponent({
  name: 'DuxStatsTab',
  props: {
    col: {
      type: Number,
      default: 4,
    },
  },
  setup(props, { slots }) {
    return () => (
      <div class={clsx([
        'grid grid-cols-2 gap-2',
        `xl:grid-cols-${ceil(props.col / 2)}`,
        `3xl:grid-cols-${props.col}`,
      ])}
      >
        {slots.default?.()}
      </div>
    )
  },
})

interface DuxStatsTotalTabDataProps {
  label: string
  title: string
  value?: string | number
  type?: 'up' | 'down'
  rate?: string | number
  hidden?: boolean
}

export const DuxStatsTotalTabItem = defineComponent({
  name: 'DuxStatsTabItem',
  props: {
    title: String,
    icon: String,
    unit: String,
    color: String as PropType<ButtonProps['type']>,
    data: Array<DuxStatsTotalTabDataProps>,
  },
  setup(props) {
    const tab = ref(0)

    return () => (
      <NCard
        segmented={{
          footer: true,
        }}
        contentClass="!pb-2"
        footerClass="!py-4 rounded-b"
      >
        {{
          default: () => (
            <div class="flex flex-col gap-4">
              <div class="flex justify-between items-center gap-2">
                <div class={clsx([
                  'flex items-center justify-center p-1 text-white rounded',
                  'bg-primary',
                ])}
                >
                  <div class={clsx([
                    'size-4',
                    props.icon,
                  ])}
                  >
                  </div>
                </div>
                <div class="font-medium flex-1">{props?.title}</div>
                <div>
                  <NTabs value={tab.value} onUpdateValue={v => tab.value = v} type="segment" animated size="small" paneClass="!p-0" tabClass="!px-2">
                    {props.data?.map((item, key) => (
                      <NTabPane name={key} tab={item.label}>
                      </NTabPane>
                    ))}
                  </NTabs>
                </div>
              </div>
              <div class="flex gap-2 items-end">
                <div class="text-3xl font-bold ">{props.data?.[tab.value].value || '0'}</div>
                <div class="text-gray-7 mb-0.5">{props.unit}</div>
              </div>
            </div>
          ),
          footer: () => (
            <div class="flex justify-between">
              {props.data?.map((item, key) => {
                if (item.hidden) {
                  return null
                }

                return (
                  <div class="flex gap-1 items-center" key={key}>
                    <div class="text-gray-6">{item.title}</div>
                    <div class={clsx([
                      ' w-3 h-3',
                      item.type === 'up' ? 'text-primary' : 'text-warning',
                      item.type === 'up' ? 'i-tabler:arrow-up-right' : 'i-tabler:arrow-down-left',
                    ])}
                    />
                    <div class={item.type === 'up' ? 'text-primary' : 'text-warning'}>
                      {item.rate}
                    </div>
                  </div>
                )
              })}

            </div>
          ),
        }}
      </NCard>
    )
  },
})
