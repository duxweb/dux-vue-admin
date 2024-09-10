<script setup lang="ts">
import type { Config } from 'dux-vue-admin'

const config: Config = {
  manage: {
    admin: {
      title: '中后台管理系统',
    },
  },
  router: [
    {
      label: '主页',
      name: 'example.index',
      path: '/example/index',
      icon: 'i-tabler:home',
      component: () => import('./components/HelloWorld.vue'),
    },
  ],
}
</script>

<template>
  <dux-app :config="config" />
</template>

<style scoped>
</style>
