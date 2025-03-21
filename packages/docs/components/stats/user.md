# 用户统计卡片

用户统计卡片用于展示用户的基本信息，包括头像、昵称、描述、角色等信息，并集成了实时时间显示功能。

## 组件说明

### DuxStatsUser

用户信息展示组件，支持头像、用户信息和实时时间的显示。

#### 属性

| 属性名   | 类型   | 默认值 | 说明         |
| -------- | ------ | ------ | ------------ |
| avatar   | string | -      | 用户头像 URL |
| nickname | string | -      | 用户昵称     |
| desc     | string | -      | 用户描述     |
| role     | string | -      | 用户角色     |
| local    | string | -      | 本地化设置   |

## 代码示例

### 基础用法

```vue
<template>
  <dux-stats-user nickname="张三" desc="系统管理员" role="技术部门" />
</template>
```

### 带头像的用户卡片

```vue
<template>
  <dux-stats-user
    avatar="https://example.com/avatar.jpg"
    nickname="张三"
    desc="系统管理员"
    role="技术部门"
  />
</template>
```

### 完整示例

```vue
<template>
  <div class="flex flex-col gap-4">
    <!-- 默认样式 -->
    <dux-stats-user nickname="张三" desc="系统管理员" role="技术部门" />

    <!-- 带头像 -->
    <dux-stats-user
      avatar="https://example.com/avatar.jpg"
      nickname="李四"
      desc="产品经理"
      role="产品部门"
    />

    <!-- 自定义本地化 -->
    <dux-stats-user
      nickname="王五"
      desc="销售经理"
      role="销售部门"
      local="en-US"
    />
  </div>
</template>
```
