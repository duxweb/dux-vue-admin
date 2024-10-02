<script setup lang="ts">
import { ref } from 'vue'

const asyncCode = ref(`<dux-icon-picker v-model:value='icon' />`)
</script>

<template>
  <dux-page>
    <div class="grid grid-cols-1 gap-2">
      <dux-example title="图标选择器" :code="asyncCode">
        <n-alert type="info" class="mb-2">
          图标使用 tabler icon 图标库
        </n-alert>
        <dux-icon-picker />
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
