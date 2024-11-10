import { NButton } from 'naive-ui'
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { VueCropper } from 'vue-cropper'
import { DuxModalPage } from '../modal'
import 'vue-cropper/dist/index.css'

export default defineComponent({
  props: {
    value: String,
    onConfirm: Function,
  },
  setup(props) {
    const cropper = ref<any>()

    const value = ref(props.value || '')

    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.style.display = 'none'
    fileInput.addEventListener('change', (event: any) => {
      const file = event.target.files[0]
      if (!file) {
        return
      }
      const blob = new Blob([file], { type: file.type })
      value.value = URL.createObjectURL(blob)
    })

    const onSelect = () => {
      fileInput.click()
    }

    onMounted(() => {
      document.body.appendChild(fileInput)
    })

    onUnmounted(() => {
      document.body.removeChild(fileInput)
    })

    return () => (
      <DuxModalPage>
        {{
          default: () => (
            <div class="h-100">
              <VueCropper
                ref={cropper}
                img={value.value}
                autoCrop={true}
                centerBox={true}
                canMove={true}
                fixed={true}
                outputType="png"
              >
              </VueCropper>
            </div>
          ),
          action: () => (
            <div class="flex-1 flex justify-between items-center">
              <div class="flex items-center gap-2">
                <NButton
                  type="primary"
                  secondary
                  onClick={() => {
                    onSelect()
                  }}
                >
                  选择
                </NButton>

                <NButton
                  secondary
                  onClick={() => {
                    cropper.value.changeScale(1)
                  }}
                >
                  <div class="i-tabler:zoom-in"></div>
                </NButton>

                <NButton
                  secondary
                  onClick={() => {
                    cropper.value.changeScale(-1)
                  }}
                >
                  <div class="i-tabler:zoom-out"></div>
                </NButton>

                <NButton
                  secondary
                  onClick={() => {
                    cropper.value.rotateLeft()
                  }}
                >
                  <div class="i-tabler:rotate"></div>
                </NButton>

                <NButton
                  secondary
                  onClick={() => {
                    cropper.value.rotateRight()
                  }}
                >
                  <div class="i-tabler:rotate-clockwise"></div>
                </NButton>
              </div>

              <NButton
                type="primary"
                onClick={() => {
                  cropper.value.getCropBlob((data) => {
                    props.onConfirm?.(data)
                  })
                }}
              >
                确认
              </NButton>
            </div>
          ),
        }}
      </DuxModalPage>
    )
  },
})
