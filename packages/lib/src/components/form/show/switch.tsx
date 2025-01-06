import { NSwitch, NTag } from 'naive-ui'
import { defineComponent } from 'vue'

export const ShowSwitch = defineComponent({
  name: 'ShowSwitch',
  extends: NSwitch,
  setup(props) {
    return () => (
      <div class="flex items-center">
        <NTag type={props.value ? 'success' : 'default'}>
          {props.value ? '是' : '否'}
        </NTag>
      </div>
    )
  },
})
