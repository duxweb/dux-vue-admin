import type { EChartsOption } from 'echarts'
import type { DataTableColumn } from 'naive-ui'
import type { PropType } from 'vue'
import { NCard, NDataTable } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import VChart from 'vue-echarts'
import { useI18n } from 'vue-i18n'

export interface DuxStatsChartRadarData {
  name: string
  data?: Array<any>
}

export const DuxStatsChartRadar = defineComponent({
  name: 'DuxStatsChartRadar',
  props: {
    title: String,
    labels: Object as Record<string, any>,
    data: Array as PropType<Array<DuxStatsChartRadarData>>,
    height: {
      type: Number,
      default: 200,
    },
  },
  setup(props, { slots }) {
    const data = props.data?.map?.((item) => {
      return {
        name: item.name,
        value: Object.entries(props.labels || [])?.map(([key]) => {
          return item[key]
        }),
      }
    })

    const option = computed(() => {
      return {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          show: false,
        },
        radar: {
          indicator: Object.entries(props.labels || [])?.map(([_key, value]) => {
            return {
              name: value,
            }
          }),
          radius: '70%',
        },
        series: {
          type: 'radar',
          data,
        },
        grid: {
          left: '10',
          right: '10',
          top: '30',
          bottom: '30',
          containLabel: true,
        },
      } as EChartsOption
    })

    const { t } = useI18n()

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
              <div class="flex flex-col xl:flex-row gap-4 ">
                <div
                  class="xl:flex-1 xl:min-w-100 flex-none"
                  style={{
                    height: `${props.height}px`,
                  }}
                >
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
                <div
                  class="xl:flex-1 xl:w-1"
                  style={{
                    height: `${props.height}px`,
                  }}
                >
                  <NDataTable
                    class="h-full"
                    striped
                    data={props.data}
                    flexHeight
                    columns={[
                      {
                        title: t('components.stats.data'),
                        key: 'name',
                        fixed: 'left',
                        width: 130,
                      },
                      ...Object.entries(props.labels || []).map(([key, value]) => {
                        return {
                          title: value,
                          sorter: 'default',
                          width: 100,
                          key,
                        } as DataTableColumn
                      }),
                    ]}
                  />

                </div>
              </div>
            </>
          ),
        }}

      </NCard>
    )
  },
})
