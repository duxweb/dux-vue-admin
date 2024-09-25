import { createDux } from 'dux-vue-admin'
import { createApp } from 'vue'
import type { Config } from 'dux-vue-admin'
import App from './App.vue'
import { route } from './config/route'
import '../src/style.css'

const app = createApp(App)

const config: Config = {
  apiUrl: 'http://mock.dux.plus',
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
