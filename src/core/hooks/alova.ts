import { createAlova } from 'alova'
import { axiosRequestAdapter } from '@alova/adapter-axios'
import VueHook from 'alova/vue'
import { config } from '@/config'

export const alovaInstance = createAlova({
  baseURL: config.api,
  statesHook: VueHook,
  requestAdapter: axiosRequestAdapter(),
  shareRequest: false,

  // 请求拦截器
  beforeRequest() {
  },
  // 响应拦截器
  responded: {
    onSuccess: async (response) => {
      const json = response.data

      if (json.code === 200) {
        return json
      }
      else {
        return Promise.reject(json)
      }
    },
    onError(error) {
      throw new Error(error)
    },
  },
})
