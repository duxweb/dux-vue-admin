import { NText } from 'naive-ui'
import { defineComponent } from 'vue'
import { DuxMentionAsync } from '../../../components/mention'

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
