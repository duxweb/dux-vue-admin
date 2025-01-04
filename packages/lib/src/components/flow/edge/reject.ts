import { PolylineEdge, PolylineEdgeModel } from '@logicflow/core'
import { i18n } from '../../../i18n'

class RejectModel extends PolylineEdgeModel {
  // 设置边样式
  getEdgeStyle() {
    const style = super.getEdgeStyle()
    style.strokeDasharray = '4, 4'
    style.stroke = 'rgba(var(--n-error-color), 1)'
    return style
  }

  getTextStyle() {
    const style = super.getTextStyle()
    style.color = 'rgba(var(--n-error-color), 1)'
    style.background = {
      fill: 'var(--n-container-color)',
    }
    return style
  }

  setAttributes() {
    super.setAttributes()
    this.text.value = (i18n.global.t as any)('components.flow.reject')
  }
}

export default {
  type: 'reject',
  view: PolylineEdge,
  model: RejectModel,
}
