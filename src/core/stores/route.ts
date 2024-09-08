import { defineStore } from 'pinia'

export interface DuxRoute {
  label: string
  name: string
  path?: string
  icon?: string
  sort?: number
  parent?: string
  component?: () => any
}

interface DuxRouteStore {
  routes: DuxRoute[]
}

export const useRouteStore = defineStore('routes', {
  state: () => ({ routes: [] } as DuxRouteStore),
  actions: {
    searchRoute(path: string) {
      return this.routes?.find((item) => {
        return item.path === path
      })
    },
    appendRoutes(data: DuxRoute[]) {
      this.routes = [...this.routes, ...data]
    },
    setRoutes(data: DuxRoute[]) {
      this.routes = data
    },
    getRoutes() {
      return this.routes
    },
  },
})
