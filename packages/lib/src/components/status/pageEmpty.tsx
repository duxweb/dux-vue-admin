import { defineComponent } from 'vue'
import { DuxPageStatus } from './pageStatus'

export const DuxPageEmpty = defineComponent({
  name: 'DuxPageEmpty',
  props: {
    title: String,
    desc: String,
  },
  setup(props) {
    return () => (
      <DuxPageStatus title={props.title || '没有内容'} desc={props.desc || '暂时没有更多内容，可以尝试刷新'}>
        <dux-draw-empty-form />
      </DuxPageStatus>
    )
  },
})
