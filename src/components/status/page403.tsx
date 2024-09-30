import { NButton } from 'naive-ui'
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { DuxPageStatus } from '..'

export const DuxPage403 = defineComponent({
  name: 'DuxPage403',
  setup(_props) {
    const route = useRoute()
    const router = useRouter()

    function refreshRoute() {
      router.push({ path: route.path, query: { ...route.query, t: Date.now() } })
    }

    return () => (
      <DuxPageStatus title="暂无权限" desc="您暂时没有权限使用该功能">
        {{
          default: () => <div><dux-draw-auth /></div>,
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
