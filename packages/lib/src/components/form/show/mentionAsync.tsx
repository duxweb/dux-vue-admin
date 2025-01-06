import { NText } from 'naive-ui'
import { DuxMentionAsync } from 'src/components/mention'
import { defineComponent } from 'vue'

export const ShowMentionAsync = defineComponent({
  name: 'ShowMentionAsync',
  extends: DuxMentionAsync,
  setup(props) {
    return () => (
      <div class="flex items-center">
        <NText class="whitespace-pre-wrap">{props.value || '-'}</NText>
      </div>
    )
  },
})
