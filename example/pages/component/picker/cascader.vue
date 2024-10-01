<script setup lang="ts">
import { ref } from 'vue'

const asyncCode = ref(`<dux-cascader-async
  url="/area"
  value-field="name"
  label-field="name"
/>`)
</script>

<template>
  <dux-page>
    <div class="grid grid-cols-1 gap-2">
      <dux-example title="异步级联选择器" :code="asyncCode">
        <n-alert type="info" class="mb-2">
          通过远程加载树形数据为选项内容
        </n-alert>

        <dux-cascader-async
          url="/area"
          value-field="name"
          label-field="name"
        />
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
