import clsx from 'clsx'
import { NButton, NPopover } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '../../../stores'

export const Layout = defineComponent({
  name: 'Layout',
  setup() {
    const themeStore = useThemeStore()
    const { layout } = storeToRefs(themeStore)
    const { t } = useI18n()

    return () => (
      <NPopover
        trigger="click"
      >
        {{
          default: () => (
            <div class="py-1 flex flex-col gap-3 w-50">
              <div
                class={clsx([
                  'flex flex-col gap-2 border rounded border-gray-3  p-2 hover:border-primary cursor-pointer  transition-all',
                  layout.value === 'app' ? 'border-primary border-solid bg-primary/5' : ' border-dashed',
                ])}
                onClick={() => themeStore.toggleLayout('app')}
              >
                <div class="flex gap-1 h-15">
                  <div class="rounded bg-primary w-3"></div>
                  <div class="rounded bg-primary/50 w-8"></div>
                  <div class="flex-1 rounded bg-primary/20"></div>
                </div>
                <div class="text-center">{t('common.layout.app')}</div>
              </div>

              <div
                class={clsx([
                  'flex flex-col gap-2 border rounded border-gray-3  p-2 hover:border-primary cursor-pointer  transition-all',
                  layout.value === 'collapse' ? 'border-primary border-solid bg-primary/5' : ' border-dashed',
                ])}
                onClick={() => themeStore.toggleLayout('collapse')}
              >
                <div class="flex gap-1 h-15">
                  <div class="rounded bg-primary w-8"></div>
                  <div class="flex-1 rounded bg-primary/20"></div>
                </div>
                <div class="text-center">{t('common.layout.app')}</div>
              </div>

              <div
                class={clsx([
                  'flex flex-col gap-2 border rounded border-gray-3  p-2 hover:border-primary cursor-pointer  transition-all',
                  layout.value === 'separate' ? 'border-primary border-solid bg-primary/5' : ' border-dashed',
                ])}
                onClick={() => themeStore.toggleLayout('separate')}
              >
                <div class="flex gap-1 h-15">
                  <div class="rounded bg-primary/50 w-8"></div>
                  <div class="flex flex-col flex-1 gap-1">
                    <div class="rounded bg-primary h-3"></div>
                    <div class="flex-1 rounded bg-primary/20"></div>
                  </div>
                </div>
                <div class="text-center">{t('common.layout.app')}</div>
              </div>
            </div>
          ),
          trigger: () => (
            <NButton quaternary circle>
              <div class="h-5 w-5 i-tabler:layout" />
            </NButton>
          ),
        }}
      </NPopover>
    )
  },
})
