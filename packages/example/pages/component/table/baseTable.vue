<script setup lang="ts">
import { ref } from 'vue'

const baseCode = ref(`<dux-base-table
  :columns="[
    {
      title: '商品',
      key: 'title',
      width: 300,
      renderType: 'media',
      renderProps: {
        title: 'title',
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
  ]"
  :data="[
    { id: 1, title: '商品名称', active: '商品活动内容', sell_price: '100.00', market_price: '120.00', sale_num: '100', store_num: '100', up_at: '2022-03-06 14:29:19', down_at: '2022-03-06 14:29:19', status: 2 },
  ]"
  :column-actions="[
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
  ]"
/>`)
</script>

<template>
  <dux-page>
    <div class="grid grid-cols-1 gap-2">
      <dux-example title="组件示例" :code="baseCode">
        <n-alert type="info" class="mb-2">
          基础组件由全数据驱动，在 naive ui 的 table 组件上增加一层渲染转换层来支持常用的样式组件。
        </n-alert>
        <dux-base-table
          :columns="[
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
          ]"
          :data="[
            { id: 1, title: '智能手表', active: '健康生活，从智能手表开始', image: 'https://picsum.photos/100/100', sell_price: '100.00', market_price: '120.00', sale_num: '100', store_num: '100', up_at: '2022-03-06 14:29:19', down_at: '2022-03-06 14:29:19', status: 2 },
            { id: 2, title: '无线蓝牙耳机', active: '享受无线自由的音乐体验', image: 'https://picsum.photos/100/100', sell_price: '199.00', market_price: '199.00', sale_num: '100', store_num: '100', up_at: '2022-03-06 14:29:19', down_at: '2022-03-06 14:29:19', status: 0 },
          ]"
          :column-actions="[
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
          ]"
        />
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
