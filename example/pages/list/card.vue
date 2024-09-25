<script setup lang="ts">
import type { JsonFormItemSchema } from 'dux-vue-admin'

const filter: JsonFormItemSchema[] = [
  {
    label: '关键词',
    type: 'input',
    name: 'keyword',
  },
]
</script>

<template>
  <dux-card-list :filter="filter" />
</template>

<style scoped>

</style>
