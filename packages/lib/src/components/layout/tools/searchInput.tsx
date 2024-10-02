import { NInput } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { emitter } from '../../../event'

export const SearchInput = defineComponent({
  name: 'Search',
  setup() {
    const { t } = useI18n()
    return () => (
      <div class="flex flex-row gap-2 items-center px-3 py-4">
        <NInput
          round
          placeholder={t('common.search')}
          readonly
          onClick={() => {
            emitter.emit('command')
          }}
        >
          {{
            prefix: () => <div class="i-tabler:search" />,
            suffix: () => (
              <div class="border border-gray-3 rounded-full px-2 py-0.5 text-xs relative -right-1">
                ⌘K
              </div>
            ),
          }}
        </NInput>
      </div>
    )
  },
})
