<script setup lang="ts">
import { ref } from 'vue'

const infoCode = ref(`<dux-stats-store title="官方自营旗舰店" :col="3">
  <dux-stats-store-item label="商品">
    <div class="font-medium">
      4.5
    </div>
  </dux-stats-store-item>
  <dux-stats-store-item label="服务">
    <div class="font-medium">
      4.5
    </div>
  </dux-stats-store-item>
  <dux-stats-store-item label="物流">
    <div class="font-medium">
      4.5
    </div>
  </dux-stats-store-item>
  <dux-stats-store-item label="信用等级">
    <div class="font-medium">
      5.0
    </div>
  </dux-stats-store-item>
  <dux-stats-store-item label="店铺资质">
    <div class="text-primary text-sm">
      已上传
    </div>
  </dux-stats-store-item>
  <dux-stats-store-item label="店铺状态">
    <div class="text-primary text-sm">
      正常
    </div>
  </dux-stats-store-item>
</dux-stats-store>`)

const accountCode = ref(`<dux-stats-account 
  title="我的账户" 
  desc="可用余额" 
  :value="12032132" 
  :options="[
    { label: '余额提现', type: 'primary' }, 
    { label: '实名认证', type: 'tertiary' }
  ]" 
/>`)

const cardCode = ref(`<dux-stats-bankcard
  :info="{
    type: '储蓄卡', 
    title: '中国工商银行', 
    name: '张三', 
    no: '**** **** **** 1234' 
  }" 
/>`)
</script>

<template>
  <dux-page>
    <div class="grid grid-cols-2 gap-2">
      <dux-example title="机构信息" :code="infoCode">
        <div class="max-w-100">
          <dux-stats-store title="官方自营旗舰店" :col="3">
            <dux-stats-store-item label="商品">
              <div class="font-medium">
                4.5
              </div>
            </dux-stats-store-item>
            <dux-stats-store-item label="服务">
              <div class="font-medium">
                4.5
              </div>
            </dux-stats-store-item>
            <dux-stats-store-item label="物流">
              <div class="font-medium">
                4.5
              </div>
            </dux-stats-store-item>
            <dux-stats-store-item label="信用等级">
              <div class="font-medium">
                5.0
              </div>
            </dux-stats-store-item>
            <dux-stats-store-item label="店铺资质">
              <div class="text-primary text-sm">
                已上传
              </div>
            </dux-stats-store-item>
            <dux-stats-store-item label="店铺状态">
              <div class="text-primary text-sm">
                正常
              </div>
            </dux-stats-store-item>
          </dux-stats-store>
        </div>
      </dux-example>

      <dux-example title="账户信息" :code="accountCode">
        <div class="max-w-100">
          <dux-stats-account title="我的账户" desc="可用余额" :value="12032132" :options="[{ label: '余额提现', type: 'primary' }, { label: '实名认证', type: 'tertiary' }]" />
        </div>
      </dux-example>

      <dux-example title="银行卡信息" :code="cardCode">
        <div class="max-w-100">
          <dux-stats-bankcard title="我的银行卡" :info="{ type: '储蓄卡', title: '中国工商银行', name: '张三', no: '**** **** **** 1234' }" />
        </div>
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
