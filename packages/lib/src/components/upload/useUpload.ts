import type { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui'

import { useMessage } from 'naive-ui'

import { reactive } from 'vue'
import { useClient } from '../../hooks/useClient'

export interface UploadFileInfoExtend extends UploadFileInfo {
  size?: number
  ext?: string
}

export function useNaiveUpload() {
  const { send, abort } = useUpload()

  const customRequest = ({
    file,
    action,
    headers,
    onFinish,
    onError,
    onProgress,
  }: UploadCustomRequestOptions & {
    file: UploadFileInfoExtend
  }) => {
    send({
      id: file.id,
      url: action,
      headers,
      file: file.file as File,
      onSuccess: (res) => {
        file.url = res?.url || null
        file.size = res?.size
        file.ext = res?.ext
        onFinish()
      },
      onError: () => {
        onError()
      },
      onProgress: (percent) => {
        onProgress({ percent })
      },
    })
  }

  const onAbort = (id: string) => {
    abort(id)
  }

  return {
    customRequest,
    onAbort,
  }
}

export interface DuxUploadFile {
  url?: string
  size?: number
  mime?: string
  name?: string
  ext?: string
}

export interface DuxUploadSendProps {
  id?: string
  url?: string
  params?: Record<string, any>
  data?: Record<string, any>
  headers?: Record<string, any>
  name?: string
  file: File
  onProgress?: (percent: number) => void
  onSuccess?: (data?: DuxUploadFile) => void
  onError?: (error: Error) => void
}

export interface DuxS3UploadProps extends DuxUploadSendProps {
  url?: string
  apiUrl?: string
}

export function useUpload() {
  const client = useClient()
  const message = useMessage()
  const uploadRequest = reactive({})

  const upload = ({ id, url, apiUrl, file, headers, params, data, onProgress, onSuccess, onError }: DuxS3UploadProps) => {
    const formData = new FormData()

    Object.keys(params || {}).forEach((key) => {
      formData.append(key, params?.[key])
    })
    Object.keys(data || {}).forEach((key) => {
      formData.append(key, data?.[key])
    })
    formData.append('Content-Type', file.type)
    formData.append('file', file)

    const uploadMethod = client.post({
      url,
      type: 'file',
      data: formData,
      headers: {
        ...headers,
      },
      config: {
        snapshots: 0,
        timeout: 0,
      },
    })

    if (id) {
      uploadRequest[id] = uploadMethod
    }

    const offUploadEvent = uploadMethod.onUpload((event) => {
      const percent = Math.ceil(event.loaded / event.total * 100)
      onProgress?.(percent)
    })

    uploadMethod.then(() => {
      client.put({
        url: apiUrl,
        data: {
          ...data,
          path: params?.key,
          name: file?.name,
          size: file?.size,
          mime: file?.type,
          ext: file?.name.split('.').pop(),
        },
        config: {
          cache: false,
        },
      }).then((res) => {
        onSuccess?.(res?.data)
      }).catch((error) => {
        message.error(error.message)
        onError?.(error)
      })
    }).catch((error) => {
      if (error.name === 'AbortError') {
        return
      }
      message.error(error.message)
      onError?.(error)
    }).finally(() => {
      offUploadEvent()
      if (id) {
        delete uploadRequest[id]
      }
    })
  }

  const send = (props: DuxUploadSendProps) => {
    // 获取预签名url
    client.get({
      url: props.url,
      params: {
        name: props.file?.name,
        size: props.file?.size,
        mime: props.file?.type,
        ...props.params,
      },
      config: {
        cacheFor: 0,
      },
    }).then((res) => {
      if (!res?.data?.url && !res?.data?.params) {
        message.error('get sign error')
        props.onError?.(new Error('get sign error'))
        return
      }
      const params = res?.data?.params || {}
      const url = res.data?.url || props.url

      upload({
        ...props,
        url,
        apiUrl: props.url,
        file: props.file,
        params: {
          ...params,
        },
        data: props.params,
        headers: !res.data?.url
          ? {}
          : {
              Authorization: undefined,
            },
      })
    }).catch((error) => {
      message.error(error.message)
      props.onError?.(error)
    })
  }

  const abort = (id: string) => {
    uploadRequest[id]?.abort()
  }

  return {
    send,
    abort,
  }
}
