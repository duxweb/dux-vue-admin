import { useVModel } from '@vueuse/core'
import { NAvatar } from 'naive-ui'
import { defineComponent } from 'vue'
import { useResource } from '../../hooks'
import placeholder from '../../static/images/avatar.png'
import { useModal } from '../modal'
import { useUpload } from '../upload'

export const DuxAvatarCrop = defineComponent({
  name: 'DuxAvatarCrop',
  props: {
    defaultValue: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    readonly: Boolean,
  },
  setup(props, { emit }) {
    const data = useVModel(props, 'value', emit, {
      passive: true,
      defaultValue: props.defaultValue || '',
    })
    const modal = useModal()
    const upload = useUpload()
    const res = useResource()
    return () => (
      <div
        class="rounded-full relative size-80px overflow-hidden group"
        onClick={() => {
          modal.show({
            title: '头像编辑',
            component: () => import('./imageCropModal'),
            componentProps: {
              value: data.value,
              onChange: (value: string) => {
                data.value = value
              },
            },
          }).then((file) => {
            file.name = 'avatar.png'
            file.mime = 'image/png'
            upload.send({
              url: res.uploadUrl,
              file,
              onSuccess: (res: any) => {
                data.value = res.url
              },
            })
          })
        }}
      >
        <NAvatar src={data.value || placeholder} fallbackSrc={placeholder} round size={80} />
        <div class="absolute size-full bg-gray-10/10 items-center justify-center inset-0 cursor-pointer hidden group-hover:flex">
          <div class="i-tabler:pencil size-4"></div>
        </div>
      </div>
    )
  },
})
