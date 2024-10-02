import { onMounted, onUnmounted, ref } from 'vue'

interface UseAudioProps {
  src: string
}

export function useAudio(props: UseAudioProps) {
  const audio = ref<HTMLAudioElement>()

  onMounted(() => {
    audio.value = new Audio(props.src)
  })

  const play = () => {
    if (audio.value) {
      audio.value.load()
      audio.value.play()
    }
  }

  const pause = () => {
    if (audio.value) {
      audio.value.pause()
      audio.value.load()
    }
  }

  onUnmounted(() => {
    if (audio.value) {
      audio.value.pause()
      audio.value = undefined
    }
  })

  return {
    play,
    pause,
  }
}
