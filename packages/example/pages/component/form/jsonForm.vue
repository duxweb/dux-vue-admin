<script setup lang="ts">
import type { JsonFormItemSchema } from 'dux-vue-admin'
import { ref } from 'vue'

const baseCode = ref(`<script setup>
  const schema = [
    {
      type: 'input',
      label: '标题',
      name: 'title',
      itemAttr: {
        required: true
      },
    },
    {
      type: 'editor',
      label: '内容',
      name: 'content',
      itemAttr: {
        required: true
      },
    },
  ]
  const model = ref({})
<\/script>
<template>
  <dux-json-form :model="model" :schema="schema" />
</template>`)

const schema: JsonFormItemSchema[] = [
  {
    type: 'input',
    label: '标题',
    name: 'title',
    itemAttr: {
      required: true,
    },
  },
  {
    type: 'editor',
    label: '内容',
    name: 'content',
    itemAttr: {
      required: true,
    },
  },
]

const model = ref({})
</script>

<template>
  <dux-page>
    <div class="grid grid-cols-1 gap-2">
      <dux-example title="表单示例" :code="baseCode" lang="vue">
        <n-alert type="info" class="mb-4">
          通过渲染器可将 json 数据渲染成表单
        </n-alert>

        <div>
          <dux-json-form :model="model" :schema="schema" />
        </div>
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
