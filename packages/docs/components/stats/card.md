# 基础卡片组件

基础卡片组件是一个通用的卡片容器，用于展示标题和内容，支持自定义头部工具和扩展内容。

## 组件说明

### DuxStatsCard

基础卡片组件，支持标题、工具栏和扩展内容的展示。

#### 属性

| 属性名       | 类型   | 默认值 | 说明       |
| ------------ | ------ | ------ | ---------- |
| title        | string | -      | 标题文本   |
| headClass    | string | -      | 头部样式类 |
| contentClass | string | -      | 内容样式类 |

#### 插槽

| 名称    | 说明       |
| ------- | ---------- |
| tools   | 工具栏内容 |
| extend  | 扩展内容   |
| default | 主要内容   |

## 代码示例

### 基础用法

```vue
<template>
  <dux-stats-card title="基础卡片">
    <div>这是卡片内容</div>
  </dux-stats-card>
</template>
```

### 带工具栏

```vue
<template>
  <dux-stats-card title="带工具栏的卡片">
    <template #tools>
      <n-button size="small">刷新</n-button>
    </template>
    <div>这是卡片内容</div>
  </dux-stats-card>
</template>
```

### 完整示例

```vue
<template>
  <dux-stats-card title="完整示例" head-class="!py-6" content-class="!p-6">
    <template #tools>
      <n-button-group>
        <n-button size="small">编辑</n-button>
        <n-button size="small">删除</n-button>
      </n-button-group>
    </template>
    <template #extend>
      <n-tag>标签</n-tag>
    </template>
    <div class="flex flex-col gap-4">
      <div>主要内容区域</div>
      <div>支持任意内容</div>
    </div>
  </dux-stats-card>
</template>
```
