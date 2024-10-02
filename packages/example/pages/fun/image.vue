<script setup lang="ts">
import { useImagePreview } from 'dux-vue-admin'
import { ref } from 'vue'

const asyncCode = ref(`import audioFile from './test.mp3'
import { useImagePreview } from 'dux-vue-admin'

const image = useImagePreview()

image.show([
  'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg',
  'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg',
  'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg',
  'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg',
])
`)

const image = useImagePreview()

function open() {
  image.show([
    'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg',
    'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg',
    'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg',
    'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg',
  ])
}
</script>

<template>
  <dux-page>
    <div class="grid grid-cols-1 gap-2">
      <dux-example title="图片示例" :code="asyncCode" lang="javascript">
        <n-alert type="info" class="mb-4">
          将多张图片以数组的形式传入，即可实现图片预览
        </n-alert>
        <n-button @click="open">
          打开图片
        </n-button>
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
