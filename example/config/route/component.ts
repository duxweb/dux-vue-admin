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

  {
    label: '表单组件',
    name: 'component.form',
    parent: 'component.index',
  },
  {
    label: 'json 表单',
    name: 'component.jsonForm',
    path: 'component/jsonForm',
    parent: 'component.form',
    component: () => import('../../pages/component/form/jsonForm.vue'),
  },

  {
    label: '窗口组件',
    name: 'component.window',
    parent: 'component.index',
  },
  {
    label: '弹窗',
    name: 'component.dialog',
    path: 'component/dialog',
    parent: 'component.window',
    component: () => import('../../pages/component/window/dialog.vue'),
  },
  {
    label: '模态框',
    name: 'component.modal',
    path: 'component/modal',
    parent: 'component.window',
    component: () => import('../../pages/component/window/modal.vue'),
  },
  {
    label: '抽屉',
    name: 'component.drawer',
    path: 'component/drawer',
    parent: 'component.window',
    component: () => import('../../pages/component/window/drawer.vue'),
  },

  {
    label: '选择器',
    name: 'component.picker',
    parent: 'component.index',
  },
  {
    label: '下拉选择器',
    name: 'component.select',
    path: 'component/select',
    parent: 'component.picker',
    component: () => import('../../pages/component/picker/select.vue'),
  },
  {
    label: '级联选择器',
    name: 'component.cascader',
    path: 'component/cascader',
    parent: 'component.picker',
    component: () => import('../../pages/component/picker/cascader.vue'),
  },
  {
    label: '地区选择器',
    name: 'component.region',
    path: 'component/region',
    parent: 'component.picker',
    component: () => import('../../pages/component/picker/region.vue'),
  },
  {
    label: '图标选择器',
    name: 'component.icon',
    path: 'component/icon',
    parent: 'component.picker',
    component: () => import('../../pages/component/picker/icon.vue'),
  },

  {
    label: '编辑器',
    name: 'component.edit',
    parent: 'component.index',
  },
  {
    label: 'AI 编辑器',
    name: 'component.editor',
    path: 'component/editor',
    parent: 'component.edit',
    component: () => import('../../pages/component/edit/aiEditor.vue'),
  },
  {
    label: '代码编辑器',
    name: 'component.codeEditor',
    path: 'component/codeEditor',
    parent: 'component.edit',
    component: () => import('../../pages/component/edit/codeEditor.vue'),
  },

  {
    label: '其他组件',
    name: 'component.other',
    parent: 'component.index',
  },
  {
    label: '图文信息',
    name: 'component.media',
    path: 'component/media',
    parent: 'component.other',
    component: () => import('../../pages/component/other/media.vue'),
  },
  {
    label: '幻灯片',
    name: 'component.carousel',
    path: 'component/carousel',
    parent: 'component.other',
    component: () => import('../../pages/component/other/carousel.vue'),
  },

]