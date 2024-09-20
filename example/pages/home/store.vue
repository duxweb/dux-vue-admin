<script setup lang="ts">
import { DuxMedia } from 'dux-vue-admin'
import { type DataTableColumn, NTag } from 'naive-ui'
import { h } from 'vue'

const mallColumn: DataTableColumn[] = [
  {
    title: '排名',
    key: 'title',
    width: 60,
    render(row, index) {
      return h(
        NTag,
        {
          type: index < 1 ? 'error' : index < 2 ? 'warning' : index < 3 ? 'info' : 'primary',
          bordered: false,
        },
        {
          default: () => index + 1,
        },
      )
    },
  },
  {
    title: '商品',
    key: 'title',
    width: 200,
    render(row) {
      return h(
        DuxMedia,
        {
          image: row?.image as string,
          title: row?.title as string,
          desc: row?.desc as string,
        },
      )
    },
  },
  {
    title: '价格',
    key: 'price',
    width: 100,
    sorter: 'default',
  },
  {
    title: '浏览量',
    key: 'view_num',
    width: 100,
    sorter: 'default',

  },
  {
    title: '销售量',
    key: 'sale_num',
    width: 100,
    sorter: 'default',
  },
]

const mallData = [
  {
    id: 1,
    title: '智能手表',
    image: 'https://picsum.photos/100/100',
    desc: '全新智能手表，具有心率监测、睡眠监测等功能。',
    price: 599.99,
    sale_num: 120,
    view_num: 5000,
  },
  {
    id: 2,
    title: '无线蓝牙耳机',
    image: 'https://picsum.photos/100/100',
    desc: '高品质无线蓝牙耳机，长效续航，音质清晰。',
    price: 299.99,
    sale_num: 230,
    view_num: 4500,
  },
  {
    id: 3,
    title: '便携式榨汁机',
    image: 'https://picsum.photos/100/100',
    desc: '便携式榨汁机，轻松制作新鲜果汁，健康生活。',
    price: 199.99,
    sale_num: 180,
    view_num: 3900,
  },
  {
    id: 4,
    title: '智能手环',
    image: 'https://picsum.photos/100/100',
    desc: '多功能智能手环，运动计步，睡眠监测，消息提醒。',
    price: 199.99,
    sale_num: 300,
    view_num: 4700,
  },
  {
    id: 5,
    title: '电子书阅读器',
    image: 'https://picsum.photos/100/100',
    desc: '高清电子墨水屏，长续航，海量图书资源。',
    price: 799.99,
    sale_num: 150,
    view_num: 3200,
  },
  {
    id: 6,
    title: '智能摄像头',
    image: 'https://picsum.photos/100/100',
    desc: '家用智能摄像头，高清夜视，双向语音通话。',
    price: 399.99,
    sale_num: 210,
    view_num: 4800,
  },
  {
    id: 7,
    title: '无线充电器',
    image: 'https://picsum.photos/100/100',
    desc: '快速无线充电，兼容多种设备，安全保护。',
    price: 129.99,
    sale_num: 250,
    view_num: 3600,
  },
  {
    id: 8,
    title: '智能灯泡',
    image: 'https://picsum.photos/100/100',
    desc: '智能控制，多种颜色调节，节能环保。',
    price: 99.99,
    sale_num: 320,
    view_num: 4300,
  },
  {
    id: 9,
    title: '智能门锁',
    image: 'https://picsum.photos/100/100',
    desc: '指纹识别，密码开锁，安全方便。',
    price: 699.99,
    sale_num: 90,
    view_num: 3000,
  },
  {
    id: 10,
    title: '智能扫地机器人',
    image: 'https://picsum.photos/100/100',
    desc: '自动扫地拖地，智能规划清洁路线，解放双手。',
    price: 1699.99,
    sale_num: 50,
    view_num: 2800,
  },
]

