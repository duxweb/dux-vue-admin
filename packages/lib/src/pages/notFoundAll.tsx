import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'DuxNotFound',
  setup(_props) {
    const { t } = useI18n()
    return () => (
      <div v-cloak un-cloak>
        <div class="w-screen h-screen flex flex-col gap-6 justify-center items-center py-10 text-sm">
          <div class="w-50">
            <dux-draw-empty />
          </div>
          <div class="flex flex-col items-center justify-center gap-2">
            <div class="text-lg font-bold">
              {t('pages.404.title')}
            </div>
            <div class="opacity-50">
              {t('pages.404.desc')}
            </div>
          </div>
          <div class="flex justify-center items-center gap-4">

          </div>
        </div>
      </div>
    )
  },
})
