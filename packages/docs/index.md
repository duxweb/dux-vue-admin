---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Dux Vue Admin"
  text: "适用于全栈开发的异步中后台前端解决方案"
  tagline: 免编译、免打包、免依赖、开箱即用
  image:
    src: '/logo.svg'
    alt: 'Logo'
  actions:
    - text: 快速上手
      link: /guide/started

    - theme: alt
      text: 捐助支持
      link: /guide/project-structure

    - theme: alt
      text: 纯前端演示
      link: https://vue-admin.dux.plus

    - theme: alt
      text: 后端Go演示
      link: https://go-admin.dux.plus/manage

features:
  - icon: 🏗️
    title: 主流架构
    details: 基于 Vue3、Vite、TypeScript、Pinia、Vue Router、Naive UI 作为基础架构。
  - icon: 📄
    title: Json渲染
    details: Json 渲染器，仅用 Json 即可渲染为 Vue 组件，可用于低代码渲染平台。
  - icon: 🌐
    title: 远程渲染
    details: 基于 Vue Sfc 的运行基座，异步加载 Vue 或 Json 并渲染，无需编译和打包。
  - icon: 👶
    title: 新手友好
    details: 无论是新手还是老手，都能快速上手，特别针对后端全栈开发，提供优秀的解决方案。
  - icon: 💼
    title: 高级组件
    details: 除基本的 Naive UI 组件外，还提供了一些异步高级组件，如：表格、表单、选择、级联、动态输入等。
  - icon: 🎨
    title: UX & UI
    details: 资深设计师倾力打造，提供优秀的用户体验和美观的界面设计，满足各种业务需求。
  - icon: 🗣️
    title: 语言与主题
    details: 支持 i18n 国际化，支持主题色彩、多种布局，支持明暗自适应色彩，适配手机、平板电脑自适应。
  - icon: 🆓
    title: 免费开源
    details: 基于 Apache 2.0 协议，免费开源，可商用，可修改，可二次开发，可定制化。
---



<div class="vp-doc custom-block">
  <div class="image-container">
    <div class="screenshots">
      <div class="image-item">
        <img src="/images/pc-login.jpeg" alt="产品截图1">
        <p>PC 登录</p>
      </div>
      <div class="image-item">
        <img src="/images/pc-home.jpeg" alt="产品截图2">
        <p>PC 首页</p>
      </div>
    </div>
    <div class="screenshots-mobile">
      <div class="image-item">
        <img src="/images/mobile-login.jpeg" alt="产品截图2">
        <p>移动端登录</p>
      </div>
      <div class="image-item">
        <img src="/images/mobile-home.jpeg" alt="产品截图2">
        <p>移动端首页</p>
      </div>
      <div class="image-item">
        <img src="/images/mobile-menu.jpeg" alt="产品截图2">
        <p>移动端菜单</p>
      </div>
      <div class="image-item">
        <img src="/images/mobile-list.jpeg" alt="产品截图2">
        <p>移动端列表</p>
      </div>
    </div>
    <div class="qrcode">
      <div class="image-item">
        <img src="/images/qrcode.png" alt="微信群">
        <p>扫码加入交流群</p>
      </div>
    </div>
  </div>
</div>

<style>
.image-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem auto;
  max-width: 1200px;
  align-items: center;
}

.screenshots {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  justify-content: center;
}

.screenshots-mobile {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.qrcode {
  display: flex;
  justify-content: center;
}

.image-item {
  text-align: center;
}

.image-item img {
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.qrcode .image-item img {
  max-width: 200px;
}

.image-item p {
  margin-top: 1rem;
  color: #666;
}

@media (max-width: 768px) {
  .screenshots {
    grid-template-columns: 1fr;
  }

  .screenshots-mobile {
    grid-template-columns: 1fr;
  }

  .image-item img {
    max-width: 100%;
  }
  
  .qrcode .image-item img {
    max-width: 160px;
  }
}
</style>