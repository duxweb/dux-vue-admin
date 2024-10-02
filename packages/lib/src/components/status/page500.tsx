import { NButton } from 'naive-ui'
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { DuxPageStatus } from '..'

export const DuxPage500 = defineComponent({
  name: 'DuxPage500',
  setup(_props) {
    const route = useRoute()
    const router = useRouter()

    function refreshRoute() {
      router.push({ path: route.path, query: { ...route.query, t: Date.now() } })
    }

    return () => (
      <DuxPageStatus title="系统错误" desc="该功能无法恢复，请尝试联系系统管理员">
        {{
          default: () => <div><dux-draw-error /></div>,
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
