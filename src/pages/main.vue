<script setup lang="ts">
import { useLoadingBar } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import { DuxCommand, DuxLayout } from '../components'
import { initAsyncRouter } from '../core/manage'
import { useResource } from '../hooks'
import { useRouteStore, useTabStore } from '../stores'
import { DuxLoading } from './loading'

const router = useRouter()
const route = useRoute()
const routeStore = useRouteStore()
const resource = useResource()

const loadingBar = useLoadingBar()
router.beforeEach((to, _from, next) => {
  loadingBar.start()
  const routeInfo = routeStore.searchRoute(to.path)
  if (routeInfo) {
    to.name = routeInfo.name
    to.meta.title = routeInfo.label
    document.title = resource.config?.manage?.[resource.manage]?.title || ''
  }
  return next()
})

router.afterEach(() => {
  setTimeout(() => {
    loadingBar.finish()
  }, 300)
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

initAsyncRouter()
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Suspense>
      <DuxLayout
        v-cloak
        un-cloak
      >
        <keep-alive :include="tabStore.tabs.map(t => t.path || '')">
          <component :is="wrap(route.path, Component)" :key="route.path" />
        </keep-alive>
        <DuxCommand />
      </DuxLayout>
      <template #fallback>
        <DuxLoading />
      </template>
    </Suspense>
  </RouterView>
</template>

<style scoped>

</style>
