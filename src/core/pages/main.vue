<script setup lang="ts">
import { useLoadingBar } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import { DuxLayout } from '../components/layout/layout'
import { useResource } from '../hooks'
import { useTabStore } from '../stores'

const loadingBar = useLoadingBar()

const router = useRouter()
const route = useRoute()

// 注册本地路由
const resource = useResource()
resource.registerRoutes()

router.beforeEach(() => {
  loadingBar.start()

  return true
})

router.afterEach(() => {
  setTimeout(() => {
    loadingBar.finish()
  }, 500)
})

const tabStore = useTabStore()

const cacheMap = new Map()

function wrap(name, component) {
  let cache
  const cacheName = name
  if (cacheMap.has(cacheName)) {
    cache = cacheMap.get(cacheName)
  }
  else {
    cache = {
      name: cacheName,
      render() {
        return component
      },
    }
    cacheMap.set(cacheName, cache)
  }
  return cache
}

tabStore.$subscribe((_mutation, state) => {
  cacheMap.forEach((cache) => {
    if (!state.tabs.some(t => t.path === cache.name)) {
      cacheMap.delete(cache.name)
    }
  })
})
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Suspense>
      <DuxLayout v-if="route.name !== 'login'">
        <keep-alive :include="tabStore.tabs.map(t => t.path || '')">
          <component :is="wrap(route.path, Component)" v-cloak un-cloak />
        </keep-alive>
      </DuxLayout>
      <component :is="Component" v-else v-cloak un-cloak />
      <template #fallback>
        <div>正在加载...</div>
      </template>
    </Suspense>
  </RouterView>
</template>

<style scoped>

</style>
