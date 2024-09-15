import { createDux } from 'dux-vue-admin'
import { createApp } from 'vue'
import type { Config } from 'dux-vue-admin'
import App from './App.vue'
import '../src/style.css'

const app = createApp(App)

const config: Config = {
  apiUrl: 'http://localhost:8900',
  manage: {
    admin: {
      title: '中后台管理系统',
      apiPrefix: 'admin',
      routers: [
        {
          label: '主页',
          name: 'index',
          path: 'index',
          icon: 'i-tabler:home',
          component: () => import('./components/index.vue'),
        },
      ],
    },
  },

}

app.use(createDux(config))

app.mount('#app')
