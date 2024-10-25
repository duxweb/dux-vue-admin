import { NButton } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { DuxPageStatus } from '..'

export const DuxPage404 = defineComponent({
  name: 'DuxPage404',
  setup(_props) {
    const route = useRoute()
    const router = useRouter()
    const { t } = useI18n()

    function refreshRoute() {
      router.push({ path: route.path, query: { ...route.query, t: Date.now() } })
    }

    return () => (
      <DuxPageStatus title={t('pages.404.title')} desc={t('pages.404.desc')}>
        {{
          default: () => <div><dux-draw-empty /></div>,
          action: () => (
            <NButton onClick={refreshRoute} renderIcon={() => <div class="n-icon i-tabler:refresh" />}>
              {t('buttons.refresh')}
            </NButton>
          ),
        }}
      </DuxPageStatus>
    )
  },
})
