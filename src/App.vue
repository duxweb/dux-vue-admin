<script setup lang="ts">
import { OverlaysProvider } from '@overlastic/vue'
import { dateZhCN, NConfigProvider, NDialogProvider, NMessageProvider, NModalProvider, zhCN } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { inject } from 'vue'
import type { Ref } from 'vue'
import { createManage } from './core/manage'
import { router, useManageStore, useRouteStore, useThemeStore } from './index'
import type { Config } from './index'

const props = defineProps({
})

// 主题处理
const themeStore = useThemeStore()
const { theme, themeOverrides } = storeToRefs(themeStore)

// 全局配置
const config = inject<Config>('dux.config')
const manageRef = inject<Ref<string>>('dux.manage')

const routeStore = useRouteStore()
const manageStore = useManageStore()

const firstManage = Object.getOwnPropertyNames(config?.manage)[0]

router.beforeEach((to, _from, next) => {
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
    console.log('注册路由', router.getRoutes())
    return next({ path: to.path, query: to.query, replace: true })
  }

  // if (to.name === '404') {
  //   return next()
  // }

  // 判断是否登录
  const user = manageStore.getUser()
  if (!user && to.name !== `login`) {
    console.log('跳转到登录')
    return next({ path: `/${manage}/login`, replace: true })
  }

  // 默认跳转到主页
  if (to.path === '/') {
    return next({ path: `/${firstManage}/index`, replace: true })
  }
  console.log('跳转到页面')
  return next()
})
</script>

<template>
  <NConfigProvider :theme="theme" :theme-overrides="themeOverrides" :locale="zhCN" :date-locale="dateZhCN" preflight-style-disabled>
    <NDialogProvider>
      <NModalProvider>
        <NMessageProvider>
          <OverlaysProvider>
            <n-loading-bar-provider>
              <RouterView v-slot="{ Component }">
                <component :is="Component" />
              </RouterView>
            </n-loading-bar-provider>
          </OverlaysProvider>
        </NMessageProvider>
      </NModalProvider>
    </NDialogProvider>
  </NConfigProvider>
</template>

<style>

</style>
