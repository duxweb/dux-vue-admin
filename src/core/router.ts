import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

export const routes: Readonly<RouteRecordRaw[]> = [
  { path: '/:manage/login', component: () => import('./pages/login'), name: 'login' },
  { path: '/:manage/:path(.*)*', component: () => import('./router/loader') },
  { path: '/notFound', component: () => import('./pages/notFound'), name: 'notFound', meta: { title: '页面不存在' } },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
