# 基础统计卡片

基础统计卡片用于展示数据统计信息，支持标题、数值、描述、趋势等信息的展示。

## 组件说明

### DuxStatsTotalCard

基础统计卡片组件，支持数值统计和趋势展示。

#### 属性

| 属性名     | 类型                     | 默认值    | 说明     |
| ---------- | ------------------------ | --------- | -------- |
| title      | string                   | -         | 标题文本 |
| value      | number \| string         | -         | 统计数值 |
| desc       | string                   | -         | 描述文本 |
| trend      | 'up' \| 'down' \| 'none' | 'none'    | 趋势方向 |
| trendValue | number \| string         | -         | 趋势数值 |
| trendDesc  | string                   | -         | 趋势描述 |
| color      | string                   | 'primary' | 主题颜色 |
| loading    | boolean                  | false     | 加载状态 |

## 代码示例

### 基础用法

```vue
<template>
  <dux-stats-total-card title="总销售额" value="¥126,560" desc="当前销售总额" />
</template>
```

### 带趋势

```vue
<template>
  <dux-stats-total-card
    title="访问量"
    value="8,846"
    desc="总访问量"
    trend="up"
    trendValue="12%"
    trendDesc="周同比"
  />
</template>
```

### 完整示例

```vue
<template>
  <div class="grid grid-cols-4 gap-4">
    <!-- 基础数据 -->
    <dux-stats-total-card
      title="总销售额"
      value="¥126,560"
      desc="当前销售总额"
    />

    <!-- 上升趋势 -->
    <dux-stats-total-card
      title="访问量"
      value="8,846"
      desc="总访问量"
      trend="up"
      trendValue="12%"
      trendDesc="周同比"
      color="success"
    />

    <!-- 下降趋势 -->
    <dux-stats-total-card
      title="订单量"
      value="1,286"
      desc="总订单量"
      trend="down"
      trendValue="8%"
      trendDesc="日环比"
      color="error"
    />

    <!-- 加载状态 -->
    <dux-stats-total-card
      title="转化率"
      value="35%"
      desc="访问转化率"
      loading
    />
  </div>
</template>
```

## 注意事项

1. 数值支持自动格式化，可以传入数字或字符串
2. 趋势方向会影响图标和颜色的显示
3. 建议在网格布局中使用，以保持统一的展示效果
4. 加载状态会显示骨架屏动画

```

```
