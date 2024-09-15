import { NCard } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import VChart from 'vue-echarts'

export const DuxStatsChart = defineComponent({
  name: 'DuxStatsChart',
  props: {
    title: String,
  },
  setup(props) {
    const option = ref({
      tooltip: {
        trigger: 'axis',
      },
      xAxis: [{
        show: true,
        type: 'category',
        data: ['2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09', '2024-01-10', '2024-01-11', '2024-01-12', '2024-01-13', '2024-01-14', '2024-01-15', '2024-01-16', '2024-01-17', '2024-01-18', '2024-01-19', '2024-01-20'],
      }],
      yAxis: [{
        show: true,
        type: 'value',
      }],
      series: [{
        name: props.title,
        type: 'line',
        data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4000, 5, 6, 7, 8, 9000],
      }],
    })

    return () => (
      <NCard size="small" title="趋势统计">
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
      </NCard>
    )
  },
})
