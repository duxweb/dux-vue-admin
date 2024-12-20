# 多语言配置

Dux Vue Admin 使用 [vue-i18n](https://vue-i18n.intlify.dev/) 实现多语言支持，默认提供中文和英文两种语言。

## 基础配置

### 1. 配置语言

在全局配置中设置默认语言：

```typescript
interface Config {
  lang?: "en-US" | "zh-CN"; // 默认语言
}

const config = {
  lang: "zh-CN",
};
```

### 2. 语言包

系统内置了两个语言包：

- `en-US`: 英文
- `zh-CN`: 中文

语言包结构：

```typescript
{
  common: {
    home: '首页',
    menu: '菜单',
    search: '搜索'
    // ...
  },
  pages: {
    login: {
      // ...
    },
    // ...
  },
  // ...
}
```

## 使用方法

### 1. 在组件中使用

```typescript
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// 使用翻译
t("common.home"); // 首页
t("common.menu"); // 菜单

// 带参数的翻译
t("message.error", { content: "错误信息" });
```

### 2. 在模板中使用

```vue
<template>
  <div>
    <!-- 基础翻译 -->
    {{ t("common.home") }}

    <!-- 带参数翻译 -->
    {{ t("message.error", { content: "错误信息" }) }}
  </div>
</template>
```

### 3. 切换语言

系统提供了语言切换的方法：

```typescript
import { setLanguage } from "@duxweb/dux-vue-admin";

// 切换到英文
setLanguage("en-US");

// 切换到中文
setLanguage("zh-CN");
```

## 多语言组件

### 1. 语言切换组件

系统提供了一个内置的语言切换组件：

```vue
<template>
  <DuxLocale
    v-model:value="translations"
    :langs="[
      { name: 'en-US', label: 'English' },
      { name: 'zh-CN', label: '中文' },
    ]"
    field="title"
  >
    <n-input v-model:value="defaultValue" />
  </DuxLocale>
</template>

<script setup>
import { ref } from "vue";

const translations = ref({
  "en-US": {
    title: "Hello",
  },
  "zh-CN": {
    title: "你好",
  },
});
const defaultValue = ref("");
</script>
```

### 2. 组件属性

```typescript
interface Props {
  value: object; // 多语言数据对象
  langs: {
    // 语言配置
    name: string; // 语言标识
    label: string; // 语言名称
  }[];
  field: string; // 字段名
}
```

## 内置翻译

系统内置了以下常用的翻译：

### 1. 通用翻译

```typescript
{
  common: {
    home: '首页',
    menu: '菜单',
    search: '搜索',
    logout: '退出登录',
    admin: '管理员',
    list: '列表',
    form: '表单'
  }
}
```

### 2. 页面翻译

```typescript
{
  pages: {
    login: {
      placeholder: {
        username: '请输入账号',
        password: '请输入密码'
      },
      buttons: {
        login: '登录'
      }
    },
    404: {
      title: '页面不存在',
      desc: '抱歉，您访问的页面不存在'
    }
    // ...
  }
}
```

### 3. 按钮翻译

```typescript
{
  buttons: {
    list: '列表',
    create: '创建',
    save: '保存',
    delete: '删除',
    edit: '编辑',
    cancel: '取消',
    confirm: '确定'
    // ...
  }
}
```

### 4. 消息翻译

```typescript
{
  message: {
    success: '成功',
    error: '错误：{content}',
    requestSuccess: '提交成功',
    requestError: '请求失败',
    validateError: '验证失败'
  }
}
```

## 扩展语言包

如果需要扩展或覆盖现有的语言包，可以使用以下方法：

```typescript
import { i18n } from "@duxweb/dux-vue-admin";

// 添加新的语言
i18n.global.setLocaleMessage("ja-JP", {
  common: {
    home: "ホーム",
    // ...
  },
});

// 扩展现有语言
i18n.global.mergeLocaleMessage("zh-CN", {
  custom: {
    title: "自定义标题",
  },
});
```

## 变量使用

### 1. 基础变量

在语言包中定义带变量的文本：

```typescript
{
  "message": {
    "welcome": "你好，{name}",
    "count": "共有 {count} 条记录",
    "status": "当前状态：{status}"
  }
}
```

使用方式：

```typescript
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// 单个变量
t("message.welcome", { name: "张三" }); // 输出：你好，张三

// 多个变量
t("message.status", {
  count: 100,
  status: "正常",
});
```

### 2. 复数使用

在语言包中定义复数形式：

```typescript
{
  "items": {
    "apple": "没有苹果 | 1个苹果 | {count}个苹果"
  }
}
```

使用方式：

```typescript
// 复数形式
t("items.apple", 0); // 输出：没有苹果
t("items.apple", 1); // 输出：1个苹果
t("items.apple", { count: 10 }); // 输出：10个苹果
```

### 3. 日期和数字格式化

```typescript
import { useI18n } from "vue-i18n";

const { n, d } = useI18n();

// 数字格式化
n(100000); // 输出：100,000
n(100000, "currency"); // 输出：¥100,000.00 或 $100,000.00

// 日期格式化
d(new Date(), "short"); // 输出：2024/1/1
d(new Date(), "long"); // 输出：2024年1月1日
```

### 4. HTML 内容

在语言包中定义带 HTML 的文本：

```typescript
{
  "message": {
    "tip": "点击<a href='{url}'>这里</a>查看详情",
    "status": "当前状态：<span class='status'>{status}</span>"
  }
}
```

使用方式：

```vue
<template>
  <!-- 使用 v-html 渲染 HTML -->
  <div v-html="t('message.tip', { url: 'https://example.com' })"></div>

  <!-- 使用组件渲染 HTML -->
  <i18n-t keypath="message.status" tag="div">
    <template #status>
      <span class="status">{{ status }}</span>
    </template>
  </i18n-t>
</template>
```

### 5. 条件判断

在语言包中定义条件文本：

```typescript
{
  "status": {
    "message": "{status === 'success' ? '成功' : '失败'}"
  }
}
```

使用方式：

```typescript
// 条件判断
t("status.message", { status: "success" }); // 输出：成功
t("status.message", { status: "error" }); // 输出：失败
```

### 6. 嵌套翻译

在语言包中定义嵌套的文本：

```typescript
{
  "nested": {
    "parent": "父级 {child}",
    "child": "子级 {name}"
  }
}
```

使用方式：

```typescript
// 嵌套翻译
const child = t("nested.child", { name: "测试" });
t("nested.parent", { child }); // 输出：父级 子级 测试
```
