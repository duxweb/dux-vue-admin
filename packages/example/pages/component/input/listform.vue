<script setup lang="ts">
import type { DuxDynamicDataColumn, TableColumn } from 'dux-vue-admin'
import { DuxMedia } from 'dux-vue-admin'
import { NInput, NInputNumber, NSelect } from 'naive-ui'
import { h, ref } from 'vue'

const baseCode = ref(`<dux-dynamic-data
  :columns="[
    { title: '文本框', render: (v) => h(NInput, { value: v.text, onUpdateValue: (newValue) => { v.text = newValue } }) },
    { title: '下拉框', render: (v) => h(NSelect, { options: [{label: '选项1', value: 1}, {label: '选项2', value: 2}], value: v.select, onUpdateValue: (newValue) => { v.select = newValue } }) },
  ]"
/>`)

const tableColumns: TableColumn[] = [
  {
    title: '商品',
    renderType: 'media',
    key: 'id',
    renderProps: {
      image: 'image',
      title: 'title',
      desc: 'active',
    },
  },
]

const selectColumns: DuxDynamicDataColumn[] = [
  { key: 'id', title: '商品', render: v => h(DuxMedia, {
    title: v?.title as string,
    image: v?.image as string,
    desc: v?.active as string,
  }) },
  { key: 'num', title: '数量', render: v => h(NInputNumber, { value: v.num || 1, onUpdateValue: (newValue) => { v.num = newValue } }) },
]
</script>

<template>
  <dux-page>
    <div class="grid grid-cols-1 gap-2">
      <dux-example title="动态录入器" :code="baseCode">
        <dux-dynamic-data
          :columns="[
            { title: '文本框', render: (v) => h(NInput, { value: v.text, onUpdateValue: (newValue) => { v.text = newValue } }) },
            { title: '下拉框',
              render: (v) => h(NSelect, { options: [
                                            {
                                              label: '选项1', value: 1,
                                            },
                                            {
                                              label: '选项2', value: 2,
                                            },
                                          ],
                                          value: v.select,
                                          onUpdateValue: (newValue) => { v.select = newValue } }) },
          ]"
        />
      </dux-example>

      <dux-example title="动态选择录入器" :code="baseCode">
        <dux-dynamic-select
          url="/mall"
          :columns="selectColumns"
          :table-columns="tableColumns"
          :filter="[
            {
              label: '关键词',
              type: 'input',
              name: 'keyword',
            },
          ]"
        />
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
