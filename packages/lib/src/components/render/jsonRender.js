/* eslint-disable no-restricted-properties */
/* eslint-disable no-proto */
/* eslint-disable style/indent */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-spread */
/* eslint-disable no-new-func */
import { defineComponent, h, provide, reactive, resolveDynamicComponent, toRefs } from 'vue'

const commandReg = /^v-[a-z]/
const spaceReg = / /g
const vForReg = /[ ()]/g
/**
 * 判断是不是一个指令
 * @param {*} key
 * @returns
 */

function deepCopy(source = {}) {
  if (!(source instanceof Object))
    return source // 如果不是对象的话直接返回
  const target = Array.isArray(source) ? [] : {} // 数组兼容
  for (const k in source) {
    // eslint-disable-next-line no-prototype-builtins
    if (source.hasOwnProperty(k)) {
      if (typeof source[k] === 'object') {
        target[k] = deepCopy(source[k])
      }
      else {
        target[k] = source[k]
      }
    }
  }
  return target
}

const commandStarts = ['render', '@', '#', ':']
const isCommandKey = key => commandReg.test(key) || commandStarts.some(start => key.startsWith(start))
/**
 * 过滤不需要渲染到组件的参数
 * @param {*} attr
 * @returns *
 */
function filterComponentProps(attr) {
  const _attr = { ...attr }
  Object.keys(_attr).forEach((key) => {
    if (isCommandKey(key)) {
      delete _attr[key]
    }
  })
  return _attr
}

export const createPropsProvideKey = 'createPropsProvideKey'

// 执行字符串函数
const exec = function (script, params = {}) {
  try {
    const data = { ...this, ...params }
    const keys = Object.keys(data)
    return (new Function(...keys, `return ${script}`)).apply(null, keys.map(key => data[key]))
  }
  catch (error) {
    console.warn(`script run error: ${script}`, error)
  }
}

/**
 * 返回每一项
 * @param {*} data 当前这一项的数据
 * @param {*} arg 附加到exec上的变量
 * @param {*} slotProps 插槽参数
 * @returns *
 */
export const renderItem = function (data, arg, slotProps) {
  if (typeof data === 'string' || typeof data === 'number') {
    data += ''
    const string = []
    const split = data.split('{{')
    split[0] && string.push(split[0])
    for (let i = 1; i < split.length; i++) {
      const item = split[i].split('}}')
      string.push(exec.call(this, item[0], arg))
      item[1] && string.push(item[1])
    }
    return string.join('')
  }
  else if (typeof data === 'object' && data !== null) {
    const vIf = data.attr?.['v-if']
    const vFor = data.attr?.['v-for']
    // 条件处理
    if (vIf) {
      const bool = exec.call(this, vIf, arg)
      if (!bool) {
        return
      }
    }
    // 循环处理
    if (vFor) {
      const _data = vFor.split(' in ')
      _data[0] = _data[0].replace(vForReg, '').split(',')
      const value = exec.call(this, _data[1], arg)
      if (typeof value !== 'object') {
        return
      }
      const node = []
      for (const key in value) {
        if (Object.hasOwnProperty.call(value, key)) {
          const newArg = { ...arg, [_data[0][0]]: value[key] }
          if (_data[0][1]) {
            newArg[_data[0][1]] = key
          }
          node.push(vExec.call(this, data, newArg, slotProps))
        }
      }
      return node
    }
    else {
      return vExec.call(this, data, arg, slotProps)
    }
  }
}

export const renderNodeList = function (node, arg) {
  if (typeof node === 'undefined' || (typeof node === 'object' && (!node || Object.keys(node).length === 0))) {
    return {}
  }
  const childNode = {}

  // 将插槽分组
  const slotGroup = {}
  const nodes = Array.isArray(node) ? node : [node]

  nodes.forEach((item) => {
    if (typeof item === 'string' || typeof item === 'number') {
      slotGroup.default = slotGroup.default || []
      slotGroup.default.push(item)
    }
    else if (typeof item === 'object' && !!item) {
      // 插槽变量计算
      if (!item.attr) {
        item.attr = {}
      }
      const vSlotKey = Object.keys(item.attr).find(key => key.startsWith('v-slot') || key.startsWith('#'))
      const slotName = (vSlotKey && vSlotKey.slice(vSlotKey.startsWith('v-slot') ? 7 : 1)) || 'default'
      slotGroup[slotName] = slotGroup[slotName] || []
      slotGroup[slotName].push(item)
    }
  })
  Object.keys(slotGroup).forEach((slotKey) => {
    if (!slotGroup[slotKey].length) {
      return
    }
    childNode[slotKey] = props => slotGroup[slotKey].map(item => renderItem.call(this, item, arg, props))
  })
  return childNode
}

