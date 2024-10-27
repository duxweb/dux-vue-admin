<script setup lang="ts">
import { useDialog } from '@duxweb/dux-vue-admin'
import { ref } from 'vue'

const listCode = ref(`import { useDialog } from '@duxweb/dux-vue-admin'
const dialog = useDialog()

dialog.confirm({
  title: '提示',
  content: '这是一段内容',
}).then(() => {
  alert('ok')
}).catch(() => {
  alert('cancel')
})

dialog.success({})

dialog.error({})
`)

const dialog = useDialog()

function openConfirm() {
  dialog.confirm({}).then(() => {
    // eslint-disable-next-line no-alert
    alert('ok')
  }).catch(() => {
    // eslint-disable-next-line no-alert
    alert('cancel')
  })
}

function openSuccess() {
  dialog.success({})
}

function openError() {
  dialog.error({})
}
</script>

<template>
  <dux-page>
    <div class="grid grid-cols-1 gap-2">
      <dux-example title="弹窗示例" :code="listCode" lang="javascript">
        <div class="flex gap-2">
          <n-button @click="openConfirm">
            询问弹窗
          </n-button>

          <n-button @click="openSuccess">
            成功弹窗
          </n-button>

          <n-button @click="openError">
            失败弹窗
          </n-button>
        </div>
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
