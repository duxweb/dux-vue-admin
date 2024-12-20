# 简单统计卡片

简单统计卡片用于展示简单的数据统计信息，支持标题、描述、数值和趋势等信息的展示。

## 组件说明

### DuxStatsTotalSimple

简单统计卡片组件，支持数值统计和趋势展示。

#### 属性

| 属性名 | 类型             | 默认值 | 说明     |
| ------ | ---------------- | ------ | -------- |
| title  | string           | -      | 标题文本 |
| desc   | string           | -      | 描述文本 |
| value  | number \| string | -      | 统计数值 |
| rate   | number \| string | -      | 变化率   |
| type   | 'up' \| 'down'   | 'up'   | 趋势类型 |
| icon   | string           | -      | 图标名称 |

## 代码示例

### 基础用法

```vue
<template>
  <dux-stats-total-simple
    title="访问量"
    desc="总访问量统计"
    value="8,848"
    rate="12%"
    icon="i-tabler:users"
  />
</template>
```

### 下降趋势

```vue
<template>
  <dux-stats-total-simple
    title="退款率"
    desc="交易退款率"
    value="2.5%"
    rate="0.5%"
    type="down"
    icon="i-tabler:receipt-refund"
  />
</template>
```

### 完整示例

```vue
<template>
  <div class="grid grid-cols-4 gap-4">
    <!-- 上升趋势 -->
    <dux-stats-total-simple
      title="访问量"
      desc="总访问量统计"
      value="8,848"
      rate="12%"
      icon="i-tabler:users"
    />

    <!-- 下降趋势 -->
    <dux-stats-total-simple
      title="退款率"
      desc="交易退款率"
      value="2.5%"
      rate="0.5%"
      type="down"
      icon="i-tabler:receipt-refund"
    />

    <!-- 销售额 -->
    <dux-stats-total-simple
      title="销售额"
      desc="总销售额统计"
      value="¥126,560"
      rate="15%"
      icon="i-tabler:shopping-cart"
    />

    <!-- 转化率 -->
    <dux-stats-total-simple
      title="转化率"
      desc="访问转化率"
      value="35%"
      rate="8%"
      icon="i-tabler:chart-arrows"
    />
  </div>
</template>
```
