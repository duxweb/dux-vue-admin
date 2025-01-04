import { RectNode, RectNodeModel } from '@logicflow/core'
import { i18n } from '../../../i18n'

class NodeView extends RectNode {}

class NodeModel extends RectNodeModel {
  getNodeStyle() {
    const style = super.getNodeStyle()
    style.fill = 'rgba(var(--n-primary-color), .1)'
    style.stroke = 'rgba(var(--n-primary-color), 1)'
    return style
  }

  getTextStyle() {
    const style = super.getTextStyle()
    style.color = 'rgba(var(--n-primary-color), 1)'
    return style
  }

  initNodeData(data: any) {
    super.initNodeData(data)
    this.text.value = (i18n.global.t as any)('components.flow.node')
  }

  setAttributes() {
    super.setAttributes()
    this.width = 80
    this.height = 80
  }
}

export default {
  type: 'node',
  view: NodeView,
  model: NodeModel,
}
