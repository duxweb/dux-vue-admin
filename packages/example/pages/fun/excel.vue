<script setup lang="ts">
import { useExportExcel, useImportExcel } from '@duxweb/dux-vue-admin'
import { ref } from 'vue'

const importCode = ref(`import { useImportExcel } from '@duxweb/dux-vue-admin'

const importExcel = useImportExcel()

importExcel.send({
  url: '/mall',
  columns: [
    {
      header: '商品',
      key: 'title',
    },
  ],
})
`)

const exportCode = ref(`import { useImportExcel } from '@duxweb/dux-vue-admin'

const exportExcel = useExportExcel()

exportExcel.send({
  url: '/mall',
  columns: [
    {
      header: '商品',
      key: 'title',
    },
  ],
})
`)

const importExcel = useImportExcel()
const exportExcel = useExportExcel()

function onImportExcel() {
  importExcel.send({
    url: '/mall',
    columns: [
      {
        header: '商品',
        key: 'title',
      },
    ],
  })
}

function onExportExcel() {
  exportExcel.send({
    url: '/mall',
    columns: [
      {
        header: '商品',
        key: 'title',
      },
    ],
  })
}
</script>

<template>
  <dux-page>
    <div class="grid grid-cols-1 gap-2">
      <dux-example title="导入示例" :code="importCode" lang="javascript">
        <n-alert type="info" class="mb-4">
          将 xlsx 文件转换为 json 并提交给 api，导入表头可转换为字段名
        </n-alert>
        <n-button @click="onImportExcel">
          导入
        </n-button>
      </dux-example>

      <dux-example title="导出示例" :code="exportCode" lang="javascript">
        <n-alert type="info" class="mb-4">
          将后端接口返回的json数据转换为 xlsx 文件，导出字段名可进行转换表头，并支持数据分页
        </n-alert>
        <n-button @click="onExportExcel">
          导出
        </n-button>
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
