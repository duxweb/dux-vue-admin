import type { Config } from 'dux-vue-admin'
import { createDux } from 'dux-vue-admin'
import { createApp } from 'vue'
import App from './App.vue'
import { route } from './config/route'

const app = createApp(App)

const config: Config = {
  apiUrl: 'https://mock.dux.plus',
  manage: {
    admin: {
      title: '中后台管理系统',
      apiPrefix: 'api',
      routers: route,
    },
  },

}

app.use(createDux(config))

app.mount('#app')