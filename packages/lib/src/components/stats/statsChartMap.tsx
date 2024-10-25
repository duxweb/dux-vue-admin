import type { DataTableColumn } from 'naive-ui'
import type { PropType } from 'vue'
import crypto from 'crypto-js'
import { type EChartsOption, getMap, registerMap } from 'echarts'
import { NCard, NDataTable } from 'naive-ui'
import { defineComponent, onMounted, ref, watch } from 'vue'
import VChart from 'vue-echarts'
import { useI18n } from 'vue-i18n'

export interface DuxStatsChartMapData {
  name: string
  data?: Record<string, any>
}

export const DuxStatsChartMap = defineComponent({
  name: 'DuxStatsChartMap',
  props: {
    geojson: [String, Object],
    title: String,
    labels: Object as Record<string, any>,
    data: Array as PropType<Array<DuxStatsChartMapData>>,
    valueKey: {
      type: String,
      default: 'value',
    },
    col: {
      type: Number,
      default: 4,
    },
  },
  setup(props, { slots }) {
    const data = props.data?.map?.((item) => {
      return {
        name: item.name,
        value: item?.[props.valueKey],
      }
    })

    const option = ref()
    const currentMapName = ref('map')

    const legendData = ref<Array<Record<string, any>>>([])

    watch(() => props.data, () => {
      legendData.value = props.data?.map?.((item) => {
        return {
          ...item,
          status: true,
        }
      }) as Array<Record<string, any>>
    }, { immediate: true })

    const getOption = (name) => {
      return {
        tooltip: {
          trigger: 'item',
        },
        series: {
          name: props.labels?.[props.valueKey] || '',
          type: 'map',
          map: name,
          roam: true,
          data,
        },
        visualMap: {
          show: true,
        },
        grid: {
          left: '10',
          right: '10',
          top: '10',
          bottom: '10',
          containLabel: true,
        },
      } as EChartsOption
    }

    const getMapData = async () => {
      const name = getMap(currentMapName.value)
      if (!props.geojson || name) {
        return
      }

      if (typeof props.geojson === 'string') {
        const key = crypto.MD5(props.geojson).toString()
        currentMapName.value = key
        if (getMap(key)) {
          return
        }
        const req = await fetch(props.geojson)
        req.json().then((mapJson) => {
          registerMap(key, mapJson)
          option.value = getOption(key)
        })
      }
      else {
        registerMap(currentMapName.value, props?.geojson as any || [])
        option.value = getOption(currentMapName.value)
      }
    }

    const { t } = useI18n()

    onMounted(() => {
      getMapData()
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
              <div class="flex flex-col xl:flex-row gap-4 ">
                <div class="h-100 xl:flex-1 xl:min-w-100 flex-none">
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
                <div class="h-100 xl:flex-1 xl:w-1">
                  <NDataTable
                    class="h-full"
                    striped
                    data={props.data}
                    flexHeight
                    columns={[
                      {
                        title: t('components.stats.area'),
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
