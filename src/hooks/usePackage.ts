import { ref } from 'vue'
import pkg from '../../package.json'

export function usePackage() {
  const data = ref(pkg)
  return {
    ...data.value,
  }
}
