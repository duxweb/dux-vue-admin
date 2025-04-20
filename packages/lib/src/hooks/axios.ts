import type { AxiosInstance } from 'axios'
import type { Ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { i18n } from '../i18n'
import { useManageStore } from '../stores'
import { useResource } from './useResource'

export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

export interface useAxiosProps {
  raw?: boolean
}

// 扩展 Axios 的请求配置类型
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    loading?: Ref<boolean>
  }

  interface AxiosResponse<T = any> {
    code?: number
    message?: string
    data: T
    [key: string]: any
  }
}

// 用于存储不同props配置的实例
const instancesMap = new Map<string, AxiosInstance>()

export function useAxios(props?: useAxiosProps) {
  const key = props?.raw ? 'raw' : 'default'

  // 如果已存在对应配置的实例，直接返回
  if (instancesMap.has(key)) {
    return instancesMap.get(key)!
  }

  const { getUser, logout } = useManageStore()
  const res = useResource()
  const router = useRouter()

  const instance = axios.create({
    headers: {
      'Accept': 'application/json',
      'Accept-Language': i18n.global.locale?.value,
    },
  })

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      const user = getUser()

      if (user?.token) {
        config.headers.Authorization = user?.token
      }

      if (config.loading) {
        config.loading.value = true
      }

      return config
    },
  )

  // 响应拦截器
  instance.interceptors.response.use(
    (response): any => {
      if (response.config?.loading) {
        response.config.loading.value = false
      }

      if (response.status === 204) {
        return undefined
      }
      if (response.status === 200) {
        // 确保返回符合 ApiResponse 类型
        return props?.raw ? response : response.data as ApiResponse
      }
      return Promise.reject(props?.raw ? response : response.data)
    },
    (error) => {
      if (error.config?.loading) {
        error.config.loading.value = false
      }

      if (error.status === 401) {
        logout()
        router.push({ path: `/${res.manage.value}/login` })
        return
      }
      return Promise.reject(props?.raw ? error : error?.response?.data)
    },
  )

  // 将实例存入Map
  instancesMap.set(key, instance)

  return instance
}
