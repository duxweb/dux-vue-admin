<script setup lang="ts">
import { ref } from 'vue'

const asyncCode = ref(`<dux-media title="标题" desc="描述" image="https://picsum.photos/100/100" extend="2024-01-01" />`)
</script>

<template>
  <dux-page>
    <div class="grid grid-cols-1 gap-2">
      <dux-example title="图文信息" :code="asyncCode">
        <n-alert type="info" class="mb-2">
          图片、文字等组合信息展示
        </n-alert>

        <dux-media title="标题" desc="描述" image="https://picsum.photos/100/100" extend="2024-01-01" />
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
