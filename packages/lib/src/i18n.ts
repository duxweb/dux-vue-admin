import { createI18n } from 'vue-i18n'
import enUS from './locales/en-US.json'
import zhCN from './locales/zh-CN.json'

export const languageMaps = {
  'en-US': 'English',
  'zh-CN': '简体中文',
}

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

/**
 * 设置国际化配置
 * @param options - 国际化配置选项
 * @returns 返回一个配置好的国际化实例
 *
 * 该函数用于创建并配置国际化实例，支持英语（美国）和中文（中国）两种语言。
 * 默认语言为系统获取的语言，如果获取失败则默认为英语（美国）。
 * 提供了货币和数字格式化的配置。
 */
export function setupI18n(options) {
  const app = createI18n({
    ...options,
    locale: getLanguage(),
    fallbackLocale: 'en-US',
    legacy: false,
    numberFormats: {
      'en-US': {
        currency: {
          style: 'currency',
          currency: 'USD',
        },
        decimal: {
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
      'zh-CN': {
        currency: {
          style: 'currency',
          currency: 'CNY',
        },
        decimal: {
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    },
  })
  const data = {
    'en-US': enUS,
    'zh-CN': zhCN,
  }
  importI18ns(app, data)
  return app
}

export const i18n = setupI18n({})

export function setLanguage(locale) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  }
  else {
    i18n.global.locale.value = locale
  }

  localStorage.setItem('i18nextLng', locale)
}
