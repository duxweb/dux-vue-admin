import { useMagicKeys } from '@vueuse/core'
import _ from 'lodash'
import { defineComponent, onBeforeMount, onMounted, ref, watch } from 'vue'
import { Command } from 'vue-command-palette'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { emitter } from '../../event'
import { useRouteStore } from '../../stores'
import type { DuxRoute } from '../../stores'
import './style.scss'

export const DuxCommand = defineComponent({
  name: 'DuxCommand',
  setup(_props) {
    const visible = ref<boolean>(false)
    const routeStore = useRouteStore()
    const keys = useMagicKeys()
    const current = ref<string>()
    const list = ref<DuxRoute[]>([])
    const router = useRouter()
    const { t } = useI18n()

    const handleSelect = (name?: string) => {
      const data = routeStore.routes.filter(item => item.parent === name)
      current.value = name
      list.value = data
    }

    const onClose = () => {
      list.value = routeStore.routes.filter(item => !item.parent)
      visible.value = false
    }

    const onSearch = (value: string) => {
      const data = _.cloneDeep(routeStore.routes).filter((item) => {
        const label = item.label || t(item.labelLang || '')
        return label?.includes(value)
      })
      list.value = data
    }

    const onOpen = () => {
      list.value = routeStore.routes.filter(item => !item.parent)
      visible.value = true
    }

    const onBack = () => {
      const parent = routeStore.routes.find(item => item.name === current.value)
      handleSelect(parent?.parent)
    }

    watch(keys['Meta+K'], (v) => {
      if (v) {
        onOpen()
      }
    })

    onMounted(() => {
      emitter.on('command', () => {
        onOpen()
      })
    })

    onBeforeMount(() => {
      emitter.off('command')
    })

    watch(keys['Meta+Backspace'], (v) => {
      if (v) {
        onBack()
      }
    })

    watch(keys.Escape, (v) => {
      if (v) {
        onClose()
      }
    })

    watch(() => routeStore.routes, () => {
      onClose()
    }, { immediate: true })

    return () => (
      <Command.Dialog visible={visible.value} theme="vercel">
        {{
          header: () => (
            <div class="bg-gray-1 mb-4 rounded px-4 py-3 flex items-center gap-3 shadow">
              <div class="flex-none">
                <div class="i-tabler:search"></div>
              </div>
              <Command.Input
                class="flex-1 text-lg outline-none bg-transparent"
                placeholder="请输入菜单名称..."
                onUpdate:value={(value) => {
                  onSearch(value)
                }}
              />
              <div class="flex-none">
                <div class="border border-gray-2 rounded p-1 text-xs cursor-pointer" onClick={() => onClose()}>
                  ⌘K
                </div>
              </div>
            </div>
          ),
          body: () => (
            <Command.List class="bg-gray-1 rounded shadow p-3">
              {list.value?.map((item, key: number) => (
                <Command.Item
                  key={key}
                  onSelect={() => {
                    if (item.path) {
                      router.push(item.path)
                      onClose()
                    }
                    else {
                      handleSelect(item.name)
                    }
                  }}
                  class="flex gap-2 items-center px-4 py-2 rounded cursor-pointer"
                >
                  <div class={item.path ? 'i-tabler:link' : 'i-tabler:folder'}></div>
                  {item.label}
                </Command.Item>
              ))}

              {current.value && (
                <div class="bg-gray-1 backdrop-blur rounded shadow px-2 pt-3 border-t border-gray-2 mt-3 flex justify-between">
                  <div class="text-sm text-gray-6">

                  </div>
                  <div class="border border-gray-2 rounded p-1 text-xs cursor-pointer" onClick={onBack}>
                    ⌘Back
                  </div>
                </div>
              )}
            </Command.List>
          ),

        }}
      </Command.Dialog>
    )
  },
})
