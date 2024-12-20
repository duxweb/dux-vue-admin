# 标签统计卡片

标签统计卡片用于展示带有标签切换的数据统计信息，支持多个标签页和自定义内容。

## 组件说明

### DuxStatsTotalTab

标签统计卡片组件，支持标签切换和数据统计展示。

#### 属性

| 属性名  | 类型      | 默认值 | 说明     |
| ------- | --------- | ------ | -------- |
| title   | string    | -      | 标题文本 |
| tabs    | TabItem[] | []     | 标签列表 |
| loading | boolean   | false  | 加载状态 |

#### TabItem 类型

```typescript
interface TabItem {
  label: string;
  value: string;
  data: {
    value: number | string;
    desc?: string;
    trend?: "up" | "down" | "none";
    trendValue?: number | string;
  };
}
```

## 代码示例

### 基础用法

```vue
<template>
  <dux-stats-total-tab
    title="销售数据"
    :tabs="[
      {
        label: '今日',
        value: 'today',
        data: {
          value: '¥12,345',
          desc: '当日销售总额',
        },
      },
      {
        label: '本周',
        value: 'week',
        data: {
          value: '¥89,456',
          desc: '本周销售总额',
        },
      },
      {
        label: '本月',
        value: 'month',
        data: {
          value: '¥234,567',
          desc: '本月销售总额',
        },
      },
    ]"
  />
</template>
```

### 带趋势

```vue
<template>
  <dux-stats-total-tab
    title="访问数据"
    :tabs="[
      {
        label: '今日',
        value: 'today',
        data: {
          value: '1,234',
          desc: '当日访问量',
          trend: 'up',
          trendValue: '12%',
        },
      },
      {
        label: '本周',
        value: 'week',
        data: {
          value: '8,846',
          desc: '本周访问量',
          trend: 'down',
          trendValue: '5%',
        },
      },
      {
        label: '本月',
        value: 'month',
        data: {
          value: '23,456',
          desc: '本月访问量',
          trend: 'up',
          trendValue: '8%',
        },
      },
    ]"
  />
</template>
```

### 完整示例

```vue
<template>
  <div class="flex flex-col gap-4">
    <!-- 基础数据 -->
    <dux-stats-total-tab
      title="销售数据"
      :tabs="[
        {
          label: '今日',
          value: 'today',
          data: {
            value: '¥12,345',
            desc: '当日销售总额',
          },
        },
        {
          label: '本周',
          value: 'week',
          data: {
            value: '¥89,456',
            desc: '本周销售总额',
          },
        },
        {
          label: '本月',
          value: 'month',
          data: {
            value: '¥234,567',
            desc: '本月销售总额',
          },
        },
      ]"
    />

    <!-- 带趋势 -->
    <dux-stats-total-tab
      title="访问数据"
      :tabs="[
        {
          label: '今日',
          value: 'today',
          data: {
            value: '1,234',
            desc: '当日访问量',
            trend: 'up',
            trendValue: '12%',
          },
        },
        {
          label: '本周',
          value: 'week',
          data: {
            value: '8,846',
            desc: '本周访问量',
            trend: 'down',
            trendValue: '5%',
          },
        },
        {
          label: '本月',
          value: 'month',
          data: {
            value: '23,456',
            desc: '本月访问量',
            trend: 'up',
            trendValue: '8%',
          },
        },
      ]"
    />

    <!-- 加载状态 -->
    <dux-stats-total-tab title="加载示例" loading :tabs="[]" />
  </div>
</template>
```
