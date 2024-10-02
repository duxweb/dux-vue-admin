<script setup lang="ts">
import { ref } from 'vue'

const chartData = [
  { title: '用户量', data: [10, 15, 18, 6, 4, 12, 16, 18], icon: 'i-tabler:home' },
  { title: '访问量', data: [20, 30, 24, 12, 8, 16, 30, 22], icon: 'i-tabler:home' },
  { title: '访客量', data: [12, 24, 33, 11, 32, 31, 42, 16], icon: 'i-tabler:home' },
  { title: '交易量', data: [3, 4, 7, 5, 3, 8, 12, 10], icon: 'i-tabler:home' },
]

const chartstackData = [
  { title: '用户量', data: [10, 15, 18, 6, 4, 12, 16, 18], icon: 'i-tabler:home', stack: 'user' },
  { title: '访客量', data: [12, 24, 33, 11, 32, 31, 42, 16], icon: 'i-tabler:home', stack: 'user' },
  { title: '访问量', data: [20, 30, 24, 12, 8, 16, 30, 22], icon: 'i-tabler:home', stack: 'view' },
  { title: '交易量', data: [3, 4, 7, 5, 3, 8, 12, 10], icon: 'i-tabler:home', stack: 'view' },
]

const iconCode = ref(`<dux-stats-chart-grid
  title="统计图表"
  :labels="['2024-01-02', '2024-01-03', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09', '2024-01-10']"
  :data="[
    { title: '用户量', data: [10, 15, 18, 6, 4, 12, 16, 18], icon: 'i-tabler:home' },
    { title: '访问量', data: [20, 30, 24, 12, 8, 16, 30, 22], icon: 'i-tabler:home' },
    { title: '访客量', data: [12, 24, 33, 11, 32, 31, 42, 16], icon: 'i-tabler:home' },
    { title: '交易量', data: [3, 4, 7, 5, 3, 8, 12, 10], icon: 'i-tabler:home' },
  ]"
  type="line"
/>`)

const areaCode = ref(`<dux-stats-chart-grid
  title="统计图表"
  :labels="['2024-01-02', '2024-01-03', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09', '2024-01-10']"
  :data="[
    { title: '用户量', data: [10, 15, 18, 6, 4, 12, 16, 18] },
    { title: '访客量', data: [12, 24, 33, 11, 32, 31, 42, 16] },
    { title: '访问量', data: [20, 30, 24, 12, 8, 16, 30, 22] },
    { title: '交易量', data: [3, 4, 7, 5, 3, 8, 12, 10] },
  ]"
  legend="small"
  type="line"
/>`)

const barCode = ref(`<dux-stats-chart-grid
  title="统计图表"
  :labels="['2024-01-02', '2024-01-03', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09', '2024-01-10']"
  :data="[
    { title: '用户量', data: [10, 15, 18, 6, 4, 12, 16, 18] },
    { title: '访客量', data: [12, 24, 33, 11, 32, 31, 42, 16] },
    { title: '访问量', data: [20, 30, 24, 12, 8, 16, 30, 22] },
    { title: '交易量', data: [3, 4, 7, 5, 3, 8, 12, 10] },
  ]"
  legend="small"
/>`)

const stackCode = ref(`<dux-stats-chart-grid
  title="统计图表"
  :labels="['2024-01-02', '2024-01-03', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09', '2024-01-10']"
  :data="[
    { title: '用户量', data: [10, 15, 18, 6, 4, 12, 16, 18], stack: 'user' },
    { title: '访客量', data: [12, 24, 33, 11, 32, 31, 42, 16], stack: 'user' },
    { title: '访问量', data: [20, 30, 24, 12, 8, 16, 30, 22], stack: 'view' },
    { title: '交易量', data: [3, 4, 7, 5, 3, 8, 12, 10], stack: 'view' },
  ]"
  legend="small"
/>`)
</script>

<template>
  <dux-page>
    <div class="flex flex-col gap-2">
      <dux-example title="图标图表" :code="iconCode">
        <dux-stats-chart-grid
          title="统计图表"
          :labels="['2024-01-02', '2024-01-03', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09', '2024-01-10']"
          :data="chartData"
          type="line"
        />
      </dux-example>

      <dux-example title="面积图" :code="areaCode">
        <dux-stats-chart-grid
          title="统计图表"
          :labels="['2024-01-02', '2024-01-03', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09', '2024-01-10']"
          :data="chartData"
          legend="small"
          type="line"
        />
      </dux-example>

      <dux-example title="柱状图" :code="barCode">
        <dux-stats-chart-grid
          title="统计图表"
          :labels="['2024-01-02', '2024-01-03', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09', '2024-01-10']"
          :data="chartData"
          legend="small"
        />
      </dux-example>

      <dux-example title="叠加图" :code="stackCode">
        <dux-stats-chart-grid
          title="统计图表"
          :labels="['2024-01-02', '2024-01-03', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09', '2024-01-10']"
          :data="chartstackData"
          legend="small"
        />
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>

</style>
