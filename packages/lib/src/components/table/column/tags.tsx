import type { TableColumnRender } from '../../table'
import type { ColumnStatusType } from './status'
import { get } from 'lodash-es'
import { NTag } from 'naive-ui'

export interface ColumnTagsProps {
  key?: string
  type?: ColumnStatusType
}

export function columnTags({ key, type }: ColumnTagsProps): TableColumnRender {
  return (rowData) => {
    return (
      <div class="flex gap-1">
        {get(rowData, key || 0)?.map((value: any) => {
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
