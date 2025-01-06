import { NSpace } from 'naive-ui'
import { DuxRegion } from 'src/components/region'
import { defineComponent } from 'vue'

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
