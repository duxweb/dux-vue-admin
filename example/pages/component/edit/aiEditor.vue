<script setup lang="ts">
import { ref } from 'vue'

const asyncCode = ref(`<dux-ai-editor />`)
</script>

<template>
  <dux-page>
    <div class="grid grid-cols-1 gap-2">
      <dux-example title="编辑器示例" :code="asyncCode">
        <n-alert type="info" class="mb-2">
          为了方便后端控制，AI 编译器使用自定义大语言模型，可以将 AI 客户端接口数据使用 SSE 进行转发给编辑器使用。
        </n-alert>
        <dux-ai-editor />
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
