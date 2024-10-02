<script setup lang="ts">
</script>

<template>
  <dux-page>
    <div class="flex flex-col gap-2">
      <dux-card-header title="详情示例" desc="该页面使用 Naive UI 组件拼接而成，非页面组件" icon="i-tabler:home" icon-color="primary">
        <n-button type="warning" secondary>
          暂停
        </n-button>
        <n-button type="error" secondary>
          终止
        </n-button>
      </dux-card-header>

      <div class="grid grid-cols-4 gap-2">
        <dux-stats-action title="待收款" value="￥2999.00" icon="i-tabler:currency-yen">
          <n-button text>
            新增
          </n-button>

          <n-button text>
            记录
          </n-button>
        </dux-stats-action>

        <dux-stats-action title="收入" value="￥2999.00" icon="i-tabler:credit-card-pay">
          <n-button text>
            新增
          </n-button>

          <n-button text>
            记录
          </n-button>
        </dux-stats-action>

        <dux-stats-action title="支出" value="￥2999.00" icon="i-tabler:outbound">
          <n-button text>
            新增
          </n-button>

          <n-button text>
            记录
          </n-button>
        </dux-stats-action>

        <dux-stats-action title="利润" value="￥2999.00" icon="i-tabler:moneybag">
          <n-button text>
            查看明细
          </n-button>
        </dux-stats-action>
      </div>

      <n-card title="项目信息">
        <n-descriptions label-placement="top" bordered :column="4">
          <n-descriptions-item label="签订日期">
            2024-01-01
          </n-descriptions-item>
          <n-descriptions-item label="开始日期">
            2024-01-05
          </n-descriptions-item>
          <n-descriptions-item label="预计交付日期">
            2024-02-01
          </n-descriptions-item>
          <n-descriptions-item label="实际交付日期">
            -
          </n-descriptions-item>
          <n-descriptions-item label="预计工时 (天)">
            30
          </n-descriptions-item>
          <n-descriptions-item label="实际工时 (天)">
            10
          </n-descriptions-item>
          <n-descriptions-item label="状态">
            距离交付还有 20 天
          </n-descriptions-item>
        </n-descriptions>
      </n-card>

      <n-card title="客户信息">
        <template #header-extra>
          <n-button text type="primary">
            新增
          </n-button>
        </template>

        <dux-base-table
          :columns="[
            { title: '客户名称', key: 'name', width: 200 },
            { title: '联系人', key: 'contact', width: 150 },
            { title: '联系电话', key: 'phone', width: 150 },
            { title: '联系微信', key: 'wechat', width: 150 },
            { title: '备注', key: 'remark', width: 150 },
          ]"
          :data="[
            { name: '中国电信贺州分公司', contact: '张三', phone: '13000000000', wechat: 'deak100', remark: '-' },
          ]"
          :column-actions="[
            { type: 'link', label: '对公账户', color: 'primary' },
            { type: 'link', label: '编辑', color: 'primary' },
            { type: 'link', label: '删除', color: 'error' },
          ]"
        />
      </n-card>

      <n-card title="参与者">
        <template #header-extra>
          <n-button text type="primary">
            新增
          </n-button>
        </template>

        <dux-base-table
          :columns="[
            { title: '姓名', key: 'name', width: 200 },
            { title: '分成规则', key: 'rule', width: 150 },
            { title: '分成金额', key: 'money', width: 150 },
            { title: '角色', key: 'role', width: 150 },
            { title: '备注', key: 'remark', width: 150 },
          ]"
          :data="[
            { name: '张三', rule: '按比例', money: '¥829.93', role: '设计', remark: '这个人很懒' },
            { name: '李四', rule: '按比例', money: '¥829.93', role: '前端', remark: '这个人很懒' },
            { name: '王五', rule: '按比例', money: '¥829.93', role: '后端', remark: '这个人很懒' },
            { name: '赵六', rule: '按比例', money: '¥829.93', role: '测试', remark: '这个人很懒' },
          ]"
          :column-actions="[
            { type: 'link', label: '详情', color: 'primary' },
            { type: 'link', label: '分成', color: 'primary' },
          ]"
        />
      </n-card>

      <n-card title="附件">
        <template #header-extra>
          <n-button text type="primary">
            新增
          </n-button>
        </template>

        <dux-base-table
          :columns="[
            { title: '文件名', key: 'name', width: 200 },
            { title: '格式', key: 'format', width: 150 },
            { title: '大小', key: 'size', width: 150 },
            { title: '上传日期', key: 'date', width: 150 },
            { title: '备注', key: 'remark', width: 150 },
          ]"
          :data="[
            { name: '项目合作协议正式版', format: 'pdf', size: '10.8M', date: '2024年03月06日 14:29:19', remark: '-' },
          ]"
          :column-actions="[
            { type: 'link', label: '查看', color: 'primary' },
            { type: 'link', label: '下载', color: 'primary' },
            { type: 'link', label: '删除', color: 'error' },
          ]"
        />
      </n-card>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
