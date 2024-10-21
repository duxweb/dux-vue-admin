<script setup lang="ts">
import { ref } from 'vue'

const form = ref<Record<string, any>>({
})

const schema = [
  {
    type: 'input',
    label: '标题',
    name: 'title',
    itemAttr: {
      required: true,
      desc: '请输入标题描述',
    },
  },
  {
    type: 'editor',
    label: '内容',
    name: 'content',
    itemAttr: {
      required: true,
      desc: '使用编辑器丰富内容',
    },
  },
]
</script>

<template>
  <dux-tab-form tab="0" :model="form">
    <n-tab-pane name="0" tab="tab1">
      <dux-json-form :model="form" :schema="schema" layout="page" />
    </n-tab-pane>
    <n-tab-pane name="1" tab="tab2">
      Tab Panel 2
    </n-tab-pane>
    <n-tab-pane name="2" tab="tab3">
      Tab Panel 3
    </n-tab-pane>
  </dux-tab-form>
</template>

<style scoped>
</style>
