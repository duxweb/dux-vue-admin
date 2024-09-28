import { getGenerateColors } from './helper'

export function getTheme(colors: string[], dark: boolean) {
  const colorLine = getGenerateColors(colors[0], dark).splice(0, 7).reverse()

  const theme = {
    color: colors,
    backgroundColor: 'rgba(255,255,255,0)',
    textStyle: {},
    grid: {
      left: '10',
      right: '10',
      top: '10%',
      bottom: '5%',
      containLabel: true,
    },
    title: {
      textStyle: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'left',
        color: 'var(--n-text-color-1)',
      },
      subtextStyle: {
        color: 'var(--n-text-color-3)',
      },
    },

    line: {
      itemStyle: {
        borderWidth: '2',
      },
      lineStyle: {
        width: '2',
      },
      areaStyle: {
        opacity: 0.3,
      },
      symbolSize: '8',
      symbol: 'emptyCircle',
      smooth: false,
    },
    radar: {
      itemStyle: {
        borderWidth: '2',
      },
      lineStyle: {
        width: '2',
      },
      symbolSize: '6',
      symbol: 'emptyCircle',
      smooth: false,
    },
    bar: {
      itemStyle: {
        opacity: 0.7,
        barBorderWidth: 0,
        barBorderColor: 'rgb(var(--n-gray-color-5))',
        borderRadius: 0,
      },
    },
    pie: {
      itemStyle: {
        opacity: 0.8,
        borderWidth: 1.5,
        borderColor: 'rgb(var(--n-gray-color-1))',
        borderRadius: 5,
      },
    },
    scatter: {
      itemStyle: {
        borderWidth: 0,
        borderColor: 'rgb(var(--n-gray-color-5))',
      },
    },
    boxplot: {
      itemStyle: {
        borderWidth: 0,
        borderColor: 'rgb(var(--n-gray-color-5))',
      },
    },
    parallel: {
      itemStyle: {
        borderWidth: 0,
        borderColor: 'rgb(var(--n-gray-color-5))',
      },
    },
    sankey: {
      itemStyle: {
        borderWidth: 0,
        borderColor: 'rgb(var(--n-gray-color-5))',
      },
    },
    funnel: {
      itemStyle: {
        borderWidth: 2,
        borderColor: 'rgb(var(--n-gray-color-1))',
      },
    },
    gauge: {
      itemStyle: {
        borderWidth: 0,
        borderColor: 'rgb(var(--n-gray-color-5))',
      },
    },
    candlestick: {
      itemStyle: {
        color: '#e6a0d2',
        color0: 'transparent',
        borderColor: '#e6a0d2',
        borderColor0: '#3fb1e3',
        borderWidth: '2',
      },
    },
    graph: {
      itemStyle: {
        borderWidth: 0,
        borderColor: 'rgb(var(--n-gray-color-5))',
      },
      lineStyle: {
        width: '1',
        color: 'rgb(var(--n-gray-color-3))',
      },
      symbolSize: '8',
      symbol: 'emptyCircle',
      smooth: false,
      color: [
        '#3fb1e3',
        '#6be6c1',
        'themeColor.primary',
        '#a0a7e6',
        '#c4ebad',
        '#96dee8',
      ],
      label: {
        color: 'rgb(var(--n-gray-color-1))',
      },
    },
    map: {
      itemStyle: {
        areaColor: 'rgb(var(--n-gray-color-1))',
        borderColor: 'rgb(var(--n-gray-color-7))',
        borderWidth: 0.5,
      },
      label: {
        show: false,
        color: 'rgb(var(--n-gray-color-8))',
      },
      emphasis: {
        itemStyle: {
          areaColor: 'rgba(var(--n-primary-color), 0.25)',
          borderColor: 'rgb(var(--n-primary-color))',
          borderWidth: 1,
        },
        label: {
          color: 'rgb(var(--n-primary-color))',
        },
      },
    },
    geo: {
      itemStyle: {
        areaColor: 'rgb(var(--n-gray-color-1))',
        borderColor: 'rgb(var(--n-gray-color-7))',
        borderWidth: 0.5,
      },
      label: {
        color: 'rgb(var(--n-gray-color-1))',
      },
      emphasis: {
        itemStyle: {
          areaColor: 'rgba(var(--n-primary-color), 0.25)',
          borderColor: 'rgb(var(--n-primary-color))',
          borderWidth: 1,
        },
        label: {
          color: 'rgb(var(--n-primary-color))',
        },
      },
    },
    categoryAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgb(var(--n-gray-color-3))',
        },
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: 'rgb(var(--n-gray-color-8))',
        },
      },
      axisLabel: {
        show: true,
        color: 'rgb(var(--n-gray-color-7))',
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: [
            'rgb(var(--n-gray-color-2))',
          ],
        },
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: [
            'rgba(250,250,250,0.05)',
            'rgba(200,200,200,0.02)',
          ],
        },
      },
    },
    valueAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgb(var(--n-gray-color-3))',
        },
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: 'rgb(var(--n-gray-color-8))',
        },
      },
      axisLabel: {
        show: true,
        color: 'rgb(var(--n-gray-color-7))',
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: [
            'rgb(var(--n-gray-color-2))',
          ],
        },
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: [
            'rgba(var(--n-gray-color-10), 0)',
            'rgba(var(--n-gray-color-10), 0.02)',
          ],
        },
      },
    },
    logAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgb(var(--n-gray-color-3))',
        },
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: 'rgb(var(--n-gray-color-8))',
        },
      },
      axisLabel: {
        show: true,
        color: 'rgb(var(--n-gray-color-7))',
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: [
            'rgb(var(--n-gray-color-2))',
          ],
        },
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: [
            'rgba(250,250,250,0.05)',
            'rgba(200,200,200,0.02)',
          ],
        },
      },
    },
    timeAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgb(var(--n-gray-color-3))',
        },
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: 'rgb(var(--n-gray-color-8))',
        },
      },
      axisLabel: {
        show: true,
        color: 'rgb(var(--n-gray-color-7))',
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: [
            'rgb(var(--n-gray-color-2))',
          ],
        },
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: [
            'rgba(250,250,250,0.05)',
            'rgba(200,200,200,0.02)',
          ],
        },
      },
    },
    toolbox: {
      iconStyle: {
        borderColor: 'rgb(var(--n-gray-color-7))',
      },
      emphasis: {
        iconStyle: {
          borderColor: 'rgb(var(--n-gray-color-6))',
        },
      },
    },
    legend: {
      textStyle: {
        color: 'rgb(var(--n-gray-color-7))',
      },
    },
    tooltip: {
      backgroundColor: 'rgba(var(--n-gray-color-1), 1)',
      borderWidth: 0,
      textStyle: {
        color: 'rgb(var(--n-gray-color-9))',
      },
      axisPointer: {
        lineStyle: {
          color: 'rgb(var(--n-gray-color-3))',
          width: 1,
        },
        crossStyle: {
          color: 'rgb(var(--n-gray-color-3))',
          width: 1,
        },
      },
    },
    timeline: {
      lineStyle: {
        color: 'themeColor.primary',
        width: 1,
      },
      itemStyle: {
        color: 'themeColor.primary',
        borderWidth: 1,
      },
      controlStyle: {
        color: 'themeColor.primary',
        borderColor: 'themeColor.primary',
        borderWidth: 0.5,
      },
      checkpointStyle: {
        color: '#3fb1e3',
        borderColor: '#3fb1e3',
      },
      label: {
        color: 'themeColor.primary',
      },
      emphasis: {
        itemStyle: {
          color: 'themeColor.primary',
        },
        controlStyle: {
          color: 'themeColor.primary',
          borderColor: 'themeColor.primary',
          borderWidth: 0.5,
        },
        label: {
          color: 'themeColor.primary',
        },
      },
    },
    visualMap: {
      color: colorLine,
    },
    dataZoom: {
      backgroundColor: 'rgba(255,255,255,0)',
      dataBackgroundColor: 'rgba(222,222,222,1)',
      fillerColor: 'rgba(114,230,212,0.25)',
      handleColor: 'rgb(var(--n-gray-color-3))',
      handleSize: '100%',
      textStyle: {
        color: 'rgb(var(--n-gray-color-7))',
      },
    },
    markPoint: {
      label: {
        color: 'rgb(var(--n-gray-color-1))',
      },
      emphasis: {
        label: {
          color: 'rgb(var(--n-gray-color-1))',
        },
      },
    },
  }

  return theme
}
