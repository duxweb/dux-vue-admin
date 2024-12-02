import type { Config } from '@duxweb/dux-vue-admin'
import { createDux } from '@duxweb/dux-vue-admin'
import { createApp } from 'vue'
import App from './App.vue'

declare global {
  interface Window {
    duxConfig?: Config
  }
}

const app = createApp(App)

const config: Config = {
  apiUrl: 'http://0.0.0.0:8900',
  captcha: true,
  manage: {
    admin: {
      apiPrefix: 'admin',
      title: '中后台管理系统',
      userMenu: [
        {
          label: '个人资料',
          path: 'system/profile',
          icon: 'i-tabler:settings',
        },
      ],
    },
  },

}

app.use(createDux(config))

app.mount('#app')
