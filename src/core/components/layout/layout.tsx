import { defineComponent, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { NBreadcrumb, NBreadcrumbItem, NButton, NDrawer, NDrawerContent, NDropdown, NIcon, NInput, NLayout, NLayoutHeader, NLayoutSider, NList, NListItem, NMenu, NPopover, NTabPane, NTabs } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { DuxLogo } from '../draw'
import { useMenu } from '../../hooks/useMenu'
import { useThemeStore } from '../../stores/theme'
import { getLanguage, languageMaps, setLanguage } from '../../i18n'
import { useRouteStore } from '../../stores/route'
import { useResource } from '../../hooks'
import { DuxTabs } from './tabs'

export const DuxLayout = defineComponent({
  name: 'DuxLayout',
  setup(_props, { slots }) {
    const { appCollapsed, sideCollapsed, collapsed, appKey, subKey, appMenu, subMenu, crumbs, showCollapsed, isMobile, allMenu } = useMenu()
    const { t } = useI18n()
    const mobileMenuShow = ref(false)
    const themeStore = useThemeStore()
    const { modeState } = storeToRefs(themeStore)
    const router = useRouter()
    const resource = useResource()
    const lang = ref(getLanguage())

    const langList = Object.keys(languageMaps).map((key) => {
      return {
        label: languageMaps[key],
        key,
      }
    })

    function handleLangSelect(key: string) {
      lang.value = key
      setLanguage(key)
    }

    // 设置管理端数据
    router.beforeEach((to, _from, next) => {
      const manage = resource.manage

      // 处理管理端
      if (to.params?.manage) {
        const routeStore = useRouteStore()
        const routeInfo = routeStore.searchRoute(to.path)
        if (routeInfo) {
          to.name = routeInfo.name
          to.meta = {
            title: routeInfo.label,
          }
        }
        document.title = manage[to.params.manage as string]?.title
      }

      if (!to.name && to.name !== 'notFound') {
        router.push({ name: 'notFound' })
        return
      }
      else {
        next()
      }
      return true
    })
    // 异步获取菜单路由
    resource.registerAsyncRoutes()
    // 注册本地路由
    resource.registerRoutes()

    return () => (
      <NLayout
        hasSider
        class="h-screen"
        embedded
        style={{
          '--n-color': 'transparent',
        }}
      >
        {!isMobile && (
          <NLayoutSider collapsed={collapsed.value} showTrigger={showCollapsed.value} collapseMode="width" width={240} collapsedWidth={64} bordered nativeScrollbar={false} onUpdateCollapsed={(v: boolean) => sideCollapsed.value = v}>
            <div class="flex h-screen">
              <div class="flex flex-col flex-none w-64px gap-4">
                <div class="flex-none px-3">
                  <div class="py-6 border-gray-2 border-b">
                    <DuxLogo />
                  </div>
                </div>
                <div class="flex-1">
                  <NMenu
                    collapsed={appCollapsed.value}
                    collapsedWidth={64}
                    collapsedIconSize={22}
                    options={appMenu.value}
                    value={appKey.value as string}
                    onUpdateValue={(key: string) => appKey.value = key}
                  />
                </div>
                <div class="flex-none flex flex-col p-2 gap-2">
                  <NButton quaternary>
                    <div class="h-5 w-5 i-tabler:logout" />
                  </NButton>
                </div>
              </div>
              <div class="flex-1 border-gray-2 border-l">
                <div class="flex flex-row gap-2 items-center px-3 py-4">
                  <NInput round placeholder={t('common.search')}>
                    {{
                      prefix: () => <div class="i-tabler:search" />,
                    }}
                  </NInput>
                </div>
                <NMenu
                  rootIndent={20}
                  indent={15}
                  options={subMenu.value}
                  value={subKey.value as string}
                  onUpdateValue={(key: string) => subKey.value = key}
                />
              </div>
            </div>
          </NLayoutSider>
        )}
        <NLayout contentClass="flex flex-col">
          <NLayoutHeader bordered class="flex-none">
            <div class="flex items-center px-4 h-56px">
              <div v-if="isMobile" class="flex-1">
                <div class="max-w-60px max-h-45px" onClick={() => mobileMenuShow.value = true}>
                  <DuxLogo />
                </div>
                <NDrawer show={mobileMenuShow.value} onUpdateShow={v => mobileMenuShow.value = v} width={250} placement="left">
                  <NDrawerContent title="菜单" closable bodyContentStyle={{ padding: '5px' }}>
                    <NMenu
                      rootIndent={20}
                      indent={15}
                      options={allMenu}
                      value={appKey.value as string}
                      onUpdateValue={(key: string) => appKey.value = key}
                    />
                  </NDrawerContent>
                </NDrawer>
              </div>
              {!isMobile && (
                <div class="flex-1">
                  <NBreadcrumb>
                    {crumbs.value?.map(item => (
                      <NBreadcrumbItem key={item}>
                        {item.iconName && (
                          <NIcon>
                            <div class={item.iconName} />
                          </NIcon>
                        )}
                        { item.labelName }
                      </NBreadcrumbItem>
                    ))}
                  </NBreadcrumb>
                </div>
              )}
              <div class="flex flex-row gap-4 flex-none">
                <div class="flex flex-row gap-2">
                  <NPopover trigger="click" width={300}>
                    {{
                      trigger: () => (
                        <NButton quaternary circle>
                          <div class="h-5 w-5 i-tabler:bell" />
                        </NButton>
                      ),
                      default: () => (
                        <NTabs justifyContent="space-evenly" type="line" animated>
                          <NTabPane name="oasis" tab="全部">
                            <NList hoverable clickable>
                              <NListItem>
                                1
                              </NListItem>
                              <NListItem>
                                1
                              </NListItem>
                              <NListItem>
                                1
                              </NListItem>
                            </NList>
                          </NTabPane>
                          <NTabPane name="the beatles" tab="已读">
                            已读
                          </NTabPane>

                          <NTabPane name="jay chou" tab="未读">
                            未读
                          </NTabPane>
                        </NTabs>
                      ),
                    }}

                    <div class="border-gray-4 border-t pt-2">
                      <NButton quaternary type="primary" block>
                        清空通知
                      </NButton>
                    </div>
                  </NPopover>

                  <NDropdown
                    trigger="click"
                    options={langList}
                    value={lang.value}
                    onSelect={handleLangSelect}
                  >
                    <NButton quaternary circle>
                      <div class="h-5 w-5 i-tabler:language" />
                    </NButton>
                  </NDropdown>

                  <NButton quaternary circle onClick={themeStore.toggleDarkMode}>
                    {modeState.value === 'auto' && <div class="i-tabler:brightness-half h-5 w-5" />}
                    {modeState.value === 'light' && <div class="i-tabler:sun h-5 w-5" />}
                    {modeState.value === 'dark' && <div class="h-5 w-5 i-tabler:moon" />}
                  </NButton>
                </div>

                <div class="flex items-center">
                  <n-avatar circle>
                    张
                  </n-avatar>
                </div>
              </div>
            </div>
          </NLayoutHeader>
          <div class="flex-none" />
          <DuxTabs />
          <div class="flex-1 p-2 h-1">
            {slots.default?.()}
          </div>
        </NLayout>
      </NLayout>
    )
  },
})
