import type { Column } from 'exceljs'
import { useFileDialog } from '@vueuse/core'
import { usePagination, useRequest } from 'alova/client'
import { format } from 'date-fns'
import ExcelJS from 'exceljs'
import FileSaver from 'file-saver'
import { useMessage } from 'naive-ui'
import { ref, watch } from 'vue'
import { useClient } from '.'

export interface ExportExcelProps {
  url?: string
  columns?: Partial<Column>[]
  params?: Record<string, any>
  filename?: string
}

export function useExportExcel() {
  const message = useMessage()
  const client = useClient()
  const loading = ref(false)

  const onSend = ({ url, columns, params, filename }: ExportExcelProps) => {
    loading.value = true
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
        initialPageSize: 8,
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
      message.error(`导出失败: ${error.error?.message}`)
    })

    watch(dataStatus, (status) => {
      if (!status) {
        return
      }

      const workbook = new ExcelJS.Workbook()
      const sheet1 = workbook.addWorksheet('sheet1')
      sheet1.columns = columns || []

      pagination.data.value.forEach((row) => {
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
      }).catch((error) => {
        message.error(`Export failure: ${error}`)
      })
    })
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
    message.error(`导入失败: ${error || '无法处理'}`)
  }

  fileReader.onload = (ev) => {
    if (!ev.target?.result) {
      return
    }
    workbook.xlsx.load(ev.target.result as ArrayBuffer).then((workbook) => {
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

      const req = useRequest(client.post({
        url: url.value,
        data: {
          data,
          ...params.value,
        },
      }))

      req.onSuccess((res) => {
        message.success(res.data?.message || '导入成功')
      })

      req.onError((error) => {
        message.error(`导入失败: ${error.error?.message || '请求失败'}`)
      })

      watch(req.loading, (v) => {
        loading.value = v
      })
    })
  }

  const onSend = (props: ImportExcelProps) => {
    url.value = props.url
    columns.value = props.columns
    params.value = props.params
    open()
    reset()
  }

  return {
    send: onSend,
    loading,
  }
}
