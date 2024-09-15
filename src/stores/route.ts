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
  component?: () => any
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

  return {
    routes,
    init,
    asyncInit,
    searchRoute,
    appendRoute,
    appendRoutes,
    setRoutes,
    getRoutes,
  }
})
