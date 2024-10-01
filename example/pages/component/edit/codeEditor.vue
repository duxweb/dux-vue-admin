<script setup lang="ts">
import { ref } from 'vue'

const asyncCode = ref(`<dux-ai-editor />`)
</script>

<template>
  <dux-page>
    <div class="grid grid-cols-1 gap-2">
      <dux-example title="编辑器示例" :code="asyncCode">
        <n-alert type="info" class="mb-2">
          代码编辑器使用 AceEditor 作为基础封装，支持常用语法高亮，默认为 json。
        </n-alert>
        <dux-code-editor />
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
