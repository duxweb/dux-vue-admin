<script setup lang="ts">
import { ref } from 'vue'

const range = ref<[number, number]>([1183135260000, Date.now()])
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <div class="text-lg font-bold">
        系统统计
      </div>
      <div>
        <n-date-picker v-model:value="range" type="daterange" clearable />
      </div>
    </div>

    <dux-stats-rate>
      <dux-stats-rate-item title="用户总数" desc="对比上周数据" value="123" rate="10%" :data="[10, 20, 30, 40, 50]" />
      <dux-stats-rate-item type="down" title="用户总数" desc="对比上周数据" value="123" rate="10%" :data="[10, 20, 30, 40, 10]" />
      <dux-stats-rate-item title="用户总数" desc="对比上周数据" value="123" rate="10%" :data="[10, 20, 30, 40, 50]" />
      <dux-stats-rate-item type="down" title="用户总数" desc="对比上周数据" value="123" rate="10%" :data="[10, 20, 30, 15, 0]" />
    </dux-stats-rate>

    <dux-stats-simple>
      <dux-stats-simple-item title="用户总数" desc="对比上周数据" value="123" rate="10%" :data="[10, 20, 30, 40, 50]" />
      <dux-stats-simple-item type="down" title="用户总数" desc="对比上周数据" value="123" rate="10%" :data="[10, 20, 30, 40, 10]" />
      <dux-stats-simple-item title="用户总数" desc="对比上周数据" value="123" rate="10%" :data="[10, 20, 30, 40, 50]" />
      <dux-stats-simple-item type="down" title="用户总数" desc="对比上周数据" value="123" rate="10%" :data="[10, 20, 30, 15, 0]" />
    </dux-stats-simple>

    <div class="flex items-start gap-4">
      <div class="flex-1 w-1">
        <dux-stats-chart />
      </div>
      <div class="flex-none flex flex-col gap-4">
        <dux-stats-account title="我的账户" desc="可用余额" :value="12032132" :options="[{ label: '余额提现', type: 'primary' }, { label: '实名认证', type: 'tertiary' }]" />
        <dux-stats-bankcard title="我的银行卡" :info="{ type: '储蓄卡', title: '中国工商银行', name: '张三', no: '**** **** **** 1234' }" />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
