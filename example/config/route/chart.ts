export default [
  {
    label: '图表',
    name: 'component.chart',
    icon: 'i-tabler:chart-bar',
  },
  {
    label: '网格图表',
    name: 'component.chartGrid',
    path: 'component/chartGrid',
    parent: 'component.chart',
    component: () => import('../../pages/chart/chartGrid.vue'),
  },
  {
    label: '面积图表',
    name: 'component.chartArea',
    path: 'component/chartArea',
    parent: 'component.chart',
    component: () => import('../../pages/chart/chartArea.vue'),
  },
  {
    label: '地图图表',
    name: 'component.chartMap',
    path: 'component/chartMap',
    parent: 'component.chart',
    component: () => import('../../pages/chart/chartMap.vue'),
  },
]
