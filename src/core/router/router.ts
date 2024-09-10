import mime from 'mime'
import * as Vue from 'vue'
import { loadModule } from 'vue3-sfc-loader'
import type { Options, Resource } from 'vue3-sfc-loader'
import { useClient } from '../hooks/client'
import * as Store from '../stores'

export function sfcRender(path: string) {
  const client = useClient()

  const options: Options = {
    moduleCache: {
      'vue': Vue,
      '@/stores': Store,
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
    handleModule(type: string, getContentData: () => any) {
      if (type === '.vue') {
        return undefined
      }
      return getContentData()
    },

    getFile: async (url) => {
      const res = await client.post({
        url: `/manage/static`,
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
  return () => loadModule(`${path}.vue`, { ...options })
}
