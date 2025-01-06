import { NColorPicker } from 'naive-ui'
import { defineComponent } from 'vue'

export const ShowColor = defineComponent({
  name: 'ShowColor',
  extends: NColorPicker,
  setup(props) {
    return () => (
      <div class="flex items-center gap-2">
        {props.value && (
          <>
            <div class="size-4 rounded" style={{ backgroundColor: props.value }} />
            <div class="text-gray-7">{props.value}</div>
          </>
        )}
        {!props.value && <div class="text-gray-7">-</div>}
      </div>
    )
  },
})
