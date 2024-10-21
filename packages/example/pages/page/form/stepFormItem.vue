<script setup lang="ts">
import type { JsonFormItemSchema } from 'dux-vue-admin'

const props = defineProps({
  model: {
    type: Object,
  },
})

const schema: JsonFormItemSchema[] = [
  {
    type: 'grid',
    attr: {
      cols: 2,
    },
    child: [
      {
        type: 'input',
        label: '分组示例',
        name: 'title',
        itemAttr: {
          required: true,
        },
      },
      {
        type: 'input',
        label: '分组示例',
        name: 'active',
        itemAttr: {
          required: true,
        },
      },
    ],
  },

  {
    type: 'image-upload',
    label: '图片上传',
    name: 'image',
    attr: {
      url: '/upload',
      multiple: false,
    },
    itemAttr: {
      required: true,
    },
  },
  {
    type: 'file-upload',
    label: '文件上传',
    name: 'files',
    attr: {
      url: '/upload',
      multiple: true,
    },
    itemAttr: {
      required: true,
    },
  },
]
</script>

<template>
  <div>
    <dux-json-form :model="props.model" :schema="schema" />
  </div>
</template>

<style scoped>

</style>
