# 多列统计卡片

多列统计卡片用于展示多个数据指标，支持多列布局和自定义样式。

## 组件说明

### DuxStatsTotalMulti

多列统计卡片组件，支持多个数据指标的展示。

#### 属性

| 属性名  | 类型       | 默认值 | 说明     |
| ------- | ---------- | ------ | -------- |
| title   | string     | -      | 标题文本 |
| data    | DataItem[] | []     | 数据列表 |
| col     | number     | 4      | 列数     |
| loading | boolean    | false  | 加载状态 |

#### DataItem 类型

```typescript
interface DataItem {
  label: string;
  value: number | string;
  desc?: string;
  color?: string;
  icon?: string;
}
```

## 代码示例

### 基础用法

```vue
<template>
  <dux-stats-total-multi
    title="数据概览"
    :data="[
      { label: '总用户', value: '1,234' },
      { label: '总订单', value: '456' },
      { label: '总销售额', value: '¥89,456' },
      { label: '转化率', value: '35%' },
    ]"
  />
</template>
```

### 带图标和描述

```vue
<template>
  <dux-stats-total-multi
    title="数据概览"
    :data="[
      {
        label: '总用户',
        value: '1,234',
        desc: '较上周增长 10%',
        icon: 'user',
        color: 'primary',
      },
      {
        label: '总订单',
        value: '456',
        desc: '较上周下降 5%',
        icon: 'shopping',
        color: 'warning',
      },
      {
        label: '总销售额',
        value: '¥89,456',
        desc: '较上周增长 15%',
        icon: 'money',
        color: 'success',
      },
      {
        label: '转化率',
        value: '35%',
        desc: '较上周持平',
        icon: 'chart',
        color: 'info',
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
    <dux-stats-total-multi
      title="基础数据"
      :data="[
        { label: '总用户', value: '1,234' },
        { label: '总订单', value: '456' },
        { label: '总销售额', value: '¥89,456' },
        { label: '转化率', value: '35%' },
      ]"
    />

    <!-- 带图标和描述 -->
    <dux-stats-total-multi
      title="详细数据"
      :data="[
        {
          label: '总用户',
          value: '1,234',
          desc: '较上周增长 10%',
          icon: 'user',
          color: 'primary',
        },
        {
          label: '总订单',
          value: '456',
          desc: '较上周下降 5%',
          icon: 'shopping',
          color: 'warning',
        },
        {
          label: '总销售额',
          value: '¥89,456',
          desc: '较上周增长 15%',
          icon: 'money',
          color: 'success',
        },
      ]"
      :col="3"
    />

    <!-- 加载状态 -->
    <dux-stats-total-multi title="加载示例" loading :data="[]" />
  </div>
</template>
```

## 注意事项

1. 列数会根据屏幕宽度自动调整，确保良好的显示效果
2. 图标需要使用系统内置的图标，请参考图标库文档
3. 颜色性支持系统预设的主题色：primary、success、warning、error、info
4. 加载状态会显示骨架屏动画
