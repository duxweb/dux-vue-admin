<script setup lang="ts">
import { useAudio } from 'dux-vue-admin'
import { ref } from 'vue'
import audioFile from './test.mp3'

const asyncCode = ref(`import audioFile from './test.mp3'
import { useAudio } from 'dux-vue-admin'

const audio = useAudio({
  src: audioFile,
})

audio.play()
`)

const audio = useAudio({
  src: audioFile,
})

function open() {
  audio.play()
}
</script>

<template>
  <dux-page>
    <div class="grid grid-cols-1 gap-2">
      <dux-example title="播放示例" :code="asyncCode" lang="javascript">
        <n-alert type="info" class="mb-4">
          用于通知提示音调用，可使用本地音频或者url音频
        </n-alert>
        <n-button @click="open">
          播放提示音
        </n-button>
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
