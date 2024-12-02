import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Dux Vue Admin",
  description: "适用于全栈开发的异步中后台前端解决方案",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '教程', link: '/guide/started' },
      { text: '组件', link: '/components' },
      { text: '示例', link: 'https://vue-admin.dux.plus' },
      { text: '捐助', link: '/markdown-examples' }
    ],

    sidebar: [
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
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/duxweb/dux-vue-admin' }
    ]
  }
})
