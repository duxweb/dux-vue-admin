import { NDynamicTags, NSpace, NTag } from 'naive-ui'
import { defineComponent } from 'vue'

export const ShowDynamicTags = defineComponent({
  name: 'ShowDynamicTags',
  extends: NDynamicTags,
  setup(props) {
    return () => (
      <div class="flex items-center">
        <NSpace>
          {props.value?.map((tag, index) => (
            <NTag key={index} type="info">{tag}</NTag>
          )) || <div class="">-</div>}
        </NSpace>
      </div>
    )
  },
})
