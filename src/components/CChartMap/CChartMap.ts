/* eslint-disable no-console */
import qs from 'qs'
// import VChart from '../ECharts'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, defineComponent, onMounted } from 'vue'

import {
  use,
  registerMap,
  registerTheme,
  connect,
  disconnect
} from 'echarts/core'
import {
  MapChart,
} from 'echarts/charts'
import {
  GeoComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DatasetComponent,
  ToolboxComponent,
  DataZoomComponent
} from 'echarts/components'
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'


// custom theme
import theme from './theme.json'

// Map of China
// import italyMap from './italy.json'
// import italiaMap from './data/italia.json'
import italiaMap from './data/limits_IT_provinces.json'
import worldMap from './world.json'
import { watch } from 'vue'

use([
  MapChart,
  GeoComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DatasetComponent,
  CanvasRenderer,
  SVGRenderer,
  ToolboxComponent,
  DataZoomComponent
])

// registering map data
// @ts-ignore
registerMap('italia', italiaMap)
// registerMap('italy', italyMap)
// @ts-ignore
registerMap('world', worldMap)

require ('./data/Italy.js')

// registering custom theme
registerTheme('ovilia-green', theme)

export default defineComponent({
  name: 'CChartMap',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    sublink: {
      type: String,
      required: false,
      default: ''
    },
    serie1: {
      type: String,
      required: false,
      default: ''
    },
  },
  components: {
    VChart
  },
  setup(props) {
    const options = qs.parse(location.search, { ignoreQueryPrefix: true })
    const initOptions = {
      renderer: options.renderer || 'canvas'
    }

    const data = ref([
      { name: '海门', value: 9 },
      { name: '鄂尔多斯', value: 12 },
      { name: '招远', value: 12 },
    ])

    const geoCoordMap = {
      海门: [121.15, 31.89],
      鄂尔多斯: [109.781327, 39.608266],
      招远: [120.38, 37.35],
    }

    const textStyle = {
      fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif'
    }
    const backgroundColor = '#404a59'
    const title = {
      text: '',
      subtext: 'data from PM25.in',
      sublink: 'http://www.pm25.in',
      left: 'center',
      textStyle: {
        color: '#fff'
      }
    }
    const tooltip = {
      trigger: 'item'
    }

    const legend = {
      orient: 'vertical',
      y: 'bottom',
      x: 'right',
      data: ['aaa'],
      textStyle: {
        color: '#fff'
      }
    }
    const geo = {
      map: 'italia',
      emphasis: {
        label: {
          show: false
        },
        itemStyle: {
          areaColor: '#2a333d'
        }
      },
      itemStyle: {
        areaColor: '#323c48',
        borderColor: '#111'
      }
    }
    const series = [
      {
        name: 'aaa',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(data.value),
        symbolSize: (val: any) => {
          return val[2] / 10
        },
        tooltip: {
          formatter: function (val: any) {
            return val.name + ': ' + val.value[2]
          }
        },
        itemStyle: {
          color: '#ddb926'
        }
      },
      {
        name: 'Top 5',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: convertData(data.value.sort((a: any, b: any) => b.value - a.value).slice(0, 6)),
        symbolSize: (val:any) => val[2] / 10,
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        emphasis: {
          scale: true
        },
        tooltip: {
          formatter: function (val: any) {
            return val.name + ': ' + val.value[2]
          }
        },
        label: {
          formatter: '{b}',
          position: 'right',
          show: true
        },
        itemStyle: {
          color: '#f4e925',
          shadowBlur: 10,
          shadowColor: '#333'
        },
        zlevel: 1
      }
    ]

    watch(() => initOptions.renderer, (value, oldval) => {
      options.renderer = value === 'svg' ? value : undefined
      let query = qs.stringify(options)
      query = query ? '?' + query : ''
      history.pushState(
        {},
        document.title,
        `${location.origin}${location.pathname}${query}${location.hash}`
      )
    })

    function convert() {
      /*
      const map = $refs.map;
      img = {
        src: map.getDataURL({
          pixelRatio: window.devicePixelRatio || 1
        }),
        width: map.getWidth(),
        height: map.getHeight()
      };
      open = true;

       */
    }

    function mounted() {
      title.text = props.title
      title.subtext = props.subtitle
      title.sublink = props.sublink
      series[0].name = props.serie1
      legend.data[0] = props.serie1

    }

    function convertData(data: any[]) {
      const res = []
      for (let i = 0; i < data.length; i++) {
        // @ts-ignore
        const geoCoord: any = geoCoordMap[data[i].name]
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          })
        }
      }
      return res
    }

    onMounted(mounted)

    return {
      options,
      map: {
        series,
        textStyle,
        backgroundColor,
        title,
        tooltip,
        legend,
        geo,
      },
      expand: {
        map: true,
      },
      initOptions,
    }
  }
})
