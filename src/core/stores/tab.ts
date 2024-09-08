import { defineStore } from 'pinia'
import type { DuxRoute } from './route'

export const useTabStore = defineStore('tab', {
  state: (): { current: string, tabs: DuxRoute[] } => ({ current: 'index', tabs: [{
    label: '首页',
    path: '/admin/system/index',
    name: 'index',
  }] }),
  actions: {
    isTab(name: string) {
      return this.tabs.some(tag => tag.name === name)
    },
    addTab(item: DuxRoute, cb?: (item: DuxRoute) => void) {
      if (!item.name) {
        return
      }
      if (!this.tabs.some(tag => tag.name === item.name)) {
        this.tabs.push(item)
        cb?.(item)
      }
      this.current = item.name as string
    },
    delTab(name: string, cb?: (item: DuxRoute) => void) {
      const index = this.tabs.findIndex(t => t.name === name)
      if (!index || this.tabs.length <= 1) {
        return
      }

      const prev = this.tabs[index - 1]
      const next = this.tabs[index + 1]

      cb?.(prev || next)

      setTimeout(() => {
        this.tabs.splice(index, 1)
      }, 0)
    },
    changeTab(name: string, cb?: (item: DuxRoute) => void) {
      this.current = name
      const info = this.tabs.find(t => t.name === name)
      if (info) {
        cb?.(info)
      }
    },
  },
})
