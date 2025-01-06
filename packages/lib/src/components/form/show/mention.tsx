import { NMention, NText } from 'naive-ui'
import { defineComponent } from 'vue'

export const ShowMention = defineComponent({
  name: 'ShowMention',
  extends: NMention,
  setup(props) {
    return () => (
      <div class="flex items-center">
        <NText class="whitespace-pre-wrap">{props.value || '-'}</NText>
      </div>
    )
  },
})
