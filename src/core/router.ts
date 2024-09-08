import { type RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

const routes: Readonly<RouteRecordRaw[]> = [
  // { path: '/admin/system/index', component: () => import('../pages/index.vue'), name: 'index', meta: { title: '首页' } },

  { path: '/:manage/login', component: () => import('../core/pages/loading'), name: 'login' },
  { path: '/:manage/:path(.*)*', component: () => import('../core/router/loader') },

  { path: '/notFound', component: () => import('../core/pages/notFound'), name: 'notFound', meta: { title: '页面不存在' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