/**
 * vue指令执行
 * @param {*} data 当前节点数据
 * @param {*} arg 执行参数
 * @param {*} slotProps 插槽参数
 */
export const vExec = function (data, arg, slotProps) {
  const { tag, child, attr } = data

  // 将v-model转换为v-bind和v-on
  Object.keys(attr).filter(key => key.startsWith('v-model')).forEach((key) => {
    const _value = attr[key]
    delete attr[key]
    const _key = key.slice(8) || 'modelValue'
    if (!attr[`:${_key}`]) {
      attr[`:${_key}`] = _value
    }
    const onKey = `@update:${_key}`
    const _script = `__value => ${_value} = __value;`
    if (attr[onKey] && typeof attr[onKey] !== 'object') {
      attr[onKey] = [attr[onKey], _script]
    }
    else if (!attr[onKey]) {
      attr[onKey] = [_script]
    }
  })

  // 查找keys
  const itemKeys = Object.keys(attr)

  // 插槽变量计算
  const vSlotKey = itemKeys.find(key => key.startsWith('v-slot') || key.startsWith('#'))
  const slotArg = !vSlotKey || !attr[vSlotKey] || typeof attr[vSlotKey] !== 'string' || !slotProps
    ? {}
    : (() => {
      // 计算变量名
      const keys = attr[vSlotKey].replace(/[ {}]+/g, '').split(',').map(v => v.split('=')[0].split(':')).map(v => v[1] || v[0]).toString()
      const script = `
  const ${attr[vSlotKey]} = props;
  return { ${keys} }
  `
      return (new Function('props', script))(slotProps)
    })()
  // 组合参数
  const newArg = { ...this, ...arg, ...slotArg }

  /**
   * 将命令创建的数据存储到一个新对象里
   */
  const execData = {}

  // 指令处理
  itemKeys.forEach((key) => {
    if (!isCommandKey(key)) {
      return
    }
    if (key.startsWith('v-on') || key.startsWith('@')) {
      // 事件绑定处理
      const name = key.slice(key.startsWith('v-on') ? 5 : 1)
      const _key = `on${name.slice(0, 1).toUpperCase()}${name.slice(1)}`
      const script = attr[key]
      execData[_key] = ($event, ...arg) => {
        (typeof script === 'string' ? [script] : script).forEach((_script) => {
          const res = exec.call(this, _script, { ...newArg, $event })
          if (typeof res === 'function') {
            res.call(this, $event, ...arg)
          }
        })
      }
    }
    else if (key.startsWith('v-bind') || key.startsWith(':')) {
      // 数据绑定处理
      const name = key.slice(key.startsWith('v-bind') ? 7 : 1)
      const _result = exec.call(this, attr[key], newArg)
      execData[name] = _result
    }
    else if ((key.startsWith('render') || key.startsWith('v-render')) && typeof attr[key] === 'object') {
      const _value = attr[key]
      if (key.startsWith('v-render')) {
        key = key.slice(9)
      }
      // render节点转换
      const _data = key.split(':')
      // 节点需要的字段
      const paramsKeys = _data[1] ? _data[1].replace(spaceReg, '').split(',') : []
      // 节点转换
      execData[_data[0]] = (...render) => renderNodeList.call(this, _value, { ...newArg, ...Object.fromEntries(paramsKeys.map((key, index) => [key, render[index]])) }).default?.()
    }
    else if (key.startsWith('v-child') && typeof attr[key] === 'object') {
      // 处理子集数据转换

      execData[key.split(':')[1]] = vExec(attr[key], newArg)
    }
  })

  // 组合最终返回的得到的props
  const props = Object.assign(execData, filterComponentProps(attr))

  if (tag && typeof tag === 'string') {
    // 创建组件
    return h(
      resolveDynamicComponent(tag),
      props,
      renderNodeList.call(this, child, newArg),
    )
  }
  else {
    // 返回处理后的json
    return props
  }
}

/**
 * 将json转换成Vue模板代码
 */
