# 快捷操作组件

快捷操作组件用于展示一组快捷操作按钮，支持图标、标题和点击事件。

## 组件说明

### DuxStatsQuick

快捷操作组件，支持多个操作按钮的展示。

#### 属性

| 属性名 | 类型        | 默认值 | 说明         |
| ------ | ----------- | ------ | ------------ |
| data   | QuickItem[] | []     | 操作按钮列表 |
| col    | number      | 6      | 列数         |

#### QuickItem 类型

```typescript
interface QuickItem {
  icon: string;
  title: string;
  color?: "primary" | "info" | "success" | "warning" | "error";
  onClick?: () => void;
}
```

## 代码示例

### 基础用法

```vue
<template>
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
</template>

<script setup lang="ts">
const handleClick = (type: string) => {
  console.log("Click:", type);
};
</script>
```

### 自定义列数

```vue
<template>
  <dux-stats-quick
    :col="4"
    :data="[
      {
        title: '用户管理',
        icon: 'i-tabler:users',
      },
      {
        title: '订单管理',
        icon: 'i-tabler:shopping-cart',
      },
      {
        title: '商品管理',
        icon: 'i-tabler:box',
      },
      {
        title: '设置',
        icon: 'i-tabler:settings',
      },
    ]"
  />
</template>
```

### 完整示例

```vue
<template>
  <dux-stats-quick
    :data="[
      {
        title: '用户管理',
        icon: 'i-tabler:users',
        color: 'primary',
      },
      {
        title: '订单管理',
        icon: 'i-tabler:shopping-cart',
        color: 'info',
      },
      {
        title: '商品管理',
        icon: 'i-tabler:box',
        color: 'success',
      },
      {
        title: '库存管理',
        icon: 'i-tabler:package',
        color: 'warning',
      },
      {
        title: '系统设置',
        icon: 'i-tabler:settings',
        color: 'error',
      },
    ]"
  />
</template>
```

```

```
