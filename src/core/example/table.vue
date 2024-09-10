<script setup lang="ts">
import type { JsonFormItemSchema, TableAction, TableColumn } from '../components'

const tabs = [
  {
    label: '测试1',
    value: '1',
  },
  {
    label: '测试2',
    value: '2',
  },
  {
    label: '测试3',
    value: '3',
  },
]

const filter: JsonFormItemSchema[] = [
  {
    label: '测试1',
    type: 'input',
    name: 'test1',
  },
  {
    label: '测试1',
    type: 'input',
    name: 'test1',
  },
  {
    label: '测试1',
    type: 'input',
    name: 'test1',
  },
  {
    label: '测试1',
    type: 'input',
    name: 'test1',
  },
  {
    label: '测试1',
    type: 'input',
    name: 'test1',
  },
]

const actions: TableAction[] = [
  {
    label: '弹窗',
    color: 'primary',
    type: 'modal',
    icon: 'i-tabler:plus',
    component: () => import('./modalForm.vue'),
  },
  {
    label: '抽屉',
    type: 'drawer',
    icon: 'i-tabler:plus',
    component: () => import('./drawerForm.vue'),
  },
]

const columns: TableColumn[] = [
  {
    title: '商品',
    key: 'title',
    width: 300,
    renderType: 'media',
    renderProps: {
      image: 'image',
      title: 'title',
      desc: 'active',
    },
  },
  {
    title: '价格',
    key: 'price',
    width: 150,
    renderType: 'map',
    renderProps: {
      maps: [
        {
          label: '销售价',
          value: 'market_price',
        },
        {
          label: '市场价',
          value: 'sell_price',
        },
      ],
    },
  },
  {
    title: '销售',
    key: 'sale',
    width: 120,
    renderType: 'map',
    renderProps: {
      maps: [
        {
          label: '销量',
          value: 'sale_num',
        },
        {
          label: '库存',
          value: 'store_num',
        },
      ],
    },
  },
  {
    title: '发布日期',
    key: 'date',
    width: 180,
    renderType: 'map',
    renderProps: {
      maps: [
        {
          label: '上架',
          value: 'up_at',
        },
        {
          label: '下架',
          value: 'down_at',
        },
      ],
    },
  },
  {
    title: '状态',
    key: 'status',
    width: 120,
    renderType: 'status',
    renderProps: {
      maps: {
        success: {
          value: 2,
          label: '上架',
        },
        error: {
          value: 0,
          label: '下架',
        },
        warning: {
          value: 1,
          label: '待审',
        },
      },
    },
  },
]

const columnActions: TableAction[] = [
  {
    label: '弹窗',
    color: 'primary',
    type: 'modal',
    title: '弹窗标题',
    component: () => import('./modalForm.vue'),
  },
  {
    label: '抽屉',
    color: 'primary',
    type: 'drawer',
    component: () => import('./drawerForm.vue'),
  },

  {
    label: '删除',
    color: 'error',
    type: 'confirm',
  },
]
</script>

<template>
  <dux-page-table url="/mall" title="测试22" :tabs="tabs" :filter="filter" :actions="actions" :columns="columns" :column-actions="columnActions" />
</template>

<style scoped>

</style>
