<script setup lang="ts">
import { ref } from 'vue'

const baseCode = ref(`<n-transfer
  :options="[
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
  ]"
/>`)

const asyncCode = ref(`<dux-transfer-async
  url="/mall"
  value-field="id"
  label-field="title"
  image-field="image"
  desc-field="active"
/>`)
</script>

<template>
  <dux-page>
    <div class="grid grid-cols-1 gap-2">
      <dux-example title="普通穿梭框" :code="baseCode">
        <n-transfer
          :options="[
            { label: '选项1', value: 1 },
            { label: '选项2', value: 2 },
          ]"
        />
      </dux-example>

      <dux-example title="异步穿梭框" :code="asyncCode">
        <n-alert type="info" class="mb-2">
          通过远程加载数据为选项内容，并且更加丰富的展示
        </n-alert>
        <dux-transfer-async
          url="/mall"
          value-field="id"
          label-field="title"
          image-field="image"
          desc-field="active"
        />
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
