import clsx from 'clsx'
import { defineComponent } from 'vue'

export const DuxWidgetEditor = defineComponent({
  name: 'DuxWidgetEditor',
  props: {
  },
  setup(props, { slots }) {
    return () => (
      <div class="flex-1 h-1 px-2 flex flex-row pb-2 text-sm">
        <div class="flex-none flex flex-col gap-2 bg-gray-1/50 rounded-sm p-2">
          <MainMenuItem title="全部" icon="i-tabler:hexagons" />
          <MainMenuItem title="布局" icon="i-tabler:layout" />
        </div>
        <div class="flex-none gap-2 bg-gray-1 rounded-sm p-2 grid grid-cols-2 items-start gap-2 text-xs">
          <div class="border border-gray-2 rounded-sm p-2 flex flex-col items-center gap-2">
            <div class="i-tabler:grid-4x4 size-6"></div>
            <div>格子布局</div>
          </div>
          <div class="border border-gray-2 rounded-sm p-2 flex flex-col items-center gap-2">
            <div class="size-6 i-tabler:columns-2"></div>
            <div>弹性布局</div>
          </div>
        </div>
        <div class="flex-1"></div>
        <div class="flex-none"></div>
      </div>
    )
  },
})

function MainMenuItem({ title, icon }) {
  return (
    <div class="flex flex-col gap-1 items-center px-2 py-2 hover:bg-primary/10 cursor-pointer rounded-sm">
      <div class={clsx([
        'size-4',
        icon,
      ])}
      >
      </div>
      <div>{title}</div>
    </div>
  )
}
