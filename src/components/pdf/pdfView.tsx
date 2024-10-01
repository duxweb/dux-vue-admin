import { defineComponent } from 'vue'
import { DuxPdf } from './pdf'

export default defineComponent({
  name: 'DuxPdfView',
  props: {
    source: String,
  },
  setup(props) {
    return () => (
      <DuxPdf source={props.source} />
    )
  },
})
