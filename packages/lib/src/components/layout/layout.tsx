import { NBreadcrumb, NBreadcrumbItem, NButton, NDrawer, NDrawerContent, NIcon, NLayout, NLayoutHeader, NLayoutSider, NMenu, NScrollbar } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useResource } from '../../hooks'
import { useMenu } from '../../hooks/useMenu'
import { useManageStore, useThemeStore } from '../../stores'
import { DuxCommand } from '../command'
import { DuxTabs } from './tabs'
import { Avatar } from './tools/avatar'
import { Color } from './tools/color'
import { Fullscreen } from './tools/fullscreen'
import { Lang } from './tools/lang'
import { Layout } from './tools/layout'
import { Message } from './tools/message'
import { Search } from './tools/search'
import { SearchInput } from './tools/searchInput'
import { Theme } from './tools/theme'

export const DuxLayout = defineComponent({
  name: 'DuxLayout',
  setup(_props, { slots }) {
    const { appCollapsed, sideCollapsed, collapsed, allKey, appKey, subKey, appMenu, subMenu, crumbs, showCollapsed, isMobile, allMenu } = useMenu()
    const mobileMenuShow = ref(false)
    const { t } = useI18n()

    const { logout } = useManageStore()
    const router = useRouter()
    const route = useRoute()

    const themeStore = useThemeStore()
    const { layout, darkMode } = storeToRefs(themeStore)
    const resource = useResource()

    return () => (
      <NLayout
        hasSider
        class="h-screen"
        embedded
        style={{
          '--n-color': 'transparent',
        }}
      >
        {!isMobile.value && (
          <>
            {layout.value === 'app' && (
              <NLayoutSider collapsed={collapsed.value} showTrigger={showCollapsed.value} collapseMode="width" width={220} collapsedWidth={64} bordered nativeScrollbar={false} onUpdateCollapsed={(v: boolean) => sideCollapsed.value = v}>
                <div class="flex  h-screen">

                  <div class="flex h-full flex-col flex-none w-64px">
                    <div class="flex-none px-3 mb-2">
                      <div class="py-2 border-gray-2 border-b">
                        <div class="max-h-40px max-w-60px">
                          {resource.config?.logo ? (darkMode.value && resource.config?.darkLogo ? <img class="max-h-40px max-w-60px" src={resource.config?.darkLogo} /> : <img class="max-h-40px max-w-60px" src={resource.config?.logo} />) : <div class="py-4"><dux-logo /></div>}
                        </div>
                      </div>
                    </div>
                    <div class="flex-1 h-1 ">
                      <NScrollbar>
                        <NMenu
                          collapsed={appCollapsed.value}
                          collapsedWidth={64}
                          collapsedIconSize={22}
                          options={appMenu.value}
                          value={appKey.value as string}
                          onUpdateValue={(key: string) => appKey.value = key}
                        />
                      </NScrollbar>
                    </div>
                    <div class="flex-none flex flex-col p-2 gap-2">
                      <NButton
                        quaternary
                        onClick={() => {
                          logout()
                          router.push('/')
                        }}
                      >
                        <div class="h-5 w-5 i-tabler:logout" />
                      </NButton>
                    </div>
                  </div>

                  <div class="flex-1 flex flex-col border-gray-2 border-l h-full">
                    <SearchInput />
                    <div class="flex-1 h-1">
                      <NScrollbar>
                        <NMenu
                          rootIndent={20}
                          indent={15}
                          options={subMenu.value}
                          value={subKey.value as string}
                          onUpdateValue={(key: string) => subKey.value = key}
                        />
                      </NScrollbar>
                    </div>
                  </div>
                </div>
              </NLayoutSider>
            )}

            {layout.value === 'collapse' && (
              <NLayoutSider inverted showTrigger={showCollapsed.value} collapseMode="width" width={200} collapsedWidth={64} bordered nativeScrollbar={false} onUpdateCollapsed={(v: boolean) => sideCollapsed.value = v}>
                <div class="flex flex-col h-screen">
                  <div class="flex-none px-4 py-2 border-gray-10 dark:border-gray-2 border-b w-full h-57px flex justify-start items-center">

                    {resource.config?.logo ? resource.config?.darkLogo ? <img class="h-40px" src={resource.config?.darkLogo} /> : <img class="h-40px" src={resource.config?.logo} /> : <div class="h-20px"><dux-logo /></div>}

                  </div>
                  <div class="flex-1 h-1">
                    <NScrollbar>
                      <NMenu
                        collapsedWidth={64}
                        collapsedIconSize={22}
                        rootIndent={15}
                        inverted
                        options={allMenu.value}
                        value={allKey.value as string}
                        onUpdateValue={(key: string) => allKey.value = key}
                      />
                    </NScrollbar>
                  </div>
                </div>
              </NLayoutSider>
            )}
          </>
        )}
        <NLayout contentClass="flex flex-col">
          <NLayoutHeader bordered class="flex-none">
            <div class="flex items-center px-4 h-56px">
              {isMobile.value && (
                <div class="flex-1">
                  <div onClick={() => mobileMenuShow.value = true}>
                    {resource.config?.logo ? (darkMode.value && resource.config?.darkLogo ? <img class="h-40px" src={resource.config?.darkLogo} /> : <img class="h-40px" src={resource.config?.logo} />) : <div class="h-20px"><dux-logo /></div>}
                  </div>
                  <NDrawer show={mobileMenuShow.value} onUpdateShow={v => mobileMenuShow.value = v} width={250} placement="left">
                    <NDrawerContent title={t('common.menu')} closable bodyContentStyle={{ padding: '5px' }}>
                      <NMenu
                        rootIndent={20}
                        indent={15}
                        options={allMenu.value}
                        value={allKey.value as string}
                        onUpdateValue={(key: string) => allKey.value = key}
                      />
                    </NDrawerContent>
                  </NDrawer>
                </div>
              )}

              {!isMobile.value && layout.value === 'separate' && (
                <div class="flex gap-2 flex-1 w-1">
                  <div class=" flex items-center">
                    {resource.config?.logo ? (darkMode.value && resource.config?.darkLogo ? <img class="h-40px" src={resource.config?.darkLogo} /> : <img class="h-40px" src={resource.config?.logo} />) : <div class="h-20px"><dux-logo /></div>}
                  </div>
                  <div class="flex-1 w-1">
                    <NMenu
                      mode="horizontal"
                      responsive
                      options={appMenu.value}
                      value={appKey.value as string}
                      onUpdateValue={(key: string) => appKey.value = key}
                    />
                  </div>
                </div>
              )}

              {!isMobile.value && layout.value !== 'separate' && (
                <div class="flex-1">
                  <NBreadcrumb>
                    {crumbs.value && crumbs.value.length > 0
                      ? crumbs.value?.map(item => (
                        <NBreadcrumbItem key={item}>
                          {item.iconName && (
                            <NIcon>
                              <div class={item.iconName} />
                            </NIcon>
                          )}
                          {' '}
                          {item.labelName}
                        </NBreadcrumbItem>
                      ))
                      : (
                          <div class="flex gap-2 text-sm">
                            {route.meta.icon && (
                              <NIcon>
                                <div class={route.meta.icon} />
                              </NIcon>
                            )}
                            {route.meta?.title}
                          </div>
                        )}

                  </NBreadcrumb>
                </div>
              )}

              <div class="flex flex-row gap-4 flex-none">
                <div class="flex flex-row gap-2">
                  {!isMobile.value && <Search />}
                  {!isMobile.value && <Fullscreen />}
                  <Message />
                  {!resource.config?.lang && <Lang />}
                  {!isMobile.value && <Layout />}
                  {!isMobile.value && <Color />}
                  <Theme />
                </div>

                <div class="flex items-center">
                  <Avatar />
                </div>
              </div>
            </div>
          </NLayoutHeader>

          {layout.value === 'separate' && subMenu.value && subMenu.value.length > 0
            ? (
                <NLayout hasSider>
                  <NLayoutSider width={180} collapsedWidth={64} bordered nativeScrollbar={false}>
                    <div class="flex flex-col h-full">
                      <SearchInput />
                      <div class="flex-1 h-1">
                        <NScrollbar>
                          <NMenu
                            rootIndent={15}
                            options={subMenu.value}
                            value={subKey.value as string}
                            onUpdateValue={(key: string) => subKey.value = key}
                          />
                        </NScrollbar>
                      </div>
                    </div>
                  </NLayoutSider>
                  <div class="flex-1 w-1 flex flex-col">
                    <DuxTabs />
                    {slots.default?.()}
                  </div>
                </NLayout>
              )
            : (
                <>
                  <DuxTabs />
                  {slots.default?.()}
                </>
              )}

          <DuxCommand />
        </NLayout>
      </NLayout>
    )
  },
})
