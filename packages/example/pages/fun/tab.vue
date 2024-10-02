<script setup lang="ts">
import { useTabStore } from 'dux-vue-admin'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const asyncCode = ref(`import { useRouter } from 'vue-router'
import { useTabStore } from 'dux-vue-admin'

const router = useRouter()
const tab = useTabStore()

function open() {
  router.push('/admin/index')
}

function close() {
  tab.delTab(tab.current || '', v => router.push(v.path || ''))
}
`)

const router = useRouter()

const tab = useTabStore()

function open() {
  router.push('/admin/index')
}

function close() {
  tab.delTab(tab.current || '', v => router.push(v.path || ''))
}
</script>

<template>
  <dux-page>
    <dux-example title="Tab 示例" :code="asyncCode" lang="javascript">
      <n-alert type="info" class="mb-4">
        tab 使用 vue-route 实现，打开、关闭 tab 时，会触发路由变化，从而触发页面刷新
      </n-alert>
      <div class="flex gap-2">
        <n-button @click="open">
          打开 tab
        </n-button>
        <n-button @click="close">
          关闭 tab
        </n-button>
      </div>
    </dux-example>
  </dux-page>
</template>

<style scoped>
</style>
