<script setup lang="ts">
import { ref } from 'vue'

const baseCode = ref(`<script setup>
import { ref } from 'vue'

const model = ref({})
const table = ref()

function submit() {
  table.value.onSend()
}
<\/script>
<template>
  <n-card>
    <dux-filter
      v-model:value="model"
      class="mb-4"
      title="组合筛选"
      :filter="[
        {
          label: '关键词',
          type: 'input',
          name: 'keyword',
        },
      ]"
      @submit="submit"
    />
    <dux-table
      ref="table"
      :form="model"
      url="/mall"
      :columns="[
        {
          title: '商品',
          key: 'title',
          width: 300,
          renderType: 'media',
          renderProps: {
            title: 'title',
            image: 'image',
            desc: 'active',
          },
        },
        {
          title: '价格',
          key: 'sell_price',
          width: 150,
          renderType: 'map',
          renderProps: {
            maps: [
              {
                label: '销售价',
                value: 'market_price',
              },
              {
                label: '市场价',
                value: 'sell_price',
              },
            ],
          },
        },
        {
          title: '销售',
          key: 'sale_num',
          width: 120,
          renderType: 'map',
          renderProps: {
            maps: [
              {
                label: '销量',
                value: 'sale_num',
              },
              {
                label: '库存',
                value: 'store_num',
              },
            ],
          },
        },
        {
          title: '发布日期',
          key: 'up_at',
          width: 180,
          renderType: 'map',
          renderProps: {
            maps: [
              {
                label: '上架',
                value: 'up_at',
              },
              {
                label: '下架',
                value: 'down_at',
              },
            ],
          },
        },
        {
          title: '状态',
          key: 'status',
          width: 120,
          renderType: 'status',
          renderProps: {
            maps: {
              success: {
                value: 2,
                label: '上架',
              },
              error: {
                value: 0,
                label: '下架',
              },
              warning: {
                value: 1,
                label: '待审',
              },
            },
          },
        },
      ]"
      :column-actions="[
        {
          label: '编辑',
          color: 'primary',
          type: 'drawer',
          component: () => import('./edit.vue'),
        },

        {
          label: '删除',
          color: 'error',
          type: 'confirm',
        },
      ]"
    />
  </n-card>
</template>`)

const model = ref({})
const table = ref()

function submit() {
  table.value.onSend()
}
</script>

<template>
  <dux-page>
    <div class="grid grid-cols-1 gap-2">
      <dux-example title="组件示例" :code="baseCode">
        <n-card>
          <dux-filter
            v-model:value="model"
            class="mb-4"
            title="组合筛选"
            :filter="[
              {
                label: '关键词',
                type: 'input',
                name: 'keyword',
              },
            ]"
            @submit="submit"
          />
          <dux-table
            ref="table"
            :form="model"
            url="/mall"
            :columns="[
              {
                title: '商品',
                key: 'title',
                width: 300,
                renderType: 'media',
                renderProps: {
                  title: 'title',
                  image: 'image',
                  desc: 'active',
                },
              },
              {
                title: '价格',
                key: 'sell_price',
                width: 150,
                renderType: 'map',
                renderProps: {
                  maps: [
                    {
                      label: '销售价',
                      value: 'market_price',
                    },
                    {
                      label: '市场价',
                      value: 'sell_price',
                    },
                  ],
                },
              },
              {
                title: '销售',
                key: 'sale_num',
                width: 120,
                renderType: 'map',
                renderProps: {
                  maps: [
                    {
                      label: '销量',
                      value: 'sale_num',
                    },
                    {
                      label: '库存',
                      value: 'store_num',
                    },
                  ],
                },
              },
              {
                title: '发布日期',
                key: 'up_at',
                width: 180,
                renderType: 'map',
                renderProps: {
                  maps: [
                    {
                      label: '上架',
                      value: 'up_at',
                    },
                    {
                      label: '下架',
                      value: 'down_at',
                    },
                  ],
                },
              },
              {
                title: '状态',
                key: 'status',
                width: 120,
                renderType: 'status',
                renderProps: {
                  maps: {
                    success: {
                      value: 2,
                      label: '上架',
                    },
                    error: {
                      value: 0,
                      label: '下架',
                    },
                    warning: {
                      value: 1,
                      label: '待审',
                    },
                  },
                },
              },
            ]"
            :column-actions="[
              {
                label: '编辑',
                color: 'primary',
                type: 'drawer',
                component: () => import('./edit.vue'),
              },

              {
                label: '删除',
                color: 'error',
                type: 'confirm',
              },
            ]"
          />
        </n-card>
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
