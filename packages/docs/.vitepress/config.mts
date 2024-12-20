import { defineConfig } from 'vitepress'


const guideSidebar = [
  {
    text: '教程',
    items: [
      { text: '介绍', link: '/guide/info' },
      { text: '快速开始', link: '/guide/started' },
      { text: '传统模式', link: '/guide/legacy' },
      { text: '基座模式', link: '/guide/mount' },
    ]
  },
  {
    text: '开发',
    items: [
      { text: '框架配置', link: '/dev/config' },
      { text: '路由配置', link: '/dev/router' },
      { text: "数据结构", link: "/dev/data" },
      { text: "数据请求", link: "/dev/request" },
      { text: "登录与权限", link: "/dev/auth" },
      { text: "多语言配置", link: "/dev/lang" },
      { text: "多管理端配置", link: "/dev/manage" },
    ],
  }
]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Dux Vue Admin",
  description: "适用于全栈开发的异步中后台前端解决方案",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '教程', link: '/guide/started' },
      { text: '组件', link: '/components/stats/' },
      { text: '示例', link: 'https://vue-admin.dux.plus' },
    ],

    // 定义共享的边栏配置
    sidebar: {
      // 教程和开发的边栏
      '/guide/': guideSidebar,
      // 为 /dev/ 路径配置相同的边栏
      '/dev/': guideSidebar,
      // 组件的边栏
      '/components/': [
        {
          text: "数据统计",
          collapsed: false,
          items: [
            { text: "概述", link: "/components/stats/index" },
            { text: "基础卡片", link: "/components/stats/total-card" },
            { text: "简单卡片", link: "/components/stats/total-simple" },
            { text: "多列卡片", link: "/components/stats/total-multi" },
            { text: "趋势卡片", link: "/components/stats/total-rate" },
            { text: "标签卡片", link: "/components/stats/total-tab" },
            { text: "操作卡片", link: "/components/stats/action" },
            { text: "店铺卡片", link: "/components/stats/store" },
            { text: "用户卡片", link: "/components/stats/user" },
            { text: "连接状态", link: "/components/stats/connect" },
            { text: "欢迎信息", link: "/components/stats/hello-big" },
            { text: "快捷按钮", link: "/components/stats/quick" },
            { text: "容器卡片", link: "/components/stats/card" },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/duxweb/dux-vue-admin' }
    ]
  }
})
