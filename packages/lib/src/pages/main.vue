<script setup lang="ts">
import { useRoute } from 'vue-router'
import { DuxLayout } from '../components'
import { useTabStore } from '../stores'
import DuxLoading from './loading.vue'

const route = useRoute()

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
    if (!state.tabs.some(t => t.url === cache.name)) {
      cacheMap.delete(cache.name)
    }
  })
})
</script>

<template>
  <Suspense timeout="5000">
    <DuxLayout
      v-cloak
      un-cloak
    >
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in" appear>
          <keep-alive :include="tabStore.tabs.map(t => t.url || '')">
            <component :is="wrap(route.path, Component)" :key="route.path" />
          </keep-alive>
        </transition>
      </RouterView>
    </DuxLayout>
    <template #fallback>
      <DuxLoading />
    </template>
  </Suspense>
</template>

<style>
</style>
