# 数据结构

Dux Vue Admin 默认定义了 API 数据规范，您需要根据文档中的说明返回相应的接口格式和字段。

## 基本数据

API 返回的数据需要采用 `json` 数据格式，接口 URL 应遵循基本的 `RESTful API` 格式。不管是不是 200 状态码，返回的 `json` 数据格式都应包含以下字段：

- `code` 状态码，与 HTTP 状态码一致
- `message` 消息，自定义返回的消息内容
- `data` 数据，返回的消息数据
- `meta` 附加数据，可选自定义附加数据

```json
{
  "code": 200,
  "message": "ok",
  "data": {
    ...
  },
  "meta": {
    ...
  }
}
```

前端发出请求时，会携带以下通用的请求头信息：

- `Accept-Language` 请求语言，API 可以使用该参数返回对应语言的数据或信息
- `Authorization` 用户认证，登录后每次请求都会带上该参数，API 需要自行验证其有效性

```http
Accept-Language: zh
Authorization: Bearer <token>
```

## 成功消息

API 返回成功消息示例：

```json
{
  "code": 200,
  "message": "ok",
  "data": {}
}
```

## 错误消息

API 返回错误消息示例：

```json
{
  "code": 500,
  "message": "Error description",
  "data": {}
}
```

## 登录请求

登录时，会将以下 `json` 参数作为请求体内容：

```json
{
  "username": "admin",
  "password": ""
}
```

登录成功后，需要返回以下字段信息：

```json
{
  "code": 200,
  "message": "ok",
  "data": {
    "info": {
      "username": "admin",
      "nickname": "Dux",
      "avatar": "http://xxx"
    },
    "token": "Bearer <token>",
    "permission": {}
  }
}
```

## 登录失效

登录失效或 Token 验证失败时，需要返回状态码为 `401`：

```json
{
  "code": 401,
  "message": "Login failure",
  "data": {}
}
```

## 用户权限

登录时，后端需要返回 `permission` 字段作为用户权限。如果该字段为空，则不限制权限。这个权限仅用于前端验证，API 需要自行判断接口权限。

权限结构示例：

```json
{
  "permission": {
    "user.list": true,
    "user.create": false,
    "user.edit": false,
    "user.delete": false,
    "user.show": false
  }
}
```

权限的 `key` 使用了 `资源名.动作` 的命名方式，`value` 表示是否拥有该权限。

## 列表数据

列表数据使用 `GET` 请求，基本 URL 格式：

```http
GET http://example.test/article
```

数据返回分为分页和非分页数据，API 需要返回以下基本格式：

- `list` 数组数据
- `total` 数据总数（对于非分页数据，此字段无效）

```json
{
  "code": 200,
  "message": "ok",
  "data": [
    ...
  ],
  "meta": {
    "total": 100
  }
}
```

分页请求示例：

```http
GET http://example.test/article?page=1
```

## 单条数据

单条数据使用 `GET` 请求，基本 URL 格式：

```http
GET http://example.test/article/{id}
```

返回数据格式：

```json
{
  "code": 200,
  "message": "ok",
  "data": {
    ...
  },
  "meta": {
    ...
  }
}
```

## 创建数据

创建数据使用 `POST` 请求：

```http
POST http://example.test/article

BODY
{
  "title": "...",
  ...
}
```

## 编辑数据

编辑数据使用 `POST` 请求：

```http
POST http://example.test/article/{id}

BODY
{
  "title": "...",
  ...
}
```

## 删除数据

删除数据使用 `DELETE` 请求：

```http
DELETE http://example.test/article/{id}
```
