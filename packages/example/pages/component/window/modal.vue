<script setup lang="ts">
import { useModal } from 'dux-vue-admin'
import { ref } from 'vue'

const compCode = ref(`// 模态框调用
<script setup>
import { useModal } from 'dux-vue-admin'
const modal = useModal()

function openModal() {
  modal.show({
    title: '模态组件',
    component: () => import('./modalComp.vue'),
  })
}
<\/script>


// 模态组件调用 (modalComp.vue)
<template>
<dux-modal-page>
  <div class="p-4">
    这是是弹出组件的内容
  </div>
  <template #action>
    <n-button @click="props.onClose">
      关闭
    </n-button>
  </template>
</dux-modal-page>
</template>
`)

const formCode = ref(`// 模态框调用
<script setup>
import { useModal } from 'dux-vue-admin'
const modal = useModal()

function openComp() {
  modal.show({
    title: '模态表单',
    component: () => import('./modalForm.vue'),
  })
}
<\/script>

// 模态表单调用 (modalForm.vue)
<template>
<dux-modal-form :schema="schema" url="/mall" invalidate="example.table" />
</template>
`)

const modal = useModal()

function openForm() {
  modal.show({
    title: '模态表单',
    component: () => import('./modalForm.vue'),
  })
}

function openComp() {
  modal.show({
    title: '模态组件',
    component: () => import('./modalComp.vue'),
  })
}
</script>

<template>
  <dux-page>
    <n-alert type="info" class="mb-2">
      为保持清晰的架构，模态框均使用异步组件，如需要本地组件，请使用 naive ui 官方提供的模态框组件
    </n-alert>
    <div class="grid grid-cols-1 gap-2">
      <dux-example title="弹窗组件" :code="compCode" lang="vue">
        <div class="flex gap-2">
          <n-button @click="openComp">
            打开组件
          </n-button>
        </div>
      </dux-example>

      <dux-example title="弹窗表单" :code="formCode" lang="vue">
        <div class="flex gap-2">
          <n-button @click="openForm">
            打开表单
          </n-button>
        </div>
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
