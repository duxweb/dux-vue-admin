import type { App } from 'vue'
import { DuxCascaderAsync } from './cascader'
import DuxLogo from './common/logo.vue'
import DrawApps from './draw/drawApps.vue'
import DrawError from './draw/drawError.vue'
import { DuxAiEditor } from './editor/editor'
import { DuxDrawerForm, DuxJsonForm, DuxModalForm, DuxPageForm } from './form'
import { DuxException, DuxPage } from './layout'
import { DuxList } from './list'
import { DuxRegion } from './region'
import { DuxSelectAsync } from './select'
import { DuxStatsAccount, DuxStatsBankcard, DuxStatsCard, DuxStatsChartArea, DuxStatsChartGrid, DuxStatsChartMap, DuxStatsChartRadar, DuxStatsConnect, DuxStatsHello, DuxStatsHelloBig, DuxStatsQuick, DuxStatsQuickItem, DuxStatsStore, DuxStatsStoreItem, DuxStatsTodo, DuxStatsTodoItem, DuxStatsTotalCard, DuxStatsTotalCardItem, DuxStatsTotalMulti, DuxStatsTotalMultiItem, DuxStatsTotalRate, DuxStatsTotalRateItem, DuxStatsTotalSimple, DuxStatsTotalSimpleItem, DuxStatsTotalTab, DuxStatsTotalTabItem, DuxStatsUser } from './stats'
import { DuxPageStatus } from './status'
import { DuxPageTable } from './table'
import { DuxFileUpload, DuxImageUpload } from './upload'
import { DuxCarousel, DuxMedia, DuxWidgetEditor } from './widget'
import { DuxWindowFooter, DuxWindowHeader } from './window'

export default {
  install(app: App) {
    app.component('DuxLogo', DuxLogo)
    app.component('DuxDrawApps', DrawApps)
    app.component('DuxDrawError', DrawError)
    app.component('DuxException', DuxException)
    app.component('DuxPage', DuxPage)
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
    app.component('DuxStatsCard', DuxStatsCard)
    app.component('DuxStatsTotalRate', DuxStatsTotalRate)
    app.component('DuxStatsTotalRateItem', DuxStatsTotalRateItem)
    app.component('DuxStatsTotalSimple', DuxStatsTotalSimple)
    app.component('DuxStatsTotalSimpleItem', DuxStatsTotalSimpleItem)
    app.component('DuxStatsTotalMulti', DuxStatsTotalMulti)
    app.component('DuxStatsTotalMultiItem', DuxStatsTotalMultiItem)
    app.component('DuxStatsTotalCard', DuxStatsTotalCard)
    app.component('DuxStatsTotalCardItem', DuxStatsTotalCardItem)
    app.component('DuxStatsTotalTab', DuxStatsTotalTab)
    app.component('DuxStatsTotalTabItem', DuxStatsTotalTabItem)
    app.component('DuxStatsAccount', DuxStatsAccount)
    app.component('DuxStatsBankcard', DuxStatsBankcard)
    app.component('DuxStatsChartGrid', DuxStatsChartGrid)
    app.component('DuxStatsChartArea', DuxStatsChartArea)
    app.component('DuxStatsChartRadar', DuxStatsChartRadar)
    app.component('DuxStatsChartMap', DuxStatsChartMap)
    app.component('DuxStatsTodo', DuxStatsTodo)
    app.component('DuxStatsTodoItem', DuxStatsTodoItem)
    app.component('DuxStatsQuick', DuxStatsQuick)
    app.component('DuxStatsQuickItem', DuxStatsQuickItem)
    app.component('DuxStatsUser', DuxStatsUser)
    app.component('DuxStatsStore', DuxStatsStore)
    app.component('DuxStatsStoreItem', DuxStatsStoreItem)
    app.component('DuxStatsHello', DuxStatsHello)
    app.component('DuxStatsHelloBig', DuxStatsHelloBig)
    app.component('DuxStatsConnect', DuxStatsConnect)
    app.component('DuxCarousel', DuxCarousel)
    app.component('DuxList', DuxList)
    app.component('DuxMedia', DuxMedia)
    app.component('DuxWidgetEditor', DuxWidgetEditor)
  },
}
