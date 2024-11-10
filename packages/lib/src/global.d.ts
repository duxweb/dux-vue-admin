declare module '*.svg' {
  const content: any
  export default content
}
declare module '*.png' {
  const content: any
  export default content
}
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<any, any, Component>
  export default component
}
