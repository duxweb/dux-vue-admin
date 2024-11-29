# 传统模式

传统模式下为常规的前后端开发方式，开发调试均独立进行，example 目录下为完整示例。


## 开发环境
- Node.js >= 21.0.0
- bun >= 1.x
- Vue 3.x
- TypeScript 5.x
- Vite 5.x


## 初始化

```bash
创建项目
npx degit github:duxweb/dux-vue-admin-template my-project
进入项目目录
cd my-project
安装依赖
bun install
启动项目
bun run dev
```


## 目录结构

手动创建项目时，需要手动创建以下目录结构：

```bash
project/
├── src/ # 源代码
│ │ ├── components/ # 组件
│ │ ├── config/ # 配置
│ │ ├── router/ # 路由配置
│ │ ├── pages/ # 页面
│ │ ├── App.vue # 根组件
│ │ └── main.ts # 入口文件
│ ├── public/ # 静态资源
│ ├── index.html # HTML 模板
│ ├── eslint.config.js # ESLint 配置
│ ├── package.json # 项目配置
│ ├── tsconfig.json # TypeScript 配置
│ └── vite.config.ts # Vite 配置
```

### 入口文件

在 `src/main.ts` 中引入了 `@duxweb/dux-vue-admin` 并创建了应用实例：

```ts
import type { Config } from '@duxweb/dux-vue-admin'
import { createDux } from '@duxweb/dux-vue-admin'
import { createApp } from 'vue'
import App from './App.vue'
import { route } from './router/route'
import '@duxweb/dux-vue-admin/style.css'

const app = createApp(App)

const config: Config = {
  apiUrl: 'https://mock.dux.plus',
  manage: {
    admin: {
      title: '中后台管理系统',
      apiPrefix: 'api',
      routers: route,
      userMenu: [
        {
          label: '个人资料',
          path: 'setting',
          icon: 'i-tabler:settings',
        },
      ],
    },
  },
}

app.use(createDux(config))

app.mount('#app')

```

## 根组件

在 `src/App.vue` 中引入了 `@duxweb/dux-vue-admin` 的 `DuxApp` 根组件：

```vue
<template>
  <DuxApp />
</template>
```

## 路由配置

在 `src/router/index.ts` 中来配置路由，路由菜单为三合一处理：

```ts
import type { DuxRoute } from '@duxweb/dux-vue-admin'

const routes: DuxRoute[] = [
  {
    label: '仪表盘', // 菜单名称
    name: 'home', // 路由名称
    icon: 'i-tabler:dashboard', // 菜单图标
  },
  {
    label: '首页', // 菜单名称
    name: 'index', // 路由/权限名
    path: 'index', // 路由路径
    parent: 'home', // 父级菜单名称
    component: () => import('../../pages/home/index.vue'), // 组件路径
  },
]
```

## 框架配置

在 `createDux` 函数中来配置框架，具体配置项请参考 [配置](./config.md) 章节。


## 页面组件

在 `src/pages` 目录下创建页面组件，组件请参考 [页面组件](./page.md) 章节。


