import clsx from 'clsx'
import { NAvatar, NDropdown } from 'naive-ui'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import type { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'
import { useResource } from '../../../hooks'
import { useManageStore } from '../../../stores'

export const Avatar = defineComponent({
  name: 'Avatar',
  setup() {
    const router = useRouter()
    const res = useResource()
    const { getUser, logout } = useManageStore()
    const info = getUser().info

    const haddieSelect = (key: string) => {
      if (key === 'logout') {
        logout()
      }
      else {
        router.push(key)
      }
    }

    let options: DropdownMixedOption[] = res.config?.manage?.[res.manage].userMenu?.map((item) => {
      return {
        label: item.label,
        key: `/${res.manage}/${item.path}`,
        icon: () => <div class={clsx([item.icon, 'w-4 h-4'])}></div>,
      }
    }) || []

    options = [...options, ...[
      {
        label: '退出登录',
        key: 'logout',
        icon: () => <div class="i-tabler:logout w-4 h-4"></div>,
      },
    ]]

    return () => (
      <NDropdown
        trigger="click"
        onSelect={haddieSelect}
        options={options}
      >
        <NAvatar circle src={info?.avatar} class="cursor-pointer">
          {info?.nickname?.charAt(0)}
        </NAvatar>
      </NDropdown>
    )
  },
})
