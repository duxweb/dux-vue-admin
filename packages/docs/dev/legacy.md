# 传统模式

传统模式下为常规的前后端开发方式，开发调试均独立进行，example 目录下为完整示例。


## 开发环境
- Node.js >= 21.0.0
- bun >= 1.x
- Vue 3.x
- TypeScript 5.x
- Vite 5.x


## 初始化

```bash
创建项目
npm create vite@latest my-project -- --template vue-ts
进入项目目录
cd my-project
安装依赖
npm install
安装必要依赖
npm install vue-router@4 pinia @vueuse/core
```


## 目录结构

手动创建项目时，需要手动创建以下目录结构：

```bash
project/
├── src/ # 源代码
│ │ ├── components/ # 组件
│ │ ├── config/ # 配置
│ │ ├── router/ # 路由配置
│ │ ├── pages/ # 页面
│ │ ├── App.vue # 根组件
│ │ └── main.ts # 入口文件
│ ├── public/ # 静态资源
│ ├── index.html # HTML 模板
│ ├── eslint.config.js # ESLint 配置
│ ├── package.json # 项目配置
│ ├── tsconfig.json # TypeScript 配置
│ └── vite.config.ts # Vite 配置
```
