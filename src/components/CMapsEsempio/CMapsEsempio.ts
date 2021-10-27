/* eslint-disable no-console */
import qs from 'qs'
// import VChart from '../ECharts'
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, defineComponent } from 'vue';

import {
  use,
  registerMap,
  registerTheme,
  connect,
  disconnect
} from 'echarts/core'
import {
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  RadarChart,
  ScatterChart,
  EffectScatterChart,
  LinesChart
} from 'echarts/charts'
import {
  GridComponent,
  PolarComponent,
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
// import "echarts-liquidfill";
// import logo from "./data/logo";
import getBar from './data/bar'
import pie from './data/pie'
import polar from './data/polar'
import scatter from './data/scatter'
import map from './data/map'
import { c1, c2 } from './data/connect'

// custom theme
import theme from './theme.json'

// Map of China
import chinaMap from './china.json'
import worldMap from './world.json'
import { watch } from 'vue'

use([
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  RadarChart,
  ScatterChart,
  EffectScatterChart,
  LinesChart,
  GridComponent,
  PolarComponent,
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
registerMap('china', chinaMap)
// @ts-ignore
registerMap('world', worldMap)

// registering custom theme
registerTheme('ovilia-green', theme)

export default defineComponent({
  name: 'CMapsEsempio',
  components: {
    VChart
  },
  setup() {
    const options = qs.parse(location.search, { ignoreQueryPrefix: true })
    const initOptions = {
      renderer: options.renderer || 'canvas'
    }

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

    function handleClick(...args: any) {
      console.log('click from echarts', ...args)
    }

    function handleZrClick(...args: any) {
      console.log('click from zrender', ...args)
    }

    function refresh() {
      // simulating async data from server
      let seconds = 3
      let barLoading = true
      const timer = setInterval(() => {
        seconds--
        if (seconds === 0) {
          clearTimeout(timer)
          barLoading = false
          let bar = getBar()
        }
      }, 1000)
    }

    function toggleRenderer() {
      if (initOptions.renderer === 'canvas') {
        initOptions.renderer = 'svg'
      } else {
        initOptions.renderer = 'canvas'
      }
    }

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

    function loadFlights() {
      let flightLoaded = true
      let flightLoading = true

      import('./data/flight.json').then(({ default: data }) => {
        flightLoading = false

        function getAirportCoord(idx: any) {
          return [data.airports[idx][3], data.airports[idx][4]]
        }

        const routes = data.routes.map(airline => {
          return [getAirportCoord(airline[1]), getAirportCoord(airline[2])]
        })

        let flight = {
          textStyle: {
            fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif'
          },
          title: {
            text: 'World Flights',
            left: 'center',
            textStyle: {
              color: '#eee'
            }
          },
          backgroundColor: '#003',
          tooltip: {
            formatter(param: any) {
              const route = data.routes[param.dataIndex]
              return (
                data.airports[route[1]][1] + ' > ' + data.airports[route[2]][1]
              )
            }
          },
          geo: {
            map: 'world',
            left: 0,
            right: 0,
            silent: true,
            itemStyle: {
              borderColor: '#003',
              color: '#005'
            }
          },
          series: [
            {
              type: 'lines',
              coordinateSystem: 'geo',
              data: routes,
              large: true,
              largeThreshold: 100,
              lineStyle: {
                opacity: 0.05,
                width: 0.5,
                curveness: 0.3
              },
              blendMode: 'lighter'
            }
          ]
        }
      })
    }

    function startActions() {
      /*
      let dataIndex = -1;
      const pie = $refs.pie;

      if (!pie) {
        return;
      }

      const dataLen = pie.option.series[0].data.length;

      actionTimer = setInterval(() => {
        pie.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex
        });
        dataIndex = (dataIndex + 1) % dataLen;
        pie.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex
        });
        // 显示 tooltip
        pie.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex
        });
      }, 1000);

       */
    }

    function stopActions() {
      /*
      clearInterval(actionTimer);

       */
    }


    return {
      options,
      bar: getBar(),
      pie,
      polar,
      scatter,
      map,
      c1,
      c2,
      expand: {
        bar: true,
        pie: true,
        polar: true,
        scatter: true,
        map: true,
        radar: true,
        connect: true,
        flight: true
      },
      polarTheme: 'dark',
      seconds: -1,
      asyncCount: false,
      connected: true,
      metricIndex: 0,
      open: false,
      img: {},
      barLoading: false,
      barLoadingOptions: {
        text: 'Loading…',
        color: '#4ea397',
        maskColor: 'rgba(255, 255, 255, 0.4)'
      },
      flight: null,
      flightLoaded: false,
      flightLoading: false,
      flightLoadingOptions: {
        text: '',
        color: '#c23531',
        textColor: 'rgba(255, 255, 255, 0.5)',
        maskColor: '#003',
        zlevel: 0
      },
      initOptions,
    }
  }
})
