<script setup lang="ts">
import { useManageStore } from '@duxweb/dux-vue-admin'
import { ref } from 'vue'

const asyncCode = ref(`import audioFile from './test.mp3'
import { useAudio } from '@duxweb/dux-vue-admin'

const audio = useAudio({
  src: audioFile,
})

function open() {
  audio.play()
}
`)

const manage = useManageStore()

function login() {
  manage.login(manage.getUser()?.raw || {})
}
function logout() {
  manage.logout()
}
</script>

<template>
  <dux-page>
    <dux-example title="用户操作" :code="asyncCode" lang="javascript">
      <n-alert type="info" class="mb-4">
        用户信息默认获取该租户的登录用户信息
      </n-alert>
      <div class="flex gap-2">
        <n-button>
          用户信息
        </n-button>
        <n-button @click="login">
          设置登录
        </n-button>
        <n-button @click="logout">
          清空登录
        </n-button>
      </div>
      <div class="mt-4">
        {{ JSON.stringify(manage.getUser()) }}
      </div>
    </dux-example>
  </dux-page>
</template>

<style scoped>
</style>
