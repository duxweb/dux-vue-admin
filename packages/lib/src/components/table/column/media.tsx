import type { TableColumnRender } from '../../table'
import { NAvatar, NImage } from 'naive-ui'
import placeholder from '../../../static/images/placeholder.png'

export interface ColumnMediaProps {
  image?: string
  images?: string[]
  avatar?: string
  title?: string
  desc?: string
  descs?: string[]
  imageWidth?: number
  imageHeight?: number
}

export function columnMedia({ imageWidth = 36, imageHeight = 36, ...props }: ColumnMediaProps): TableColumnRender {
  return (rowData) => {
    return (
      <div class="flex flex-row flex-nowrap gap-2 items-center leading-4">
        {props.avatar && (
          <NAvatar
            src={rowData[props.avatar]}
            style={{
              background: 'rgba(var(--n-primary-color))',
            }}
            round
            size={imageHeight}
          >
            {rowData[props.title || '']?.charAt?.(0)}
          </NAvatar>
        )}
        {props.image && <div><NImage src={rowData[props.image] || placeholder} fallbackSrc={placeholder} objectFit="cover" width={imageWidth} height={imageHeight} /></div>}
        <div class="flex-1 w-1 flex flex-col gap-1">
          {props.title && <div class="truncate" title={rowData[props.title]}>{rowData[props.title]}</div>}
          {props.desc && <div class="text-gray-6 truncate" title={rowData[props.desc]}>{rowData[props.desc]}</div>}
          {props.descs && props.descs.map(desc => <div class="text-gray-4 truncate" title={rowData[desc]}>{rowData[desc]}</div>)}
        </div>
      </div>
    )
  }
}
