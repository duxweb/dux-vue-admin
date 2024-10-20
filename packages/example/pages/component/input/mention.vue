<script setup lang="ts">
import { ref } from 'vue'

const baseCode = ref(`<n-mention />`)

const asyncCode = ref(`<dux-mention-async
  url="/mall"
  label-field="title"
  value-field="title"
/>`)
</script>

<template>
  <dux-page>
    <div class="grid grid-cols-1 gap-2">
      <dux-example title="普通提及" :code="baseCode">
        <div class="mb-2">
          <n-alert type="info">
            该组件为官方组件，可参考官方文档：<a href="https://www.naiveui.com/zh-CN/os-theme/components/mention" target="_blank">https://www.naiveui.com/zh-CN/os-theme/components/mention</a>
          </n-alert>
        </div>
        <n-mention placeholder="请输入@触发" />
      </dux-example>

      <dux-example title="异步提及" :code="asyncCode">
        <div class="mb-2">
          <n-alert type="info">
            通过远程加载异步列表提供给用户选择
          </n-alert>
        </div>
        <dux-mention-async
          url="/mall"
          label-field="title"
          value-field="title"
          placeholder="请输入@触发"
        />
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
