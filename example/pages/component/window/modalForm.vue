<script setup lang="ts">
import type { JsonFormItemSchema } from 'dux-vue-admin'

const schema: JsonFormItemSchema[] = [
  {
    type: 'input',
    label: '商品标题',
    name: 'title',
    itemAttr: {
      required: true,
    },
  },
  {
    type: 'input',
    label: '商品活动',
    name: 'active',
    itemAttr: {
      required: true,
    },
  },
]
</script>

<template>
  <dux-modal-form :schema="schema" url="/mall" invalidate="example.table" />
</template>

<style scoped>

</style>
