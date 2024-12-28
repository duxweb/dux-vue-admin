import type { TableColumnRender } from '..'
import { get } from 'lodash-es'
import { NImage } from 'naive-ui'
import placeholder from '../../../static/images/placeholder.png'

export interface ColumnImagesProps {
  key?: string
  imageWidth?: number
  imageHeight?: number
}

export function columnImages({ imageWidth = 36, imageHeight = 36, ...props }: ColumnImagesProps): TableColumnRender {
  return (rowData) => {
    const value = get(rowData, props.key || '') || []
    return (
      <div class="flex flex-wrap gap-2">
        {value.map((item, index) => (
          <NImage key={index} src={item} width={imageWidth} height={imageHeight} fallbackSrc={placeholder} objectFit="cover" />
        ))}
      </div>
    )
  }
}
