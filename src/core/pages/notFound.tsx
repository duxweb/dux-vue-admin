import { defineComponent } from 'vue'
import { NButton } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import { DuxPageStatus } from '../components'
import DuxDrawError from '../assets/draw/error.svg'

export const DuxNotFound = defineComponent({
  name: 'DuxNotFound',
  setup(_props) {
    const route = useRoute()
    const router = useRouter()

    function refreshRoute() {
      router.push({ path: route.path, query: { ...route.query, t: Date.now() } })
    }

    return () => (
      <DuxPageStatus title="页面不存在" desc="系统无法找到该页面，您可以尝试刷新该页面">
        {{
          default: () => <DuxDrawError />,
          action: () => (
            <NButton onClick={refreshRoute} renderIcon={() => <div class="n-icon i-tabler:refresh" />}>
              刷新
            </NButton>
          ),
        }}
      </DuxPageStatus>
    )
  },
})
