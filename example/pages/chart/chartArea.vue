<script setup lang="ts">
import { ref } from 'vue'

const chartPieData = [
  { title: '搜索引擎', value: 1048 },
  { title: '直接访问', value: 735 },
  { title: '邮件营销', value: 580 },
  { title: '联盟广告', value: 484 },
  { title: '视频广告', value: 300 },
]

const pieCode = ref(`<dux-stats-chart-area title="饼状图" :data="[
  { title: '搜索引擎', value: 1048 },
  { title: '直接访问', value: 735 },
  { title: '邮件营销', value: 580 },
  { title: '联盟广告', value: 484 },
  { title: '视频广告', value: 300 }
]" />`)

const ringCode = ref(`<dux-stats-chart-area title="饼状图" type="rose" :data="[
  { title: '搜索引擎', value: 1048 },
  { title: '直接访问', value: 735 },
  { title: '邮件营销', value: 580 },
  { title: '联盟广告', value: 484 },
  { title: '视频广告', value: 300 }
]" />`)

const funnelCode = ref(`<dux-stats-chart-area title="饼状图" type="funnel" :data="[
  { title: '搜索引擎', value: 1048 },
  { title: '直接访问', value: 735 },
  { title: '邮件营销', value: 580 },
  { title: '联盟广告', value: 484 },
  { title: '视频广告', value: 300 }
]" />`)
</script>

<template>
  <dux-page>
    <div class="grid grid-cols-2 gap-2">
      <dux-example title="饼状图" :code="pieCode">
        <dux-stats-chart-area title="图表" :data="chartPieData" />
      </dux-example>
      <dux-example title="环形图" :code="ringCode">
        <dux-stats-chart-area title="图表" :data="chartPieData" type="ring" />
      </dux-example>
      <dux-example title="南丁格玫瑰图" :code="ringCode">
        <dux-stats-chart-area title="图表" :data="chartPieData" type="rose" />
      </dux-example>
      <dux-example title="漏斗图" :code="funnelCode">
        <dux-stats-chart-area title="图表" :data="chartPieData" type="funnel" />
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>

</style>