const userColumn: DataTableColumn[] = [
  {
    title: '排名',
    key: 'title',
    width: 60,
    render(row, index) {
      return h(
        NTag,
        {
          type: index < 1 ? 'error' : index < 2 ? 'warning' : index < 3 ? 'info' : 'primary',
          bordered: false,
        },
        {
          default: () => index + 1,
        },
      )
    },
  },
  {
    title: '用户',
    key: 'nickname',
    width: 200,
    render(row) {
      return h(
        DuxMedia,
        {
          image: row?.image as string,
          title: row?.nickname as string,
          desc: row?.tel as string,
        },
      )
    },
  },
  {
    title: '消费额',
    key: 'total_price',
    width: 100,
    sorter: 'default',
  },
  {
    title: '下单量',
    key: 'total_num',
    width: 100,
    sorter: 'default',

  },
]

const userData = [
  {
    id: 1,
    nickname: '用户A',
    image: 'https://picsum.photos/50/50',
    tel: '138****1234',
    total_price: 2399.99,
    total_num: 3,
  },
  {
    id: 2,
    nickname: '用户B',
    image: 'https://picsum.photos/50/50',
    tel: '139****5678',
    total_price: 1999.99,
    total_num: 2,
  },
  {
    id: 3,
    nickname: '用户C',
    image: 'https://picsum.photos/50/50',
    tel: '137****9012',
    total_price: 599.99,
    total_num: 1,
  },
  {
    id: 4,
    nickname: '用户D',
    image: 'https://picsum.photos/50/50',
    tel: '136****3456',
    total_price: 899.99,
    total_num: 4,
  },
  {
    id: 5,
    nickname: '用户E',
    image: 'https://picsum.photos/50/50',
    tel: '150****7890',
    total_price: 1599.99,
    total_num: 5,
  },
  {
    id: 6,
    nickname: '用户F',
    image: 'https://picsum.photos/50/50',
    tel: '158****2345',
    total_price: 2999.99,
    total_num: 6,
  },
  {
    id: 7,
    nickname: '用户G',
    image: 'https://picsum.photos/50/50',
    tel: '159****6789',
    total_price: 999.99,
    total_num: 3,
  },
  {
    id: 8,
    nickname: '用户H',
    image: 'https://picsum.photos/50/50',
    tel: '156****0123',
    total_price: 3999.99,
    total_num: 7,
  },
  {
    id: 9,
    nickname: '用户I',
    image: 'https://picsum.photos/50/50',
    tel: '155****4567',
    total_price: 2199.99,
    total_num: 2,
  },
  {
    id: 10,
    nickname: '用户J',
    image: 'https://picsum.photos/50/50',
    tel: '157****8901',
    total_price: 4599.99,
    total_num: 8,
  },
]
</script>

