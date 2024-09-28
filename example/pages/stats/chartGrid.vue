<script setup lang="ts">
import { ref } from 'vue'

const chartData = [
  { title: '用户量', data: [10, 15, 18, 6, 4, 12, 16, 18], icon: 'i-tabler:home' },
  { title: '访问量', data: [20, 30, 24, 12, 8, 16, 30, 22], icon: 'i-tabler:home' },
  { title: '访客量', data: [12, 24, 33, 11, 32, 31, 42, 16], icon: 'i-tabler:home' },
  { title: '交易量', data: [3, 4, 7, 5, 3, 8, 12, 10], icon: 'i-tabler:home' },
]

const chartlayerData = [
  { title: '用户量', data: [10, 15, 18, 6, 4, 12, 16, 18], icon: 'i-tabler:home', stack: 'user' },
  { title: '访客量', data: [12, 24, 33, 11, 32, 31, 42, 16], icon: 'i-tabler:home', stack: 'user' },
  { title: '访问量', data: [20, 30, 24, 12, 8, 16, 30, 22], icon: 'i-tabler:home', stack: 'view' },
  { title: '交易量', data: [3, 4, 7, 5, 3, 8, 12, 10], icon: 'i-tabler:home', stack: 'view' },
]

const cardCode = ref(`<dux-stats-total-card>
  <dux-stats-total-card-item icon="i-tabler:eye" title="用户总数" desc="对比上周数据" value="1000" />
  <dux-stats-total-card-item icon="i-tabler:eye" type="down" title="用户总数" desc="对比上周数据" value="1000" />
</dux-stats-total-card>`)

const simpleCode = ref(`<dux-stats-total-card>
  <dux-stats-total-simple-item icon="i-tabler:eye" title="用户总数" desc="对比上周数据" value="1000" rate="10%" />
  <dux-stats-total-simple-item type="down" icon="i-tabler:eye" title="用户总数" desc="对比上周数据" value="1000" rate="10%" />
</dux-stats-total-card>`)

const rateCode = ref(`<dux-stats-total-rate>
  <dux-stats-total-rate-item title="用户总数" desc="对比上周数据" value="1000" rate="10%" :data="[10, 20, 30, 40, 50]" />
  <dux-stats-total-rate-item type="down" title="会员总数" desc="对比上周数据" value="1000" rate="10%" :data="[10, 20, 30, 40, 10]" />
</dux-stats-total-rate>`)

const multiCode = ref(`<dux-stats-total-rate>
  <dux-stats-total-multi-item title="用户总数" desc="对比上周数据" value="1000" rate="10%" />
  <dux-stats-total-multi-item type="down" title="用户总数" desc="对比上周数据" value="1000" rate="10%" />
</dux-stats-total-rate>`)

const tabCode = ref(`<dux-stats-total-tab>
  <dux-stats-total-tab-item
    icon="i-tabler:eye" title="用户总数" unit="人" :data="[
      {
        label: '本日',
        title: '日同比',
        value: 1000,
        rate: '10%',
        type: 'up',
      },
      {
        label: '本周',
        title: '周同比',
        value: 2000,
        rate: '10%',
      },
    ]"
  />
</dux-stats-total-tab>`)
</script>

<template>
  <dux-page>
    <div class="flex flex-col gap-2">
      <dux-example title="图标图表" :code="cardCode">
        <dux-stats-chart-grid
          title="统计图表"
          :labels="['2024-01-02', '2024-01-03', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09', '2024-01-10']"
          :data="chartData"
          type="line"
        />
      </dux-example>

      <dux-example title="面积图" :code="cardCode">
        <dux-stats-chart-grid
          title="统计图表"
          :labels="['2024-01-02', '2024-01-03', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09', '2024-01-10']"
          :data="chartData"
          legend="small"
          type="line"
        />
      </dux-example>

      <dux-example title="柱状图" :code="simpleCode">
        <dux-stats-chart-grid
          title="统计图表"
          :labels="['2024-01-02', '2024-01-03', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09', '2024-01-10']"
          :data="chartData"
          legend="small"
        />
      </dux-example>

      <dux-example title="叠加图" :code="rateCode">
        <dux-stats-chart-grid
          title="统计图表"
          :labels="['2024-01-02', '2024-01-03', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09', '2024-01-10']"
          :data="chartlayerData"
          legend="small"
        />
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>

</style>
