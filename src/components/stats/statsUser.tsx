import { useDateFormat, useNow } from '@vueuse/core'
import { NAvatar } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export const DuxStatsUser = defineComponent({
  name: 'DuxStatsUser',
  props: {
    avatar: String,
    nickname: String,
    desc: String,
    role: String,
    local: String,
  },
  setup(props) {
    const i18n = useI18n()
    const now = useDateFormat(useNow(), 'HH:mm:ss')
    const week = useDateFormat(useNow(), 'dddd', { locales: i18n.locale })
    return () => (
      <div class="shadow-sm rounded py-4 px-6 bg-primary relative flex items-center gap-2 text-white text-sm overflow-hidden border border-primary-6">
        <div class="flex-1 flex items-center gap-4  z-1">
          <div class="flex-none rounded-full bg-white p-1px size-43px flex items-center justify-center">
            <NAvatar size={40} round src={props.avatar} class="!bg-primary/10 !text-primary">
              {props.nickname?.charAt(0)}
            </NAvatar>
          </div>
          <div class="flex-1 flex flex-col gap-0">
            <div class="flex gap-2 items-center">
              <div class="text-base">{props.nickname}</div>
              <div class="text-xs opacity-80">
                {props.desc}
              </div>
            </div>
            <div>
              {props.role}
            </div>
          </div>
        </div>
        <div class="flex-none flex flex-col gap-0 items-end">
          <div>{now.value}</div>
          <div>{week.value}</div>
        </div>
        <div class="absolute top-7 -left-20 rounded-full size-40 bg-white/8"></div>
        <div class="absolute top-0 -left-20 rounded-full size-50 bg-white/8"></div>
        <div class="absolute -top-7 -left-18 rounded-full size-60 bg-white/8"></div>
      </div>
    )
  },
})
