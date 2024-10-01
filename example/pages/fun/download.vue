<script setup lang="ts">
import { useDownload } from 'dux-vue-admin'
import { ref } from 'vue'

const asyncCode = ref(`const download = useDownload()
// 接口下载
function downloadFile() {
  download.file('/download')
}

//文件流下载
function downloadBlob() {
  const blob = new Blob(['hello world'], { type: 'text/plain' })
  download.blob(blob)
}

// 文件地址下载
function downloadUrl() {
  download.url('')
}

// 图片地址下载
function downloadImage() {
  download.image('https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg')
}

// base64下载
function downloadBase64() {
  download.base64('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==', 'test.png')
}
`)

const download = useDownload()

function downloadFile() {
  download.file('/download')
}

function downloadBlob() {
  const blob = new Blob(['hello world'], { type: 'text/plain' })
  download.blob(blob)
}

function downloadUrl() {
  download.url('')
}

function downloadImage() {
  download.image('https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg')
}

function downloadBase64() {
  download.base64('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==', 'test.png')
}
</script>

<template>
  <dux-page>
    <div class="grid grid-cols-1 gap-2">
      <dux-example title="通过接口下载文件" :code="asyncCode" lang="javascript">
        <div class="flex flex-col gap-4">
          <div>
            <n-alert type="info" class="mb-2">
              通过后端提供文件流进行下载
            </n-alert>

            <n-button @click="() => downloadFile()">
              下载文件
            </n-button>
          </div>
          <div>
            <n-alert type="info" class="mb-2">
              自定义本地文件流下载
            </n-alert>
            <n-button @click="() => downloadBlob()">
              下载文件
            </n-button>
          </div>
          <div>
            <n-alert type="info" class="mb-2">
              文件url下载，需要可以跨域访问，否则为窗口打开
            </n-alert>
            <n-button @click="() => downloadUrl()">
              下载文件
            </n-button>
          </div>
          <div>
            <n-alert type="info" class="mb-2">
              图片下载，图片地址需要可以跨域访问
            </n-alert>
            <n-button @click="() => downloadImage()">
              下载文件
            </n-button>
          </div>
          <div>
            <n-alert type="info" class="mb-2">
              传递 base64 数据作为下载内容
            </n-alert>
            <n-button @click="() => downloadBase64()">
              下载文件
            </n-button>
          </div>
        </div>
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
