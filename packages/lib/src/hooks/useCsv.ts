import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { useFileDialog } from '@vueuse/core'
import { format } from 'date-fns'
import FileSaver from 'file-saver'
import { json2csv } from 'json-2-csv'
import { useMessage } from 'naive-ui'
import { computed, ref, watch } from 'vue'
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

    const page = ref(1)
    const pageSize = ref(50)
    const pageCount = ref(0)

    const queryParams = computed(() => {
      return {
        page: page.value,
        pageSize: pageSize.value,
        ...params,
      }
    })

    const dataStatus = ref(false)

    try {
      const getList = () => {
        return client.get({
          url,
          params: queryParams.value,
        })
      }

      const data = ref<Record<string, any>[]>([])

      const req = useQuery({
        queryKey: [url, queryParams],
        queryFn: getList,
        placeholderData: keepPreviousData,
      })

      watch(req.data, (res) => {
        data.value = [...data.value, ...res?.data]

        const meta = res?.meta
        const total = meta?.total || 0
        pageCount.value = Math.ceil(total / pageSize.value)

        if (page.value >= pageCount.value) {
          dataStatus.value = true
          return
        }

        page.value++
      }, {
        immediate: true,
      })

      watch(req.error, (error) => {
        message.error(error?.message || 'Error')
      })

      watch(dataStatus, async (status) => {
        if (!status) {
          loading.value = false
          return
        }

        const csv = await json2csv(data.value, {
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
    }, { immediate: true })
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

      loading.value = true

      client.post({
        url: url.value,
        data: {
          data,
          ...params.value,
        },
      }).then((res) => {
        message.success(res?.message || t('hooks.excel.importSuccess'))
        callback.value?.()
      }).catch((error) => {
        message.error(`${t('hooks.excel.importError')}: ${error?.message}`)
      }).finally(() => {
        loading.value = false
      })
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
  }, { immediate: true })

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
