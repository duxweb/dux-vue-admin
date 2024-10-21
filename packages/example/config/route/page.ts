export default [
  {
    label: '页面',
    name: 'page.index',
    icon: 'i-tabler:layout-dashboard',
  },

  {
    label: '列表页',
    name: 'page.list',
    parent: 'page.index',
  },
  {
    label: '表单页',
    name: 'page.form',
    parent: 'page.index',
  },
  {
    label: '详情页',
    name: 'page.info',
    parent: 'page.index',
  },
  {
    label: '状态页',
    name: 'page.status',
    parent: 'page.index',
  },
  {
    label: '其他页',
    name: 'page.other',
    parent: 'page.index',
  },

  {
    label: '异步表格',
    name: 'list.table',
    path: 'list/table',
    parent: 'page.list',
    component: () => import('../../pages/page/list/table.vue'),
  },
  {
    label: '卡片列表',
    name: 'list.card',
    path: 'list/card',
    parent: 'page.list',
    component: () => import('../../pages/page/list/cardList.vue'),
  },
  {
    label: '通用表单',
    name: 'form.form',
    path: 'form/form',
    parent: 'page.form',
    component: () => import('../../pages/page/form/form.vue'),
  },
  {
    label: '步骤表单',
    name: 'form.stepForm',
    path: 'form/stepForm',
    parent: 'page.form',
    component: () => import('../../pages/page/form/stepForm.vue'),
  },
  {
    label: 'Tab表单',
    name: 'form.tabForm',
    path: 'form/tabForm',
    parent: 'page.form',
    component: () => import('../../pages/page/form/tabForm.vue'),
  },
  {
    label: '普通详情页',
    name: 'info.base',
    path: 'info/base',
    parent: 'page.info',
    component: () => import('../../pages/page/info/info.vue'),
  },

  {
    label: '403',
    name: 'status.403',
    path: 'status/403',
    parent: 'page.status',
    component: () => import('../../pages/page/status/403.vue'),
  },
  {
    label: '404',
    name: 'status.404',
    path: 'status/404',
    parent: 'page.status',
    component: () => import('../../pages/page/status/404.vue'),
  },
  {
    label: '500',
    name: 'status.500',
    path: 'status/500',
    parent: 'page.status',
    component: () => import('../../pages/page/status/500.vue'),
  },
  {
    label: '空数据',
    name: 'status.empty',
    path: 'status/empty',
    parent: 'page.status',
    component: () => import('../../pages/page/status/empty.vue'),
  },
  {
    label: '自定义',
    name: 'status.diy',
    path: 'status/diy',
    parent: 'page.status',
    component: () => import('../../pages/page/status/diy.vue'),
  },
  {
    label: '设置页',
    name: 'setting',
    path: 'setting',
    parent: 'page.other',
    component: () => import('../../pages/page/other/setting.vue'),
  },
]
