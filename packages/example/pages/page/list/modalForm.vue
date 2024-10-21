<script setup lang="ts">
import formSchema from '../form/formSchema'
</script>

<template>
  <dux-modal-form :schema="formSchema" url="/mall" invalidate="example.table" />
</template>

<style scoped>

</style>
