<script setup lang="ts">
import { ref } from 'vue'

const todoCode = ref(`<dux-stats-todo>
  <dux-stats-todo-item
    title="售前订单" value="0" :data="[
      {
        title: '待付款',
        value: 0,
      },
      {
        title: '待发货',
        value: 0,
      },
    ]"
  />
</dux-stats-todo>`)

const quickCode = ref(`<dux-stats-quick
  :data="[
    {
      title: '首页统计',
      icon: 'i-tabler:home',
    },
  ]"
/>
`)
</script>

<template>
  <dux-page>
    <div class="grid grid-cols-1 gap-2">
      <dux-example title="待办组件" :code="todoCode">
        <dux-stats-todo>
          <dux-stats-todo-item
            title="售前订单" value="0" :data="[
              {
                title: '待付款',
                value: 0,
              },
              {
                title: '待发货',
                value: 0,
              },
            ]"
          />
          <dux-stats-todo-item
            title="售中订单" value="0" :data="[
              {
                title: '待发货',
                value: 0,
              },
              {
                title: '待收货',
                value: 0,
              },
            ]"
          />
          <dux-stats-todo-item
            title="售后订单" value="0" :data="[
              {
                title: '待审核',
                value: 0,
              },
              {
                title: '待收货',
                value: 0,
              },
            ]"
          />
          <dux-stats-todo-item
            title="客服咨询" value="0" :data="[
              {
                title: '未回复',
                value: 0,
              },
              {
                title: '待处理',
                value: 0,
              },
            ]"
          />
        </dux-stats-todo>
      </dux-example>

      <dux-example title="快捷图标" :code="quickCode">
        <dux-stats-quick
          :data="[
            {
              title: '首页统计',
              icon: 'i-tabler:home',
            },
            {
              title: '首页统计',
              icon: 'i-tabler:home',
            },
            {
              title: '首页统计',
              icon: 'i-tabler:home',
            },
            {
              title: '首页统计',
              icon: 'i-tabler:home',
            },
            {
              title: '首页统计',
              icon: 'i-tabler:home',
            },
            {
              title: '首页统计',
              icon: 'i-tabler:home',
            },
            {
              title: '首页统计',
              icon: 'i-tabler:home',
            },
            {
              title: '首页统计',
              icon: 'i-tabler:home',
            },
          ]"
        />
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
