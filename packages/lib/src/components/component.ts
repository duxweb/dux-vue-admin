import type { App } from 'vue'
import { DuxCardHeader } from './card'
import { DuxCascaderAsync } from './cascader'
import { DuxCodeEditor } from './code'
import { DuxLogo } from './common'
import { DuxDynamicData, DuxDynamicSelect } from './data'
import { DuxDrawApps, DuxDrawAuth, DuxDrawEmpty, DuxDrawEmptyForm, DuxDrawError } from './draw'
import { DuxDrawerPage } from './drawer'
import { DuxAiEditor } from './editor/aiEditor'
import { DuxExample } from './example'
import { DuxFilter } from './filter'
import { DuxDrawerForm, DuxFormEditor, DuxJsonForm, DuxModalForm, DuxPageForm, DuxStepForm } from './form'
import { DuxIconPicker } from './icon'
import { DuxException, DuxGrid, DuxPage, DuxPageFull } from './layout'
import { DuxCardList, DuxList } from './list'
import { DuxMentionAsync } from './mention'
import { DuxModalPage } from './modal'
import { DuxPdf } from './pdf'
import { DuxRadio } from './radio'
import { DuxRegion } from './region'
import { DuxSelectAsync } from './select'
import { DuxStatsAccount, DuxStatsAction, DuxStatsBankcard, DuxStatsCard, DuxStatsChartArea, DuxStatsChartGrid, DuxStatsChartMap, DuxStatsChartRadar, DuxStatsConnect, DuxStatsHello, DuxStatsHelloBig, DuxStatsQuick, DuxStatsQuickItem, DuxStatsStore, DuxStatsStoreItem, DuxStatsTodo, DuxStatsTodoItem, DuxStatsTotalCard, DuxStatsTotalCardItem, DuxStatsTotalMulti, DuxStatsTotalMultiItem, DuxStatsTotalRate, DuxStatsTotalRateItem, DuxStatsTotalSimple, DuxStatsTotalSimpleItem, DuxStatsTotalTab, DuxStatsTotalTabItem, DuxStatsUser } from './stats'
import { DuxBlockEmpty, DuxPage403, DuxPage404, DuxPage500, DuxPageStatus } from './status'
import { DuxPageEmpty } from './status/pageEmpty'
import { DuxStep } from './step/step'
import { DuxBaseTable, DuxPageTable, DuxTable } from './table'
import { DuxTransferAsync } from './transfer'
import { DuxTreeSelectAsync } from './treeSelect'
import { DuxFileUpload, DuxImageUpload } from './upload'
import { DuxCarousel, DuxMedia } from './widget'
import { DuxWindowFooter, DuxWindowHeader } from './window'

export default {
  install(app: App) {
    app.component('DuxLogo', DuxLogo)
    app.component('DuxDrawApps', DuxDrawApps)
    app.component('DuxDrawError', DuxDrawError)
    app.component('DuxDrawEmpty', DuxDrawEmpty)
    app.component('DuxDrawAuth', DuxDrawAuth)
    app.component('DuxException', DuxException)
    app.component('DuxPage', DuxPage)
    app.component('DuxPageFull', DuxPageFull)
    app.component('DuxPageTable', DuxPageTable)
    app.component('DuxPageForm', DuxPageForm)
    app.component('DuxJsonForm', DuxJsonForm)
    app.component('DuxDrawerForm', DuxDrawerForm)
    app.component('DuxModalForm', DuxModalForm)
    app.component('DuxFilter', DuxFilter)
    app.component('DuxCardList', DuxCardList)
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
    app.component('DuxFormEditor', DuxFormEditor)
    app.component('DuxGrid', DuxGrid)
    app.component('DuxRadio', DuxRadio)
    app.component('DuxIconPicker', DuxIconPicker)
    app.component('DuxCodeEditor', DuxCodeEditor)
    app.component('DuxBlockEmpty', DuxBlockEmpty)
    app.component('DuxPageEmpty', DuxPageEmpty)
    app.component('DuxStepForm', DuxStepForm)
    app.component('DuxStep', DuxStep)
    app.component('DuxExample', DuxExample)
    app.component('DuxPage403', DuxPage403)
    app.component('DuxPage404', DuxPage404)
    app.component('DuxPage500', DuxPage500)
    app.component('DuxDrawEmptyForm', DuxDrawEmptyForm)
    app.component('DuxStatsAction', DuxStatsAction)
    app.component('DuxCardHeader', DuxCardHeader)
    app.component('DuxTable', DuxTable)
    app.component('DuxBaseTable', DuxBaseTable)
    app.component('DuxDrawerPage', DuxDrawerPage)
    app.component('DuxModalPage', DuxModalPage)
    app.component('DuxPdf', DuxPdf)
    app.component('DuxDynamicData', DuxDynamicData)
    app.component('DuxDynamicSelect', DuxDynamicSelect)
    app.component('DuxMentionAsync', DuxMentionAsync)
    app.component('DuxTransferAsync', DuxTransferAsync)
    app.component('DuxTreeSelectAsync', DuxTreeSelectAsync)
  },
}
