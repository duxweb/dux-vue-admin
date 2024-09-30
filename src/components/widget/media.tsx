import clsx from 'clsx'
import { NImage, NImageGroup } from 'naive-ui'
import { computed, defineComponent } from 'vue'

export const DuxMedia = defineComponent({
  name: 'DuxMedia',
  props: {
    title: String,
    image: [String, Array<string>],
    desc: [String, Array<string>],
    extend: String,
    onClick: Function,
    imageWidth: {
      type: Number,
      default: 48,
    },
    imageHeight: {
      type: Number,
      default: 48,
    },
  },
  setup(props, { slots }) {
    const images = computed(() => {
      return Array.isArray(props.image) ? props.image : props.image ? [props.image] : []
    })
    const desc = computed(() => {
      return Array.isArray(props.desc) ? props.desc : props.desc ? [props.desc] : []
    })

    return () => (
      <div class="flex gap-2 items-center">
        {slots?.image && <div class="flex-none flex items-center gap-2">{slots?.image?.()}</div>}
        {images?.value.length > 0 && (
          <div class="flex-none flex items-center gap-2">
            <NImageGroup>
              { images.value.map((item, key) => (
                <NImage key={key} src={item} class="rounded" objectFit="cover" width={props.imageWidth} height={props.imageHeight} />
              ))}
            </NImageGroup>
          </div>
        )}
        <div class="flex-1 flex-col gap-2 w-1 truncate items-center">
          <div class="flex gap-2 items-center">
            {slots.prefix?.()}
            {(props.title || slots.default) && (
              <div
                onClick={() => props.onClick?.()}
                class={clsx([
                  'transition-all truncate',
                  props?.onClick && 'hover:text-primary cursor-pointer',
                ])}
              >
                {props.title || slots.default?.()}
              </div>
            )}
          </div>
          {(desc?.value.length > 0 || slots.desc) && (
            <div class="text-sm text-gray-6 flex flex-col gap-1">
              {desc?.value.map?.((item, key) => <div key={key} class="truncate">{item}</div>)}
              {slots.desc?.() }
            </div>
          )}
        </div>
        {props?.extend && <div class="flex-none flex items-center gap-2 text-gray-7">{props?.extend}</div>}
        {slots?.extend && <div class="flex-none flex items-center gap-2 text-gray-7">{slots?.extend?.()}</div>}
      </div>
    )
  },
})
