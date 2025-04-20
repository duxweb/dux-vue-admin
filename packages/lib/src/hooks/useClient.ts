import type { AxiosRequestConfig } from 'axios'
import { useQueryClient } from '@tanstack/vue-query'
import { useAxios } from './axios'
import { useResource } from './useResource'

type ClientMaps = Record<string, any>

export type ClientRequestType = 'json' | 'file' | 'form'
export interface ClientRequestProps<T> {
  url?: string
  data?: any
  params?: ClientMaps
  headers?: ClientMaps
  type?: ClientRequestType
  timeout?: number
  config?: AxiosRequestConfig<T>
}

export interface useClientProps {
  raw?: boolean
}

export function useClient(props?: useClientProps) {
  const res = useResource()
  const axiosInstance = useAxios(props)

  const queryClient = useQueryClient()

  const globalHeaders = (type?: ClientRequestType) => {
    const data = {
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

  const getUrl = (url: string = '') => {
    if (url?.startsWith('//') || /^.+?:\/\//.test(url || '')) {
      return url
    }
    return res.config?.apiUrl ? `${res.config?.apiUrl}${res.genUrl(url)}` : res.genUrl(url)
  }

  const Get = <T = any>({ url, timeout = 0, headers, params, config }: ClientRequestProps<T>) => {
    return axiosInstance.get<T>(getUrl(url), {
      headers: {
        ...globalHeaders(),
        ...headers,
      },
      params,
      timeout,
      ...config,
    })
  }

  const Post = <T = any>({ url, data, headers, params, config, type, timeout = 0 }: ClientRequestProps<T>) => {
    return axiosInstance.post<T>(getUrl(url), data, {
      headers: {
        ...globalHeaders(type),
        ...headers,
      },
      params,
      timeout,
      ...config,
    })
  }

  const Put = <T = any>({ url, data, headers, params, config, type, timeout = 0 }: ClientRequestProps<T>) => {
    return axiosInstance.put<T>(getUrl(url), data, {
      headers: {
        ...globalHeaders(type),
        ...headers,
      },
      params,
      timeout,
      ...config,
    })
  }

  const Patch = <T = any>({ url, data, headers, params, config, type, timeout = 0 }: ClientRequestProps<T>) => {
    return axiosInstance.patch<T>(getUrl(url), data, {
      headers: {
        ...globalHeaders(type),
        ...headers,
      },
      params,
      timeout,
      ...config,
    })
  }

  const Delete = <T = any>({ url, data, headers, params, config, type, timeout = 0 }: ClientRequestProps<T>) => {
    return axiosInstance.delete<T>(getUrl(url), {
      headers: {
        ...globalHeaders(type),
        ...headers,
      },
      data,
      params,
      timeout,
      ...config,
    })
  }

  type InvalidateType = string | string[]
  const invalidate = (name?: InvalidateType) => {
    let marks: any = name
    if (!Array.isArray(name)) {
      marks = [name]
    }

    queryClient.invalidateQueries({
      queryKey: marks,
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
