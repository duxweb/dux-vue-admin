import type { DuxRoute } from '../stores'

interface UserMenu {
  label: string
  path: string
  icon?: string
}

export interface ConfigManage {
  title: string
  default?: boolean
  register?: boolean
  forgotPassword?: boolean
  updatePassword?: boolean
  [key: string]: any
  apiPrefix?: string
  routers?: DuxRoute[]
  userMenu?: UserMenu[]
}

export type ConfigLang = 'en-US' | 'zh-CN'

export interface ConfigApiConfig {
  login: string
  logout?: string
  check?: string
  captcha?: string
  verify?: string
  upload?: string
  uploadManage?: string
  router?: string
  i18n?: string
  message?: string
  aiChat?: string
}

export interface Config {
  apiUrl?: string
  apiConfig?: ConfigApiConfig
  logo?: string
  darkLogo?: string
  loginBanner?: string
  copyright?: string
  lang?: ConfigLang
  captcha?: boolean
  amapMapKey?: string
  manage?: Record<string, ConfigManage>
  asyncRouter?: boolean
}
