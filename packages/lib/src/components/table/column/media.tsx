import type { VNode } from 'vue'
import type { TableColumnRender } from '../../table'
import { get } from 'lodash-es'
import { NAvatar, NImage } from 'naive-ui'
import placeholder from '../../../static/images/placeholder.png'

export interface ColumnMediaProps {
  image?: string | ((rowData: Record<string, any>) => VNode)
  images?: string[]
  avatar?: string | ((rowData: Record<string, any>) => VNode)
  title?: string | ((rowData: Record<string, any>) => VNode)
  desc?: string | ((rowData: Record<string, any>) => VNode)
  descs?: string[]
  imageWidth?: number
  imageHeight?: number
}

export function columnMedia({ imageWidth = 36, imageHeight = 36, ...props }: ColumnMediaProps): TableColumnRender {
  return (rowData) => {
    const title = typeof props.title === 'function' ? props.title(rowData) : get(rowData, props.title || '')
    const desc = typeof props.desc === 'function' ? props.desc(rowData) : get(rowData, props.desc || '')
    const avatar = typeof props.avatar === 'function' ? props.avatar(rowData) : get(rowData, props.avatar || '')
    const image = typeof props.image === 'function' ? props.image(rowData) : get(rowData, props.image || '')
    return (
      <div class="flex flex-row flex-nowrap gap-2 items-center leading-4">
        {props.avatar && (
          <NAvatar
            src={avatar}
            style={{
              background: 'rgba(var(--n-primary-color))',
            }}
            round
            lazy
            size={imageHeight}
          >
            {!avatar ? title?.charAt?.(0) : undefined}
          </NAvatar>
        )}
        {props.image && <div><NImage src={image || placeholder} fallbackSrc={placeholder} objectFit="cover" width={imageWidth} height={imageHeight} /></div>}
        <div class="flex-1 min-w-0 flex flex-col gap-1">
          {props.title && <div class="truncate" title={title}>{title}</div>}
          {props.desc && <div class="text-gray-6 truncate" title={desc}>{desc}</div>}
          {props.descs && props.descs.map(desc => <div class="text-gray-4 truncate" title={rowData[desc]}>{rowData[desc]}</div>)}
        </div>
      </div>
    )
  }
}
