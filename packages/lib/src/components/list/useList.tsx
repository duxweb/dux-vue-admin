import type { Column } from 'exceljs'
import type { Ref } from 'vue'
import { usePagination } from 'alova/client'
import { NButton, NDropdown } from 'naive-ui'
import { useClient, useExportExcel, useImportExcel } from '../../hooks'

interface UseListProps {
  url?: string
  defaultPageSize?: number
  form?: Ref<Record<string, any>>
  cacheTime?: number
  export?: boolean
  import?: boolean
  excelColumns?: Column[]
  append?: boolean
}

export function useList({ url, form, cacheTime = Infinity, excelColumns, export: exportStatus, import: importStatus, defaultPageSize = 20, append = false }: UseListProps) {
  const client = useClient()
  const excelExport = useExportExcel()
  const excelImport = useImportExcel()

  const {
    loading,
    data,
    page,
    pageSize,
    pageCount,
    total,
    send,
    reload,
  } = usePagination(
    (page, pageSize) => {
      return client.get({
        url,
        params: {
          page,
          pageSize,
          ...form?.value,
        },
        config: {
          cacheFor: cacheTime,
        },
      })
    },
    {
      initialData: {
        total: 0,
        data: [],
      },
      initialPage: 1,
      initialPageSize: defaultPageSize,
      append,
      total: res => res.meta?.total || 0,
      data: res => res.data || [],
    },
  )

  const onPrevPage = () => {
    if (page.value <= 1) {
      return
    }
    page.value--
  }

  const onNextPage = () => {
    if (page.value >= pageCount.value) {
      return
    }
    page.value++
  }

  const onPageSize = (v: number) => {
    page.value = 1
    pageSize.value = v
  }

  const onPage = (v: number) => {
    page.value = v
  }

  const toolsOptions = [
    {
      label: '刷新数据',
      key: 'refresh',
    },
  ]

  if (exportStatus) {
    toolsOptions.push({
      label: '导出 Excel',
      key: 'export',
    })
  }

  if (importStatus) {
    toolsOptions.push({
      label: '导入 Excel',
      key: 'import',
    })
  }

  // 表格工具
  const toolsBtn = (
    <div>
      <NDropdown
        options={toolsOptions}
        onSelect={(key) => {
          if (key === 'refresh') {
            send()
          }
          if (key === 'export') {
            excelExport.send({
              url,
              params: { ...form?.value },
              columns: excelColumns,
            })
          }
          if (key === 'import') {
            excelImport.send({
              url: '/import',
              params: form?.value,
              columns: excelColumns,
            })
          }
        }}
      >
        <NButton secondary renderIcon={() => <div class="i-tabler:dots-vertical" />} />
      </NDropdown>
    </div>
  )

  const onFilter = () => {
    send()
  }

  const onReload = () => {
    reload()
  }

  return {
    loading,
    data,
    page,
    pageSize,
    pageCount,
    total,
    onPrevPage,
    onNextPage,
    onPageSize,
    onPage,
    onFilter,
    onReload,
    toolsBtn,
  }
}
