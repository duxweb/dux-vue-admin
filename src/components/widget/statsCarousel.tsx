import { NCarousel } from 'naive-ui'
import { defineComponent } from 'vue'

export interface DuxCarouselData {
  src: string
  onClick: () => void
}

export const DuxCarousel = defineComponent({
  name: 'DuxCarousel',
  props: {
    height: {
      type: Number,
      default: 200,
    },
    data: Array<DuxCarouselData>,
  },
  setup(props) {
    return () => (
      <NCarousel
        draggable
        class={`rounded-sm shadow-sm h-${props.height}px`}
      >
        {props?.data?.map((item, key) => (
          <img
            key={key}
            class="w-full object-cover"
            style={{ height: `${props.height}px` }}
            src={item.src}
            onClick={item.onClick}
          />
        ))}
      </NCarousel>
    )
  },
})
