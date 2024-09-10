import clsx from 'clsx'
import { NTabPane, NTabs } from 'naive-ui'
import { defineComponent, Transition, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTabStore } from '../../stores/tab'
import type { DuxRoute } from '../../stores'
import './tabs.module.css'

export const DuxTabs = defineComponent({
  name: 'DuxTabs',
  setup(_props) {
    const tab = useTabStore()

    const route = useRoute()
    const router = useRouter()

    watch(route, () => {
      if (!route.name) {
        return
      }
      const item = { label: route.meta.title as string, path: route.path, name: route.name as string }
      tab.addTab(item)
    }, { immediate: true })

    return () => (
      <Transition name="draw">
        <div
          class={clsx([
            'tabs items-end px-2',
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
            {tab.tabs?.map((tag, key) => <NTabPane key={key} name={tag.name} tab={tag.label} closable={key !== 0} />)}
          </NTabs>
        </div>
      </Transition>
    )
  },
})
