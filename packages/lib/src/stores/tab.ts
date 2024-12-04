import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type DuxRoute, useRouteStore } from './route'

export interface TabRoute extends DuxRoute {
  url?: string
}

export const useTabStore = defineStore('tab', () => {
  const current = ref<string>()
  const tabs = ref<TabRoute[]>([])
  const routeStore = useRouteStore()

  const isTab = (url: string) => {
    return tabs.value.some(tag => tag.url === url)
  }
  const addTab = (item: TabRoute, cb?: (item: TabRoute) => void) => {
    if (!item.url) {
      return
    }
    if (!tabs.value.some(tag => tag.url === item.url)) {
      tabs.value.push(item)
      cb?.(item)
    }
    current.value = item.url as string
  }

  const delTab = (url: string, cb?: (item: TabRoute) => void) => {
    const index = tabs.value.findIndex(t => t.url === url)
    if (!index || tabs.value.length <= 1) {
      return
    }

    const tab = tabs.value[index]
    if (tab?.meta?.lock) {
      return
    }

    const prev = tabs.value[index - 1]
    const next = tabs.value[index + 1]

    cb?.(prev || next)

    setTimeout(() => {
      tabs.value.splice(index, 1)
    }, 0)
  }

  const delOther = (url: string, cb?: () => void) => {
    tabs.value = tabs.value.filter(t => t.url === url || t.meta?.lock)
    cb?.()
  }

  const delLeft = (url: string, cb?: () => void) => {
    const index = tabs.value.findIndex(t => t.url === url)
    if (index <= 0) {
      return
    }
    tabs.value = [...tabs.value.slice(0, index).filter(t => t.meta?.lock), ...tabs.value.slice(index)]
    cb?.()
  }

  const delRight = (url: string, cb?: () => void) => {
    const index = tabs.value.findIndex(t => t.url === url)
    if (index === -1 || index === tabs.value.length - 1) {
      return
    }
    tabs.value = [...tabs.value.slice(0, index + 1), ...tabs.value.slice(index + 1).filter(t => t.meta?.lock)]
    cb?.()
  }

  const lockTab = (url: string) => {
    const index = tabs.value.findIndex(t => t.url === url)
    if (index !== -1 && tabs.value[index]) {
      if (!tabs.value[index].meta) {
        tabs.value[index].meta = {}
      }
      tabs.value[index].meta.lock = !tabs.value[index].meta.lock
    }
  }

  const changeTab = (url: string, cb?: (item: TabRoute) => void) => {
    current.value = url
    const info = tabs.value.find(t => t.url === url)
    if (info) {
      cb?.(info)
    }
  }

  const indexRoute = routeStore.getIndexRoute()
  if (indexRoute) {
    addTab({ meta: { ...indexRoute.meta, lock: true }, label: indexRoute?.label, url: indexRoute?.path, name: indexRoute?.name || '' })
  }

  return {
    current,
    tabs,
    isTab,
    addTab,
    delTab,
    changeTab,
    delOther,
    delLeft,
    delRight,
    lockTab,
  }
})
