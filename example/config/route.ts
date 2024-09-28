export const route = [
  {
    label: '仪表盘',
    name: 'home',
    icon: 'i-tabler:dashboard',
  },
  {
    label: '列表',
    name: 'list.index',
    icon: 'i-tabler:table',
  },
  {
    label: '表单',
    name: 'form.index',
    icon: 'i-tabler:forms',
  },
  {
    label: '组件',
    name: 'component.index',
    icon: 'i-tabler:components',
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
    component: () => import('../pages/example/form.vue'),
  },
  {
    label: '异步表格页',
    name: 'list.table',
    path: 'list/table',
    parent: 'list.index',
    component: () => import('../pages/list/table.vue'),
  },
  {
    label: '卡片列表页',
    name: 'list.card',
    path: 'list/card',
    parent: 'list.index',
    component: () => import('../pages/list/card.vue'),
  },
  {
    label: '通用表单页',
    name: 'form.form',
    path: 'form/form',
    parent: 'form.index',
    component: () => import('../pages/form/form.vue'),
  },
  {
    label: '步骤表单页',
    name: 'form.stepForm',
    path: 'form/stepForm',
    parent: 'form.index',
    component: () => import('../pages/form/stepForm.vue'),
  },
  {
    label: '统计卡片',
    name: 'component.stats',
    path: 'component/stats',
    parent: 'component.index',
    component: () => import('../pages/stats/card.vue'),
  },

  {
    label: '图表',
    name: 'component.chart',
    parent: 'component.index',
  },

  {
    label: '网格图表',
    name: 'component.chartGrid',
    path: 'component/chartGrid',
    parent: 'component.chart',
    component: () => import('../pages/stats/chartGrid.vue'),
  },

]
