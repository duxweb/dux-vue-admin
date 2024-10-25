import type { DuxUploadType } from '../components'
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
  indexPath?: string
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
  register?: string
  forgotPassword?: string
  updatePassword?: string
  upload?: string
  uploadManage?: string
  uploadType?: DuxUploadType
  router?: string
  notice?: string
  aiChat?: string
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
  asyncRouter?: boolean
}
