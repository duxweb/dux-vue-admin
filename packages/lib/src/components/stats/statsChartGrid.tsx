import clsx from 'clsx'
import { ceil } from 'lodash-es'
import { NCard } from 'naive-ui'
import { computed, defineComponent, ref, watch } from 'vue'
import VChart from 'vue-echarts'
import type { EChartsOption } from 'echarts'
import type { PropType } from 'vue'
import { useThemeStore } from '../../stores'

export interface DuxStatsChartGridData {
  title: string
  stack?: string
  data?: Array<any>
  icon?: string
}

export const DuxStatsChartGrid = defineComponent({
  name: 'DuxStatsChartGrid',
  props: {
    title: String,
    labels: Array as PropType<Array<string>>,
    data: Array as PropType<Array<DuxStatsChartGridData>>,
    type: {
      type: String as PropType<'line' | 'bar'>,
      default: 'bar',
    },
    col: {
      type: Number,
      default: 4,
    },
    legend: {
      type: String as PropType<'default' | 'small'>,
      default: 'default',
    },
  },
  setup(props, { slots }) {
    const data = props.data?.map?.((item) => {
      return {
        type: props.type,
        name: item.title,
        stack: item.stack,
        data: item.data,
      }
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

      return {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          show: false,
          selected,
        },
        xAxis: [{
          show: true,
          type: 'category',
          data: props.labels,
        }],
        yAxis: [{
          show: true,
          type: 'value',
        }],
        series: data,
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
            <div class="flex gap-2  items-center">
              <div class="flex-none">{props.title}</div>
              <div class="flex-1 flex justify-center gap-4 flex-wrap">
                {props.legend === 'small' && legendData.value?.map((item, key) => (
                  <div
                    class={clsx([
                      'flex items-center gap-1 font-normal text-xs cursor-pointer',
                      item.status ? '' : 'opacity-50',
                    ])}
                    key={key}
                    onClick={() => {
                      const v = { ...item, status: !item.status }
                      legendData.value[key] = v
                    }}
                  >
                    <div
                      class={clsx([
                        'w-3 h-3 rounded-sm',
                      ])}
                      style={{
                        backgroundColor: themeStore.echartColors[key],
                      }}
                    >
                    </div>
                    <div class="text-gray-7">{item.title}</div>
                  </div>
                ))}
              </div>
              <div class="flex-none">
                {slots?.extra?.()}
              </div>
            </div>
          ),
          default: () => (
            <>
              {props.legend === 'default' && legendData.value?.length > 0 && (
                <div class={clsx([
                  'grid grid-cols-2  pb-2 xl:divide-x  divide-gray-3 mb-2',
                  `md:grid-cols-${ceil(props.col / 2)}`,
                  `xl:grid-cols-${props.col}`,
                ])}
                >
                  {legendData.value?.map((item, key) => (
                    <div class="flex justify-center xl:px-4 xl:first:pl-0 xl:last:pr-0" key={key}>
                      <div
                        class={clsx([
                          'flex-1 flex flex-col gap-1 px-4 pt-4 pb-2  cursor-pointer hover:bg-gray-2 transition-all',
                          item.status ? '' : 'opacity-50',
                        ])}
                        onClick={() => {
                          const v = { ...item, status: !item.status }
                          legendData.value[key] = v
                        }}
                      >
                        <div class="flex gap-2 items-center">
                          <div
                            class={clsx([
                              'flex items-center justify-center rounded text-white p-1',
                            ])}
                            style={{
                              backgroundColor: themeStore.echartColors[key],
                            }}
                          >
                            <div class={clsx([
                              'size-4',
                              item.icon,
                            ])}
                            >
                            </div>
                          </div>
                          <div class="text-gray-7">{item.title}</div>
                        </div>
                        <div class="font-bold text-2xl">{item.data?.[item.data.length - 1] || '0'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div class="h-100">
                <VChart
                  class="h-full w-full"
                  autoresize
                  theme="default"
                  option={option.value}
                  initOptions={{
                    renderer: 'svg',
                  }}
                />
              </div>
            </>
          ),
        }}

      </NCard>
    )
  },
})
