import Vue, { computed, defineComponent, onMounted, ref } from 'vue'

import { tools } from '../../store/Modules/tools'
import { useUserStore } from '@store/UserStore'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '@store/globalStore'
import { useI18n } from '@/boot/i18n'
import { useQuasar } from 'quasar'

import { Chart, ChartData, ChartOptions, registerables } from 'chart.js'

import { BarChart, useBarChart } from 'vue-chart-3'


Chart.register(...registerables)

export default defineComponent({
  name: 'CBarChart',
  components: { BarChart },
  props: {
    mydata: { required: false, default: [] },
    title: { required: false, default: false },
    sum: { required: false, default: false },
    color: { required: false, default: 'red' },
    bordercolor: { required: false, default: 'red' },
    mycolors: { required: false, default: null },
    offset: { required: false, default: 0 },
  },
  setup(props, { emit }) {

    const userStore = useUserStore()
    const globalStore = useGlobalStore()
    const { t } = useI18n()
    const q = useQuasar()

    const myarrlabel = ref(<any>[])
    const myarrdata = ref(<any>[])
    const myarrbg = ref(<any>[])
    const myarrsum = ref(<any>[])

    // @ts-ignore
    const chartData = computed<ChartData<'bar'>>(() => ({
      labels: myarrlabel.value,
      datasets: [
        /*{
          label: 'Totali',
          data: myarrsum.value,
          backgroundColor: tools.colourNameToHex('green'),
        },*/
        {
          label: props.title,
          data: myarrdata.value,
          borderColor: tools.colourNameToHex('red'),
          backgroundColor: myarrbg.value,
          fill: true,
        },
      ],
    }))

    const options = computed<ChartOptions<'bar'>>(() => ({
      bar: {
      },
      interaction: {
        intersect: false
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }))

    const { barChartProps, barChartRef } = useBarChart({
      chartData,
      options,

    })

    function mounted() {
      myarrdata.value = []
      myarrbg.value = []
      myarrlabel.value = []
      myarrsum.value = []

      let somma = 0
      if (props.sum)
        somma = props.offset

      let rec: any

      let ind = ''

      let num = 1

      for (rec of props.mydata) {
        if (props.sum) {
          somma += rec.count
        } else {
          somma = rec.count
        }

        let day = rec._id.split('-')
        ind = day[2] + '/' + day[1]
        //myarrlabel.value.push(rec._id)
        myarrlabel.value.push(ind)
        myarrdata.value.push(rec.count)
        if (num === props.mydata.length) {
          myarrbg.value.push(tools.colourNameToHex('green'))
        } else {
          myarrbg.value.push(tools.colourNameToHex(props.color))
        }
        myarrsum.value.push(somma)
        num++
        // ind++
      }
    }

    function getoffset() {
      return props.offset
    }

    onMounted(mounted)

    return {
      tools,
      getoffset,
      q,
      options,
      barChartProps,
      barChartRef,
      myarrdata,
      myarrlabel,
    }
  },
})
