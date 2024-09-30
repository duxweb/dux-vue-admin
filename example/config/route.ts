import chart from './route/chart'
import component from './route/component'
import home from './route/home'
import page from './route/page'

export const route = [
  ...home,
  ...page,
  ...component,
  ...chart,

  {
    label: '表单编辑器',
    name: 'home.form',
    path: 'home/form',
    icon: 'i-tabler:edit',
    component: () => import('../pages/example/form.vue'),
  },

]
