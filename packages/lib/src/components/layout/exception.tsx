import { NButton } from 'naive-ui'
import { defineComponent, onErrorCaptured, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { DuxFullPage } from '../page'
import { DuxPageStatus } from '../status'

export const DuxException = defineComponent({
  name: 'DuxException',
  setup(_props, { slots }) {
    const route = useRoute()
    const router = useRouter()
    const { t } = useI18n()

    function refreshRoute() {
      router.push({ path: route.path, query: { ...route.query, t: Date.now() } })
    }

    const data = ref<Record<string, any> | null>(null)

    onErrorCaptured((err) => {
      console.error(err)
      if (!route.name) {
        data.value = {
          title: t('page.404.title'),
          desc: t('page.404.desc'),
        }
      }
      else {
        data.value = {
          title: t('page.500.title'),
          desc: t('page.500.desc'),
        }
      }
      return false
    })

    return () => data.value
      ? (
          <DuxFullPage>
            <DuxPageStatus title={data.value?.title} desc={data.value?.desc}>
              {{
                default: () => <dux-draw-error />,
                action: () => <NButton onClick={refreshRoute} renderIcon={() => <div class="n-icon i-tabler:refresh" />}>刷新</NButton>,
              }}
            </DuxPageStatus>
          </DuxFullPage>
        )
      : slots.default?.()
  },
})
