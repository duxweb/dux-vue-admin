import type { Config } from './config'
import initUnocssRuntime from '@unocss/runtime'
import GoCaptcha from 'go-captcha-vue'
import naive from 'naive-ui'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { type App, ref } from 'vue'
import DuxApp from './App.vue'
import component from './components/component'
import { config as unoConfig } from './config/uno.config.js'
import { router } from './core/router'
import { permissionDirective } from './directive'
import { i18n } from './i18n'

import '@logicflow/core/lib/style/index.css'
import 'go-captcha-vue/dist/style.css'
import 'vfonts/Lato.css'
import 'animate.css'
import './style.css'
import 'aieditor/dist/style.css'
import 'vue-cropper/dist/index.css'

export function createDux(config: Config) {
  initUnocssRuntime({
    defaults: unoConfig,
  })

  if (config.lang) {
    i18n.global.locale = config.lang
  }

  return {
    install(app: App) {
      const pinia = createPinia()
      pinia.use(piniaPluginPersistedstate)
      const manageRef = ref<string>()
      app.provide('dux.config', config)
      app.provide('dux.manage', manageRef)
      app.directive('can', permissionDirective)
      app.use(i18n)
      app.use(pinia)
      app.use(router)
      app.use(naive)
      app.use(component)
      app.use(GoCaptcha)
      app.component('DuxApp', DuxApp)
    },
  }
}
