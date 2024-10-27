<script setup lang="ts">
import { useClient } from '@duxweb/dux-vue-admin'
import { ref } from 'vue'

const asyncCode = ref(`import { useClient } from '@duxweb/dux-vue-admin'

const client = useClient()

client.get({
  url: '/mall'
})

client.post({
  url: '/mall',
  data: {
  }
})

client.put({
  url: '/mall/1',
  data: {
  }
})
`)

const client = useClient()

const data = ref()

function get() {
  client.get({
    url: '/mall',
  }).then((res) => {
    data.value = res.data
  })
}

function post() {
  client.post({
    url: '/mall',
    data: {
      title: '标题',
    },
  }).then((res) => {
    data.value = res.data
  })
}

function put() {
  client.put({
    url: '/mall/1',
    data: {
      title: '标题',
    },
  }).then((res) => {
    data.value = res.data
  })
}
</script>

<template>
  <dux-page>
    <dux-example title="请求示例" :code="asyncCode" lang="javascript">
      <n-alert type="info" class="mb-4">
        数据请求使用 alova，请求支持 get、post、put、patch、delete等常用 restful 方法，并且支持缓存和预加载，更多方法请参考官方文档
      </n-alert>
      <div class="flex gap-2">
        <n-button @click="get">
          Get 请求
        </n-button>
        <n-button @click="post">
          Post 请求
        </n-button>
        <n-button @click="put">
          Put 请求
        </n-button>
      </div>
      <div class="mt-2">
        {{ JSON.stringify(data, null, 2) }}
      </div>
    </dux-example>
  </dux-page>
</template>

<style scoped>
</style>
