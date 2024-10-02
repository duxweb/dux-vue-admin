import chart from './route/chart'
import component from './route/component'
import fun from './route/fun'
import home from './route/home'
import page from './route/page'

export const route = [
  ...home,
  ...page,
  ...component,
  ...fun,
  ...chart,

  {
    label: '表单编辑器',
    name: 'home.form',
    path: 'home/form',
    icon: 'i-tabler:edit',
    component: () => import('../pages/example/form.vue'),
  },

  {
    label: '关于',
    name: 'about',
    path: 'about',
    icon: 'i-tabler:info-circle',
    component: () => import('../pages/about.vue'),
  },

]
