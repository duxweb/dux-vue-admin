import { NSpace } from 'naive-ui'
import { defineComponent } from 'vue'
import { DuxRegion } from '../../../components/region'

export const ShowRegion = defineComponent({
  name: 'ShowRegion',
  extends: DuxRegion,
  setup(props) {
    return () => (
      <div class="flex items-center">
        <NSpace>
          {props.value?.map(label => label)?.join(' ')}
        </NSpace>
      </div>
    )
  },
})
