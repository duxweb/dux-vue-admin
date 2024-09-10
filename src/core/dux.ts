import GoCaptcha from 'go-captcha-vue'
import naive from 'naive-ui'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { App } from 'vue'
import component from './components/component'
import { i18n } from './i18n'
import router from './router'
import 'go-captcha-vue/dist/style.css'
import '@unocss/reset/tailwind-compat.css'
import 'vfonts/Lato.css'
import 'animate.css'
import 'naive-ui-table/dist/style.css'

// import 'virtual:uno.css'
import '../style.css'

export const Dux = {
  install(app: App) {
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    app.use(i18n)
    app.use(pinia)
    app.use(router)
    app.use(naive)
    app.use(component)
    app.use(GoCaptcha)
  },
}
