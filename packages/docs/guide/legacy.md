# 传统模式

传统模式是一种常规的前后端分离开发方式，开发和调试可以独立进行。本文档将帮助您快速入门并了解项目架构。

## 开发环境

- Node.js >= 21.0.0
- bun >= 1.x

## 快速开始

### 1. 创建项目

```bash
# 创建项目
npx degit github:duxweb/dux-vue-admin-template/packages/legacy my-project

# 进入项目目录
cd my-project

# 安装依赖
bun install

# 启动项目
bun dev
```

### 2. 项目配置

修改 `vite.config.ts` 文件，配置开发环境：

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://your-api-url",
        changeOrigin: true,
      },
    },
  },
});
```

## 目录结构

推荐的项目目录结构如下：

```bash
my-project/
├── src/                    # 源代码目录
│   ├── components/         # 公共组件
│   │   ├── layout/        # 布局组件
│   │   └── common/        # 通用组件
│   ├── config/            # 配置文件
│   │   ├── route.ts      # 路由配置
│   │   └── app.ts        # 应用配置
│   ├── modules/           # 业务模块
│   │   ├── manage/       # 管理模块
│   │   │   ├── role/     # 角色管理
│   │   │   ├── user/     # 用户管理
│   │   │   └── index.ts  # 模块配置
│   │   └── content/      # 内容模块
│   │       ├── article/  # 文章管理
│   │       ├── category/ # 分类管理
│   │       └── index.ts  # 模块配置
│   ├── pages/            # 页面组件
│   ├── App.vue           # 根组件
│   └── main.ts           # 入口文件
├── public/               # 静态资源
├── index.html           # HTML 入口
├── package.json         # 项目配置
└── vite.config.ts       # Vite 配置
```

## 模块开发

### 1. 模块结构

每个业务模块都是一个独立的目录，包含以下结构：

```bash
modules/
└── manage/              # 管理模块
    ├── role/           # 角色管理
    │   ├── api.ts      # API 接口
    │   ├── list.vue    # 列表页面
    │   └── form.vue    # 表单页面
    ├── user/           # 用户管理
    │   ├── api.ts      # API 接口
    │   ├── list.vue    # 列表页面
    │   └── form.vue    # 表单页面
    └── index.ts        # 模块配置
```

### 2. 模块配置

在模块的 `index.ts` 中配置路由和菜单：

```ts
import type { DuxRoute } from "@duxweb/dux-vue-admin";

export const routes: DuxRoute[] = [
  {
    label: "系统管理",
    name: "manage",
    icon: "i-tabler:settings",
  },
  {
    label: "用户管理",
    name: "user",
    path: "user",
    parent: "manage",
    component: () => import("./user/list.vue"),
  },
  {
    label: "角色管理",
    name: "role",
    path: "role",
    parent: "manage",
    component: () => import("./role/list.vue"),
  },
];
```

### 3. 页面开发

创建列表页面示例 (`user/list.vue`)：

```vue
<template>
  <DuxTable :columns="columns" :api="api.list">
    <template #toolbar>
      <n-button @click="handleCreate">新建用户</n-button>
    </template>
  </DuxTable>
</template>

<script setup lang="ts">
import { api } from "./api";
import type { TableColumns } from "@duxweb/dux-vue-admin";

const columns: TableColumns = [
  {
    title: "用户名",
    key: "username",
  },
  {
    title: "状态",
    key: "status",
  },
];

const handleCreate = () => {
  // 处理创建逻辑
};
</script>
```

## 应用配置

在 `src/main.ts` 中配置应用：

```ts
import type { Config } from "@duxweb/dux-vue-admin";
import { createDux } from "@duxweb/dux-vue-admin";
import { createApp } from "vue";
import App from "./App.vue";
import { routes } from "./config/route";

const app = createApp(App);

const config: Config = {
  apiUrl: import.meta.env.VITE_API_URL,
  manage: {
    admin: {
      title: "管理系统",
      apiPrefix: "api",
      routers: routes,
      userMenu: [
        {
          label: "个人设置",
          path: "setting",
          icon: "i-tabler:settings",
        },
      ],
    },
  },
};

app.use(createDux(config));
app.mount("#app");
```

## 开发建议

1. **模块化开发**

   - 每个业务模块保持独立
   - 通用功能放在 `components` 目录
   - 配置文件集中在 `config` 目录

2. **路由管理**

   - 按模块组织路由配置
   - 使用嵌套路由实现功能分组
   - 路由名称保持唯一性

3. **组件复用**

   - 抽取通用的业务组件
   - 使用组合式 API 封装逻辑
   - 保持组件的单一职责

4. **API 管理**
   - 按模块组织 API 接口
   - 使用 TypeScript 定义接口类型
   - 统一处理请求和响应

## 更多资源

- [路由配置](../dev/router.md)
- [数据请求](../dev/request.md)
- [权限控制](../dev/auth.md)