<template>
  <dux-page>
    <div class="flex lg:items-start gap-4 flex-col lg:flex-row">
      <div class="flex-1 flex flex-col gap-4 lg:w-1">
        <dux-stats-total-multi title="统计概况">
          <dux-stats-total-multi-item title="注册用户" desc="对比上周数据" value="200" rate="12%" />
          <dux-stats-total-multi-item title="消费用户" desc="对比上周数据" value="150" rate="10%" type="down" />
          <dux-stats-total-multi-item title="销售金额" desc="对比上周数据" value="3827.00" rate="15%" />
          <dux-stats-total-multi-item title="下单数量" desc="对比上周数据" value="1000" rate="5%" />
          <dux-stats-total-multi-item title="客单价" desc="对比上周数据" value="383.00" rate="15%" />
          <dux-stats-total-multi-item title="成本金额" desc="对比上周数据" value="1233.00" rate="5%" type="down" />
          <dux-stats-total-multi-item title="利润金额" desc="对比上周数据" value="2594.00" rate="10%" />
          <dux-stats-total-multi-item title="结算金额" desc="对比上周数据" value="2021.00" rate="10%" />
        </dux-stats-total-multi>

        <dux-stats-card title="快捷功能">
          <dux-stats-quick
            :data="[
              {
                title: '订单管理',
                icon: 'i-tabler:truck-delivery',
              },
              {
                title: '售后管理',
                icon: 'i-tabler:credit-card-refund',
              },
              {
                title: '客服管理',
                icon: 'i-tabler:brand-hipchat',
              },
              {
                title: '客户管理',
                icon: 'i-tabler:users',
              },
              {
                title: '商品管理',
                icon: 'i-tabler:basket',
              },
              {
                title: '对账单',
                icon: 'i-tabler:logs',
              },
            ]"
          />
        </dux-stats-card>

        <dux-stats-todo>
          <dux-stats-todo-item
            title="售前订单" value="0" :data="[
              {
                title: '待付款',
                value: 0,
              },
              {
                title: '待发货',
                value: 0,
              },
            ]"
          />
          <dux-stats-todo-item
            title="售中订单" value="0" :data="[
              {
                title: '待发货',
                value: 0,
              },
              {
                title: '待收货',
                value: 0,
              },
            ]"
          />
          <dux-stats-todo-item
            title="售后订单" value="0" :data="[
              {
                title: '待审核',
                value: 0,
              },
              {
                title: '待收货',
                value: 0,
              },
            ]"
          />
          <dux-stats-todo-item
            title="客服咨询" value="0" :data="[
              {
                title: '未回复',
                value: 0,
              },
              {
                title: '待处理',
                value: 0,
              },
            ]"
          />
        </dux-stats-todo>

        <div class="grid grid-cols-2 gap-4">
          <dux-stats-card title="商品 TOP 10" content-class="!p-0">
            <n-data-table :data="mallData" :columns="mallColumn" :bordered="false" />
          </dux-stats-card>
          <dux-stats-card title="客户 TOP 10" content-class="!p-0">
            <n-data-table :data="userData" :columns="userColumn" :bordered="false" />
          </dux-stats-card>
        </div>
      </div>
      <div class="flex-none flex flex-col gap-4 lg:w-86">
        <dux-stats-store title="官方自营旗舰店" :col="3">
          <dux-stats-store-item label="商品">
            <div class="font-medium">
              4.5
            </div>
          </dux-stats-store-item>
          <dux-stats-store-item label="服务">
            <div class="font-medium">
              4.5
            </div>
          </dux-stats-store-item>
          <dux-stats-store-item label="物流">
            <div class="font-medium">
              4.5
            </div>
          </dux-stats-store-item>
          <dux-stats-store-item label="信用等级">
            <div class="font-medium">
              5.0
            </div>
          </dux-stats-store-item>
          <dux-stats-store-item label="店铺资质">
            <div class="text-primary text-sm">
              已上传
            </div>
          </dux-stats-store-item>
          <dux-stats-store-item label="店铺状态">
            <div class="text-primary text-sm">
              正常
            </div>
          </dux-stats-store-item>
        </dux-stats-store>

        <dux-stats-user nickname="张三" desc="湖南长沙" role="运营部经理" />
        <dux-stats-account title="店铺余额" desc="元" :value="10000" :options="[{ label: '余额提现', type: 'primary' }, { label: '店铺认证', type: 'tertiary' }]" />

        <dux-stats-card title="店铺公告">
          <template #extend>
            <n-button size="small" text>
              更多
            </n-button>
          </template>
          <dux-list>
            <DuxMedia @click="() => {}">
              <template #prefix>
                <NTag type="success" size="small">
                  系统
                </NTag>
              </template>
              优化功能与安全升级
            </DuxMedia>
            <DuxMedia @click="() => {}">
              <template #prefix>
                <NTag type="info" size="small">
                  店铺
                </NTag>
              </template>
              店铺会员认证即将到期
            </DuxMedia>
            <DuxMedia @click="() => {}">
              <template #prefix>
                <NTag type="success" size="small">
                  系统
                </NTag>
              </template>
              本周五晚进行服务器升级
            </DuxMedia>
            <DuxMedia @click="() => {}">
              <template #prefix>
                <NTag type="info" size="small">
                  店铺
                </NTag>
              </template>
              新员工入职培训计划安排
            </DuxMedia>
            <DuxMedia @click="() => {}">
              <template #prefix>
                <NTag type="success" size="small">
                  系统
                </NTag>
              </template>
              网络安全意识月活动启动
            </DuxMedia>
            <DuxMedia @click="() => {}">
              <template #prefix>
                <NTag type="info" size="small">
                  店铺
                </NTag>
              </template>
              年度销售评估流程及统计表
            </DuxMedia>
          </dux-list>
        </dux-stats-card>

        <dux-stats-bankcard title="提现银行卡" :info="{ type: '储蓄卡', title: '中国工商银行', name: '官方自营旗舰店', no: '**** **** **** 1234' }" />
      </div>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
