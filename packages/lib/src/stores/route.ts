import { defineStore } from 'pinia'
import { ref } from 'vue'
import { router } from '../core/router'

export interface DuxRoute {
  label?: string
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
  const asyncRouteNames = ref<string[]>([])

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

  const clearRoutes = () => {
    asyncRouteNames.value.forEach((name) => {
      if (name && router.hasRoute(name)) {
        router.removeRoute(name)
      }
    })
    asyncRouteNames.value = []
    routes.value = []
    asyncInit.value = false
  }

  const setAsyncRouteNames = (names: (string | undefined)[]) => {
    asyncRouteNames.value = names.filter((name): name is string => !!name)
  }

  const getIndexRoute = () => {
    const topRoutes = routes.value
      ?.filter(item => !item.parent && !item.name.includes('404') && !item.name.includes('403'))
      ?.sort((a, b) => (a.sort || 0) - (b.sort || 0))

    const findFirstValidRoute = (route: DuxRoute): DuxRoute | undefined => {
      if (route.path) {
        return route
      }

      const children = routes.value
        ?.filter(item => item.parent === route.name)
        ?.sort((a, b) => (a.sort || 0) - (b.sort || 0))

      for (const child of children || []) {
        const validRoute = findFirstValidRoute(child)
        if (validRoute) {
          return validRoute
        }
      }

      return undefined
    }

    for (const route of topRoutes || []) {
      const validRoute = findFirstValidRoute(route)
      if (validRoute) {
        return validRoute
      }
    }

    return undefined
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
    clearRoutes,
    setAsyncRouteNames,
    getIndexRoute,
  }
})
