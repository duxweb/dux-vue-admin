import type { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { reactive } from 'vue'
import { useClient } from '../../hooks/client'

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
