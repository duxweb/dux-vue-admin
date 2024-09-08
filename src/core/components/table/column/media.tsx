import { NImage } from 'naive-ui'
import type { TableColumnRender } from '../../table'

export interface ColumnMediaProps {
  image?: string
  images?: string[]
  title?: string
  desc?: string
  descs?: string[]
  imageWidth?: number
  imageHeight?: number
}

export function columnMedia({ imageWidth = 40, imageHeight = 40, ...props }: ColumnMediaProps): TableColumnRender {
  return (rowData) => {
    return (
      <div class="flex flex-row flex-nowrap gap-2">
        {props.image && <div><NImage src={rowData[props.image]} objectFit="cover" width={imageWidth} height={imageHeight} /></div>}
        <div class="flex-1 w-1 flex-col gap-2 ">
          {props.title && <div class="truncate" title={rowData[props.title]}>{rowData[props.title]}</div>}
          {props.desc && <div class="text-gray-6 truncate" title={rowData[props.desc]}>{rowData[props.desc]}</div>}
          {props.descs && props.descs.map(desc => <div class="text-gray-4 truncate" title={rowData[desc]}>{rowData[desc]}</div>)}
        </div>
      </div>
    )
  }
}
