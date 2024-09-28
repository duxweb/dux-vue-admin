import { usePagination } from 'alova/client'
import { NButton, NDropdown } from 'naive-ui'
import type { Column } from 'exceljs'
import type { Ref } from 'vue'
import { useClient } from '../../hooks'
import { useExportExcel, useImportExcel } from '../excel'

interface UseListProps {
  url?: string
  defaultPageSize?: number
  form?: Ref<Record<string, any>>
  cacheTime?: number
  export?: boolean
  import?: boolean
  excelColumns?: Column[]
}

export function useList({ url, form, cacheTime = Infinity, excelColumns, export: exportStatus, import: importStatus, defaultPageSize = 20 }: UseListProps) {
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
      total: res => res.meta?.total || 0,
      data: res => res.data || [],
    },
  )

  const onPrevPage = () => {
    page.value--
  }

  const onNextPage = () => {
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
            excelExport.onSend({
              url,
              params: { ...form?.value },
              columns: excelColumns,
            })
          }
          if (key === 'import') {
            const input = document.createElement('input')
            input.type = 'file'
            input.style.display = 'none'
            input.click()

            input.addEventListener('change', (event: any) => {
              const fileSelect = event?.target?.files?.[0] as Blob
              excelImport.onSend({
                blob: fileSelect,
                url: '/import',
                params: form?.value,
                columns: excelColumns,
              })
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
    toolsBtn,
  }
}
