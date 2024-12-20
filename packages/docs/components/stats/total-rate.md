# 趋势统计卡片

趋势统计卡片用于展示带有趋势图表的数据统计信息，支持折线图、柱状图等多种图表类型。

## 组件说明

### DuxStatsTotalRate

趋势统计卡片组件，支持数值统计和趋势图表展示。

#### 属性

| 属性名  | 类型             | 默认值    | 说明     |
| ------- | ---------------- | --------- | -------- |
| title   | string           | -         | 标题文本 |
| value   | number \| string | -         | 统计数值 |
| desc    | string           | -         | 描述文本 |
| data    | ChartData[]      | []        | 图表数据 |
| type    | 'line' \| 'bar'  | 'line'    | 图表类型 |
| color   | string           | 'primary' | 主题颜色 |
| loading | boolean          | false     | 加载状态 |

#### ChartData 类型

```typescript
interface ChartData {
  label: string;
  value: number;
}
```

## 代码示例

### 基础用法

```vue
<template>
  <dux-stats-total-rate
    title="访问趋势"
    value="8,846"
    desc="总访问量"
    :data="[
      { label: '周一', value: 3200 },
      { label: '周二', value: 4500 },
      { label: '周三', value: 3800 },
      { label: '周四', value: 5000 },
      { label: '周五', value: 4200 },
      { label: '周六', value: 3600 },
      { label: '周日', value: 3000 },
    ]"
  />
</template>
```

### 柱状图

```vue
<template>
  <dux-stats-total-rate
    title="销售趋势"
    value="¥126,560"
    desc="总销售额"
    type="bar"
    color="success"
    :data="[
      { label: '1月', value: 12000 },
      { label: '2月', value: 15000 },
      { label: '3月', value: 13000 },
      { label: '4月', value: 18000 },
      { label: '5月', value: 16000 },
      { label: '6月', value: 14000 },
    ]"
  />
</template>
```

### 完整示例

```vue
<template>
  <div class="grid grid-cols-2 gap-4">
    <!-- 折线图 -->
    <dux-stats-total-rate
      title="访问趋势"
      value="8,846"
      desc="总访问量"
      :data="[
        { label: '周一', value: 3200 },
        { label: '周二', value: 4500 },
        { label: '周三', value: 3800 },
        { label: '周四', value: 5000 },
        { label: '周五', value: 4200 },
        { label: '周六', value: 3600 },
        { label: '周日', value: 3000 },
      ]"
    />

    <!-- 柱状图 -->
    <dux-stats-total-rate
      title="销售趋势"
      value="¥126,560"
      desc="总销售额"
      type="bar"
      color="success"
      :data="[
        { label: '1月', value: 12000 },
        { label: '2月', value: 15000 },
        { label: '3月', value: 13000 },
        { label: '4月', value: 18000 },
        { label: '5月', value: 16000 },
        { label: '6月', value: 14000 },
      ]"
    />

    <!-- 加载状态 -->
    <dux-stats-total-rate
      title="转化趋势"
      value="35%"
      desc="访问转化率"
      loading
    />
  </div>
</template>
```
