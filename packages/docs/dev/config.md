# 配置

## 基础配置

配置文件中包含以下基础选项：

| 参数 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| apiUrl | string | API 接口地址, 基座模式下留空 | - |
| logo | string | 系统 Logo 地址 | - |
| darkLogo | string | 暗黑模式 Logo 地址 | - |
| loginBanner | string | 登录页横幅图片 | - |
| copyright | string | 版权信息 | - |
| lang | 'en-US' \| 'zh-CN' | 默认语言 | 'zh-CN' |
| captcha | boolean | 是否启用验证码，暂时支持 Go 语言后端 | false |
| amapMapKey | string | 高德地图 Key | - |
| asyncRouter | boolean | 是否启用异步路由 | false |

## API 接口配置

通过 `apiConfig` 配置系统所需的接口地址：

| 参数 | 类型 | 说明 | 必填 |
|------|------|------|------|
| login | string | 登录接口 | 是 |
| logout | string | 退出登录接口 | 否 |
| check | string | 登录状态检查接口 | 否 |
| captcha | string | 验证码接口 | 否 |
| verify | string | 验证接口 | 否 |
| upload | string | 上传接口 | 否 |
| uploadManage | string | 上传管理接口 | 否 |
| router | string | 路由接口 | 否 |
| i18n | string | 国际化接口 | 否 |
| message | string | 消息接口 | 否 |
| aiChat | string | AI 对话接口 | 否 |

## 应用配置

通过 `manage` 配置多应用管理，每个应用支持以下配置：

| 参数 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| title | string | 应用标题 | - |
| default | boolean | 是否为默认应用 | false |
| register | boolean | 是否启用注册，预留暂无作用 | false |
| forgotPassword | boolean | 是否启用忘记密码，预留暂无作用 | false |
| updatePassword | boolean | 是否启用修改密码，预留暂无作用 | false |
| apiPrefix | string | API 前缀 | - |
| routers | DuxRoute[] | 路由配置，与基座模式下路由配置一致，可混合使用 | - |
| userMenu | UserMenu[] | 用户菜单配置 | - |

### 用户菜单配置

`userMenu` 支持以下配置项：

| 参数 | 类型 | 说明 | 必填 |
|------|------|------|------|
| label | string | 菜单名称 | 是 |
| path | string | 菜单路径 | 是 |
| icon | string | 菜单图标 | 否 |

## 配置示例

```typescript

const config = {
  apiUrl: 'https://api.example.com',
  logo: '/logo.png',
  darkLogo: '/dark-logo.png',
  lang: 'zh-CN',
  captcha: true,
  apiConfig: {
    login: '/auth/login',
    logout: '/auth/logout',
    check: '/auth/check'
  },
  manage: {
    admin: {
      title: '管理后台',
      default: true,
      register: false,
      apiPrefix: '/admin',
      indexPath: '/dashboard',
      userMenu: [
        {
          label: '个人设置',
          path: '/setting',
          icon: 'setting'
        }
      ]
    }
  }
}

```