<script setup lang="ts">
import { ref } from 'vue'

const pieCode = ref(`<dux-stats-chart-map 
  title="图表" 
  geojson="https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json" value-key="num" 
  :data="[
    {
      name: '上海市',
      pv: 1048,
      uv: 735,
      num: 220,
    },
    {
      name: '广东省',
      pv: 4324,
      uv: 233,
      num: 40,
    },
    {
      name: '湖南省',
      pv: 2334,
      uv: 234,
      num: 30,
    },
    {
      name: '湖北省',
      pv: 432,
      uv: 4324,
      num: 10,
    },
    {
      name: '广西省',
      pv: 432,
      uv: 4324,
      num: 10,
    },
    {
      name: '重庆市',
      pv: 432,
      uv: 4324,
      num: 10,
    },
    {
      name: '浙江省',
      pv: 432,
      uv: 4324,
      num: 10,
    },
  ]"
  :labels="{
    pv: '访问量',
    uv: '访客量',
    num: '用户量',
  }"
/>`)

const chartMapData = [
  {
    name: '上海市',
    pv: 1048,
    uv: 735,
    num: 220,
  },
  {
    name: '广东省',
    pv: 4324,
    uv: 233,
    num: 40,
  },
  {
    name: '湖南省',
    pv: 2334,
    uv: 234,
    num: 30,
  },
  {
    name: '湖北省',
    pv: 432,
    uv: 4324,
    num: 10,
  },
  {
    name: '广西省',
    pv: 432,
    uv: 4324,
    num: 10,
  },
  {
    name: '重庆市',
    pv: 432,
    uv: 4324,
    num: 10,
  },
  {
    name: '浙江省',
    pv: 432,
    uv: 4324,
    num: 10,
  },
]

const chartMapLabels = {
  pv: '访问量',
  uv: '访客量',
  num: '用户量',
}
</script>

<template>
  <dux-page>
    <dux-example title="地图图表" :code="pieCode">
      <dux-stats-chart-map title="图表" :data="chartMapData" :labels="chartMapLabels" geojson="https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json" value-key="num" />
    </dux-example>
  </dux-page>
</template>

<style scoped>

</style>
