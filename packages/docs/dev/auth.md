# 登录与权限

Dux Vue Admin 提供了完整的登录认证和权限控制系统。

## 用户状态管理

系统使用 Pinia 进行用户状态管理，提供了以下接口：

```typescript
import { useManageStore } from "@duxweb/dux-vue-admin";

const manage = useManageStore();

// 获取用户信息
const user = manage.getUser();

// 登录
manage.login({
  token: "xxx",
  info: {
    username: "admin",
    nickname: "Admin",
  },
  permission: {
    "user.list": true,
  },
});

// 更新用户信息
manage.update({
  token: "xxx",
  info: {
    username: "admin",
    nickname: "Admin",
  },
});

// 退出登录
manage.logout();
```

### 用户数据结构

```typescript
interface UserState {
  raw?: Record<string, any>; // 原始数据
  token?: string; // 用户令牌
  id?: number; // 用户ID
  info?: Record<string, any>; // 用户信息
  permission?: Record<string, boolean>; // 权限数据
}
```

## 登录流程

### 1. 基础登录

```typescript
import { useClient, useResource } from "@duxweb/dux-vue-admin";

const client = useClient();
const resource = useResource();

// 发送登录请求
client
  .post({
    url: resource.loginUrl,
    data: {
      username: "admin",
      password: "123456",
    },
  })
  .then((res) => {
    // 保存用户信息
    manage.login(res.data);
  });
```

### 2. 验证码登录

系统支持图形验证码登录：

```typescript
import { useClient, useResource } from "@duxweb/dux-vue-admin";

const client = useClient();
const resource = useResource();

// 获取验证码
const getCaptcha = () => {
  client
    .get({
      url: resource.captchaUrl,
    })
    .then((res) => {
      // 显示验证码图片
      captchaData.image = res.data.image;
    });
};

// 验证验证码
const verifyCaptcha = () => {
  client.post({
    url: resource.verifyUrl,
    data: {
      code: captchaData.code,
    },
  });
};
```

## 权限控制

### 1. 路由权限

系统会自动处理路由权限，未登录用户会被重定向到登录页，无权限用户会被重定向到 403 页面：

```typescript
// 路由守卫中的权限判断
if (!user && to.name !== "login") {
  return next({ path: `/${manage}/login`, replace: true });
}

if (!can(to.name) && to.name !== "403") {
  return next({ path: `/${manage}/403`, replace: true });
}
```

### 2. 权限判断

使用 `usePermission` hook 进行权限判断：

```typescript
import { usePermission } from "@duxweb/dux-vue-admin";

const { can, getData } = usePermission();

// 判断是否有权限
if (can("user.list")) {
  // 有权限
}

// 获取所有权限数据
const permissions = getData();
```

### 3. 组件权限控制

在模板中使用 `v-permission` 指令控制组件显示：

```vue
<template>
  <!-- 单个权限控制 -->
  <button v-permission="'user.add'">添加用户</button>

  <!-- 多个权限控制（满足任一权限） -->
  <button v-permission="['user.add', 'user.edit']">操作</button>
</template>
```

## 配置说明

在 `config` 中可以配置登录相关参数：

```typescript
interface ConfigManage {
  title: string; // 标题
  register?: boolean; // 是否开启注册(预留，未实现)
  forgotPassword?: boolean; // 是否开启忘记密码(预留，未实现)
  updatePassword?: boolean; // 是否开启修改密码(预留，未实现)
  apiPrefix?: string; // API 前缀
  routers?: DuxRoute[]; // 本地路由配置
}

interface ConfigApiConfig {
  login: string; // 登录接口
  logout?: string; // 退出接口
  check?: string; // 检查登录状态接口
  captcha?: string; // 验证码接口
  verify?: string; // 验证接口
  router?: string; // 路由接口
}
```

## 登录界面

系统已经封装了一个完整的登录界面，无需额外开发。登录界面包含以下功能：

- 用户名密码登录
- 图形验证码
- 记住密码
- 主题切换
- 多语言切换

### 登录界面配置

在 `config` 中可以配置登录界面的样式和功能：

```typescript
interface Config {
  // 登录界面配置
  logo?: string; // Logo 图片
  darkLogo?: string; // 暗黑模式 Logo
  loginBanner?: string; // 登录页横幅图片
  copyright?: string; // 版权信息
  captcha?: boolean; // 是否启用验证码
  lang?: "en-US" | "zh-CN"; // 默认语言
}

interface ConfigManage {
  title: string; // 系统标题
  register?: boolean; // 是否开启注册功能
  forgotPassword?: boolean; // 是否开启忘记密码功能
  updatePassword?: boolean; // 是否开启修改密码功能
}
```

### 登录界面示例

```typescript
const config = {
  // 基础配置
  logo: "/logo.png",
  darkLogo: "/logo-dark.png",
  loginBanner: "/login-banner.jpg",
  copyright: "© 2024 Company",
  captcha: true,
  lang: "zh-CN",

  // 管理端配置
  manage: {
    admin: {
      title: "管理系统",
      register: true,
      forgotPassword: true,
      updatePassword: true,
    },
  },
};
```

### 登录界面路由

系统会自动注册以下登录相关路由：

```typescript
{
  path: '/admin/login',      // 登录页面
  path: '/admin/register',   // 注册页面（需开启 register）
  path: '/admin/forgot',     // 忘记密码（需开启 forgotPassword）
  path: '/admin/password',   // 修改密码（需开启 updatePassword）
}
```

### 自定义登录界面

如果需要自定义登录界面，可以通过以下方式：

1. 在路由配置中覆盖登录页面组件：

```typescript
const routes = [
  {
    path: "login",
    component: () => import("./custom-login.vue"),
  },
];
```

2. 在自定义组件中使用登录相关 hooks：

```typescript
import { useClient, useResource, useManageStore } from "@duxweb/dux-vue-admin";

const client = useClient();
const resource = useResource();
const manage = useManageStore();

// 处理登录
const handleLogin = async () => {
  const res = await client.post({
    url: resource.loginUrl,
    data: {
      username,
      password,
    },
  });
  // 保存登录状态
  manage.login(res.data);
  // 跳转到首页
  router.push(resource.getIndexPath());
};
```
