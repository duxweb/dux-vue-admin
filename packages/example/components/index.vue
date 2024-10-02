<script setup lang="ts">
const chartData = [
  { title: '用户量', data: [10, 15, 18, 6, 4, 12, 16, 18], icon: 'i-tabler:home' },
  { title: '访问量', data: [20, 30, 24, 12, 8, 16, 30, 22], icon: 'i-tabler:home' },
  { title: '访客量', data: [12, 24, 33, 11, 32, 31, 42, 16], icon: 'i-tabler:home' },
  { title: '交易量', data: [3, 4, 7, 5, 3, 8, 12, 10], icon: 'i-tabler:home' },
]

const chartPieData = [
  { title: '搜索引擎', value: 1048 },
  { title: '直接访问', value: 735 },
  { title: '邮件营销', value: 580 },
  { title: '联盟广告', value: 484 },
  { title: '视频广告', value: 300 },
]

const chartRadarData = [
  {
    name: '今日数据',
    mall: 4.5,
    service: 4.5,
    express: 4.5,
    credit: 4.5,
  },
  {
    name: '昨日数据',
    mall: 3.3,
    service: 3.2,
    express: 3.0,
    credit: 3.3,
  },
  {
    name: '本周数据',
    mall: 4.3,
    service: 4.2,
    express: 4.0,
    credit: 4.3,
  },
]

const chartRadarLabels = {
  mall: '商品分',
  service: '服务分',
  express: '物流分',
  credit: '信用分',
}

const chartMapData = [
  {
    name: '上海市',
    pv: 1048,
    uv: 735,
    num: 220,
  },
  {
    name: '广东省',
    pv: 4324,
    uv: 233,
    num: 40,
  },
  {
    name: '湖南省',
    pv: 2334,
    uv: 234,
    num: 30,
  },
  {
    name: '湖北省',
    pv: 432,
    uv: 4324,
    num: 10,
  },
  {
    name: '广西省',
    pv: 432,
    uv: 4324,
    num: 10,
  },
  {
    name: '重庆市',
    pv: 432,
    uv: 4324,
    num: 10,
  },
  {
    name: '浙江省',
    pv: 432,
    uv: 4324,
    num: 10,
  },
]

const chartMapLabels = {
  pv: '访问量',
  uv: '访客量',
  num: '用户量',
}
</script>

