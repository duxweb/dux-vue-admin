import type { Options, Resource } from 'vue3-sfc-loader'
import * as vueUse from '@vueuse/core'
import * as alova from 'alova'
import * as alovaClient from 'alova/client'
import axios from 'axios'
import crypto from 'crypto-js'
import dayjs from 'dayjs'
import * as echarts from 'echarts'
import * as _ from 'lodash-es'
import * as math from 'mathjs'
import mime from 'mime'
import mitt from 'mitt'
import * as NaiveUI from 'naive-ui'
import * as pinia from 'pinia'
import * as Vue from 'vue'
import { loadModule } from 'vue3-sfc-loader'
import * as VueDraggable from 'vue-draggable-plus'
import VChart from 'vue-echarts'
import * as vueI18n from 'vue-i18n'
import * as vueRouter from 'vue-router'
import JsonRender from '../components/render/jsonRender'
import { useClient } from '../hooks/useClient'
import * as index from '../index'
import { useResource } from '../index'

export function sfcRender(path: string) {
  const client = useClient()
  const { mergeLocaleMessage } = vueI18n.useI18n()
  const { config } = useResource()

  const options: Options = {
    moduleCache: {
      'vue': Vue,
      '@duxweb/dux-vue-admin': index,
      'naive-ui': NaiveUI,
      '@vueuse/core': vueUse,
      'echarts': echarts,
      'alova': alova,
      'alova/client': alovaClient,
      'axios': axios,
      'crypto': crypto,
      'mime': mime,
      'math': math,
      'mitt': mitt,
      'lodash-es': _,
      'pinia': pinia,
      'dayjs': dayjs,
      'vue-router': vueRouter,
      'vue-echarts': VChart,
      'vue-draggable-plus': VueDraggable,
      'vue-i18n': vueI18n,
      ...config?.packages,

      'static!': function (content: string, _path: string, type: string) {
        const name = mime.getType(type)
        if (name?.startsWith('image')) {
          return `data:${name};charset=utf-8;base64,${btoa(content)}`
        }
        if (type === '.json') {
          return JSON.parse(content)
        }
        throw new Error(`${type} unable to parse`)
      },
    },
    async handleModule(type: string, getContentData: () => any) {
      if (type === '.vue') {
        return undefined
      }
      if (type === '.json') {
        const contentData = await getContentData()
        return () => <div><JsonRender data={contentData?.data || {}} nodes={contentData?.nodes || []} /></div>
      }
      return getContentData()
    },
    customBlockHandler(block) {
      if (block.type === 'i18n') {
        const messages = JSON.parse(block.content)
        for (const locale in messages) {
          mergeLocaleMessage(locale, messages[locale])
        }
      }
    },
    getFile: async (url) => {
      url = removeSuffix(url, '.vue')
      url = removeSuffix(url, '.json')

      const res = await client.post({
        url: `/static`,
        data: {
          name: url,
        },
        config: {
          cacheFor: 0,
        },
      }).then((res) => {
        return res?.data
      }).catch((err) => {
        throw new Error(`${err?.message} ${url}`)
      })
      return {
        getContentData: () => res?.content,
        type: `${res?.type || 'vue'}`,
      }
    },
    getResource({ refPath, relPath }, options: Options): Resource {
      const { moduleCache, pathResolve, getFile } = options

      const [resourceRelPath, ...loaders] = relPath.match(/([^!]+!)|[^!]+$/g).reverse()

      const processContentThroughLoaders = (content, path, type, options) => {
        return loaders.reduce((content, loader) => {
          return moduleCache[loader](content, path, type, options)
        }, content)
      }

      const path = pathResolve({ refPath, relPath: resourceRelPath }, options)
      const id = loaders.join('') + path

      return {
        id,
        path,
        async getContent() {
          const { getContentData, type } = await getFile(path)
          return {
            getContentData: async (asBinary: boolean) => processContentThroughLoaders(await getContentData(asBinary), path, type, options),
            type,
          }
        },
      }
    },
    addStyle: () => { },
  }

  return () => loadModule(`${path}`, { ...options })
}

function removeSuffix(url: string, suffix: string) {
  const regex = new RegExp(`${suffix}$`) // 创建一个正则表达式，匹配后缀名
  return url.replace(regex, '')
}
