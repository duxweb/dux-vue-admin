import type { App } from 'vue'
import { DuxWindowFooter, DuxWindowHeader } from './window'
import { DuxAiEditor } from './editor/editor'
import { DuxFileUpload, DuxImageUpload } from './upload'
import { DuxSelectAsync } from './select'
import { DuxCascaderAsync } from './cascader'
import { DuxRegion } from './region'
import { DuxPageStatus } from './status'
import { DuxDrawerForm, DuxJsonForm, DuxModalForm, DuxPageForm } from './form'
import { DuxException } from './layout'
import { DuxPageTable } from './table'
import { DuxLogo } from './draw'

export default {
  install(app: App) {
    app.component('DuxLogo', DuxLogo)
    app.component('DuxException', DuxException)
    app.component('DuxPageTable', DuxPageTable)
    app.component('DuxPageForm', DuxPageForm)
    app.component('DuxJsonForm', DuxJsonForm)
    app.component('DuxDrawerForm', DuxDrawerForm)
    app.component('DuxModalForm', DuxModalForm)
    app.component('DuxWindowHeader', DuxWindowHeader)
    app.component('DuxWindowFooter', DuxWindowFooter)
    app.component('DuxAiEditor', DuxAiEditor)
    app.component('DuxFileUpload', DuxFileUpload)
    app.component('DuxImageUpload', DuxImageUpload)
    app.component('DuxSelectAsync', DuxSelectAsync)
    app.component('DuxCascaderAsync', DuxCascaderAsync)
    app.component('DuxRegion', DuxRegion)
    app.component('DuxPageStatus', DuxPageStatus)
  },
}
