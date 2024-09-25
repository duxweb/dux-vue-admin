<script setup lang="ts">
import formSchema from './formSchema'
</script>

<template>
  <dux-page-form id="1" title="表单示例" :schema="formSchema" url="/mall" invalidate="example.table" />
</template>

<style scoped>

</style>
