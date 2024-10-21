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
  <dux-tab-page default-value="0">
    <template #header>
      <div class="p-4">
        <dux-media title="Admin" desc="超级管理员" image="https://picsum.photos/100/100" :image-width="40" :image-height="40" />
      </div>
    </template>
    <dux-tab-page-item value="0" label="个人资料">
      <n-alert type="info">
        该页面为示例页面，您可以接入右上角的用户菜单，实现个人资料修改功能。
      </n-alert>
      <n-form>
        <div class="divide-y divide-gray-2">
          <dux-page-form-item label="头像" desc="请上传 1M 以内的头像" path="avatar">
            <dux-image-upload v-model:value="form.avatar" />
          </dux-page-form-item>
          <dux-page-form-item label="用户名" desc="登录系统使用的用户名" path="username">
            <n-input v-model:value="form.username" />
          </dux-page-form-item>
          <dux-page-form-item label="昵称" desc="账号显示的名称" path="nickname">
            <n-input v-model:value="form.nickname" />
          </dux-page-form-item>
          <dux-page-form-item label="密码" desc="不修改密码请留空" path="password">
            <n-input v-model:value="form.password" type="password" :input-props="{ autocomplete: 'new-password' }" />
          </dux-page-form-item>
        </div>
      </n-form>
      <template #footer>
        <NButton tertiary>
          重置
        </NButton>
        <NButton type="primary">
          提交
        </NButton>
      </template>
    </dux-tab-page-item>

    <dux-tab-page-item value="1" label="登录日志">
      <div class="h-full">
        <dux-table
          class="h-full"
          url="/mall"
          flex-height
          :columns="columns"
        />
      </div>
    </dux-tab-page-item>

    <dux-tab-page-item value="2" label="操作日志">
      <dux-table
        class="h-full"
        url="/mall"
        flex-height
        :columns="columns"
      />
    </dux-tab-page-item>
  </dux-tab-page>
</template>

<style scoped>
</style>
