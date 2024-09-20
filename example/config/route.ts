export const route = [
  {
    label: '仪表盘',
    name: 'home',
    icon: 'i-tabler:dashboard',
  },
  {
    label: '首页',
    name: 'index',
    path: 'index',
    parent: 'home',
    component: () => import('../pages/home/work.vue'),
  },
  {
    label: '店铺主页',
    name: 'home.store',
    path: 'home/store',
    parent: 'home',
    component: () => import('../pages/home/store.vue'),
  },
  {
    label: '销售统计',
    name: 'home.stats',
    path: 'home/stats',
    parent: 'home',
    component: () => import('../pages/home/stats.vue'),
  },
  {
    label: '表单编辑器',
    name: 'home.form',
    path: 'home/form',
    icon: 'i-tabler:edit',
    component: () => import('../pages/home/form.vue'),
  },
]
