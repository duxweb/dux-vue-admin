import { defineComponent } from 'vue'

export const ShowEditor = defineComponent({
  name: 'ShowEditor',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () => (
      <div class="flex items-start">
        <div class="prose prose-sm max-w-none bg-gray-2 p-2 rounded" v-html={props.value || '-'} />
      </div>
    )
  },
})
