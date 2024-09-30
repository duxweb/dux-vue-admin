export default [
  {
    label: '页面',
    name: 'page.index',
    icon: 'i-tabler:layout-dashboard',
  },

  {
    label: '列表页',
    name: 'list.index',
    parent: 'page.index',
  },
  {
    label: '表单页',
    name: 'form.index',
    parent: 'page.index',
  },
  {
    label: '详情页',
    name: 'info.index',
    parent: 'page.index',
  },
  {
    label: '状态页',
    name: 'status.index',
    parent: 'page.index',
  },

  {
    label: '异步表格',
    name: 'list.table',
    path: 'list/table',
    parent: 'list.index',
    component: () => import('../../pages/page/list/table.vue'),
  },
  {
    label: '卡片列表',
    name: 'list.card',
    path: 'list/card',
    parent: 'list.index',
    component: () => import('../../pages/page/list/cardList.vue'),
  },
  {
    label: '通用表单',
    name: 'form.form',
    path: 'form/form',
    parent: 'form.index',
    component: () => import('../../pages/page/form/form.vue'),
  },
  {
    label: '步骤表单',
    name: 'form.stepForm',
    path: 'form/stepForm',
    parent: 'form.index',
    component: () => import('../../pages/page/form/stepForm.vue'),
  },

  {
    label: '普通详情页',
    name: 'info.base',
    path: 'info/base',
    parent: 'info.index',
    component: () => import('../../pages/page/info/info.vue'),
  },

  {
    label: '403',
    name: 'status.403',
    path: 'status/403',
    parent: 'status.index',
    component: () => import('../../pages/page/status/403.vue'),
  },
  {
    label: '404',
    name: 'status.404',
    path: 'status/404',
    parent: 'status.index',
    component: () => import('../../pages/page/status/404.vue'),
  },
  {
    label: '500',
    name: 'status.500',
    path: 'status/500',
    parent: 'status.index',
    component: () => import('../../pages/page/status/500.vue'),
  },
  {
    label: '空数据',
    name: 'status.empty',
    path: 'status/empty',
    parent: 'status.index',
    component: () => import('../../pages/page/status/empty.vue'),
  },
  {
    label: '自定义',
    name: 'status.diy',
    path: 'status/diy',
    parent: 'status.index',
    component: () => import('../../pages/page/status/diy.vue'),
  },
]
