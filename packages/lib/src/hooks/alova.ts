import type { Alova } from 'alova'
import { axiosRequestAdapter } from '@alova/adapter-axios'
import { createAlova } from 'alova'
import VueHook from 'alova/vue'

export const alovaInstance: Alova<any> = createAlova({
  statesHook: VueHook,
  requestAdapter: axiosRequestAdapter(),
  shareRequest: false,
})
