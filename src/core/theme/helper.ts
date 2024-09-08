import { generate } from '@ant-design/colors'
import { TinyColor } from '@ctrl/tinycolor'
import type { GlobalThemeOverrides } from 'naive-ui'
import { commonDark, commonLight } from 'naive-ui'
import { entriesToCss } from '@unocss/core'
import { upperFirst } from 'lodash-es'

type ThemeColor = Record<string, string>

interface ColorAction {
  scene: string
  handler: (color: string) => string
}

export function getRGBColor(color: string) {
  return new TinyColor(color).toRgb()
}

/**
 * 根据颜色获取色系
 *
 * @param {string} color #1890ff
 * @param {boolean} darkMode 暗黑模式
 * @return {string[]} ['#E6F7FF', '#BAE7FF', '#91D5FF', '#69C0FF', '#40A9FF', '#1890FF', '#096DD9', '#0050B3', '#003A8C', '#002766']
 */
export function getGenerateColors(color: string, darkMode: boolean): string[] {
  return darkMode
    ? generate(color, {
      theme: 'dark',
      backgroundColor: commonDark.bodyColor,
    })
    : generate(color)
}

export function getThemeColors(
  config: Record<string, string>,
  darkMode: boolean,
): ThemeColor {
  const themeColor: ThemeColor = {}
  const keys = Object.keys(config)
  const colorActions: ColorAction[] = [
    { scene: '', handler: color => getGenerateColors(color, darkMode)[5] },
    {
      scene: 'Hover',
      handler: color => getGenerateColors(color, darkMode)[4],
    },
    {
      scene: 'Suppl',
      handler: color => getGenerateColors(color, darkMode)[4],
    },
    {
      scene: 'Pressed',
      handler: color => getGenerateColors(color, darkMode)[6],
    },
  ]
  keys.forEach((key) => {
    colorActions.forEach((action) => {
      const color = action.handler(config[key]!)
      const colorKey = `${key}Color${action.scene}`
      themeColor[colorKey] = color
    })
  })
  return themeColor
}

export function getThemeOverrides(
  config: any,
  darkMode: boolean,
): GlobalThemeOverrides {
  const themeColors = getThemeColors(config, darkMode)
  return {
    common: {
      ...themeColors,
    },
    ...getOtherColor(config, darkMode),
  }
}

function getOtherColor(
  config: any,
  darkMode: boolean,
): GlobalThemeOverrides {
  const otherColor: GlobalThemeOverrides = {
    Button: {},
    Checkbox: {
      checkMarkColor: getTextColor(darkMode),
    },
    DatePicker: {
      itemTextColorActive: getTextColor(darkMode),
    },
    Calendar: {
      dateTextColorCurrent: getTextColor(darkMode),
    },
    Switch: {
      buttonColor: getTextColor(darkMode),
    },
  }
  const keys = Object.keys(config)
  const scenes = [
    '',
    'Hover',
    'Pressed',
    'Focus',
    'Disabled',
  ]
  keys.forEach((key) => {
    scenes.forEach((scene) => {
      const colorKey = `textColor${scene}${upperFirst(key)}`
      otherColor.Button![colorKey] = getTextColor(darkMode)
    })
  })
  return otherColor
}

/**
 * 获取文字颜色，主要用于适配暗黑模式文字颜色
 *
 * @param {boolean} darkMode 暗黑模式
 * @return {string}
 */
export function getTextColor(darkMode: boolean): string {
  return darkMode ? commonDark.textColor2 : commonLight.baseColor
}

export function camelToCSSVar(str: string) {
  let temp = str.replace(/[A-Z]/g, (match) => {
    return `-${match.toLowerCase()}`
  })
  if (temp.startsWith('-')) {
    temp = temp.slice(1)
  }
  temp = temp.replace(/([a-z])(\d)/g, '$1-$2')
  return `--n-${temp}`
}

export function genCss(themeColor: Record<string, string>, darkMode: boolean): string {
  const configEntries = Object.entries(themeColor) as [string, string][]

  const configCssObj = {}

  /**
   * 生成公共变量
   */
  const commonLightColor = {
    bodyColor: commonLight.hoverColor,
    containerColor: commonLight.bodyColor,
    textColorBase: commonLight.textColorBase,
    textColor1: commonLight.textColor1,
    textColor2: commonLight.textColor2,
    textColor3: commonLight.textColor3,
    textColorDisabled: commonLight.textColorDisabled,
    actionColor: commonLight.actionColor,
    borderColor: commonLight.borderColor,
  }
  const commonDarkColor = {
    bodyColor: commonDark.bodyColor,
    containerColor: commonDark.bodyColor,
    textColorBase: commonDark.textColorBase,
    textColor1: commonDark.textColor1,
    textColor2: commonDark.textColor2,
    textColor3: commonDark.textColor3,
    textColorDisabled: commonDark.textColorDisabled,
    actionColor: commonDark.actionColor,
    borderColor: commonDark.borderColor,
  }

  const textColorsEntries = Object.entries(darkMode ? commonDarkColor : commonLightColor) as [string, string][]
  for (const [key, value] of textColorsEntries) {
    configCssObj[`${camelToCSSVar(key)}`] = value
  }

  /**
   * 生成颜色变量
   */
  const themeColorsEntries = Object.entries(getThemeColors(themeColor, false)) as [string, string][]
  for (const [key, value] of themeColorsEntries) {
    const { r, g, b } = getRGBColor(value)
    configCssObj[`${camelToCSSVar(key)}`] = `${r},${g},${b}`
  }

  /**
   * 生成颜色组合
   */
  for (const [key, value] of configEntries) {
    const generateColors = getGenerateColors(value, darkMode)
    generateColors.map((color, index) => {
      const { r, g, b } = getRGBColor(color)
      configCssObj[`--n-${key}-color-${index + 1}`] = `${r},${g},${b}`
      return null
    })
  }

  return entriesToCss(Object.entries(configCssObj))
}

export function generateColorCombinations(): Record<string, string> {
  const colorTypes = ['primary', 'info', 'success', 'warning', 'error', 'gray']
  const colorScenes = ['hover', 'pressed', 'focus', 'disabled']
  const result: Record<string, string> = {}
  for (const type of colorTypes) {
    result[type] = `rgba(var(--n-${type}-color))`
    for (let i = 1; i <= 10; i++) {
      result[`${type}-${i}`] = `rgba(var(--n-${type}-color-${i}))`
    }
    for (const scene of colorScenes) {
      result[`${type}-${scene}`] = `rgba(var(--n-${type}-color-${scene}))`
    }
  }
  return result
}
