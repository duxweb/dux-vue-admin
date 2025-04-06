import type { VNodeChild } from 'vue'
import type { TableColumnRender } from '..'
import clsx from 'clsx'
import { get } from 'lodash-es'

export interface ColumnMapTypeValue {
  icon?: string
  label?: string
  value?: any
  render?: (value: any) => VNodeChild
}

export interface ColumnMapProps {
  maps?: ColumnMapTypeValue[] | ((rowData: any) => ColumnMapTypeValue[])
}

export function columnMap({ maps }: ColumnMapProps): TableColumnRender {
  return (rowData) => {
    const mapsData = typeof maps === 'function' ? maps(rowData) : maps
    return (
      <div class="flex flex-col gap-1">
        {mapsData?.map(item => (
          <div class="flex">
            <div class="flex text-gray-6 items-center gap-1">
              {item.icon && (
                <div class={clsx([
                  'n-icon',
                  item.icon,
                ])}
                >
                </div>
              )}
              {item.label}
              ：
            </div>
            <div>{item?.render ? item.render(get(rowData, item.value)) : get(rowData, item.value)}</div>
          </div>
        ))}
      </div>
    )
  }
}
