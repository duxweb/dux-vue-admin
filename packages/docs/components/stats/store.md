# 店铺统计卡片

店铺统计卡片用于展示店铺的基本信息，包括店铺名称、描述、状态等信息，并支持自定义操作按钮。

## 组件说明

### DuxStatsStore

店铺信息展示组件，支持店铺基本信息和操作按钮的显示。

#### 属性

| 属性名     | 类型                              | 默认值    | 说明         |
| ---------- | --------------------------------- | --------- | ------------ |
| name       | string                            | -         | 店铺名称     |
| desc       | string                            | -         | 店铺描述     |
| status     | 'success' \| 'warning' \| 'error' | 'success' | 店铺状态     |
| statusText | string                            | -         | 状态文本     |
| actions    | Action[]                          | []        | 操作按钮列表 |

#### Action 类型

```typescript
interface Action {
  label: string;
  type?: "primary" | "default";
  onClick?: () => void;
}
```

## 代码示例

### 基础用法

```vue
<template>
  <dux-stats-store
    name="示例店铺"
    desc="这是一个示例店铺"
    status="success"
    statusText="正常营业"
  />
</template>
```

### 带操作按钮

```vue
<template>
  <dux-stats-store
    name="示例店铺"
    desc="这是一个示例店铺"
    status="success"
    statusText="正常营业"
    :actions="[
      {
        label: '查看详情',
        type: 'primary',
        onClick: () => console.log('查看详情'),
      },
      {
        label: '编辑信息',
        onClick: () => console.log('编辑信息'),
      },
    ]"
  />
</template>
```

### 完整示例

```vue
<template>
  <div class="flex flex-col gap-4">
    <!-- 正常状态 -->
    <dux-stats-store
      name="正常店铺"
      desc="这是一个正常营业的店铺"
      status="success"
      statusText="正常营业"
      :actions="[
        {
          label: '查看详情',
          type: 'primary',
        },
      ]"
    />

    <!-- 警告状态 -->
    <dux-stats-store
      name="警告店铺"
      desc="这是一个需要注意的店铺"
      status="warning"
      statusText="即将到期"
      :actions="[
        {
          label: '续费',
          type: 'primary',
        },
      ]"
    />

    <!-- 错误状态 -->
    <dux-stats-store
      name="异常店铺"
      desc="这是一个异常的店铺"
      status="error"
      statusText="已停业"
      :actions="[
        {
          label: '重新开业',
          type: 'primary',
        },
      ]"
    />
  </div>
</template>
```
