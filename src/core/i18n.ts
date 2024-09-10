import { createI18n } from 'vue-i18n'
import enUS from '../locales/en-US.json'
import zhCN from '../locales/zh-CN.json'

export const languageMaps = {
  'en-US': 'English',
  'zh-CN': '简体中文',
}

export const i18n = setupI18n({})

export function getLanguage() {
  let storedLang = localStorage.getItem('i18nextLng')
  const userLanguage = navigator.language
  if (!storedLang) {
    if (!languageMaps[userLanguage]) {
      storedLang = 'en-US'
    }
    localStorage.setItem('i18nextLng', userLanguage)
    storedLang = userLanguage
  }
  return storedLang
}

export function importI18ns(i18n, files: Record<string, unknown>) {
  for (const path in files) {
    const filename = path.split('/').pop()
    if (!filename) {
      continue
    }
    const names = filename.split('.')
    const messages = files[path] as Record<string, any>
    const name = names[0]
    i18n.global.setLocaleMessage(name, messages)
  }
}

export function setupI18n(options) {
  const app = createI18n({
    ...options,
    locale: getLanguage(),
    fallbackLocale: 'en-US',
    legacy: false,
  })
  const data = {
    'en-US': enUS,
    'zh-CN': zhCN,
  }
  importI18ns(app, data)
  return app
}

export function setLanguage(locale) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  }
  else {
    i18n.global.locale.value = locale
  }

  localStorage.setItem('i18nextLng', locale)
}
