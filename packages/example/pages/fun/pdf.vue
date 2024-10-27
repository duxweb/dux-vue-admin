<script setup lang="ts">
import { usePdf } from '@duxweb/dux-vue-admin'
import { ref } from 'vue'

const asyncCode = ref(`const pdf = usePdf()
pdf.open('https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf')
`)

const pdf = usePdf()

function open() {
  pdf.open('https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf')
}
</script>

<template>
  <dux-page>
    <div class="grid grid-cols-1 gap-2">
      <dux-example title="预览 Pdf" :code="asyncCode" lang="javascript">
        <n-button @click="open">
          打开文件
        </n-button>
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
