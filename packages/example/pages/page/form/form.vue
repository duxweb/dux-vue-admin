<script setup lang="ts">
import schema from './formSchema'
</script>

<template>
  <dux-page-form id="1" title="表单示例" :schema="schema" url="/mall" invalidate="example.table" />
</template>

<style scoped>

</style>
