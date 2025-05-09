import type { Column } from 'exceljs'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { useFileDialog } from '@vueuse/core'
import { format } from 'date-fns'
import ExcelJS from 'exceljs'
import FileSaver from 'file-saver'
import { useMessage } from 'naive-ui'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useClient } from '.'

export interface ExportExcelProps {
  url?: string
  columns?: Partial<Column>[]
  params?: Record<string, any>
  filename?: string
  callback?: () => void
}

export function useExportExcel() {
  const message = useMessage()
  const client = useClient()
  const loading = ref(false)
  const { t } = useI18n()

  const onSend = ({ url, columns, params, filename, callback }: ExportExcelProps) => {
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

      watch(dataStatus, (status) => {
        if (!status) {
          loading.value = false
          return
        }

        const workbook = new ExcelJS.Workbook()
        const sheet1 = workbook.addWorksheet('sheet1')
        sheet1.columns = columns || []

        data.value.forEach((row) => {
          sheet1.addRow(row)
        })

        sheet1.eachRow({ includeEmpty: true }, (row) => {
          row.eachCell({ includeEmpty: true }, (cell) => {
            if (typeof cell.value === 'number') {
              cell.numFmt = '@'
            }
          })
        })

        loading.value = false

        workbook.xlsx.writeBuffer().then((buffer) => {
          const file = new Blob([buffer], { type: 'application/octet-stream' })
          FileSaver.saveAs(file, `${filename || format(new Date(), 'yyyy-MM-dd-HH:mm:ss')}.xlsx`)
          callback?.()
        }).catch((error) => {
          message.error(`Export failure: ${error}`)
        })
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

export interface ImportExcelProps {
  url?: string
  columns?: Partial<Column>[]
  params?: Record<string, any>
  callback?: () => void
}

export function useImportExcel() {
  const workbook = new ExcelJS.Workbook()
  const fileReader = new FileReader()
  const client = useClient()
  const message = useMessage()
  const loading = ref(false)

  const url = ref<string>()
  const params = ref<Record<string, any>>()
  const columns = ref<Partial<Column>[]>()
  const callback = ref<(res: any) => void>()
  const { t } = useI18n()
  let messageRef: any = null

  const { open, reset, onChange } = useFileDialog({
    accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    directory: false,
    multiple: false,
  })

  onChange((files) => {
    if (!files || files?.length === 0) {
      return
    }
    const blob = files?.[0]
    fileReader.readAsArrayBuffer(blob)
  })

  fileReader.onerror = (error) => {
    message.error(`${t('hooks.excel.importError')}: ${error}`)
  }

  fileReader.onload = (ev) => {
    if (!ev.target?.result) {
      return
    }

    messageRef = message.loading(t('hooks.excel.importing'), { duration: 0 })

    try {
      workbook.xlsx.load(ev.target.result as ArrayBuffer).then((workbook) => {
        loading.value = true

        const worksheet = workbook.getWorksheet(1)
        const headers = []
        worksheet?.getRow(1).eachCell((cell) => {
          headers.push(cell?.value as never)
        })
        const data: Record<string, any>[] = []
        for (let rowNumber = 2; rowNumber <= (worksheet?.rowCount || 0); rowNumber++) {
          const rowData: Record<string, any> = {}
          worksheet?.getRow(rowNumber)?.eachCell((cell, colNumber) => {
            const info = columns.value?.find(item => item.header === headers[colNumber - 1])

            rowData[info?.key || headers[colNumber - 1]] = cell.value
          })
          data.push(rowData)
        }

        client.post({
          url: url.value,
          data: {
            data,
            ...params.value,
          },
        }).then((res) => {
          message.success(res?.message || t('hooks.excel.importSuccess'))
          callback.value?.(res)
        }).catch((error) => {
          message.error(`${t('hooks.excel.importError')}: ${error?.message}`)
        }).finally(() => {
          loading.value = false
        })
      })
    }
    catch (error) {
      loading.value = false
      message.error(`${t('hooks.excel.importError')}: ${error}`)
    }
  }

  watch(loading, (v) => {
    if (!v) {
      messageRef?.destroy()
    }
  }, { immediate: true })

  const onSend = (props: ImportExcelProps) => {
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
