<script setup lang="ts">
const props = defineProps<{
  onClose?: () => void
  onSubmit?: () => void
}>()
</script>

<template>
  <dux-drawer-page>
    <div class="p-4">
      这是是弹出组件的内容
    </div>
    <template #action>
      <n-button @click="props.onClose">
        关闭
      </n-button>
    </template>
  </dux-drawer-page>
</template>

<style scoped>

</style>
