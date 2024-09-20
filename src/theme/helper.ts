import { generate } from '@ant-design/colors'
import { TinyColor } from '@ctrl/tinycolor'
import { entriesToCss } from '@unocss/core'
import { kebabCase, upperFirst } from 'lodash-es'
import { commonDark, commonLight } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'

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

/**
 * 获取 naive 主题
 * @param config
 * @param darkMode
 * @returns
 */
export function getThemeOverrides(
  config: Record<string, string>,
  darkMode: boolean,
): GlobalThemeOverrides {
  const themeColors = getThemeColors(config, darkMode)
  addCssVarsToHtml(config, darkMode, themeColors)
  return {
    common: {
      ...themeColors,
    },
    ...getOtherColor(config, darkMode),
  }
}

function getOtherColor(
  config: Record<string, string>,
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

export function genCss(config: Record<string, string>, themeColor: Record<string, string>, darkMode: boolean): string {
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

  /**
   * 生成公共变量
   */
  const commonColorsEntries = Object.entries(darkMode ? commonDarkColor : commonLightColor) as [string, string][]
  for (const [key, value] of commonColorsEntries) {
    configCssObj[`--n-${kebabCase(key)}`] = value
  }

  /**
   * 生成颜色变量
   */
  const themeColorsEntries = Object.entries(themeColor) as [string, string][]

  for (const [key, value] of themeColorsEntries) {
    const { r, g, b } = getRGBColor(value)
    configCssObj[`--n-${kebabCase(key)}`] = `${r},${g},${b}`
  }

  /**
   * 生成颜色组合
   */
  const configEntries = Object.entries(config) as [string, string][]
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

// 生成 unocss 颜色组合
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

// 添加色彩变量
export function addCssVarsToHtml(
  config: ThemeColor,
  darkMode: boolean,
  themeColors: ThemeColor,
): void {
  const $root: HTMLElement = document.documentElement
  $root.style.cssText = genCss(config, themeColors, darkMode)
}
