import { NBreadcrumb, NBreadcrumbItem, NButton, NDrawer, NDrawerContent, NIcon, NInput, NLayout, NLayoutHeader, NLayoutSider, NMenu } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { emitter } from '../../event'
import { useMenu } from '../../hooks/useMenu'
import { useManageStore } from '../../stores'
import { DuxCommand } from '../command'
import { DuxTabs } from './tabs'
import { Avatar } from './tools/avatar'
import { Color } from './tools/color'
import { Fullscreen } from './tools/fullscreen'
import { Lang } from './tools/lang'
import { Message } from './tools/message'
import { Search } from './tools/search'
import { Theme } from './tools/theme'

export const DuxLayout = defineComponent({
  name: 'DuxLayout',
  setup(_props, { slots }) {
    const { appCollapsed, sideCollapsed, collapsed, appKey, subKey, appMenu, subMenu, crumbs, showCollapsed, isMobile, allMenu } = useMenu()
    const { t } = useI18n()
    const mobileMenuShow = ref(false)

    const { logout } = useManageStore()
    const router = useRouter()

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
          <NLayoutSider collapsed={collapsed.value} showTrigger={showCollapsed.value} collapseMode="width" width={240} collapsedWidth={64} bordered nativeScrollbar={false} onUpdateCollapsed={(v: boolean) => sideCollapsed.value = v}>
            <div class="flex h-screen">
              <div class="flex flex-col flex-none w-64px gap-4">
                <div class="flex-none px-3">
                  <div class="py-6 border-gray-2 border-b">
                    <dux-logo />
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
              <div class="flex-1 border-gray-2 border-l">
                <div class="flex flex-row gap-2 items-center px-3 py-4">
                  <NInput
                    round
                    placeholder={t('common.search')}
                    readonly
                    onClick={() => {
                      emitter.emit('command')
                    }}
                  >
                    {{
                      prefix: () => <div class="i-tabler:search" />,
                      suffix: () => (
                        <div class="border border-gray-3 rounded-full px-2 py-0.5 text-xs relative -right-1">
                          ⌘K
                        </div>
                      ),
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
              {isMobile.value && (
                <div class="flex-1">
                  <div class="max-w-60px max-h-45px" onClick={() => mobileMenuShow.value = true}>
                    <dux-logo />
                  </div>
                  <NDrawer show={mobileMenuShow.value} onUpdateShow={v => mobileMenuShow.value = v} width={250} placement="left">
                    <NDrawerContent title="菜单" closable bodyContentStyle={{ padding: '5px' }}>
                      <NMenu
                        rootIndent={20}
                        indent={15}
                        options={allMenu.value}
                        value={appKey.value as string}
                        onUpdateValue={(key: string) => appKey.value = key}
                      />
                    </NDrawerContent>
                  </NDrawer>
                </div>
              )}
              {!isMobile.value && (
                <div class="flex-1">
                  <NBreadcrumb>
                    {crumbs.value?.map(item => (
                      <NBreadcrumbItem key={item}>
                        {item.iconName && (
                          <NIcon>
                            <div class={item.iconName} />
                          </NIcon>
                        )}
                        {' '}
                        { item.labelName }
                      </NBreadcrumbItem>
                    ))}
                  </NBreadcrumb>
                </div>
              )}
              <div class="flex flex-row gap-4 flex-none">
                <div class="flex flex-row gap-2">
                  <Search />
                  <Fullscreen />
                  <Message />
                  <Lang />
                  <Color />
                  <Theme />
                </div>

                <div class="flex items-center">
                  <Avatar />
                </div>
              </div>
            </div>
          </NLayoutHeader>
          <div class="flex-none" />
          <DuxTabs />

          {slots.default?.()}

          <DuxCommand />
        </NLayout>
      </NLayout>
    )
  },
})
