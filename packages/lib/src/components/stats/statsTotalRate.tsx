import clsx from 'clsx'
import { graphic } from 'echarts'
import { ceil } from 'lodash-es'
import { NCard } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import VChart from 'vue-echarts'
import type { PropType } from 'vue'

export const DuxStatsTotalRate = defineComponent({
  name: 'DuxStatsRate',
  props: {
    col: {
      type: Number,
      default: 4,
    },
  },
  setup(props, { slots }) {
    return () => (
      <div class={clsx([
        'grid grid-cols-1 border border-gray-2 bg-gray-1 rounded-md divide-x divide-y divide-gray-2 overflow-hidden',
        `md:grid-cols-${ceil(props.col / 2)}`,
        `xl:grid-cols-${props.col}`,
      ])}
      >
        {slots.default?.()}
      </div>
    )
  },
})

export const DuxStatsTotalRateItem = defineComponent({
  name: 'DuxStatsRateItem',
  props: {
    title: String,
    desc: String,
    data: Object as PropType<Record<string, any>>,
    value: [Number, String] as PropType<number | string>,
    rate: [Number, String] as PropType<number | string>,
    type: {
      type: String as PropType<'up' | 'down'>,
      default: 'up',
    },
  },
  setup(props) {
    const labels = Object.keys(props.data || {})
    const values = Object.values(props.data || {})

    const typeColor = props.type === 'up' ? 'primary' : 'warning'

    const option = ref({
      tooltip: {
        trigger: 'axis',
      },
      xAxis: [{
        show: false,
        type: 'category',
        boundaryGap: false,
        data: labels,
      }],
      yAxis: [{
        show: false,
        type: 'value',
      }],
      grid: {
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
      },
      series: [{
        name: props.title,
        type: 'line',
        symbol: 'none',
        itemStyle: {
          color: `rgba(var(--n-${typeColor}-color), 1)`,
        },
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: `rgba(var(--n-${typeColor}-color), 0.3)`,
          }, {
            offset: 1,
            color: `rgba(var(--n-${typeColor}-color), 0.0)`,
          }]),
        },
        emphasis: {
          areaStyle: {
            color: `rgba(var(--n-${typeColor}-color), 0.2)`,
          },
        },
        data: values,
      }],
    })

    return () => (
      <NCard title={props?.title} headerClass="!pb-0 !text-base" bordered={false}>
        <div class="grid grid-cols-3">
          <div class="col-span-2 flex flex-col gap-1 justify-end">
            <div class="flex gap-3 items-center">
              <div class="font-bold text-2xl">
                {props.value}
              </div>
              <div class={clsx([
                'flex gap-1 items-center text-sm ',
                props.type === 'up' ? 'text-primary' : 'text-warning',
              ])}
              >
                <div class={clsx([
                  'rounded-full w-4 h-4 flex items-center justify-center',
                  props.type === 'up' ? 'bg-primary/10' : 'bg-warning/10 ',
                ])}
                >
                  <div class={clsx([
                    ' w-3 h-3',
                    props.type === 'up' ? 'i-tabler:arrow-up' : 'i-tabler:arrow-down',
                  ])}
                  />
                </div>
                {props.rate}
              </div>
            </div>
            <div class="text-gray-7 text-sm">
              {props?.desc}
            </div>
          </div>
          <div class="h-70px">
            <VChart
              class="h-full w-full"
              autoresize
              option={option.value}
              initOptions={{
                renderer: 'svg',
              }}
            />
          </div>
        </div>
      </NCard>
    )
  },
})
