# 操作统计卡片

操作统计卡片用于展示用户可以快速执行的操作，支持图标、标题、描述和自定义操作按钮。

## 组件说明

### DuxStatsAction

操作统计卡片组件，支持图标、标题、描述和操作按钮的显示。

#### 属性

| 属性名  | 类型     | 默认值    | 说明         |
| ------- | -------- | --------- | ------------ |
| icon    | string   | -         | 图标名称     |
| title   | string   | -         | 标题文本     |
| desc    | string   | -         | 描述文本     |
| actions | Action[] | []        | 操作按钮列表 |
| color   | string   | 'primary' | 主题颜色     |

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
  <dux-stats-action
    icon="plus"
    title="创建新内容"
    desc="快速创建新的内容"
    :actions="[
      {
        label: '立即创建',
        type: 'primary',
      },
    ]"
  />
</template>
```

### 自定义颜色

```vue
<template>
  <dux-stats-action
    icon="warning"
    title="系统提醒"
    desc="您有新的系统提醒"
    color="warning"
    :actions="[
      {
        label: '查看详情',
        type: 'primary',
      },
    ]"
  />
</template>
```

### 完整示例

```vue
<template>
  <div class="flex flex-col gap-4">
    <!-- 默认样式 -->
    <dux-stats-action
      icon="plus"
      title="创建内容"
      desc="快速创建新的内容"
      :actions="[
        {
          label: '立即创建',
          type: 'primary',
        },
      ]"
    />

    <!-- 警告样式 -->
    <dux-stats-action
      icon="warning"
      title="系统提醒"
      desc="您有新的系统提醒"
      color="warning"
      :actions="[
        {
          label: '查看详情',
          type: 'primary',
        },
      ]"
    />

    <!-- 多个操作按钮 -->
    <dux-stats-action
      icon="setting"
      title="系统设置"
      desc="管理系统配置"
      :actions="[
        {
          label: '基础设置',
          type: 'primary',
        },
        {
          label: '高级设置',
        },
      ]"
    />
  </div>
</template>
```

## 注意事项

1. 图标名称需要使用系统内置的图标，请参考图标库文档
2. 操作按钮建议不要超过 3 个，以保持良好的视觉效果
3. 按钮的 `onClick` 事件处理函数为可选项
4. 颜色属性支持系统预设的主题色：primary、success、warning、error
