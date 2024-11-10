import { createRouter, createWebHashHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/:path(.*)*', component: () => import('../pages/notFoundAll'), name: 'global404', meta: { title: 'NotFound' } },
  ],
})
