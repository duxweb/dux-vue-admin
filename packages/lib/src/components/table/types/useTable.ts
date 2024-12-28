import type { Column } from 'exceljs'
import type { DataTableBaseColumn, DataTableColumns, DataTableExpandColumn, DataTableProps, PaginationProps } from 'naive-ui'
import type { Ref, VNodeChild } from 'vue'
import type { UseDialogResult } from '../../dialog'
import type { UseDrawerResult } from '../../drawer'
import type { FilterAction } from '../../filter'
import type { UseModalResult } from '../../modal'
import type { ColumnMapProps, ColumnMediaProps, ColumnStatusProps, ColumnTagsProps, ColumnTextProps } from '../column'
import type { ColumnImageProps } from '../column/image'
import type { ColumnImagesProps } from '../column/images'
import type { ColumnSwitchProps } from '../column/switch'

export type TableAction = FilterAction

export interface UseTableProps {
  columns: TableColumn[] | Ref<TableColumn[] | undefined>
  columnActions?: TableAction[]
  filter?: Record<string, any>
  importColumns?: Column[] | string[]
  exportColumns?: Column[] | string[]
  batch?: BatchAction[]
  selected?: Ref<never[]>
  url?: string
  key?: string | number
  name?: any
  export?: boolean
  import?: boolean
  exportCsv?: boolean
  importCsv?: boolean
  expanded?: boolean
  cacheTime?: number
}

export type TableColumnRender = (rowData: object, rowIndex: number) => VNodeChild

export interface UseTableResult {
  data: Ref<any[]>
  meta: Ref<Record<string, any>>
  pagination: Ref<PaginationProps>
  tableColumns: Ref<DataTableColumns>
  toolsColumns: VNodeChild
  toolsBtn: VNodeChild
  loading: Ref<boolean>
  tableParams: Ref<DataTableProps>
  send: () => void
  selected: Ref<never[]>
  expanded: Ref<never[]>
}

export interface TableTabProps {
  label: string
  value: string
}

export interface TableActionAttrMap {
  text: ColumnTextProps
  image: ColumnImageProps
  images: ColumnImagesProps
  type: ColumnStatusProps
  tags: ColumnTagsProps
  status: ColumnStatusProps
  media: ColumnMediaProps
  map: ColumnMapProps
  switch: ColumnSwitchProps
  render: any
}

export type TableActionAdaptor<T extends keyof TableActionAttrMap> = TableActionAttrMap[T] | Record<string, any>

type DataTableColumn = DataTableBaseColumn | DataTableExpandColumn
export interface TableColumnExtend {
  renderType: 'text' | 'image' | 'images' | 'type' | 'tags' | 'status' | 'media' | 'map' | 'switch' | 'render'
  renderProps?: TableActionAdaptor<this['renderType']>
  render?: TableColumnRender
  show?: boolean
  key?: any
  titleLang?: string
}

export type TableColumn = DataTableColumn & TableColumnExtend

export interface HandleAction {
  id?: string | number
  item: TableAction
  modal?: UseModalResult
  dialog?: UseDialogResult
  drawer?: UseDrawerResult
}

export interface BatchAction {
  label?: string
  labelLang?: string
  name?: string
  url?: string
  icon?: string
  callback?: (selected?: (string | number)[]) => void
}
