import type { MenuOption } from 'naive-ui'
import type { DuxRoute } from '../stores/route'
import { useWindowSize } from '@vueuse/core'
import { cloneDeep } from 'lodash-es'
import { storeToRefs } from 'pinia'
import { computed, h, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'
import { useThemeStore } from '../stores'
import { useRouteStore } from '../stores/route'
import { arrayToTree, searchTree } from './useTree'

export function useMenu() {
  const isPad = ref<boolean>(false)
  const isMobile = ref<boolean>(false)
  const appCollapsed = ref<boolean>(true)
  const sideCollapsed = ref<boolean>(false)
  const { t } = useI18n()

  const routeStore = useRouteStore()
  const { routes } = storeToRefs(routeStore)

  const themeStore = useThemeStore()
  const { layout } = storeToRefs(themeStore)

  const getMenu = (data: DuxRoute[], hidden: boolean = true): MenuOption[] => {
    return cloneDeep(data)?.filter(item => !!item?.name).filter(item => !hidden || item.hidden === undefined || item.hidden === false)?.map<MenuOption>((item) => {
      const field = item.labelLang ? t(item.labelLang) : item.label
      return {
        key: item.name,
        parent: item.parent,
        path: item.path,
        sort: item.sort,
        labelName: field,
        iconName: item.icon,
        hidden: item.hidden,
        icon: item?.icon
          ? () => {
              return h('div', {
                class: item.icon,
              })
            }
          : undefined,
        label() {
          return item.path
            ? h(
              RouterLink,
              {
                to: {
                  path: item.path,
                },
              },
              { default: () => field },
            )
            : field
        },
      }
    })
  }

  const originalList = computed<MenuOption[]>(() => {
    const menus = getMenu(routes.value, false)
    return arrayToTree(menus, {
      idKey: 'key',
      parentKey: 'parent',
      childrenKey: 'children',
      sortKey: 'sort',
    }, undefined)
  })

  const list = computed<MenuOption[]>(() => {
    const menus = getMenu(routes.value)
    const data = arrayToTree(menus, {
      idKey: 'key',
      parentKey: 'parent',
      childrenKey: 'children',
      sortKey: 'sort',
    }, undefined)
    return data
  })

  const route = useRoute()

  const allKey = ref(route.name)
  const appKey = ref(route.name)
  const subKey = ref(route.name)

  // 获取侧栏菜单
  const appMenu = computed<MenuOption[]>(() => {
    if (sideCollapsed.value) {
      return list.value
    }
    const appList = cloneDeep(list.value)
    return appList?.map((item) => {
      delete item.children
      return item
    }) as MenuOption[]
  })

  // 获取展开菜单
  const subMenu = computed<MenuOption[]>(() => {
    if (sideCollapsed.value) {
      return []
    }
    const subList = list.value?.find(item => item.key === appKey.value)?.children
    return subList || []
  })

  const crumbs = computed(() => {
    const data = searchTree(originalList.value, (item) => {
      return item?.key === route.name
    })
    return data
  })

  watch(sideCollapsed, () => {
    if (sideCollapsed.value) {
      const paths = searchTree(list.value, (item) => {
        return item?.key === subKey.value
      })
      appKey.value = paths?.[paths.length - 1]?.key
      subKey.value = paths?.[paths.length - 1]?.key
    }
    else {
      const paths = searchTree(list.value, (item) => {
        return item?.key === appKey.value
      })

      appKey.value = paths?.[0]?.key
      subKey.value = paths?.[paths.length - 1]?.key
    }
  }, { immediate: true })

  const { width } = useWindowSize()

  watch([width, layout], () => {
    isPad.value = width.value < 1024
    isMobile.value = width.value < 768
    if (width.value < 1024) {
      sideCollapsed.value = true
    }
    else if (layout.value === 'separate') {
      sideCollapsed.value = false
    }
  }, { immediate: true })

  const collapsed = computed(() => {
    return sideCollapsed.value || !subMenu.value.length
  })

  const showCollapsed = computed(() => {
    if (!subMenu.value) {
      return true
    }
    return (sideCollapsed.value || subMenu.value.length > 0) && !isPad.value ? 'bar' : false
  })

  // 根据路由改变高亮
  watch([route, originalList, sideCollapsed], () => {
    const paths = searchTree(originalList.value, (item) => {
      return item.key === route.name
    })

    const findIndex = (list: MenuOption[]) => {
      let index = -1
      for (let i = list.length - 1; i >= 0; i--) {
        if (list[i].hidden === false || list[i].hidden === undefined) {
          index = i
          break
        }
      }
      return index
    }

    const subIndex = findIndex(paths)

    allKey.value = paths?.[subIndex]?.key

    if (sideCollapsed.value) {
      appKey.value = paths?.[subIndex]?.key
      subKey.value = paths?.[subIndex]?.key
    }
    else {
      appKey.value = paths?.[0]?.key
      subKey.value = paths?.[subIndex]?.key
    }
  }, { immediate: true })

  return {
    isMobile,
    appCollapsed,
    sideCollapsed,
    showCollapsed,
    collapsed,
    allKey,
    appKey,
    subKey,
    appMenu,
    subMenu,
    allMenu: list,
    crumbs,
  }
}
