<script setup lang="ts">
const chartData = [
  { title: '注册量', data: [10, 15, 18, 6, 4, 12, 16, 18], icon: 'i-tabler:user' },
  { title: '访问量', data: [20, 30, 24, 12, 8, 16, 30, 22], icon: 'i-tabler:eye' },
  { title: '访客量', data: [12, 24, 33, 11, 32, 31, 42, 16], icon: 'i-tabler:user-star' },
  { title: '订单量', data: [3, 4, 7, 5, 3, 8, 12, 10], icon: 'i-tabler:align-box-bottom-left' },
]

const chartPieData = [
  { title: '搜索引擎', value: 1048 },
  { title: '直接访问', value: 735 },
  { title: '邮件营销', value: 580 },
  { title: '联盟广告', value: 484 },
  { title: '视频广告', value: 300 },
]

const chartPieData2 = [
  { title: 'App', value: 735 },
  { title: 'H5', value: 580 },
  { title: 'Web', value: 484 },
  { title: '小程序', value: 1048 },
]

const chartPieData3 = [
  { title: '食品生鲜', value: 735 },
  { title: '玩具礼品', value: 580 },
  { title: '美妆个护', value: 484 },
  { title: '手机数码', value: 1048 },
]

const chartPieData4 = [
  { title: '访问量', value: 1822 },
  { title: '访客量', value: 960 },
  { title: '下单量', value: 533 },
  { title: '支付量', value: 231 },
]
</script>

<template>
  <dux-page>
    <div class="flex flex-col gap-4">
      <dux-stats-total-rate>
        <dux-stats-total-rate-item title="用户总数" desc="对比上周数据" value="123" rate="10%" :data="[10, 20, 30, 40, 50]" />
        <dux-stats-total-rate-item type="down" title="用户总数" desc="对比上周数据" value="123" rate="10%" :data="[10, 20, 30, 40, 10]" />
        <dux-stats-total-rate-item title="用户总数" desc="对比上周数据" value="123" rate="10%" :data="[10, 20, 30, 40, 50]" />
        <dux-stats-total-rate-item type="down" title="用户总数" desc="对比上周数据" value="123" rate="10%" :data="[10, 20, 30, 15, 0]" />
      </dux-stats-total-rate>

      <dux-stats-chart-grid
        title="趋势统计"
        total
        :labels="['2024-01-02', '2024-01-03', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09', '2024-01-10']"
        :data="chartData"
      />

      <div class="grid grid-cols-1 grid-cols-2 gap-4">
        <dux-stats-chart-area title="访客来源" :data="chartPieData" />
        <dux-stats-chart-area title="访客设备" :data="chartPieData2" type="ring" />
        <dux-stats-chart-area title="商品占比" :data="chartPieData3" type="rose" />
        <dux-stats-chart-area title="交易转换量" :data="chartPieData4" type="funnel" />
      </div>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
