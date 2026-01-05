import type { Column } from 'exceljs'
import type { DataTableBaseColumn, DataTableColumns, DataTableExpandColumn, DataTableProps, PaginationProps } from 'naive-ui'
import type { Ref, VNodeChild } from 'vue'
import type { UseDialogResult } from '../../dialog'
import type { UseDrawerResult } from '../../drawer'
import type { FilterAction } from '../../filter'
import type { UseModalResult } from '../../modal'
import type { ColumnCopyProps, ColumnMapProps, ColumnMediaProps, ColumnStatusProps, ColumnTagsProps, ColumnTextProps } from '../column'
import type { ColumnImageProps } from '../column/image'
import type { ColumnImagesProps } from '../column/images'
import type { ColumnInputProps } from '../column/input'
import type { ColumnSwitchProps } from '../column/switch'

export type TableAction = FilterAction

export interface UseTableProps {
  columns: TableColumn[] | Ref<TableColumn[] | undefined>
  columnActions?: TableAction[]
  filter?: Record<string, any> | Ref<Record<string, any>>
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
  refreshTime?: number
  actionWidth?: number
  selectionWidth?: number
  pagination?: boolean
  size?: 'small' | 'medium' | 'large'
  pageSize?: number
  pageSizes?: number[]
}

export type TableColumnRender = (rowData: object, rowIndex: number) => VNodeChild

export interface UseTableResult {
  data: Ref<any[]>
  meta: Ref<Record<string, any>>
  pagination: Ref<PaginationProps>
  tableColumns: Ref<DataTableColumns>
  toolsColumns: VNodeChild
  toolsBtn: VNodeChild
  batchBtn: Ref<VNodeChild | null>
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
  input: ColumnInputProps
  copy: ColumnCopyProps
  render: any
}

export type TableActionAdaptor<T extends keyof TableActionAttrMap> = TableActionAttrMap[T] | Record<string, any>

type DataTableColumn = DataTableBaseColumn | DataTableExpandColumn
export interface TableColumnExtend {
  renderType: 'text' | 'image' | 'images' | 'type' | 'tags' | 'status' | 'media' | 'map' | 'switch' | 'render' | 'input' | 'copy'
  renderProps?: TableActionAdaptor<this['renderType']>
  render?: TableColumnRender
  show?: boolean
  key?: any
  titleLang?: string
  /**
   * 是否开启可编辑弹窗
   */
  editable?: boolean
  /**
   * 可编辑保存后是否刷新列表（默认刷新）
   */
  editableRefresh?: boolean
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
  children?: BatchAction[]
  /**
   * Allow triggering without any selected rows
   */
  force?: boolean
}
