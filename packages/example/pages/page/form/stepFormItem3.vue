<script setup lang="ts">
import type { JsonFormItemSchema } from '@duxweb/dux-vue-admin'

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
  <div>
    <dux-json-form :model="props.model" :schema="schema" />
  </div>
</template>

<style scoped>

</style>
