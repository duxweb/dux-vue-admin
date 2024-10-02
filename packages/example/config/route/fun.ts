export default [
  {
    label: '功能',
    name: 'fun',
    icon: 'i-tabler:function',
  },
  {
    label: '文件下载',
    name: 'fun.download',
    path: 'fun/download',
    parent: 'fun',
    component: () => import('../../pages/fun/download.vue'),
  },
  {
    label: 'PDF 预览',
    name: 'fun.pdf',
    path: 'fun/pdf',
    parent: 'fun',
    component: () => import('../../pages/fun/pdf.vue'),
  },
  {
    label: '音频播放',
    name: 'fun.audio',
    path: 'fun/audio',
    parent: 'fun',
    component: () => import('../../pages/fun/audio.vue'),
  },
  {
    label: 'Excel 导入导出',
    name: 'fun.excel',
    path: 'fun/excel',
    parent: 'fun',
    component: () => import('../../pages/fun/excel.vue'),
  },
  {
    label: 'Tab 标签',
    name: 'fun.tab',
    path: 'fun/tab',
    parent: 'fun',
    component: () => import('../../pages/fun/tab.vue'),
  },

  {
    label: '用户操作',
    name: 'fun.user',
    path: 'fun/user',
    parent: 'fun',
    component: () => import('../../pages/fun/user.vue'),
  },

  {
    label: '图片预览',
    name: 'fun.image',
    path: 'fun/image',
    parent: 'fun',
    component: () => import('../../pages/fun/image.vue'),
  },
  {
    label: '数据请求',
    name: 'fun.client',
    path: 'fun/client',
    parent: 'fun',
    component: () => import('../../pages/fun/client.vue'),
  },
]
