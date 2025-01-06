import type { DefineComponent } from 'vue'
import type { JSX } from 'vue/jsx-runtime'

type ComponentType<T extends DefineComponent> = T extends DefineComponent<infer P> ? P : never

type JSONSchemaNodeAdaptor<T extends keyof any> = {
  [K in T]?: ComponentType<any[K]>
}

export interface JSONSchema {
  tag?: string
  attr?: JSONSchemaNodeAdaptor<this['tag']>
  child?: JSONSchema | JSONSchema[] | string
  [key: string]: any
}

export default function JsonRender(props: {
  nodes: JSONSchema[]
  /**
   * 希望用于组件setup执行的脚本字符串
   * 可以返回一个对象，此对象将可以全局调用
   */
  setupScript?: string
  /** 传入的对象将会赋值为组件的全局变量 */
  data?: { [key]: any }
  /** 是否开启调试 开启调试后将会把json转换为vue代码 */
  debug?: boolean
}): JSX.Element
