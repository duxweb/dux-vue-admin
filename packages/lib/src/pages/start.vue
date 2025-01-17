<script setup lang="ts">
import type { Ref } from 'vue'
import type { Config } from '../index'
import { useLoadingBar } from 'naive-ui'
import { inject, ref } from 'vue'

import { createManage, initAsyncRouter } from '../core/manage'
import { router, useManageStore, usePermission, useRouteStore } from '../index'
import DuxLoading from './loading.vue'

// 全局配置
const config = inject<Config>('dux.config')
const manageRef = inject<Ref<string>>('dux.manage')

const routeStore = useRouteStore()
const manageStore = useManageStore()
const loadingBar = useLoadingBar()

const { can } = usePermission()

const firstManage = Object.getOwnPropertyNames(config?.manage)[0]
const loading = ref(true)

router.beforeEach(async (to, _from, next) => {
  loadingBar.start()
  // 解析管理端名
  const name = to.path.split('/')[1]
  const manage = Object.getOwnPropertyNames(config?.manage).find(item => item === name) || firstManage
  if (manageRef) {
    manageRef.value = manage
  }

  // 注册本地路由
  if (!routeStore.init) {
    for (const key in config?.manage) {
      createManage(key, config?.manage?.[key]?.routers || [])
    }
    routeStore.init = true
    return next({ path: to.path, query: to.query, replace: true })
  }

  // 判断是否登录
  const isLogin = manageStore.isLogin()
  if (!isLogin && to.name !== `login`) {
    return next({ path: `/${manage}/login`, replace: true })
  }

  // 加载异步路由
  if (isLogin) {
    const loadStatus = await initAsyncRouter()
    if (loadStatus) {
      return next({ path: to.path, replace: true })
    }
    // 动态设置路由信息
    const routeInfo = routeStore.searchRouteName(to.name as string)
    if (routeInfo) {
      const title = routeInfo.label
      to.meta.title = title
      document.title = `${title} - ${config?.manage?.[manage || 'admin']?.title}` || ''
    }
    // 判断路由权限
    if (to.name) {
      if (!can(to.name as string) && to.name !== '403') {
        return next({ path: `/${manage || 'admin'}/403`, replace: true })
      }
    }
  }

  // 默认跳转到主页
  if (to.path === '/' || to.path === '' || to.path === `/${manage}` || to.path === `/${manage}/`) {
    const indexRoute = routeStore.getIndexRoute()
    return next({ path: indexRoute?.path || '/', replace: true })
  }

  if (to.meta?.url) {
    // 打开外部链接
    window.open(to.meta.url as string, '_blank')
    return next(false)
  }

  return next()
})

router.afterEach(() => {
  setTimeout(() => {
    loadingBar.finish()
    loading.value = false
  }, 300)
})
</script>

<template>
  <DuxLoading v-if="loading" />
  <RouterView v-slot="{ Component }">
    <component :is="Component" />
  </RouterView>
</template>

<style></style>
