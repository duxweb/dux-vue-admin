import type { Config } from 'dux-vue-admin'
import { createDux } from 'dux-vue-admin'
import { createApp } from 'vue'
import App from './App.vue'

declare global {
  interface Window {
    duxConfig?: Config
  }
}

const app = createApp(App)

const config: Config = window.duxConfig || {}

app.use(createDux(config))

app.mount('#app')
