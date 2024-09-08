import { computed, h, ref, watch } from 'vue'
import { cloneDeep } from 'lodash-es'
import type { MenuOption } from 'naive-ui'
import { useWindowSize } from '@vueuse/core'
import { RouterLink, useRoute } from 'vue-router'
import { useRouteStore } from '../stores/route'
import { arrayToTree, searchTree } from '@/core/hooks/useTree'

export function useMenu() {
  const isPad = ref<boolean>(false)
  const isMobile = ref<boolean>(false)
  const appCollapsed = ref<boolean>(true)
  const sideCollapsed = ref<boolean>(false)

  const { routes } = useRouteStore()

  const getMenu = (): MenuOption[] => {
    return routes?.map<MenuOption>((item) => {
      return {
        key: item.name,
        parent: item.parent,
        path: item.path,
        sort: item.sort,
        labelName: item.label,
        iconName: item.icon,
        icon() {
          return item?.icon
            ? h('div', {
              class: item.icon,
            })
            : false
        },
        label() {
          return item.path
            ? h(
              RouterLink,
              {
                to: {
                  path: item.path,
                },
              },
              { default: () => item.label },
            )
            : item.label
        },
      }
    })
  }

  const list: MenuOption[] = arrayToTree(getMenu(), {
    idKey: 'key',
    parentKey: 'parent',
    childrenKey: 'children',
    sortKey: 'sort',
  }, undefined)

  const route = useRoute()

  const appKey = ref(route.name)
  const subKey = ref(route.name)

  // 获取侧栏菜单
  const appMenu = computed<MenuOption[]>(() => {
    if (sideCollapsed.value) {
      return list
    }
    const appList = cloneDeep(list)
    return appList?.map((item): MenuOption => {
      delete item.children
      return item
    })
  })

  // 获取展开菜单
  const subMenu = computed<MenuOption[]>(() => {
    if (sideCollapsed.value) {
      return []
    }
    const subList = list?.find(item => item.key === appKey.value)?.children
    return subList || []
  })

  const crumbs = computed(() => {
    return searchTree(list, (item) => {
      return item?.key === (!subMenu.value.length ? appKey.value : subKey.value)
    })
  })

  watch(sideCollapsed, () => {
    if (sideCollapsed.value) {
      const paths = searchTree(list, (item) => {
        return item?.key === subKey.value
      })
      appKey.value = paths?.[paths.length - 1]?.key
      subKey.value = paths?.[paths.length - 1]?.key
    }
    else {
      const paths = searchTree(list, (item) => {
        return item?.key === appKey.value
      })

      appKey.value = paths?.[0]?.key
      subKey.value = paths?.[paths.length - 1]?.key
    }
  }, { immediate: true })

  const { width } = useWindowSize()

  watch(width, () => {
    isPad.value = width.value < 1024
    isMobile.value = width.value < 768
    if (width.value < 1024) {
      sideCollapsed.value = true
    }
  }, { immediate: true })

  const collapsed = computed(() => {
    return sideCollapsed.value || !subMenu.value.length
  })

  const showCollapsed = computed(() => {
    return (sideCollapsed.value || subMenu.value.length > 0) && !isPad.value ? 'bar' : false
  })

  // 根据路由改变高亮
  watch(route, () => {
    const paths = searchTree(list, (item) => {
      return item.path === route.path
    })

    if (sideCollapsed.value) {
      appKey.value = paths?.[paths.length - 1]?.key
      subKey.value = paths?.[paths.length - 1]?.key
    }
    else {
      appKey.value = paths?.[0]?.key
      subKey.value = paths?.[paths.length - 1]?.key
    }
  }, { immediate: true })

  return {
    isMobile,
    appCollapsed,
    sideCollapsed,
    showCollapsed,
    collapsed,
    appKey,
    subKey,
    appMenu,
    subMenu,
    allMenu: list,
    crumbs,
  }
}
