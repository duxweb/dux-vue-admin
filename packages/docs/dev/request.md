# 数据请求

Dux Vue Admin 使用 [alova](https://alova.js.org/) 作为请求库，并对其进行了封装，提供了更简单的使用方式。

## 基础使用

### 引入方式

```typescript
import { useClient } from "@duxweb/dux-vue-admin";

const client = useClient();
```

### 请求方法

支持以下几种请求方法：

```typescript
// GET 请求
client.get({
  url: "/api/data",
});

// POST 请求
client.post({
  url: "/api/data",
  data: {
    name: "test",
  },
});

// PUT 请求
client.put({
  url: "/api/data/1",
  data: {
    name: "test",
  },
});

// PATCH 请求
client.patch({
  url: "/api/data/1",
  data: {
    name: "test",
  },
});

// DELETE 请求
client.delete({
  url: "/api/data/1",
});
```

## 请求配置

### 请求参数

每个请求方法都支持以下配置参数：

```typescript
interface ClientRequestProps<T> {
  url?: string; // 请求地址
  data?: RequestBody; // 请求数据
  params?: Record<string, any>; // URL 参数
  headers?: Record<string, any>; // 请求头
  type?: "json" | "file" | "form"; // 请求类型
  timeout?: number; // 超时时间（默认 5000ms）
  config?: Config<T>; // 额外配置
}
```

### 全局请求头

系统会自动添加以下请求头：

```typescript
{
  'Accept': 'application/json',
  'Authorization': user?.token,
  'Accept-Language': i18n.global.locale?.value,
  'Content-Type': 'application/json'  // 默认类型
}
```

## 高级功能

### 缓存控制

可以通过 `config.cacheFor` 控制请求缓存时间：

```typescript
client.get({
  url: "/api/data",
  config: {
    cacheFor: 5000, // 缓存 5 秒
  },
});
```

### 缓存刷新

使用 `invalidate` 方法刷新缓存：

```typescript
// 刷新指定 URL 的缓存
client.invalidate("/api/data");

// 使用正则刷新多个缓存
client.invalidate(/^\/api\/data/);
```

### 文件下载

系统提供了专门的文件下载 hook：

```typescript
import { useDownload } from "@duxweb/dux-vue-admin";

const { file, url, blob, base64, image } = useDownload();

// 下载文件
file("/api/download");

// 下载 URL
url("https://example.com/file.pdf");

// 下载图片
image("https://example.com/image.jpg");

// 下载 base64
base64("data:image/png;base64,...", "image.png");
```

### Excel 导入导出

系统提供了 Excel 处理相关的 hook：

```typescript
import { useExportExcel, useImportExcel } from "@duxweb/dux-vue-admin";

// 导出 Excel
const { send: exportExcel } = useExportExcel();
exportExcel({
  url: "/api/export",
  columns: [{ header: "名称", key: "name" }],
});

// 导入 Excel
const { send: importExcel } = useImportExcel();
importExcel({
  url: "/api/import",
  columns: [{ header: "名称", key: "name" }],
});
```

## 错误处理

系统会自动处理以下错误情况：

1. 401 错误：自动跳转到登录页
2. 其他错误：返回错误信息

```typescript
client
  .get({
    url: "/api/data",
  })
  .catch((error) => {
    console.log(error.message);
  });
```

## 请求拦截

系统会自动处理请求响应，统一返回格式为：

```typescript
{
  code: number       // 状态码
  message: string    // 消息
  data: any         // 数据
  meta?: any        // 元数据
}
```

## 分页请求

系统提供了专门的分页请求 hook：

```typescript
import { usePagination } from "alova/client";
import { useClient } from "@duxweb/dux-vue-admin";

const client = useClient();

const {
  // 加载状态
  loading,
  // 数据列表
  data,
  // 当前页码
  page,
  // 每页条数
  pageSize,
  // 总页数
  pageCount,
  // 总条数
  total,
  // 发送请求
  send,
  // 重新加载
  reload,
  // 成功回调
  onSuccess,
} = usePagination(
  (page, pageSize) => {
    return client.get({
      url: "/api/list",
      params: {
        page,
        pageSize,
        ...otherParams,
      },
      config: {
        cacheFor: 5000, // 缓存时间
      },
    });
  },
  {
    initialData: {
      total: 0,
      data: [],
    },
    initialPage: 1,
    initialPageSize: 20,
    total: (res) => res.meta?.total || 0,
    data: (res) => res.data || [],
  }
);

// 上一页
const onPrevPage = () => {
  if (page.value <= 1) {
    return;
  }
  page.value--;
};

// 下一页
const onNextPage = () => {
  if (page.value >= pageCount.value) {
    return;
  }
  page.value++;
};
```

### 列表组件

系统提供了封装好的列表组件，可以更方便地处理分页请求：

```typescript
import { useList } from "@duxweb/dux-vue-admin";

const { loading, data, page, pageSize, pageCount, total, reload } = useList({
  url: "/api/list",
  form: formRef, // 表单数据
  cacheTime: 5000, // 缓存时间
  defaultPageSize: 20, // 默认每页条数
  append: false, // 是否追加模式
  // Excel 导出配置
  excelColumns: [{ header: "名称", key: "name" }],
  export: true, // 是否启用导出
  import: true, // 是否启用导入
});
```

## 资源 URL

系统提供了 `useResource` hook 来获取预设的 API 地址，以下是完整的资源 URL 列表：

```typescript
import { useResource } from "@duxweb/dux-vue-admin";

const res = useResource();

// 基础信息
res.manage; // 当前管理端标识
res.id; // 当前路由 ID 参数
res.path; // 当前路由路径
res.name; // 当前路由名称
res.config; // 全局配置
res.manageConfig; // 当前管理端配置

// API 地址
res.routerUrl; // 路由接口地址，默认: '/router'
res.messageUrl; // 消息接口地址，默认: '/message'
res.aichatUrl; // AI 聊天接口地址，默认: '/aiChat'
res.uploadUrl; // 上传接口地址，默认: '/upload'
res.uploadManageUrl; // 上传管理接口地址，默认: '/uploadManage'
res.loginUrl; // 登录接口地址，默认: '/login'
res.checkUrl; // 检查接口地址，默认: '/check'
res.captchaUrl; // 验证码接口地址，默认: '/captcha'
res.verifyUrl; // 验证接口地址，默认: '/verify'

// 工具方法
res.genUrl(path); // 生成 API URL，会自动添加 apiPrefix
res.genPath(path); // 生成路由路径，会自动添加管理端前缀
res.getIndexPath(); // 获取首页路径
```

### URL 生成示例

```typescript
const res = useResource();

// 生成 API URL
res.genUrl("/user"); // 结果: '/admin/user' (假设 apiPrefix 为 'admin')

// 生成路由路径
res.genPath("/user"); // 结果: '/admin/user' (假设当前管理端为 'admin')

// 获取首页路径
res.getIndexPath(); // 结果: '/admin'
```
