import type { Options, Resource } from 'vue3-sfc-loader'
import * as vueUse from '@vueuse/core'
import mime from 'mime'
import * as Vue from 'vue'
import { useI18n } from 'vue-i18n'
import { loadModule } from 'vue3-sfc-loader'
import JsonRender from '../components/render/jsonRender'
import { useClient } from '../hooks/useClient'
import * as index from '../index'

export function sfcRender(path: string) {
  const client = useClient()
  const { mergeLocaleMessage } = useI18n()
  const options: Options = {
    moduleCache: {
      'vue': Vue,
      'dux-vue-admin': index,
      '@vueuse/core': vueUse,
      'static!': function (content: string, _path: string, type: string) {
        const name = mime.getType(type)
        if (name?.startsWith('image')) {
          return `data:${name};base64,${btoa(content)}`
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
        return () => <JsonRender data={contentData?.data || {}} nodes={contentData?.nodes || []} />
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
      const res = await client.post({
        url: `/static`,
        data: {
          name: url,
        },
        config: {
          cacheFor: 0,
        },
      }).then((res) => {
        return res.data
      }).catch((err) => {
        throw new Error(`${err?.message} ${url}`)
      })
      return {
        getContentData: () => res?.content,
        type: `${res.type}`,
      }
    },
    getResource({ refPath, relPath }, options: Options): Resource {
      const { moduleCache, pathResolve, getFile } = options

      const loaders: string[] = []
      const resourceRelPath = relPath

      if (relPath.startsWith('./')) {
        loaders.push('static!')
      }

      const processContentThroughLoaders = (content: () => any, path: string, type: string, options: Options) => {
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
    addStyle: () => {},
  }

  return () => loadModule(`${path}`, { ...options })
}
