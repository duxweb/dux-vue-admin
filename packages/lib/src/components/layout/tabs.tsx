import type { TabRoute } from '../../stores/tab'
import clsx from 'clsx'
import { NTab, NTabs } from 'naive-ui'
import { defineComponent, Transition, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useRouteStore } from '../../stores'
import { useTabStore } from '../../stores/tab'
import './tabs.css'

export const DuxTabs = defineComponent({
  name: 'DuxTabs',
  setup(_props) {
    const tab = useTabStore()
    const routeStore = useRouteStore()
    const route = useRoute()
    const router = useRouter()
    const { t } = useI18n()

    watch([route, () => routeStore.routes], () => {
      const info = routeStore.searchRouteName(route.name as string)
      if (!info) {
        return
      }
      const item = { label: info.label as string, url: route.path, name: info.name }
      tab.addTab(item)
    }, { immediate: true })

    return () => (
      <Transition name="draw">
        <div
          class={clsx([
            'dux-tabs items-end px-2 my-2',
            tab.tabs.length > 1 ? 'flex' : 'hidden',
          ])}
        >
          <NTabs
            value={tab.current}
            size="small"
            class="layout-tabs"
            type="card"
            onUpdateValue={(v: string) => {
              tab.changeTab(v, (v: TabRoute) => {
                router.push(v.url || '')
              })
            }}
            onClose={(v: string) => tab.delTab(v, (v: TabRoute) => router.push(v.url || ''))}
          >
            {tab.tabs?.map((tag, key) => <NTab key={key} name={tag.url || ''} tab={tag.labelLang ? t(tag.labelLang) : tag.label} closable={key !== 0} />)}
          </NTabs>
        </div>
      </Transition>
    )
  },
})
