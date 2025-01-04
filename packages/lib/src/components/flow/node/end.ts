import { CircleNode, CircleNodeModel } from '@logicflow/core'
import { i18n } from '../../../i18n'

class EndNodeView extends CircleNode {}

class EndNodeModel extends CircleNodeModel {
  getNodeStyle() {
    const style = super.getNodeStyle()
    style.fill = 'rgba(var(--n-warning-color), .1)'
    style.stroke = 'rgba(var(--n-warning-color), 1)'
    return style
  }

  getTextStyle() {
    const style = super.getTextStyle()
    style.color = 'rgba(var(--n-warning-color), 1)'
    return style
  }

  initNodeData(data: any) {
    super.initNodeData(data)
    this.text.value = (i18n.global.t as any)('components.flow.end')
  }

  setAttributes() {
    super.setAttributes()
    this.r = 45
  }
}

export default {
  type: 'end',
  view: EndNodeView,
  model: EndNodeModel,
}
