<script setup lang="ts">
import { usePackage } from 'dux-vue-admin'

const packages = usePackage()
</script>

<template>
  <dux-page>
    <div class="flex flex-col gap-2">
      <dux-card-header title="Dux Vue Admin" desc="该系统是一款基于 vue3 + naiveui + pinia + alova + 异步渲染器的中后台解决方案，具有优秀的 UI 设计和开箱即用的优点，同时完美适配传统后台开发，将 vue 进行实时渲染，免去前端工具链的使用。" icon="i-tabler:cube" icon-color="primary" />

      <n-card title="项目信息">
        <n-descriptions label-placement="top" bordered :column="2">
          <n-descriptions-item label="版本号">
            {{ packages.version }}
          </n-descriptions-item>
          <n-descriptions-item label="github (请给于一个 star)">
            <a href="https://github.com/duxweb/vue-admin" target="_blank" class="text-primary">
              https://github.com/duxweb/vue-admin
            </a>
          </n-descriptions-item>
          <n-descriptions-item label="文档地址">
            <a href="https://vue-admin.dux.cn" target="_blank" class="text-primary">
              https://vue-admin.dux.cn
            </a>
          </n-descriptions-item>
          <n-descriptions-item label="演示地址">
            <a href="https://vue-admin.dux.plus" target="_blank" class="text-primary">
              https://vue-admin.dux.plus
            </a>
          </n-descriptions-item>
        </n-descriptions>
      </n-card>

      <n-card title="项目依赖">
        <n-descriptions label-placement="left" bordered :column="3">
          <n-descriptions-item v-for="(value, key, index) in packages.dependencies" :key="index" :label="key">
            {{ value }}
          </n-descriptions-item>
        </n-descriptions>
      </n-card>

      <n-card title="开发依赖">
        <n-descriptions label-placement="left" bordered :column="3">
          <n-descriptions-item v-for="(value, key, index) in packages.devDependencies" :key="index" :label="key">
            {{ value }}
          </n-descriptions-item>
        </n-descriptions>
      </n-card>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
