<script setup lang="ts">
import { ref } from 'vue'

const baseCode = ref(`<n-tree-select
  :options="[
    { label: '选项1', key: 1 },
    { label: '选项2', key: 2 },
  ]"
/>`)

const asyncCode = ref(`<dux-tree-select-async
  url="/class"
  key-field="id"
  label-field="name"
/>`)
</script>

<template>
  <dux-page>
    <div class="grid grid-cols-1 gap-2">
      <dux-example title="普通选择器" :code="baseCode">
        <n-tree-select
          :options="[
            { label: '选项1', key: 1 },
            { label: '选项2', key: 2 },
          ]"
        />
      </dux-example>

      <dux-example title="异步选择器" :code="asyncCode">
        <n-alert type="info" class="mb-2">
          通过远程加载数据为树形内容
        </n-alert>

        <dux-tree-select-async
          url="/class"
          key-field="id"
          label-field="name"
        />
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