<template>
  <dux-page>
    <div class="flex lg:items-start gap-4 flex-col lg:flex-row">
      <div class="flex-1 flex flex-col gap-4 lg:w-1">
        <dux-stats-hello-big
          title="HELLO，张三" :data="[
            {
              label: '已处理',
              icon: 'i-tabler:cube',
              value: 0,
            },
            {
              label: '处理中',
              icon: 'i-tabler:cube',
              value: 0,
            },
            {
              label: '未处理',
              icon: 'i-tabler:cube',
              value: 0,
            },
          ]"
        />

        <dux-stats-multi title="统计概况">
          <dux-stats-multi-item title="用户总数" desc="对比上周数据" value="123" rate="10%" />
          <dux-stats-multi-item title="用户总数" desc="对比上周数据" value="123" rate="10%" />
          <dux-stats-multi-item title="用户总数" desc="对比上周数据" value="123" rate="10%" />
          <dux-stats-multi-item title="用户总数" desc="对比上周数据" value="123" rate="10%" />
          <dux-stats-multi-item title="用户总数" desc="对比上周数据" value="123" rate="10%" />
          <dux-stats-multi-item title="用户总数" desc="对比上周数据" value="123" rate="10%" />
          <dux-stats-multi-item title="用户总数" desc="对比上周数据" value="123" rate="10%" />
          <dux-stats-multi-item title="用户总数" desc="对比上周数据" value="123" rate="10%" />
          <dux-stats-multi-item title="用户总数" desc="对比上周数据" value="123" rate="10%" />
          <dux-stats-multi-item title="用户总数" desc="对比上周数据" value="123" rate="10%" />
          <dux-stats-multi-item title="用户总数" desc="对比上周数据" value="123" rate="10%" />
        </dux-stats-multi>

        <dux-stats-hello
          title="张三 ，您好！祝您开心每一天" desc="登录于湖南省长沙市 2024年01月01日 18:00" :data="[
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

        <dux-stats-tab>
          <dux-stats-tab-item
            icon="i-tabler:eye" title="用户总数" unit="人" :data="[
              {
                label: '本日',
                title: '日同比',
                value: 123,
                rate: '10%',
              },
              {
                label: '本周',
                title: '周同比',
                value: 321,
                rate: '10%',
              },
            ]"
          />
          <dux-stats-tab-item
            icon="i-tabler:eye" title="用户总数" unit="人" :data="[
              {
                label: '本日',
                title: '日同比',
                value: 123,
                rate: '10%',
              },
              {
                label: '本周',
                title: '周同比',
                value: 333,
                rate: '10%',
              },
            ]"
          />
          <dux-stats-tab-item
            icon="i-tabler:eye" title="用户总数" unit="人" :data="[
              {
                label: '本日',
                title: '日同比',
                value: 123,
                rate: '10%',
              },
              {
                label: '本周',
                title: '周同比',
                value: 444,
                rate: '10%',
              },
            ]"
          />
          <dux-stats-tab-item
            icon="i-tabler:eye" title="用户总数" unit="人" :data="[
              {
                label: '本日',
                title: '日同比',
                value: 123,
                rate: '10%',
              },
              {
                label: '本周',
                title: '周同比',
                value: 321,
                rate: '10%',
              },
            ]"
          />
        </dux-stats-tab>

        <dux-stats-rate>
          <dux-stats-rate-item title="用户总数" desc="对比上周数据" value="123" rate="10%" :data="[10, 20, 30, 40, 50]" />
          <dux-stats-rate-item type="down" title="用户总数" desc="对比上周数据" value="123" rate="10%" :data="[10, 20, 30, 40, 10]" />
          <dux-stats-rate-item title="用户总数" desc="对比上周数据" value="123" rate="10%" :data="[10, 20, 30, 40, 50]" />
          <dux-stats-rate-item type="down" title="用户总数" desc="对比上周数据" value="123" rate="10%" :data="[10, 20, 30, 15, 0]" />
        </dux-stats-rate>

        <dux-stats-simple>
          <dux-stats-simple-item icon="i-tabler:eye" title="用户总数" desc="对比上周数据" value="123" rate="10%" />
          <dux-stats-simple-item icon="i-tabler:eye" type="down" title="用户总数" desc="对比上周数据" value="123" rate="10%" />
          <dux-stats-simple-item icon="i-tabler:eye" title="用户总数" desc="对比上周数据" value="123" rate="10%" />
          <dux-stats-simple-item icon="i-tabler:eye" type="down" title="用户总数" desc="对比上周数据" value="123" rate="10%" />
        </dux-stats-simple>

        <dux-stats-card>
          <dux-stats-card-item icon="i-tabler:eye" title="用户总数" desc="对比上周数据" value="123" rate="10%" @click="() => {}" />
          <dux-stats-card-item icon="i-tabler:eye" type="down" title="用户总数" desc="对比上周数据" value="123" rate="10%" @click="() => {}" />
          <dux-stats-card-item icon="i-tabler:eye" title="用户总数" desc="对比上周数据" value="123" rate="10%" @click="() => {}" />
          <dux-stats-card-item icon="i-tabler:eye" type="down" title="用户总数" desc="对比上周数据" value="123" rate="10%" @click="() => {}" />
        </dux-stats-card>

        <dux-stats-quick
          :data="[
            {
              title: '首页统计',
              icon: 'i-tabler:home',
            },
            {
              title: '首页统计',
              icon: 'i-tabler:home',
            },
            {
              title: '首页统计',
              icon: 'i-tabler:home',
            },
            {
              title: '首页统计',
              icon: 'i-tabler:home',
            },
            {
              title: '首页统计',
              icon: 'i-tabler:home',
            },
            {
              title: '首页统计',
              icon: 'i-tabler:home',
            },
            {
              title: '首页统计',
              icon: 'i-tabler:home',
            },
            {
              title: '首页统计',
              icon: 'i-tabler:home',
            },
          ]"
        />

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

        <dux-stats-chart-map title="地图图表" :data="chartMapData" :labels="chartMapLabels" geojson="https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json" value-key="num" />

        <dux-stats-chart-radar title="雷达图" :data="chartRadarData" :labels="chartRadarLabels" />

        <div class="grid grid-cols-1 grid-cols-2 gap-4">
          <dux-stats-chart-area title="饼状图" :data="chartPieData" />
          <dux-stats-chart-area title="环形图" :data="chartPieData" type="ring" />
          <dux-stats-chart-area title="玫瑰图" :data="chartPieData" type="rose" />
          <dux-stats-chart-area title="漏斗图" :data="chartPieData" type="funnel" />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <dux-stats-chart-grid
            title="柱状图"
            :labels="['2024-01-02', '2024-01-03', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09', '2024-01-10']"
            :data="chartData"
            legend="small"
          />
          <dux-stats-chart-grid
            title="面积图"
            :labels="['2024-01-02', '2024-01-03', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09', '2024-01-10']"
            :data="chartData"
            legend="small"
            type="line"
          />
        </div>

        <dux-stats-chart-grid
          title="趋势统计"
          total
          :labels="['2024-01-02', '2024-01-03', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09', '2024-01-10']"
          :data="chartData"
        />
      </div>
      <div class="flex-none flex flex-col gap-4 w-86">
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

        <dux-stats-user nickname="张三" desc="湖南长沙" role="事业部经理" />

        <dux-stats-account title="我的账户" desc="可用余额" :value="12032132" :options="[{ label: '余额提现', type: 'primary' }, { label: '实名认证', type: 'tertiary' }]" />
        <dux-stats-bankcard title="我的银行卡" :info="{ type: '储蓄卡', title: '中国工商银行', name: '张三', no: '**** **** **** 1234' }" />

        <n-carousel
          draggable
          class="h-75 rounded-sm shadow-sm"
        >
          <img
            class="carousel-img"
            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
          >
          <img
            class="carousel-img"
            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
          >
          <img
            class="carousel-img"
            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
          >
        </n-carousel>

        <dux-stats-card title="系统公告">
          <template #extend>
            <n-button size="small" text>
              更多
            </n-button>
          </template>
          <dux-list>
            <dux-media @click="() => {}">
              优化功能与安全升级
              <template #prefix>
                <n-tag type="success" size="small">
                  系统
                </n-tag>
              </template>
            </dux-media>
            <dux-media @click="() => {}">
              2优化功能与安全升级
              <template #prefix>
                <n-tag type="success" size="small">
                  系统
                </n-tag>
              </template>
            </dux-media>
            <dux-media @click="() => {}">
              优化功能与安全升级
              <template #prefix>
                <n-tag type="success" size="small">
                  系统
                </n-tag>
              </template>
            </dux-media>
            <dux-media @click="() => {}">
              优化功能与安全升级
              <template #prefix>
                <n-tag type="success" size="small">
                  系统
                </n-tag>
              </template>
            </dux-media>
            <dux-media @click="() => {}">
              优化功能与安全升级
              <template #prefix>
                <n-tag type="success" size="small">
                  系统
                </n-tag>
              </template>
            </dux-media>
            <dux-media @click="() => {}">
              优化功能与安全升级
              <template #prefix>
                <n-tag type="success" size="small">
                  系统
                </n-tag>
              </template>
            </dux-media>
          </dux-list>
        </dux-stats-card>
      </div>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
