import type { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'
import clsx from 'clsx'
import { NAvatar, NDropdown } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useResource } from '../../../hooks'
import { useManageStore } from '../../../stores'

export const Avatar = defineComponent({
  name: 'Avatar',
  setup() {
    const router = useRouter()
    const res = useResource()
    const { t } = useI18n()
    const { getUser, logout } = useManageStore()
    const info = getUser().info

    const haddieSelect = (key: string) => {
      if (key === 'logout') {
        logout()
        router.push('/')
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
        label: t('common.logout'),
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
        <div class="p-1 flex items-center bg-gray-2 rounded-full gap-2 cursor-pointer hover:bg-gray-2/60 transition-all">
          <NAvatar circle src={info?.avatar} size="small" class="bg-primary!">
            {info?.nickname?.charAt(0)}
          </NAvatar>
          <div class="text-sm pr-2">{info?.rolename || t('common.admin')}</div>
        </div>
      </NDropdown>
    )
  },
})
