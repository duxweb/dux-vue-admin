import type { TableColumnRender } from '..'
import { NImage } from 'naive-ui'
import placeholder from '../../../static/images/placeholder.png'

export interface ColumnImageProps {
  key?: string
  imageWidth?: number
  imageHeight?: number
}

export function columnImage({ imageWidth = 36, imageHeight = 36, ...props }: ColumnImageProps): TableColumnRender {
  return (rowData) => {
    return (
      <NImage src={rowData[props.key || ''] || placeholder} width={imageWidth} height={imageHeight} fallbackSrc={placeholder} objectFit="cover">
        {{
          error: () => <NImage src={placeholder} width={imageWidth} height={imageHeight} objectFit="cover" />,
        }}
      </NImage>
    )
  }
}
