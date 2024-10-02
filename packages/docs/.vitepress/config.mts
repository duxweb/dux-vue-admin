import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Dux Vue Admin",
  description: "适用于全栈开发的异步中后台前端解决方案",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '教程', link: '/markdown-examples' },
      { text: '组件', link: '/markdown-examples' },
      { text: '示例', link: 'https://vue-admin.dux.plus' },
      { text: '捐助', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/duxweb/dux-vue-admin' }
    ]
  }
})
