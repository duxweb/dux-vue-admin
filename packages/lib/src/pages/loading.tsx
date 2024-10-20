import { defineComponent } from 'vue'

export const DuxLoading = defineComponent({
  name: 'DuxLoading',
  setup(_props) {
    return () => (
      <div class="flex justify-center items-center h-h-screen w-screen">加载中...</div>
    )
  },
})
