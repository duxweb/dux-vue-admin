import type { TabRoute } from '../../stores/tab'
import clsx from 'clsx'
import { NDropdown, NTab, NTabs } from 'naive-ui'
import { defineComponent, nextTick, ref, Transition, watch } from 'vue'
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

    const showDropdownRef = ref(false)
    const xRef = ref(0)
    const yRef = ref(0)
    const tagRef = ref<TabRoute | null>(null)

    const handleContextMenu = (e: MouseEvent, tag: TabRoute) => {
      e.preventDefault()
      showDropdownRef.value = false
      nextTick().then(() => {
        showDropdownRef.value = true
        xRef.value = e.clientX
        yRef.value = e.clientY
        tagRef.value = tag
      })
    }

    const handleSelect = (key: string) => {
      showDropdownRef.value = false

      switch (key) {
        case 'lock':
          tab.lockTab(tagRef.value?.url || '')
          break
        case 'closeOther':
          tab.delOther(tagRef.value?.url || '', () => {
            router.push(tagRef.value?.url || '')
          })
          break
        case 'closeLeft':
          tab.delLeft(tagRef.value?.url || '', () => {
            router.push(tagRef.value?.url || '')
          })
          break
        case 'closeRight':
          tab.delRight(tagRef.value?.url || '', () => {
            router.push(tagRef.value?.url || '')
          })
          break
        default:
          break
      }
    }

    const options = [
      {
        label: t('components.tabs.lock'),
        key: 'lock',
      },
      {
        label: t('components.tabs.closeOther'),
        key: 'closeOther',
      },
      {
        label: t('components.tabs.closeLeft'),
        key: 'closeLeft',
      },
      {
        label: t('components.tabs.closeRight'),
        key: 'closeRight',
      },
    ]

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
            {tab.tabs?.map((tag, key) => (
              <NTab
                key={key}
                name={tag.url || ''}
                closable={!tag.meta?.lock}
              >
                <div
                  class="flex gap-1 items-center"
                  onContextmenu={(e) => {
                    handleContextMenu(e, tag)
                  }}
                >
                  {tag.label}
                  {tag.meta?.lock && <div class="i-tabler:pinned"></div>}
                </div>
              </NTab>
            ))}
          </NTabs>
          <NDropdown
            placement="bottom-start"
            trigger="manual"
            x={xRef.value}
            y={yRef.value}
            options={options}
            show={showDropdownRef.value}
            onSelect={handleSelect}
            onClickoutside={() => showDropdownRef.value = false}
          >
          </NDropdown>
        </div>

      </Transition>
    )
  },
})
