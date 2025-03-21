import type { TableColumnRender } from '../../table'
import type { ColumnStatusType } from './status'
import { NTag } from 'naive-ui'

export interface ColumnTagsProps {
  key?: string
  type?: ColumnStatusType
}

export function columnTags({ key, type }: ColumnTagsProps): TableColumnRender {
  return (rowData) => {
    return (
      <div class="flex gap-1">
        {rowData?.[key || 0]?.map((value: any) => {
          return (
            <NTag round bordered={false} type={type}>
              {value}
            </NTag>
          )
        })}
      </div>
    )
  }
}
