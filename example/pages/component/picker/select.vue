<script setup lang="ts">
import { ref } from 'vue'

const baseCode = ref(`<n-select
  :options="[
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
  ]"
/>`)

const asyncCode = ref(`<dux-select-async
  url="/mall"
  value-field="id"
  label-field="title"
/>`)

const asyncMediaCode = ref(`<dux-select-async
  url="/mall"
  value-field="id"
  label-field="title"
  desc-field="active"
  image-field="image"
/>`)
</script>

<template>
  <dux-page>
    <div class="grid grid-cols-1 gap-2">
      <dux-example title="普通选择器" :code="baseCode">
        <n-select
          :options="[
            { label: '选项1', value: 1 },
            { label: '选项2', value: 2 },
          ]"
        />
      </dux-example>

      <dux-example title="异步选择器" :code="asyncCode">
        <n-alert type="info" class="mb-2">
          通过远程加载数据为选项内容，并且支持分页与搜索
        </n-alert>

        <dux-select-async
          url="/mall"
          value-field="id"
          label-field="title"
        />
      </dux-example>

      <dux-example title="异步图文选择器" :code="asyncMediaCode">
        <n-alert type="info" class="mb-2">
          指定图片与描述字段，可以展示图片与描述
        </n-alert>

        <dux-select-async
          url="/mall"
          value-field="id"
          label-field="title"
          desc-field="active"
          image-field="image"
        />
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
