<script setup lang="ts">
import { ref } from 'vue'

const form = ref<Record<string, any>>({
  username: 'admin',
})

const columns = [
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
]
</script>

<template>
  <dux-message-page
    :tabs="[
      {
        label: '全部',
        value: 'all',
        icon: 'i-tabler:message',
      },
      {
        label: '未读',
        value: 'unread',
        icon: 'i-tabler:mail',
      },
      {
        label: '已读',
        value: 'archive',
        icon: 'i-tabler:mail-opened',
      },
    ]"
    url="/mall"
    label-field="title"
    desc-field="active"
    content-field="active"
    time-field="up_at"
  />
</template>

<style scoped>
</style>
