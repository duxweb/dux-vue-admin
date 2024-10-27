<script setup lang="ts">
import { useDrawer } from '@duxweb/dux-vue-admin'
import { ref } from 'vue'

const compCode = ref(`// 抽屉框调用
<script setup>
import { useDrawer } from '@duxweb/dux-vue-admin'
const drawer = useDrawer()

function drawerComp() {
  drawer.show({
    title: '抽屉组件',
    component: () => import('./drawerComp.vue'),
  })
}
<\/script>


// 抽屉组件调用 (drawerComp.vue)
<template>
<dux-drawer-page>
  <div class="p-4">
    这是是弹出组件的内容
  </div>
  <template #action>
    <n-button @click="props.onClose">
      关闭
    </n-button>
  </template>
</dux-drawer-page>
</template>
`)

const formCode = ref(`// 抽屉框调用
<script setup>
import { useDrawer } from '@duxweb/dux-vue-admin'
const drawer = useDrawer()

function drawerForm() {
  drawer.show({
    title: '抽屉表单',
    component: () => import('./drawerForm.vue'),
  })
}
<\/script>

// 抽屉表单调用 (modalForm.vue)
<template>
<dux-drawer-form :schema="schema" url="/mall" invalidate="example.table" />
</template>
`)

const drawer = useDrawer()

function drawerComp() {
  drawer.show({
    title: '抽屉组件',
    component: () => import('./drawerComp.vue'),
  })
}

function drawerForm() {
  drawer.show({
    title: '抽屉表单',
    component: () => import('./drawerForm.vue'),
  })
}
</script>

<template>
  <dux-page>
    <n-alert type="info" class="mb-2">
      为保持清晰的架构，抽屉均使用异步组件，如需要本地组件，请使用 naive ui 官方提供的抽屉组件
    </n-alert>
    <div class="grid grid-cols-1 gap-2">
      <dux-example title="抽屉组件" :code="compCode" lang="vue">
        <div class="flex gap-2">
          <n-button @click="drawerComp">
            打开组件
          </n-button>
        </div>
      </dux-example>

      <dux-example title="抽屉表单" :code="formCode" lang="vue">
        <div class="flex gap-2">
          <n-button @click="drawerForm">
            打开表单
          </n-button>
        </div>
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
