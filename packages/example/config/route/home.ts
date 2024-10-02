export default [
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
    component: () => import('../../pages/home/work.vue'),
  },
  {
    label: '店铺主页',
    name: 'home.store',
    path: 'home/store',
    parent: 'home',
    component: () => import('../../pages/home/store.vue'),
  },
  {
    label: '销售统计',
    name: 'home.stats',
    path: 'home/stats',
    parent: 'home',
    component: () => import('../../pages/home/stats.vue'),
  },
]
