import { type AlovaGenerics, type AlovaMethodCreateConfig, invalidateCache, type Method, type RequestBody } from 'alova'
import { useRouter } from 'vue-router'
import { useManageStore } from '../stores'
import { alovaInstance } from './alova'
import { useResource } from './useResource'

type Config<T> = AlovaMethodCreateConfig<AlovaGenerics, Record<string, any>, T>

type ClientMaps = Record<string, any>

export type ClientRequestType = 'json' | 'file' | 'form'
export interface ClientRequestProps<T> {
  url?: string
  data?: RequestBody
  params?: ClientMaps
  headers?: ClientMaps
  type?: ClientRequestType
  timeout?: number
  config?: Config<T>
}

export interface useClientProps {
  raw?: boolean
}

export function useClient(props?: useClientProps) {
  const { getUser, logout } = useManageStore()
  const res = useResource()
  const user = getUser()
  const router = useRouter()

  // 响应拦截器
  alovaInstance.options.baseURL = res.config?.apiUrl

  alovaInstance.options.responded = {
    onSuccess: async (response) => {
      const json = response.data
      if (response.status === 200) {
        return props?.raw ? response : json
      }
      else {
        return Promise.reject(props?.raw ? response : json)
      }
    },
    onError(error) {
      if (error.status === 401) {
        logout()
        router.push({ path: `/${res.manage}/login` })
        return
      }
      return Promise.reject(props?.raw ? error : error?.response?.data)
    },
  }

  const globalHeaders = (type?: ClientRequestType) => {
    const data = {
      Accept: 'application/json',
      Authorization: user?.token,
    }

    switch (type) {
      case 'file':
        break
      case 'form':
        data['Content-Type'] = 'application/x-www-form-urlencoded'
        break
      case 'json':
      default:
        data['Content-Type'] = 'application/json'
        break
    }
    return data
  }

  const Get = <T = any>({ url, timeout = 5000, headers, params, config }: ClientRequestProps<T>): Method => {
    return alovaInstance.Get<T>(url ? res.genUrl(url) : res?.resUrl, {
      headers: {
        ...globalHeaders(),
        ...headers,
      },
      name: url,
      params,
      timeout,
      ...config,
    })
  }

  const Post = <T = any>({ url, data, headers, params, config, type, timeout = 5000 }: ClientRequestProps<T>): Method => {
    return alovaInstance.Post<T>(url ? res.genUrl(url) : res?.resUrl, data, {
      headers: {
        ...globalHeaders(type),
        ...headers,
      },
      params,
      timeout,
      ...config,
    })
  }

  const Put = <T = any>({ url, data, headers, params, config, type, timeout = 5000 }: ClientRequestProps<T>): Method => {
    return alovaInstance.Put<T>(url ? res.genUrl(url) : res?.resUrl, data, {
      headers: {
        ...globalHeaders(type),
        ...headers,
      },
      params,
      timeout,
      ...config,
    })
  }

  const Patch = <T = any>({ url, data, headers, params, config, type, timeout = 5000 }: ClientRequestProps<T>): Method => {
    return alovaInstance.Patch<T>(url ? res.genUrl(url) : res?.resUrl, data, {
      headers: {
        ...globalHeaders(type),
        ...headers,
      },
      params,
      timeout,
      ...config,
    })
  }

  const Delete = <T = any>({ url, data, headers, params, config, type, timeout = 5000 }: ClientRequestProps<T>): Method => {
    return alovaInstance.Delete<T>(url ? res.genUrl(url) : res?.resUrl, data, {
      headers: {
        ...globalHeaders(type),
        ...headers,
      },
      params,
      timeout,
      ...config,
    })
  }

  const invalidate = (name?: string | RegExp) => {
    const matchedMethods = alovaInstance.snapshots.match({
      name,
    })
    invalidateCache(matchedMethods)
    matchedMethods.forEach((item) => {
      item.send()
    })
  }

  return {
    get: Get,
    post: Post,
    put: Put,
    patch: Patch,
    delete: Delete,
    invalidate,
  }
}