export const jsonToVue = (() => {
  const getAttr = (item = {}) => {
    const keys = Object.keys(item)
    const attrString = keys.map((key) => {
      const value = item[key]
      if (key.startsWith('v-on')) {
        return `@${key.slice(5)}="${value}"`
      }
      else if (key.startsWith('v-bind') || key.startsWith(':')) {
        const [, type] = key.split(':')
        return `:${type}="${value}"`
      }
      else if (key.startsWith('v-model')) {
        return `v-model:${key.slice(8) || 'model-value'}="${value}"`
      }
      else if (key.startsWith('v-for')) {
        return `v-for="${value}"`
      }
      else if (key.startsWith('v-if')) {
        return `v-if="${value}"`
      }
      else if (key.startsWith('v-child')) {
        return `:${key.slice(8)}="${JSON.stringify(value).replace(/"/g, '\'')}"`
      }
      else if (key.startsWith('v-slot') || key.startsWith('#')) {
        return `#${(key.startsWith('v-slot') ? key.slice(7) : key.slice(1)) || 'default'}${value ? `="${value}"` : ''}`
      }
      else if ((key.startsWith('render') || key.startsWith('v-render')) && typeof value === 'object') {
        return false
      }
      else if (typeof value === 'object') {
        return `:${key}="${JSON.stringify(value).replace(/"/g, '\'')}"`
      }
      else if (typeof value === 'boolean' || typeof value === 'number') {
        return `:${key}="${value}"`
      }
      return `${key}="${value}"`
    }).filter(v => v).join(' ')
    if (attrString) {
      return ` ${attrString}`
    }
    return ''
  }
  const getSpace = (_level) => {
    let string = ''
    for (let i = 0; i <= _level; i++) {
      string += '  '
    }
    return string
  }
  const getSlotKey = item => Object.keys(item).find(v => v.startsWith('v-slot') || v.startsWith('#'))
  return (node, level = 1) => {
    if (typeof node === 'string') {
      return getSpace(level) + node
    }
    if (!node) {
      return ''
    }
    if (!Array.isArray(node)) {
      node = [node]
    }
    return node.map((item) => {
      if (typeof item === 'string') {
        return getSpace(level) + item
      }
      if (!item?.tag) {
        return false
      }
      const slotKey = getSlotKey(item)
      if (slotKey) {
        const _item = deepCopy(item)
        delete _item[slotKey]
        return `${getSpace(level)}<template #${slotKey.slice(6) || 'default'}="${item[slotKey]}">
${jsonToVue(_item, level + 1)}
${getSpace(level)}</template>`
      }
      let _str = `${getSpace(level)}<${item.tag}${getAttr(item.attr)}>`
      if (item.child) {
        _str += '\n'
        _str += jsonToVue(item.child, level + 1)
        _str += '\n'
        _str += `${getSpace(level)}</${item.tag}>`
      }
      else {
        _str += `</${item.tag}>`
      }
      return _str
    }).filter(v => v).join('\n')
  }
})()

const JsonRender = defineComponent({
  props: {
    nodes: {
      type: [Array, Object, String],
      default: '',
    },
    setupScript: {
      type: String,
      default: '',
    },
    data: {
      type: Object,
      delault: () => ({}),
    },
    debug: {
      type: Boolean,
      default: false,
    },
    static: {
      type: Object,
      delault: () => ({}),
    },
  },

  setup(props, context) {
    // 共享数据
    provide(createPropsProvideKey, props)

    let res = (new Function('props', 'context', props.setupScript))(toRefs(props), context)

    if (typeof res !== 'object' && !res) {
      res = {}
    }
    if (typeof props.data !== 'undefined') {
      Object.keys(props.data).forEach((key) => {
        if (typeof res[key] !== 'undefined') {
          return
        }
        const val = props.data[key]
        if (typeof val === 'object' && val && val.__proto__?.__proto__ === null) {
          res[key] = reactive(val)
        }
        else {
          res[key] = val
        }
      })
    }

    res.keys = Object.keys(res)
    return res
  },

  render() {
    return this.debug
      ? h('div', { style: 'flex: 1,height: 100%;' }, h('div', { style: 'position: absolute;left: 0;top: 0;right: 0;bottom: 0;overflow: auto;' }, h('pre', null, `<template>
${jsonToVue(this.nodes)}
</template>
<script>
${this.static?.scriptString || ''}
export default {
  setup(props, context) {
    ${this.setupScript}
  }
}

</script>
<style>
${this.static?.style || ''}
</style>
${this.static?.css?.map(v => `<link href="${v}"></link>`)?.join('\n') || ''}
${this.static?.script?.map(v => `<script src="${v}"></script>`)?.join('\n') || ''}
`)))
      : renderNodeList.call(
        Object.fromEntries(this.keys.map(key => [key, this[key]])),
        this.nodes,
      ).default?.()
  },
})

export default JsonRender
