# 多管理端配置

Dux Vue Admin 支持配置多个管理端，每个管理端可以有独立的路由、菜单和权限配置。系统默认提供 `admin` 端，您可以根据需要添加更多的管理端，如 `store`、`agent` 等。

## 基础配置

在全局配置中，通过 `manage` 配置多个管理端：

```typescript
interface Config {
  manage: {
    admin: ManageConfig; // 管理员端
    store: ManageConfig; // 商户端
    agent: ManageConfig; // 代理端
    [key: string]: ManageConfig; // 其他自定义端
  };
}

interface ManageConfig {
  title: string; // 管理端标题
  apiPrefix: string; // API 前缀
  loginPath?: string; // 登录页路径
  homePath?: string; // 首页路径
  routers?: DuxRoute[]; // 路由配置
  userMenu?: UserMenu[]; // 用户菜单
}
```

配置示例：

```typescript
const config: Config = {
  apiUrl: import.meta.env.VITE_API_URL,
  manage: {
    // 管理员端配置
    admin: {
      title: "管理后台",
      apiPrefix: "admin",
      loginPath: "/login",
      homePath: "/dashboard",
      routers: adminRoutes,
      userMenu: [
        {
          label: "个人设置",
          path: "setting",
          icon: "i-tabler:settings",
        },
      ],
    },
    // 商户端配置
    store: {
      title: "商户中心",
      apiPrefix: "store",
      loginPath: "/store/login",
      homePath: "/store/dashboard",
      routers: storeRoutes,
      userMenu: [
        {
          label: "店铺设置",
          path: "store-setting",
          icon: "i-tabler:building-store",
        },
      ],
    },
  },
};
```

## 路由配置

每个管理端可以配置独立的路由系统：

```typescript
// admin 端路由
const adminRoutes: DuxRoute[] = [
  {
    label: "仪表盘",
    name: "dashboard",
    icon: "i-tabler:dashboard",
  },
  {
    label: "系统管理",
    name: "system",
    icon: "i-tabler:settings",
    children: [
      {
        label: "用户管理",
        name: "user",
        path: "user",
        component: () => import("./pages/user/index.vue"),
      },
    ],
  },
];

// store 端路由
const storeRoutes: DuxRoute[] = [
  {
    label: "店铺概况",
    name: "dashboard",
    icon: "i-tabler:dashboard",
  },
  {
    label: "商品管理",
    name: "product",
    icon: "i-tabler:package",
    children: [
      {
        label: "商品列表",
        name: "list",
        path: "list",
        component: () => import("./pages/product/list.vue"),
      },
    ],
  },
];
```

## 目录结构

推荐的多管理端目录结构：

```bash
src/
├── modules/           # 业务模块
│   ├── admin/        # 管理员端
│   │   ├── system/   # 系统模块
│   │   ├── content/  # 内容模块
│   │   └── index.ts  # 路由配置
│   └── store/        # 商户端
│       ├── product/  # 商品模块
│       ├── order/    # 订单模块
│       └── index.ts  # 路由配置
├── components/       # 公共组件
└── config/          # 配置文件
```

## 使用方式

### 1. 获取当前管理端

```typescript
import { useManageStore } from "@duxweb/dux-vue-admin";

const manage = useManageStore();

// 获取当前管理端名称
console.log(manage.name); // 'admin' 或 'store'

// 获取当前管理端配置
console.log(manage.config);
```

### 3. 路由使用

```typescript
import { useRouter } from "vue-router";

const router = useRouter();

// 跳转到指定管理端的路由
router.push("/store/dashboard");
router.push("/admin/system/user");
```

### 4. API 请求

```typescript
import { useClient } from "@duxweb/dux-vue-admin";

const client = useClient();

// 请求将自动添加当前管理端的 apiPrefix
// 例如在 store 端请求会变成 /api/store/product/list
await client.get("/product/list");
```

## 开发建议

1. **模块划分**

   - 按管理端划分业务模块
   - 提取公共组件和工具
   - 保持各端之间的独立性

2. **路由管理**

   - 路由名称避免冲突
   - 合理使用路由嵌套
   - 注意权限控制

3. **接口规范**

   - 统一 API 前缀
   - 区分不同端的接口
   - 处理跨端请求

4. **状态管理**
   - 独立管理各端状态
   - 合理共享公共状态
   - 注意数据隔离

## 示例代码

完整的多管理端配置示例：

```typescript
// config/manage.ts
export const manageConfig: Config = {
  manage: {
    // 管理员端
    admin: {
      title: "管理后台",
      apiPrefix: "admin",
      loginPath: "/login",
      homePath: "/dashboard",
      routers: adminRoutes,
      userMenu: [
        {
          label: "个人设置",
          path: "setting",
          icon: "i-tabler:settings",
        },
      ],
    },
    // 商户端
    store: {
      title: "商户中心",
      apiPrefix: "store",
      loginPath: "/store/login",
      homePath: "/store/dashboard",
      routers: storeRoutes,
      userMenu: [
        {
          label: "店铺设置",
          path: "store-setting",
          icon: "i-tabler:building-store",
        },
        {
          label: "安全设置",
          path: "security",
          icon: "i-tabler:shield-lock",
        },
      ],
    },
    // 代理端
    agent: {
      title: "代理后台",
      apiPrefix: "agent",
      loginPath: "/agent/login",
      homePath: "/agent/dashboard",
      routers: agentRoutes,
      userMenu: [
        {
          label: "代理设置",
          path: "agent-setting",
          icon: "i-tabler:users",
        },
      ],
    },
  },
};
```

## 更多资源

- [路由配置](./router.md)
- [权限控制](./auth.md)
- [数据请求](./request.md)
