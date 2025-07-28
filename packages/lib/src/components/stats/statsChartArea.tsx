import type { EChartsOption } from 'echarts'
import type { PropType } from 'vue'
import clsx from 'clsx'
import {
  add,
} from 'mathjs'
import { NCard } from 'naive-ui'
import { computed, defineComponent, ref, watch } from 'vue'
import VChart from 'vue-echarts'
import { useThemeStore } from '../../stores'

export interface DuxStatsChartAreaData {
  title: string
  value?: string | number
  icon?: string
}

export const DuxStatsChartArea = defineComponent({
  name: 'DuxStatsChartArea',
  props: {
    title: String,
    labels: Array as PropType<Array<string>>,
    data: Array as PropType<Array<DuxStatsChartAreaData>>,
    ringLabel: String,
    type: {
      type: String as PropType<'pie' | 'ring' | 'rose' | 'funnel'>,
      default: 'pie',
    },
    col: {
      type: Number,
      default: 4,
    },
  },
  setup(props, { slots }) {
    const data = computed(() => {
      return props.data?.map?.((item) => {
        return {
          name: item.title,
          value: item.value,
        }
      }) as Array<Record<string, any>>
    })

    const themeStore = useThemeStore()

    const legendData = ref<Array<Record<string, any>>>([])

    watch(() => props.data, () => {
      legendData.value = props.data?.map?.((item) => {
        return {
          ...item,
          status: true,
        }
      }) as Array<Record<string, any>>
    }, { immediate: true })

    const option = computed(() => {
      const selected = legendData.value?.reduce((accumulator, current) => {
        accumulator[current.title] = current.status
        return accumulator
      }, {})

      const padding = props.type === 'funnel' ? '10%' : '0'

      return {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          show: false,
          selected,
        },
        graphic: props.type === 'ring'
          ? [
              {
                type: 'text',
                left: 'center',
                top: '40%',
                style: {
                  text: props.ringLabel || 'Total',
                  textAlign: 'center',
                  fill: 'rgba(var(--n-gray-color-7))',
                  fontSize: 14,
                },
              },
              {
                type: 'text',
                left: 'center',
                top: '50%',
                style: {
                  text: legendData.value?.reduce((accumulator, current) => {
                    return add(accumulator, Number(current.value))
                  }, 0) || '0',
                  textAlign: 'center',
                  fill: 'rgba(var(--n-gray-color-10))',
                  fontSize: 16,
                },
              },
            ]
          : [],
        series: {
          type: props.type === 'funnel' ? 'funnel' : 'pie',
          radius: (props.type === 'pie' || props.type === 'funnel' || props.type === 'rose') ? '90%' : ['50%', '90%'],
          roseType: props.type === 'rose' ? 'area' : false,
          top: padding,
          left: padding,
          right: padding,
          bottom: padding,
          label: {
            show: false,
          },
          data: data.value,
        },
        grid: {
          left: '10',
          right: '10',
          top: '10',
          bottom: '10',
          containLabel: true,
        },
      } as EChartsOption
    })

    return () => (
      <NCard
        headerClass="!text-base"
      >
        {{
          header: () => (
            <div class="flex gap-2 items-center justify-between">
              <div class="flex-none">{props.title}</div>
              <div class="flex-none">
                {slots?.extra?.()}
              </div>
            </div>
          ),
          default: () => (
            <>
              <div class="h-50 grid grid-cols-2 gap-4 items-center">
                <VChart
                  class="h-full w-full"
                  autoresize
                  
                  option={option.value}
                  theme="default"
                  initOptions={{
                    renderer: 'svg',
                  }}
                />
                <div class="flex flex-col gap-2">

                  {legendData.value?.map((item, key) => (
                    <div
                      class={clsx([
                        'flex felx-row items-center gap-2 whitespace-nowrap cursor-pointer',
                        item.status ? '' : 'opacity-50',
                      ])}
                      key={key}
                      onClick={() => {
                        const v = { ...item, status: !item.status }
                        legendData.value[key] = v
                      }}
                    >
                      <div
                        class="size-4 rounded"
                        style={{
                          backgroundColor: themeStore.echartColors[key],
                        }}
                      >
                      </div>
                      <div class="flex-1">{item.title}</div>
                      <div class="flex-1 ">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ),
        }}

      </NCard>
    )
  },
})
