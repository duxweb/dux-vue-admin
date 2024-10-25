import type { RouteRecordRaw } from 'vue-router'
import type { DuxRoute } from '../stores'
import { useMessage } from 'naive-ui'
import { useClient, useResource } from '../hooks'
import { useRouteStore } from '../stores'
import { router } from './router'

export function createManage(manage: string, routers: DuxRoute[]) {
  const routeStore = useRouteStore()

  routers.push({
    path: `403`,
    component: () => import('../pages/notPermission'),
    name: '403',
    labelLang: 'pages.403.title',
    hidden: true,
  })

  routers.push({
    path: `404`,
    component: () => import('../pages/notFound'),
    name: '404',
    labelLang: 'pages.404.title',
    hidden: true,
  })

  const children: RouteRecordRaw[] = []
  routers?.forEach((item) => {
    routeStore.appendRoute({
      ...item,
      path: item.path ? `/${manage}/${item.path}` : undefined,
    })

    if (!item.path) {
      return false
    }
    const itemRoute: RouteRecordRaw = {
      path: item.path,
      name: item.name,
      component: item.component,
      children: [],
      meta: {
        title: item.label,
        ...item.meta,
      },
    }
    children.push(itemRoute)
  })

  router.addRoute({
    path: `/${manage}`,
    children: [
      {
        path: '',
        name: 'Manage',
        component: () => import('../pages/main.vue'),
        children: [
          ...children,
          {
            path: ':path(.*)*',
            component: () => import('../router/loader'),
          },
        ],
      },
      { path: 'login', component: () => import('../pages/login'), name: 'login' },
    ],
  })
}

export function initAsyncRouter() {
  const res = useResource()
  const client = useClient()
  const routeStore = useRouteStore()
  const message = useMessage()

  if (routeStore.asyncInit) {
    return
  }

  client?.get({
    url: res.routerUrl,
  }).then((data) => {
    const list: DuxRoute[] = []
    data?.data?.forEach((item) => {
      list.push({
        ...item,
        path: item.path ? `/${res.manage}/${item.path}` : undefined,
      })
    })
    routeStore.appendRoutes(list)
    routeStore.asyncInit = true
  }).catch((err) => {
    message.error(err?.message || 'get router error')
  })
}
