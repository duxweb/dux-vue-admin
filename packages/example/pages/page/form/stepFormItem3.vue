<script setup lang="ts">
import type { JsonFormItemSchema } from 'dux-vue-admin'

const props = defineProps({
  model: {
    type: Object,
  },
})

const schema: JsonFormItemSchema[] = [

  {
    type: 'editor',
    label: '编辑器',
    name: 'editor',
    itemAttr: {
      required: true,
    },
  },
]
</script>

<template>
  <dux-json-form :model="props.model" :schema="schema" />
</template>

<style scoped>

</style>
