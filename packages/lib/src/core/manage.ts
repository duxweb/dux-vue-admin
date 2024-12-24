import type { RouteRecordRaw } from 'vue-router'
import type { DuxRoute } from '../stores'
import { useClient, useResource } from '../hooks'
import { i18n } from '../i18n'
import { useRouteStore } from '../stores'
import { router } from './router'

export function createManage(manage: string, routers: DuxRoute[]) {
  const routeStore = useRouteStore()

  routers.push({
    path: `403`,
    component: () => import('../pages/notPermission'),
    name: '403',
    label: '403',
    hidden: true,
  })

  routers.push({
    path: `404`,
    component: () => import('../pages/notFound'),
    name: '404',
    label: '404',
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
        name: `${manage}.manage`,
        component: () => import('../pages/main.vue'),
        children: [
          ...children,
          { path: ':path(.*)*', component: () => import('../pages/notFound'), name: 'notFound', meta: { title: (i18n?.global as any)?.t('pages.404.title') } },
        ],
      },
      { path: 'login', component: () => import('../pages/login'), name: 'login' },
    ],
  })
}

export async function initAsyncRouter() {
  const res = useResource()
  const routeStore = useRouteStore()
  const client = useClient()

  if (routeStore.asyncInit) {
    return false
  }

  await client?.get({
    url: res.routerUrl,
    config: {
      cacheFor: 0,
    },
  }).then((data) => {
    const list: DuxRoute[] = []
    const children: RouteRecordRaw[] = []
    data?.data?.forEach((item: DuxRoute) => {
      list.push({
        ...item,
        path: item.path ? `/${res.manage}/${item.path}` : undefined,
      })

      if (!item.path) {
        return true
      }

      const routeItem = {
        path: item.path,
        name: item.name,
        component: (item.meta?.src) ? () => import('../pages/iframe') : () => import('../router/loader'),
        children: [],
        meta: {
          loader: item.loader,
          icon: item.icon,
          ...item.meta,
        },
      }

      children.push(routeItem)
    })
    routeStore.appendRoutes(list)

    // 路由注册
    const manageRoute = router.getRoutes().find((v) => {
      if (v.name === `${res.manage}.manage`) {
        return true
      }
      return false
    })

    if (!manageRoute) {
      return
    }

    manageRoute.children = [
      ...(manageRoute?.children || []),
      ...children,
    ]

    children?.forEach((item) => {
      router.addRoute(`${res.manage}.manage`, item)
    })
  }).catch((err) => {
    throw err
  })

  routeStore.asyncInit = true
  return true
}
