# 测试

:::demo

```vue
<script setup>
import { ref } from 'vue'
import { DuxSelectAsync } from '../src'

const title = ref('vitepress-theme-demoblock')
</script>

<template>
  <div class="card-wrap">
    <div class="card">
      {{ title }}
    </div>
    <DuxSelectAsync />
  </div>
</template>
```

:::
