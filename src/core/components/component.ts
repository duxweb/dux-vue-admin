import type { App } from 'vue'
import { DuxCascaderAsync } from './cascader'
import DuxLogo from './common/logo.vue'
import DrawApps from './draw/drawApps.vue'
import DrawError from './draw/drawError.vue'
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
    app.component('DuxDrawApps', DrawApps)
    app.component('DuxDrawError', DrawError)
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
