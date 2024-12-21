import { useFileDialog } from '@vueuse/core'
import { usePagination, useRequest } from 'alova/client'
import { format } from 'date-fns'
import FileSaver from 'file-saver'
import { json2csv } from 'json-2-csv'
import { useMessage } from 'naive-ui'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useClient } from '.'

export interface ExportCsvProps {
  url?: string
  columns?: string[]
  params?: Record<string, any>
  filename?: string
  callback?: () => void
}

export function useExportCsv() {
  const message = useMessage()
  const client = useClient()
  const loading = ref(false)
  const { t } = useI18n()

  const onSend = ({ url, columns, params, filename, callback }: ExportCsvProps) => {
    const messageRef = message.loading(t('hooks.excel.exporting'), { duration: 0 })
    loading.value = true

    try {
      const pagination = usePagination(
        (page, pageSize) => {
          return client.get({
            url,
            params: {
              page,
              pageSize,
              ...params,
            },
            config: {
              cacheFor: 0,
            },
          })
        },
        {
          initialData: {
            total: 0,
            data: [],
          },
          initialPage: 1,
          initialPageSize: 50,
          total: res => res.meta?.total || 0,
          append: true,
          watchingStates: [() => params],
          debounce: 0,
          preloadPreviousPage: false,
          preloadNextPage: false,
          immediate: true,
        },
      )

      const dataStatus = ref(false)

      pagination.onComplete(() => {
        if (pagination.isLastPage.value) {
          dataStatus.value = true
          return
        }
        pagination.page.value++
      })

      pagination.onError((error) => {
        message.error(error.error?.message || 'Error')
        loading.value = false
      })

      watch(dataStatus, async (status) => {
        if (!status) {
          loading.value = false
          return
        }

        const csv = await json2csv(pagination.data.value, {
          keys: columns,
          emptyFieldValue: '',
          prependHeader: true,
        })

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        FileSaver.saveAs(blob, `${filename || format(new Date(), 'yyyy-MM-dd-HH:mm:ss')}.csv`)
        loading.value = false
        callback?.()
      })
    }
    catch (error) {
      loading.value = false
      message.error(`Export failure: ${error}`)
    }

    watch(loading, (v) => {
      if (!v) {
        messageRef?.destroy()
      }
    }, { immediate: true, deep: true })
  }

  return {
    loading,
    send: onSend,
  }
}

export interface ImportCsvProps {
  url?: string
  columns?: string[]
  params?: Record<string, any>
  callback?: () => void
}

export function useImportCsv() {
  const fileReader = new FileReader()
  const client = useClient()
  const message = useMessage()
  const loading = ref(false)

  const url = ref<string>()
  const params = ref<Record<string, any>>()
  const columns = ref<string[]>()
  const callback = ref<() => void>()
  const { t } = useI18n()
  let messageRef: any = null

  const { open, reset, onChange } = useFileDialog({
    accept: '.csv',
    directory: false,
    multiple: false,
  })

  onChange((files) => {
    if (!files || files?.length === 0) {
      return
    }
    const blob = files?.[0]
    fileReader.readAsText(blob)
  })

  fileReader.onerror = (error) => {
    message.error(`${t('hooks.excel.importError')}: ${error}`)
  }

  fileReader.onload = async (ev) => {
    if (!ev.target?.result) {
      return
    }

    messageRef = message.loading(t('hooks.excel.importing'), { duration: 0 })

    try {
      const csvContent = ev.target.result as string

      const rows = csvContent.split('\n').map((item) => {
        return item.split(',')?.map((item) => {
          return item.trim()
        })
      })

      let data: any[] = rows
      if (columns.value?.length) {
        data = rows.map((row) => {
          const obj: Record<string, any> = {}
          columns.value?.forEach((col, index) => {
            obj[col] = row[index]
          })
          return obj
        })
      }

      const req = useRequest(client.post({
        url: url.value,
        data: {
          data,
          ...params.value,
        },
      }))

      req.onSuccess((res) => {
        message.success(res.data?.message || t('hooks.excel.importSuccess'))
        callback.value?.()
      })

      req.onError((error) => {
        message.error(`${t('hooks.excel.importError')}: ${error.error?.message}`)
      })

      watch(req.loading, (v) => {
        loading.value = v
      }, { immediate: true, deep: true })
    }
    catch (error) {
      message.error(`${t('hooks.excel.importError')}: ${error}`)
      loading.value = false
    }
  }

  watch(loading, (v) => {
    if (!v) {
      messageRef?.destroy()
    }
  }, { immediate: true, deep: true })

  const onSend = (props: ImportCsvProps) => {
    url.value = props.url
    columns.value = props.columns
    params.value = props.params
    callback.value = props.callback
    open()
    reset()
  }

  return {
    send: onSend,
    loading,
  }
}
