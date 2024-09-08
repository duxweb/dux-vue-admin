import { NTag } from 'naive-ui'
import _ from 'lodash'
import type { TableColumnRender } from '../..'

export type ColumnStatusType = 'success' | 'error' | 'warning' | 'info' | 'default'

export interface ColumnStatusTypeValue {
  label?: string
  value?: any
}

export interface ColumnStatusProps {
  key?: string
  maps?: Record<ColumnStatusType, ColumnStatusTypeValue>
}

export function columnStatus({ key, maps }: ColumnStatusProps): TableColumnRender {
  return (rowData) => {
    const type = _.findKey(maps, v => v.value === rowData?.[key]) as ColumnStatusType
    const item = maps?.[type]
    return item
      ? (
          <NTag round bordered={false} type={type}>
            {{
              icon: () => {
                return (
                  <>
                    {type === 'success' && <div class="n-icon i-tabler:circle-check-filled"></div>}
                    {type === 'error' && <div class="n-icon i-tabler:circle-x-filled"></div>}
                    {type === 'warning' && <div class="n-icon i-tabler:exclamation-circle-filled"></div>}
                    {(type === 'default' || type === 'info') && <div class="n-icon i-tabler:info-circle-filled"></div>}
                  </>
                )
              },
              default: () => <span class="text-13px">{item?.label}</span>,
            }}
          </NTag>
        )
      : null
  }
}
