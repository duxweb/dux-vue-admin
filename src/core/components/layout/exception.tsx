import { defineComponent, onErrorCaptured, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NButton } from 'naive-ui'
import { DuxPageStatus } from '../status'
import { DuxDrawError } from '../draw'

export const DuxException = defineComponent({
  name: 'DuxException',
  setup(_props, { slots }) {
    const route = useRoute()
    const router = useRouter()

    function refreshRoute() {
      router.push({ path: route.path, query: { ...route.query, t: Date.now() } })
    }

    const data = ref<Record<string, any> | null>(null)

    onErrorCaptured((err) => {
      console.error(err)
      if (!route.name) {
        data.value = {
          title: '页面不存在',
          desc: '该页面可能不存在，您可以尝试刷新该页面',
        }
      }
      else {
        data.value = {
          title: '页面遇到一个错误',
          desc: '系统无法恢复该页面，您可以尝试刷新该页面',
        }
      }

      return false
    })

    return () => data
      ? (
          <DuxPageStatus title={data.value?.title} desc={data.value?.desc}>
            {{
              default: () => <DuxDrawError />,
              action: () => <NButton onClick={refreshRoute} renderIcon={() => <div class="n-icon i-tabler:refresh" />}>刷新</NButton>,
            }}
          </DuxPageStatus>
        )
      : slots.default?.()
  },
})
