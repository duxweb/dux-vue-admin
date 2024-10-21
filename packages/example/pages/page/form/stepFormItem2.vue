<script setup lang="ts">
import type { JsonFormItemSchema } from 'dux-vue-admin'

const props = defineProps({
  model: {
    type: Object,
  },
})

const schema: JsonFormItemSchema[] = [
  {
    type: 'region',
    label: '省市区联动',
    name: 'region',
    attr: {
      url: '/region',
      valueField: 'id',
      labelField: 'name',
    },
    itemAttr: {
      required: true,
    },
  },
  {
    type: 'select-async',
    label: '异步选择器',
    name: 'selectAsync',
    attr: {
      url: '/mall',
      valueField: 'id',
      labelField: 'title',
      pagination: true,
    },
    itemAttr: {
      required: true,
    },
  },
  {
    type: 'cascader-async',
    label: '异步级联',
    name: 'cascaderAsync',
    attr: {
      url: '/area',
      valueField: 'name',
      labelField: 'name',
    },
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
