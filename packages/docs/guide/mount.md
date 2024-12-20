# 基座模式

基座模式是一种将前端框架与后端深度集成的开发方式。在这种模式下，前端基础框架代码会被编译为静态资源，然后嵌入到后端模板中，页面内容由后端动态提供。这种模式特别适合需要深度定制和动态化的企业级应用。

## 开发环境

- Node.js >= 21.0.0
- bun >= 1.x

## 快速开始

### 1. 创建项目

```bash
# 创建基座项目
npx degit github:duxweb/dux-vue-admin-template/packages/mount web

# 进入项目目录
cd web

# 安装依赖
bun install

# 编译基座
bun run build
```

### 2. 项目配置

修改 `vite.config.ts` 文件，配置编译输出：

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: "/static/", // 静态资源基础路径
  build: {
    outDir: "../public/static", // 输出目录
    manifest: true, // 生成 manifest.json
    rollupOptions: {
      input: {
        main: "src/main.ts",
      },
    },
  },
});
```

## 项目结构

### 1. 源码结构

```bash
web/
├── src/                    # 源代码目录
│   ├── components/         # 公共组件
│   │   ├── layout/        # 布局组件
│   │   └── common/        # 通用组件
│   ├── config/            # 配置文件
│   │   └── app.ts        # 应用配置
│   ├── App.vue            # 根组件
│   └── main.ts            # 入口文件
├── public/                # 静态资源
├── index.html            # HTML 入口
└── vite.config.ts        # Vite 配置
```

### 2. 编译输出

编译后会在指定目录生成以下文件：

```bash
public/static/
├── assets/               # 静态资源
│   ├── main.[hash].js    # 主程序
│   └── main.[hash].css   # 样式文件
└── .vite/
    └── manifest.json     # 资源清单
```

## 后端集成

### 1. 资源清单

`manifest.json` 文件包含了编译后的资源映射信息：

```json
{
  "src/main.ts": {
    "file": "assets/main-[hash].js",
    "css": ["assets/main-[hash].css"],
    "imports": [],
    "isEntry": true
  }
}
```

### 2. 模板集成

在后端模板中引入编译后的资源：

::: code-group

```php [PHP]
<?php
class AssetManager {
    private $manifestPath;

    public function __construct($manifestPath) {
        $this->manifestPath = $manifestPath;
    }

    public function getAssets() {
        $manifest = json_decode(file_get_contents($this->manifestPath), true);
        $mainAsset = $manifest['src/main.ts'];

        return [
            'js' => '/static/' . $mainAsset['file'],
            'css' => array_map(fn($css) => '/static/' . $css, $mainAsset['css'] ?? [])
        ];
    }
}

// 使用示例
$assets = (new AssetManager('public/static/.vite/manifest.json'))->getAssets();
```

```html [模板]
<!DOCTYPE html>
<html>
  <head>
    <?php foreach($assets['css'] as $css): ?>
    <link rel="stylesheet" href="<?php echo $css; ?>" />
    <?php endforeach; ?>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="<?php echo $assets['js']; ?>"></script>
  </body>
</html>
```

:::

## 动态路由

### 1. 路由配置

后端需要提供统一的路由配置接口，返回 JSON 格式的路由数据：

```typescript
interface RouteItem {
  name: string; // 路由名称
  path: string; // 路由路径
  label: string; // 菜单名称
  icon?: string; // 图标
  hidden?: boolean; // 是否隐藏
  parent?: string; // 父级路由
  loader?: string; // Vue 组件路径
  sort?: number; // 排序
  meta?: {
    // 元数据
    src?: string; // 嵌入页面 URL
    url?: string; // 外部链接
  };
}
```

### 2. 路由类型

系统支持以下几种路由类型：

#### 目录路由

```json
{
  "name": "system",
  "path": "system",
  "label": "系统管理",
  "icon": "i-tabler:settings",
  "sort": 0
}
```

#### 页面路由

```json
{
  "name": "system.user",
  "path": "system/user",
  "label": "用户管理",
  "parent": "system",
  "loader": "system/user/index",
  "sort": 1
}
```

#### 嵌入页面

```json
{
  "name": "iframe.docs",
  "path": "iframe/docs",
  "label": "在线文档",
  "icon": "i-tabler:book",
  "meta": {
    "src": "https://docs.example.com"
  }
}
```

#### 外部链接

```json
{
  "name": "link.website",
  "path": "link/website",
  "label": "官方网站",
  "icon": "i-tabler:external-link",
  "meta": {
    "url": "https://www.example.com"
  }
}
```

## 页面渲染

### 1. 页面请求

当访问动态路由时，系统会根据路由的 `loader` 属性请求对应的 Vue 组件内容：

```
GET /api/page?loader=system/user/index
```

### 2. 响应格式

后端需要返回标准的页面数据格式：

```typescript
interface PageResponse {
  code: number; // 状态码
  message: string; // 消息
  data: {
    content: string; // Vue 组件内容
    name: string; // 组件名称
    type: string; // 文件类型
  };
}
```

响应示例：

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "content": "<template><div>用户管理页面</div></template>",
    "name": "system/user/index",
    "type": ".vue"
  }
}
```

## 开发建议

1. **资源管理**

   - 合理配置静态资源路径
   - 使用 CDN 加速静态资源
   - 开启资源压缩和缓存

2. **路由设计**

   - 保持路由结构清晰
   - 合理使用路由嵌套
   - 注意路由权限控制

3. **页面优化**

   - 实现页面缓存机制
   - 优化页面加载性能
   - 处理页面异常情况

4. **安全考虑**
   - 验证页面请求权限
   - 防止 XSS 攻击
   - 保护敏感配置信息

## 更多资源

- [路由配置](../dev/route.md)
- [权限控制](../dev/auth.md)
- [页面组件](../dev/component.md)
