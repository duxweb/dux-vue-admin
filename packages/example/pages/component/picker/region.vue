<script setup lang="ts">
import { ref } from 'vue'

const asyncCode = ref(`<dux-region
  url="/region"
  value-field="id"
  label-field="name"
/>`)

const streetCode = ref(`<dux-region
  url="/region"
  level="street"
  value-field="id"
  label-field="name"
/>`)
</script>

<template>
  <dux-page>
    <div class="grid grid-cols-1 gap-2">
      <dux-example title="省市区" :code="asyncCode">
        <n-alert type="info" class="mb-2">
          按需加载异步省市区数据，需要后端接口提供，最高支持到街道级
        </n-alert>

        <dux-region
          url="/region"
          value-field="id"
          label-field="name"
        />
      </dux-example>

      <dux-example title="省市区街道" :code="streetCode">
        <dux-region
          url="/region"
          level="street"
          value-field="id"
          label-field="name"
        />
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
