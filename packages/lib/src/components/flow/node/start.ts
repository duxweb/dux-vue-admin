import { CircleNode, CircleNodeModel } from '@logicflow/core'
import { i18n } from '../../../i18n'

class StartNodeView extends CircleNode {}

class StartNodeModel extends CircleNodeModel {
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
    this.text.value = (i18n.global.t as any)('components.flow.start')
  }

  setAttributes() {
    super.setAttributes()
    this.r = 45
  }
}

export default {
  type: 'start',
  view: StartNodeView,
  model: StartNodeModel,
}
