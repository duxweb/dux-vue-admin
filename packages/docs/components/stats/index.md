# 统计组件

统计组件是一组用于展示数据统计信息的组件集合，包括数据卡片、趋势图表、用户信息等多种展示形式。

## 组件列表

### 数据卡片

- [基础卡片](./total-card.md) - 展示基础的统计数据
- [简单卡片](./total-simple.md) - 简洁的数据展示
- [多列卡片](./total-multi.md) - 多列数据展示
- [趋势卡片](./total-rate.md) - 带趋势图的数据展示
- [标签卡片](./total-tab.md) - 带标签切换的数据展示

### 用户信息

- [用户卡片](./user.md) - 展示用户基本信息
- [店铺信息](./store.md) - 展示店铺相关信息
- [连接状态](./connect.md) - 展示系统连接状态
- [欢迎信息](./hello-big.md) - 展示欢迎和概览信息

### 容器组件

- [基础卡片](./card.md) - 通用卡片容器

### 快捷操作

- [操作卡片](./action.md) - 带操作的数据卡片
- [快捷按钮](./quick.md) - 快捷操作按钮组

## 使用示例

```vue
<template>
  <div class="flex flex-col gap-4">
    <!-- 欢迎信息 -->
    <dux-stats-hello-big
      title="欢迎回来"
      desc="今天是个好日子，适合写代码"
      :data="[
        {
          label: '待处理订单',
          value: 10,
          icon: 'i-tabler:shopping-cart',
        },
        {
          label: '新增用户',
          value: 25,
          icon: 'i-tabler:users',
        },
      ]"
    />

    <!-- 数据统计 -->
    <div class="grid grid-cols-4 gap-4">
      <dux-stats-total-simple
        title="访问量"
        desc="总访问量统计"
        value="8,848"
        rate="12%"
        icon="i-tabler:users"
      />
      <dux-stats-total-simple
        title="销售额"
        desc="总销售额统计"
        value="¥126,560"
        rate="15%"
        icon="i-tabler:shopping-cart"
      />
    </div>

    <!-- 快捷操作 -->
    <dux-stats-quick
      :data="[
        {
          title: '用户管理',
          icon: 'i-tabler:users',
          onClick: () => handleClick('users'),
        },
        {
          title: '订单管理',
          icon: 'i-tabler:shopping-cart',
          onClick: () => handleClick('orders'),
        },
      ]"
    />
  </div>
</template>

<script setup lang="ts">
const handleClick = (type: string) => {
  console.log("Click:", type);
};
</script>
```
