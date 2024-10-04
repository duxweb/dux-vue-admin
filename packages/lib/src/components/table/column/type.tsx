import type { TableColumnRender } from '../../table'
import type { ColumnStatusProps, ColumnStatusType } from './status'
import _ from 'lodash-es'
import { NTag } from 'naive-ui'

export function columnType({ key, maps }: ColumnStatusProps): TableColumnRender {
  return (rowData) => {
    return (
      <>
        {key
          ? rowData?.[key]?.map((value: any) => {
            const type = _.findKey(maps, v => v.value === value) as ColumnStatusType
            const info = maps?.[type]
            return (
              <NTag round bordered={false} type={type}>
                {info?.label}
              </NTag>
            )
          })
          : '-'}
      </>
    )
  }
}
