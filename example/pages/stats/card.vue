<script setup lang="ts">
import { ref } from 'vue'

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
      <dux-example title="卡片统计" :code="cardCode">
        <dux-stats-total-card>
          <dux-stats-total-card-item icon="i-tabler:eye" title="用户总数" desc="对比上周数据" value="1000" rate="10%" @click="() => {}" />
          <dux-stats-total-card-item icon="i-tabler:eye" type="down" title="会员总数" desc="对比上周数据" value="1000" rate="10%" @click="() => {}" />
          <dux-stats-total-card-item icon="i-tabler:eye" title="订单总量" desc="对比上周数据" value="1000" rate="10%" @click="() => {}" />
          <dux-stats-total-card-item icon="i-tabler:eye" type="down" title="销售金额" desc="对比上周数据" value="1000.00" rate="10%" @click="() => {}" />
        </dux-stats-total-card>
      </dux-example>

      <dux-example title="简单统计" :code="simpleCode">
        <dux-stats-total-simple>
          <dux-stats-total-simple-item icon="i-tabler:eye" title="用户总数" desc="对比上周数据" value="1000" rate="10%" />
          <dux-stats-total-simple-item icon="i-tabler:eye" type="down" title="会员总数" desc="对比上周数据" value="1000" rate="10%" />
          <dux-stats-total-simple-item icon="i-tabler:eye" title="订单总量" desc="对比上周数据" value="1000" rate="10%" />
          <dux-stats-total-simple-item icon="i-tabler:eye" type="down" title="销售金额" desc="对比上周数据" value="1000" rate="10%" />
        </dux-stats-total-simple>
      </dux-example>

      <dux-example title="比率统计" :code="rateCode">
        <dux-stats-total-rate>
          <dux-stats-total-rate-item title="用户总数" desc="对比上周数据" value="1000" rate="10%" :data="[10, 20, 30, 40, 50]" />
          <dux-stats-total-rate-item type="down" title="会员总数" desc="对比上周数据" value="1000" rate="10%" :data="[10, 20, 30, 40, 10]" />
          <dux-stats-total-rate-item title="订单总量" desc="对比上周数据" value="1000" rate="10%" :data="[10, 20, 30, 40, 50]" />
          <dux-stats-total-rate-item type="down" title="销售金额" desc="对比上周数据" value="1000" rate="10%" :data="[10, 20, 30, 15, 0]" />
        </dux-stats-total-rate>
      </dux-example>

      <dux-example title="多数据统计" :code="multiCode">
        <dux-stats-total-multi title="统计概况">
          <dux-stats-total-multi-item title="用户总数" desc="对比上周数据" value="1000" rate="10%" />
          <dux-stats-total-multi-item type="down" title="会员总数" desc="对比上周数据" value="1000" rate="10%" />
          <dux-stats-total-multi-item title="订单总量" desc="对比上周数据" value="1000" rate="10%" />
          <dux-stats-total-multi-item type="down" title="销售金额" desc="对比上周数据" value="1000" rate="10%" />
          <dux-stats-total-multi-item title="新增用户" desc="对比上周数据" value="1000" rate="10%" />
          <dux-stats-total-multi-item type="down" title="新增会员" desc="对比上周数据" value="1000" rate="10%" />
          <dux-stats-total-multi-item title="新增订单" desc="对比上周数据" value="1000" rate="10%" />
          <dux-stats-total-multi-item type="down" title="推广金额" desc="对比上周数据" value="1000" rate="10%" />
        </dux-stats-total-multi>
      </dux-example>

      <dux-example title="切换统计" :code="tabCode">
        <dux-stats-total-tab>
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
          <dux-stats-total-tab-item
            icon="i-tabler:eye" title="订单总量" unit="单" :data="[
              {
                label: '本日',
                title: '日同比',
                value: 1000,
                rate: '10%',
              },
              {
                label: '本周',
                title: '周同比',
                value: 2000,
                rate: '10%',
              },
            ]"
          />
          <dux-stats-total-tab-item
            icon="i-tabler:eye" title="新增用户" unit="人" :data="[
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
          <dux-stats-total-tab-item
            icon="i-tabler:eye" title="新增订单" unit="单" :data="[
              {
                label: '本日',
                title: '日同比',
                value: 1000,
                rate: '10%',
              },
              {
                label: '本周',
                title: '周同比',
                value: 2000,
                rate: '10%',
              },
            ]"
          />
        </dux-stats-total-tab>
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>

</style>
