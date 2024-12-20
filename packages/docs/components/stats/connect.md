# 连接状态组件

连接状态组件用于展示系统连接状态，包括标题、描述、数值等信息。

## 组件说明

### DuxStatsConnect

连接状态组件，支持标题、描述和数值的展示。

#### 属性

| 属性名 | 类型   | 默认值 | 说明       |
| ------ | ------ | ------ | ---------- |
| title  | string | -      | 标题文本   |
| desc   | string | -      | 描述文本   |
| value  | number | -      | 数值       |
| local  | string | -      | 本地化设置 |

## 代码示例

### 基础用法

```vue
<template>
  <dux-stats-connect title="系统连接" desc="当前系统连接状态" :value="100" />
</template>
```

### 自定义内容

```vue
<template>
  <dux-stats-connect title="API 连接" desc="API 服务连接状态" :value="85">
    <div class="flex gap-2">
      <n-tag type="success">正常</n-tag>
      <n-tag type="warning">延迟: 200ms</n-tag>
    </div>
  </dux-stats-connect>
</template>
```

### 完整示例

```vue
<template>
  <div class="flex flex-col gap-4">
    <!-- 基础状态 -->
    <dux-stats-connect title="系统连接" desc="当前系统连接状态" :value="100">
      <n-tag type="success">正常</n-tag>
    </dux-stats-connect>

    <!-- API状态 -->
    <dux-stats-connect title="API 连接" desc="API 服务连接状态" :value="85">
      <div class="flex gap-2">
        <n-tag type="success">正常</n-tag>
        <n-tag type="warning">延迟: 200ms</n-tag>
      </div>
    </dux-stats-connect>

    <!-- 数据库状态 -->
    <dux-stats-connect title="数据库连接" desc="数据库服务连接状态" :value="60">
      <div class="flex gap-2">
        <n-tag type="error">异常</n-tag>
        <n-tag type="warning">延迟: 500ms</n-tag>
      </div>
    </dux-stats-connect>
  </div>
</template>
```
