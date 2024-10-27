<script setup lang="ts">
import type { DuxStepFormItem } from '@duxweb/dux-vue-admin'

const steps: DuxStepFormItem[] = [
  {
    title: '步骤一',
    icon: 'i-tabler:home',
    component: () => import('./stepFormItem.vue'),

  },
  {
    title: '步骤二',
    icon: 'i-tabler:home',
    component: () => import('./stepFormItem2.vue'),
  },
  {
    title: '步骤三',
    icon: 'i-tabler:home',
    component: () => import('./stepFormItem3.vue'),
  },
]
</script>

<template>
  <dux-step-form id="1" title="表单示例" :steps="steps" url="/mall" invalidate="example.table" />
</template>

<style scoped>

</style>
