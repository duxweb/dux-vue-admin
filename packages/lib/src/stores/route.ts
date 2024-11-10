import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface DuxRoute {
  label?: string
  labelLang?: string
  name: string
  path?: string
  icon?: string
  sort?: number
  parent?: string
  hidden?: boolean
  loader?: string
  component?: () => any
  meta?: Record<string, any>
}

export const useRouteStore = defineStore('routes', () => {
  const routes = ref<DuxRoute[]>([])
  const init = ref<boolean>(false)
  const asyncInit = ref<boolean>(false)

  const searchRoute = (path: string) => {
    return routes.value?.find((item) => {
      return item.path === path
    })
  }

  const searchRouteName = (name: string) => {
    return routes.value?.find((item) => {
      return item.name === name
    })
  }

  const appendRoute = (data: DuxRoute) => {
    routes.value?.push(data)
  }

  const appendRoutes = (data: DuxRoute[]) => {
    routes.value = [...routes.value, ...data]
  }

  const setRoutes = (data: DuxRoute[]) => {
    routes.value = data
  }

  const getRoutes = () => {
    return routes.value
  }

  const getIndexRoute = () => {
    const indexRoute = routes.value?.find((item) => {
      if (item.name === '404' || item.name === '403') {
        return false
      }
      return !!item.path
    })

    if (indexRoute) {
      return indexRoute
    }
  }

  return {
    routes,
    init,
    asyncInit,
    searchRoute,
    searchRouteName,
    appendRoute,
    appendRoutes,
    setRoutes,
    getRoutes,
    getIndexRoute,
  }
})
