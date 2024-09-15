import clsx from 'clsx'
import { NTabPane, NTabs } from 'naive-ui'
import { defineComponent, Transition, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { type DuxRoute, useRouteStore } from '../../stores'
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
      const info = routeStore.searchRoute(route.path)
      if (!info) {
        return
      }
      const item = { label: info.label as string, path: info.path, name: info.name }
      tab.addTab(item)
    }, { immediate: true })

    return () => (
      <Transition name="draw">
        <div
          class={clsx([
            'dux-tabs items-end px-2',
            // 'flex',
            tab.tabs.length > 1 ? 'flex' : 'hidden',
          ])}
        >
          <NTabs
            value={tab.current}
            size="small"
            class="layout-tabs"
            type="card"
            paneClass="!p-0"
            onUpdateValue={(v: string) => tab.changeTab(v, (v: DuxRoute) => router.push(v.path || ''))}
            onClose={(v: string) => tab.delTab(v, (v: DuxRoute) => router.push(v.path || ''))}
          >
            {tab.tabs?.map((tag, key) => <NTabPane key={key} name={tag.name} tab={tag.labelLang ? t(tag.labelLang) : tag.label} closable={key !== 0} />)}
          </NTabs>
        </div>
      </Transition>
    )
  },
})
