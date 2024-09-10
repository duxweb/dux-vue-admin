import type { App } from 'vue'
import { DuxCascaderAsync } from './cascader'
import { DuxLogo } from './common'
import { DrawApps, DrawError } from './draw'
import { DuxAiEditor } from './editor/editor'
import { DuxDrawerForm, DuxJsonForm, DuxModalForm, DuxPageForm } from './form'
import { DuxException } from './layout'
import { DuxRegion } from './region'
import { DuxSelectAsync } from './select'
import { DuxPageStatus } from './status'
import { DuxPageTable } from './table'
import { DuxFileUpload, DuxImageUpload } from './upload'
import { DuxWindowFooter, DuxWindowHeader } from './window'

export default {
  install(app: App) {
    app.component('DuxLogo', DuxLogo)
    app.component('DrawApps', DrawApps)
    app.component('DuxLogo', DrawError)
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
