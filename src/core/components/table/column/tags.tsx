import { NTag } from 'naive-ui'
import type { TableColumnRender } from '../../table'
import type { ColumnStatusType } from './status'

export interface ColumnTagsProps {
  key?: string
  type?: ColumnStatusType
}

export function columnTags({ key, type }: ColumnTagsProps): TableColumnRender {
  return (rowData) => {
    return (
      <>
        {rowData?.[key || 0]?.map((value: any) => {
          return (
            <NTag round bordered={false} type={type}>
              {value}
            </NTag>
          )
        })}
      </>
    )
  }
}
