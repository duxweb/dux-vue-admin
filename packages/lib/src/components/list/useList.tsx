import type { Column } from 'exceljs'
import { keepPreviousData, useInfiniteQuery, type UseInfiniteQueryReturnType, useQuery } from '@tanstack/vue-query'
import { cloneDeep } from 'lodash-es'
import { NButton, NDropdown } from 'naive-ui'
import { computed, ref, type Ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useClient, useExportCsv, useExportExcel, useImportCsv, useImportExcel } from '../../hooks'

interface UseListProps {
  url?: string
  defaultPageSize?: number
  form?: Ref<Record<string, any>>
  cacheTime?: number
  export?: boolean
  import?: boolean
  exportCsv?: boolean
  importCsv?: boolean
  exportColumns?: Column[] | string[]
  importColumns?: Column[] | string[]
  append?: boolean
}

export function useList({ url, form, cacheTime = Infinity, exportColumns, importColumns, export: exportStatus, import: importStatus, exportCsv: exportCsvStatus, importCsv: importCsvStatus, defaultPageSize = 20, append = false }: UseListProps) {
  const client = useClient()
  const excelExport = useExportExcel()
  const excelImport = useImportExcel()
  const csvExport = useExportCsv()
  const csvImport = useImportCsv()
  const { t } = useI18n()
  const meta = ref<Record<string, any>>()

  const page = ref(1)
  const pageSize = ref(defaultPageSize)
  const pageCount = ref(0)
  const total = ref(0)

  const data = ref<Record<string, any>[]>([])

  const getList = (pageParam: number) => {
    return client.get({
      url,
      params: {
        page: pageParam,
        pageSize: pageSize.value,
        ...form?.value,
      },
    })
  }

  let req: UseInfiniteQueryReturnType<any, any>
  if (append) {
    req = useInfiniteQuery({
      queryKey: [url],
      queryFn: ({ pageParam }) => getList(pageParam),
      getNextPageParam: (lastPage) => {
        meta.value = lastPage.meta
        total.value = lastPage.meta.total
        pageCount.value = Math.ceil(total.value / pageSize.value)
        if (lastPage.meta.page >= pageCount.value) {
          return undefined
        }
        return lastPage.meta.page + 1
      },
      initialPageParam: 1,
    })

    watch(req.data, (res) => {
      const items = res?.pages?.flatMap(page => page.data)
      if (!items) {
        return
      }

      data.value = [...items]
    }, {
      immediate: true,
    })

    watch([() => form?.value, () => pageSize.value], () => {
      data.value = []
      page.value = 1
      req.refetch()
    }, { deep: true })
  }
  else {
    req = useQuery({
      queryKey: [url],
      queryFn: () => getList(page.value),
      gcTime: cacheTime,
      placeholderData: keepPreviousData,
    }) as any

    watch(req.data, (res) => {
      if (!res) {
        return
      }

      data.value = [...cloneDeep(res?.data || [])]
      meta.value = res?.meta || {}
      total.value = res?.meta?.total || 0
      pageCount.value = Math.ceil(total.value / pageSize.value)
    }, {
      immediate: true,
    })
  }

  const onPrevPage = () => {
    if (append) {
      if (!req?.hasPreviousPage.value || req?.isFetchingPreviousPage.value) {
        return
      }
      page.value++
      req.fetchPreviousPage()
    }
    else {
      if (page.value <= 1) {
        return
      }
      page.value--
    }
  }

  const onNextPage = () => {
    if (append) {
      if (!req?.hasNextPage.value || req?.isFetchingNextPage.value) {
        return
      }
      page.value++
      req.fetchNextPage()
    }
    else {
      if (page.value >= pageCount.value) {
        return
      }
      page.value++
    }
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
      label: t('components.list.refresh'),
      key: 'refresh',
    },
  ]

  if (exportStatus) {
    toolsOptions.push({
      label: t('components.list.excelExport'),
      key: 'export',
    })
  }

  if (exportCsvStatus) {
    toolsOptions.push({
      label: t('components.list.csvExport'),
      key: 'csvExport',
    })
  }

  if (importStatus) {
    toolsOptions.push({
      label: t('components.list.excelImport'),
      key: 'import',
    })
  }

  if (importCsvStatus) {
    toolsOptions.push({
      label: t('components.list.csvImport'),
      key: 'csvImport',
    })
  }

  // 表格工具
  const toolsBtn = (
    <div>
      <NDropdown
        options={toolsOptions}
        onSelect={(key) => {
          if (key === 'refresh') {
            req.refetch()
          }
          if (key === 'export') {
            excelExport.send({
              url: `${url}/export`,
              params: { ...form?.value },
              columns: exportColumns,
            })
          }
          if (key === 'import') {
            excelImport.send({
              url: `${url}/import`,
              params: form?.value,
              columns: importColumns,
              callback: () => {
                req.refetch()
              },
            })
          }
          if (key === 'csvExport') {
            csvExport.send({
              url: `${url}/export`,
              params: { ...form?.value },
              columns: exportColumns as string[],
            })
          }
          if (key === 'csvImport') {
            csvImport.send({
              url: `${url}/import`,
              params: form?.value,
              columns: importColumns as string[],
              callback: () => {
                req.refetch()
              },
            })
          }
        }}
      >
        <NButton secondary renderIcon={() => <div class="i-tabler:dots-vertical" />} />
      </NDropdown>
    </div>
  )

  const onFilter = () => {
    page.value = 1
    req.refetch()
  }

  const onReload = () => {
    req.refetch()
  }

  const loading = computed(() => {
    if (req.isFetched.value) {
      return false
    }
    return req.isFetching.value
  })

  return {
    loading,
    data,
    meta,
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
