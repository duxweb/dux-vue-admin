import { createRouter, createWebHashHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/:path(.*)*', component: () => import('../pages/notFound'), name: '404', meta: { title: '页面不存在' } },
  ],
})
