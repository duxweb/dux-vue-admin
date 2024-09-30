export default [
  {
    label: '组件',
    name: 'component.index',
    icon: 'i-tabler:components',
  },

  {
    label: '统计组件',
    name: 'component.total',
    parent: 'component.index',
  },
  {
    label: '统计卡片',
    name: 'component.stats',
    path: 'component/stats',
    parent: 'component.total',
    component: () => import('../../pages/component/total/card.vue'),
  },
  {
    label: '欢迎组件',
    name: 'component.hello',
    path: 'component/hello',
    parent: 'component.total',
    component: () => import('../../pages/component/total/hello.vue'),
  },
  {
    label: '边栏组件',
    name: 'component.sider',
    path: 'component/sider',
    parent: 'component.total',
    component: () => import('../../pages/component/total/sider.vue'),
  },
  {
    label: '列表组件',
    name: 'component.list',
    path: 'component/list',
    parent: 'component.index',
    component: () => import('../../pages/component/list.vue'),
  },
  {
    label: '信息组件',
    name: 'component.info',
    path: 'component/info',
    parent: 'component.total',
    component: () => import('../../pages/component/total/info.vue'),
  },

  {
    label: '表格组件',
    name: 'component.table',
    parent: 'component.index',
  },
  {
    label: '基础表格',
    name: 'component.baseTable',
    path: 'component/baseTable',
    parent: 'component.table',
    component: () => import('../../pages/component/table/baseTable.vue'),
  },
  {
    label: '异步表格',
    name: 'component.dataTable',
    path: 'component/dataTable',
    parent: 'component.table',
    component: () => import('../../pages/component/table/dataTable.vue'),
  },
  {
    label: 'hook 表格',
    name: 'component.useTable',
    path: 'component/useTable',
    parent: 'component.table',
    component: () => import('../../pages/component/table/useTable.vue'),
  },

]
