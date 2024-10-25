import type { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui'

import axios from 'axios'
import { useMessage } from 'naive-ui'

import { reactive } from 'vue'
import { useClient } from '../../hooks/useClient'

export interface UploadFileInfoExtend extends UploadFileInfo {
  size?: number
  ext?: string
}

export type DuxUploadType = 's3' | 'local'

export function useNaiveUpload(type: DuxUploadType) {
  const { send, abort } = useUpload()
  const { send: s3Send, abort: s3Abort } = useS3Upload()

  const customRequest = ({
    file,
    action,
    headers,
    data,
    onFinish,
    onError,
    onProgress,
  }: UploadCustomRequestOptions & {
    file: UploadFileInfoExtend
  }) => {
    const formData = new FormData()
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(
          key,
          data[key as keyof UploadCustomRequestOptions['data']],
        )
      })
    }
    formData.append(file.name, file.file as File)

    if (type === 'local') {
      send({
        id: file.id,
        url: action,
        headers,
        formData,
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

    if (type === 's3') {
      s3Send({
        id: file.id,
        url: action,
        file: file.file || undefined,
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
  }

  const onAbort = (id: string) => {
    if (type === 'local') {
      abort(id)
    }
    if (type === 's3') {
      s3Abort(id)
    }
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
  headers?: Record<string, any>
  formData?: FormData
  onProgress?: (percent: number) => void
  onSuccess?: (data?: DuxUploadFile) => void
  onError?: (error: Error) => void
}

export function useUpload() {
  const client = useClient()
  const message = useMessage()
  const uploadRequest = reactive({})

  const send = ({ id, url, headers, formData, onProgress, onSuccess, onError }: DuxUploadSendProps) => {
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

    uploadMethod.then((res) => {
      onSuccess?.(res?.data[0])
    }).catch((error) => {
      if (error.message?.includes('CanceledError')) {
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

  const abort = (id: string) => {
    uploadRequest[id]?.abort()
  }

  return {
    send,
    abort,
  }
}

export interface DuxS3UploadSendProps {
  id?: string
  url?: string
  params?: Record<string, any>
  name?: string
  file?: File
  onProgress?: (percent: number) => void
  onSuccess?: (data?: DuxUploadFile) => void
  onError?: (error: Error) => void
}

export interface DuxS3UploadProps extends DuxS3UploadSendProps {
  url?: string
  apiUrl?: string
  signUrl?: string
}

export function useS3Upload() {
  const client = useClient()
  const message = useMessage()
  const uploadRequest = reactive<Record<string, AbortController>>({})

  const upload = ({ id, url, signUrl, apiUrl, file, params, onProgress, onSuccess, onError }: DuxS3UploadProps) => {
    const controller = new AbortController()
    const signal = controller.signal

    if (id) {
      uploadRequest[id] = controller
    }

    axios.put(signUrl || '', file, {
      signal,
      onUploadProgress: (progressEvent) => {
        if (!progressEvent?.total) {
          return
        }
        const percentCompleted = Math.round(
          Math.ceil(progressEvent.loaded / progressEvent?.total * 100),
        )
        onProgress?.(percentCompleted)
      },
    }).then(() => {
      const fileParams = {
        url,
        name: file?.name,
        size: file?.size,
        mime: file?.type,
        ext: file?.name.split('.').pop(),
      }

      client.post({
        url: apiUrl,
        data: {
          ...params,
          ...fileParams,
        },
      })

      onSuccess?.(fileParams)
    }).catch((error) => {
      if (error.name === 'AbortError') {
        return
      }
      message.error(error.message)
      onError?.(error)
    }).finally(() => {
      if (id) {
        delete uploadRequest[id]
      }
    })
  }

  const send = (props: DuxS3UploadSendProps) => {
    // 获取预签名url
    client.get({
      url: props.url,
      data: {
        name: props.file?.name,
        size: props.file?.size,
        mime: props.file?.type,
      },
    }).then((res) => {
      if (!res?.data?.signUrl || !res?.data?.url) {
        message.error('获取签名失败')
        props.onError?.(new Error('获取签名失败'))
        return
      }
      // 请求上传
      upload({
        ...props,
        apiUrl: props.url,
        signUrl: res.data?.signUrl,
        url: res.data?.url,
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
