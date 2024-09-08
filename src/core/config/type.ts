import type { DuxRoute } from '../stores'

export interface ConfigManage {
  title: string
  default?: boolean
  register?: boolean
  forgotPassword?: boolean
  updatePassword?: boolean
  [key: string]: any
}

export type ConfigLang = 'en-US' | 'zh-CN'

export interface ConfigApiConfig {
  login: string
  check?: string
  captcha?: string
  register?: string
  forgotPassword?: string
  updatePassword?: string
  upload?: string
  uploadManage?: string
  menu?: string
}

export interface Config {
  apiUrl?: string
  apiConfig?: ConfigApiConfig
  logo?: string
  darkLogo?: string
  logoBanner?: string
  logoCopyright?: string
  lang?: ConfigLang
  captcha?: boolean
  amapMapKey?: string
  manage?: Record<string, ConfigManage>
  router?: DuxRoute[]
  asyncRouter?: boolean
}
