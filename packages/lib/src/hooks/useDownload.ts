import { format } from 'date-fns'
import mime from 'mime'
import { useMessage } from 'naive-ui'
import { ref } from 'vue'
import { useClient } from './useClient'

export function useDownload() {
  const client = useClient({ raw: true })
  const loading = ref(false)
  const message = useMessage()

  const blob = (blob: Blob, filename?: string) => {
    // blob 下载
    const url = window.URL || window.webkitURL
    const href = url.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = href
    a.download = filename || ''
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    url.revokeObjectURL(href)
  }

  const url = (urlString: string, filename?: string) => {
    const a = document.createElement('a')
    a.href = urlString
    a.download = filename || ''
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const image = (urlString: string) => {
    fetch(urlString).then((res) => {
      res.blob().then((e) => {
        blob(e)
      })
    }).catch((e) => {
      message.error(e.error || '下载失败')
    })
  }

  const base64 = (base64String: string, filename: string) => {
    // base64下载
    const byteCharacters = atob(base64String.split(',')[1])
    const byteNumbers = Array.from({ length: byteCharacters.length })
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers as any)
    const e = new Blob([byteArray], { type: 'application/octet-stream' })

    blob(e, filename)
  }

  const file = (url: string, params?: string, contentType?: string, filename?: string) => {
    loading.value = true

    client.post({
      url,
      data: params,
      config: {
        responseType: 'blob',
      },
    }).then((e) => {
      const type = contentType || e.data.headers['content-type']
      const contentDisposition = e.data.headers['content-disposition']

      if (!filename) {
        filename = format(new Date(), 'yyyy-MM-dd-HH:mm:ss')
        if (type) {
          filename = `${filename}.${mime.getExtension(type)}`
        }
      }

      if (contentDisposition) {
        const matches = /filename=["']?([^"']+)/.exec(contentDisposition)
        if (matches && matches?.length > 1) {
          filename = decodeURIComponent(matches[1])
        }
      }

      blob(e.data?.data, filename)
    }).catch((e) => {
      message.error(e.error || '下载失败')
    }).finally(() => {
      loading.value = false
    })
  }

  return {
    file,
    url,
    blob,
    base64,
    loading,
    image,
  }
}
