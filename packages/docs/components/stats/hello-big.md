# 大型欢迎组件

大型欢迎组件用于展示欢迎信息和数据概览，支持标题、描述和数据列表的展示。

## 组件说明

### DuxStatsHelloBig

大型欢迎组件，支持标题、描述和数据列表的展示。

#### 属性

| 属性名 | 类型        | 默认值 | 说明     |
| ------ | ----------- | ------ | -------- |
| title  | string      | -      | 标题文本 |
| desc   | string      | -      | 描述文本 |
| data   | HelloItem[] | []     | 数据列表 |

#### HelloItem 类型

```typescript
interface HelloItem {
  label: string;
  value: string | number;
  icon: string;
  color?: string;
}
```

## 代码示例

### 基础用法

```vue
<template>
  <dux-stats-hello-big title="欢迎回来" desc="今天是个好日子，适合写代码" />
</template>
```

### 带数据列表

```vue
<template>
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
</template>
```

### 完整示例

```vue
<template>
  <dux-stats-hello-big
    title="早上好，管理员"
    desc="今天阳光明媚，祝您工作愉快"
    :data="[
      {
        label: '待处理订单',
        value: 10,
        icon: 'i-tabler:shopping-cart',
        color: 'primary',
      },
      {
        label: '新增用户',
        value: 25,
        icon: 'i-tabler:users',
        color: 'success',
      },
      {
        label: '系统消息',
        value: 5,
        icon: 'i-tabler:bell',
        color: 'warning',
      },
      {
        label: '待审核',
        value: 8,
        icon: 'i-tabler:clipboard',
        color: 'error',
      },
    ]"
  />
</template>
```
