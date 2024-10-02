import clsx from 'clsx'
import { NSpin } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'

export const DuxPdf = defineComponent({
  name: 'DuxPdf',
  props: {
    source: String,
  },
  setup(props) {
    const loading = ref(true)
    return () => (
      <div class={clsx([
        'p-4 bg-gray-2 min-h-50',
        loading.value ? 'h-50' : '',
      ])}
      >
        {loading.value && (
          <div class="h-full w-full flex justify-center items-center">
            <NSpin />
          </div>
        )}
        <VuePdfEmbed
          class="shadow-sm"
          source={props.source}
          onRendered={() => {
            loading.value = false
          }}
        />
      </div>
    )
  },
})
