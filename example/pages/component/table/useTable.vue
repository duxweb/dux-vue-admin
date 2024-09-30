<script setup lang="ts">
import { useTable } from 'dux-vue-admin'
import { ref } from 'vue'

const baseCode = ref(`<script setup>
import { ref } from 'vue'

const table = useTable({
  key: 'id',
  url: '/mall',
  columns: [
    {
      title: '商品',
      key: 'title',
      width: 300,
      renderType: 'media',
      renderProps: {
        title: 'title',
        image: 'image',
        desc: 'active',
      },
    },
    {
      title: '价格',
      key: 'sell_price',
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
      key: 'sale_num',
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
      key: 'up_at',
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
  ],
  columnActions: [
    {
      label: '编辑',
      color: 'primary',
      type: 'drawer',
      component: () => import('./edit.vue'),
    },

    {
      label: '删除',
      color: 'error',
      type: 'confirm',
    },
  ],
})
<\/script>
<template>
  <n-data-table
    :loading="table.loading.value"
    :data="table.data.value"
    :columns="table.tableColumns.value"
    :pagination="table.pagination.value"
    v-bind="{ ...table.tableParams.value }"
  />
</template>`)

const table = useTable({
  key: 'id',
  url: '/mall',
  columns: [
    {
      title: '商品',
      key: 'title',
      width: 300,
      renderType: 'media',
      renderProps: {
        title: 'title',
        image: 'image',
        desc: 'active',
      },
    },
    {
      title: '价格',
      key: 'sell_price',
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
      key: 'sale_num',
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
      key: 'up_at',
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
  ],
  columnActions: [
    {
      label: '编辑',
      color: 'primary',
      type: 'drawer',
      component: () => import('./edit.vue'),
    },

    {
      label: '删除',
      color: 'error',
      type: 'confirm',
    },
  ],
})
</script>

<template>
  <dux-page>
    <div class="grid grid-cols-1 gap-2">
      <dux-example title="组件示例" :code="baseCode" lang="vue">
        <n-alert type="info" class="mb-2">
          配合 usbTable 可以手动自定义调用表格数据
        </n-alert>
        <n-data-table
          :loading="table.loading.value"
          :data="table.data.value"
          :columns="table.tableColumns.value"
          :pagination="table.pagination.value"
          v-bind="{ ...table.tableParams.value }"
        />
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
