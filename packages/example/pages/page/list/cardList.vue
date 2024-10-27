<script setup lang="ts">
import type { JsonFormItemSchema } from '@duxweb/dux-vue-admin'

const filter: JsonFormItemSchema[] = [
  {
    label: '关键词',
    type: 'input',
    name: 'keyword',
  },
]

const avatars = [
  {
    name: '张三',
    src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
  },
  {
    name: '李四',
    src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
  },
  {
    name: '王五',
    src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
  },
  {
    name: '赵六',
    src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
  },
  {
    name: '七仔',
    src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
  },
]
</script>

<template>
  <dux-card-list :filter="filter" title="异步卡片列表" url="/mall">
    <template #title="item">
      {{ item.title }}
    </template>
    <template #extra>
      <NTag type="warning">
        进行中
      </NTag>
    </template>
    <template #default="item">
      <div class="flex flex-col gap-4 py-4 px-2">
        <div class="flex items-end align-middle gap-2">
          <div class="text-3xl font-bold leading-6">
            {{ item.sell_price }}
          </div>
          <div class="text-sm text-gray-7">
            元
          </div>
        </div>
        <div class="flex justify-center mt-2">
          <NSteps size="small" status="process" :current="2">
            <NStep title="项目开始" />
            <NStep title="项目进行中" />
            <NStep title="项目交付" />
            <NStep title="项目完成" />
          </NSteps>
        </div>
      </div>
    </template>
    <template #action>
      <div class="flex justify-between">
        <div class="flex items-center gap-2">
          <div class="i-tabler:moneybag size-5" />
          <div class="i-tabler:folder size-5" />
          <div class="i-tabler:users size-5" />
          <div class="i-tabler:address-book size-5" />
        </div>
        <div>
          <NAvatarGroup
            :size="32"
            :max="4"
            :options="avatars"
          >
            <template #avatar="{ option: { src } }">
              <NAvatar :src="src" />
            </template>
          </NAvatarGroup>
        </div>
      </div>
    </template>
  </dux-card-list>
</template>

<style scoped>

</style>
