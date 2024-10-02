<script setup lang="ts">
import { ref } from 'vue'

const helloCode = ref(`<dux-stats-hello
  title="张三 ，您好！祝您开心每一天" desc="登录于四川省成都市 2024年01月01日 18:00" :data="[
    {
      label: '全部',
      value: 0,
    },
    {
      label: '待处理',
      value: 0,
    },
    {
      label: '已处理',
      value: 0,
    },
  ]"
/>`)

const userCode = ref(`<dux-stats-user nickname="张三" desc="四川成都" role="事业部经理" />`)
</script>

<template>
  <dux-page>
    <div class="flex flex-col gap-2">
      <dux-example title="欢迎卡片" :code="helloCode">
        <dux-stats-hello
          title="张三 ，您好！祝您开心每一天" desc="登录于四川省成都市 2024年01月01日 18:00" :data="[
            {
              label: '全部',
              value: 0,
            },
            {
              label: '待处理',
              value: 0,
            },
            {
              label: '已处理',
              value: 0,
            },
          ]"
        />
      </dux-example>

      <dux-example title="用户卡片" :code="userCode">
        <dux-stats-user nickname="张三" desc="四川成都" role="事业部经理" />
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
