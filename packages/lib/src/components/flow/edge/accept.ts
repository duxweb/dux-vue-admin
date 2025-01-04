import { PolylineEdge, PolylineEdgeModel } from '@logicflow/core'
import { i18n } from '../../../i18n'

class AcceptModel extends PolylineEdgeModel {
  // 设置边样式
  getEdgeStyle() {
    const style = super.getEdgeStyle()
    style.stroke = 'rgba(var(--n-primary-color), 1)'
    return style
  }

  setAttributes() {
    super.setAttributes()
    this.text.value = (i18n.global.t as any)('components.flow.accept')
  }
}

export default {
  type: 'accept',
  view: PolylineEdge,
  model: AcceptModel,
}
