# 路由配置

Dux Vue Admin 的路由系统支持本地路由和异步路由两种配置方式，提供了灵活的路由管理机制。

## 路由对象结构

路由对象（DuxRoute）包含以下属性：

```ts
interface DuxRoute {
  label?: string; // 菜单名称
  name: string; // 路由名称（必填）
  path?: string; // 路由路径
  icon?: string; // 图标
  sort?: number; // 排序
  parent?: string; // 父级路由名称
  hidden?: boolean; // 是否隐藏
  loader?: string; // Vue 路径（用于异步加载）
  component?: () => any; // 组件（本地路由使用）
  meta?: Record<string, any>; // 元数据
}
```

## 路由配置方式

### 本地路由配置

本地路由直接在项目中定义，适用于静态路由场景。

```ts
// config/route.ts
export const route = [
  {
    label: "首页",
    name: "home",
    icon: "i-tabler:dashboard",
  },
  {
    label: "工作台",
    name: "index",
    path: "index",
    parent: "home",
    component: () => import("../pages/home/work.vue"),
  },
];
```

### 异步路由配置

异步路由通过 API 动态获取，支持后端动态生成路由配置，系统登录后会根据配置的获取 api 获取路由配置。

```ts
[
  {
    icon: "i-tabler:home",
    label: "首页",
    loader: "system/total/index",
    name: "index",
    path: "system/index",
    sort: 0,
    hidden: false,
  },
];
```

## 特殊路由类型

### 嵌入式页面

用于在系统内嵌入外部页面：

```json
{
  "label": "文档",
  "name": "iframe.docs",
  "path": "iframe/docs",
  "icon": "i-tabler:book",
  "meta": {
    "src": "https://vue-docs.dux.plus/"
  }
}
```

### 外部链接

用于跳转到外部网站：

```json
{
  "label": "外部链接",
  "name": "link.external",
  "path": "link/external",
  "icon": "i-tabler:external-link",
  "meta": {
    "url": "https://example.com"
  }
}
```

## 路由注册流程

1. 系统启动时，首先注册本地路由配置
2. 用户登录后，如果启用了异步路由，会请求后端获取动态路由配置
3. 将获取到的异步路由注册到路由系统中
4. 路由注册完成后，系统会自动跳转到默认首页

## 权限控制

路由系统集成了权限控制机制：
未登录用户会被重定向到登录页
访问未授权路由会重定向到 403 页面
可以通过 hidden 属性控制路由在菜单中的显示

## 路由钩子

系统提供了以下路由钩子：

1. 路由进入前：处理登录检查、权限验证等
2. 路由进入后：更新页面标题、结束加载动画等

## 注意事项

1. 路由名称（name）必须唯一
2. 异步路由需要配置 loader 属性指定 Vue 组件路径 (随后由基座请求 sfc vue 文件)
3. 本地路由需要配置 component 属性指定组件
4. 建议使用 sort 属性控制菜单顺序
5. 使用 parent 属性构建多级菜单结构
