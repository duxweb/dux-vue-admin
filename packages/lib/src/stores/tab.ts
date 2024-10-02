import type { DuxRoute } from './route'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useResource } from '../hooks'

export const useTabStore = defineStore('tab', () => {
  const current = ref<string>()
  const tabs = ref<DuxRoute[]>([])
  const resource = useResource()

  const isTab = (name: string) => {
    return tabs.value.some(tag => tag.name === name)
  }
  const addTab = (item: DuxRoute, cb?: (item: DuxRoute) => void) => {
    if (!item.name) {
      return
    }
    if (!tabs.value.some(tag => tag.name === item.name)) {
      tabs.value.push(item)
      cb?.(item)
    }
    current.value = item.name as string
  }

  const delTab = (name: string, cb?: (item: DuxRoute) => void) => {
    const index = tabs.value.findIndex(t => t.name === name)
    if (!index || tabs.value.length <= 1) {
      return
    }

    const prev = tabs.value[index - 1]
    const next = tabs.value[index + 1]

    cb?.(prev || next)

    setTimeout(() => {
      tabs.value.splice(index, 1)
    }, 0)
  }

  const changeTab = (name: string, cb?: (item: DuxRoute) => void) => {
    current.value = name
    const info = tabs.value.find(t => t.name === name)
    if (info) {
      cb?.(info)
    }
  }

  addTab({ labelLang: 'common.home', path: resource.getIndexPath(), name: 'index' })

  return {
    current,
    tabs,
    isTab,
    addTab,
    delTab,
    changeTab,
  }
})
