import Vue, { computed, defineComponent, onMounted, ref } from 'vue'

import { tools } from '../../store/Modules/tools'
import { useUserStore } from '@store/UserStore'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '@store/globalStore'
import { useI18n } from '@/boot/i18n'
import { useQuasar } from 'quasar'

import { Chart, ChartData, ChartOptions, registerables } from 'chart.js'

import { LineChart, useLineChart } from 'vue-chart-3'


Chart.register(...registerables)

export default defineComponent({
  name: 'CLineChart',
  components: { LineChart },
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
    const myarrsum = ref(<any>[])

    // @ts-ignore
    const chartData = computed<ChartData<'line'>>(() => ({
      labels: myarrlabel.value,
      datasets: [
        {
          label: 'Totali',
          data: myarrsum.value,
          backgroundColor: tools.colourNameToHex('green'),
        },
        {
          label: props.title,
          data: myarrdata.value,
          borderColor: tools.colourNameToHex('red'),
          backgroundColor: tools.colourNameToHex(props.color),
          fill: true,
        },
      ],
    }))

    const options = computed<ChartOptions<'line'>>(() => ({
      elements: {
        line: {
          tension: 0.4
        }
      },
      interaction: {
        intersect: false
      },
    }))

    const { lineChartProps, lineChartRef } = useLineChart({
      chartData,
      options,

    })

    function mounted() {
      myarrdata.value = []
      myarrlabel.value = []
      myarrsum.value = []

      let somma = 0
      if (props.sum)
        somma = props.offset

      let rec: any

      let ind = 1

      for (rec of props.mydata) {
        if (props.sum) {
          somma += rec.count
        } else {
          somma = rec.count
        }
        //myarrlabel.value.push(rec._id)
        myarrlabel.value.push(ind)
        myarrdata.value.push(rec.count)
        myarrsum.value.push(somma)
        ind++
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
      lineChartProps,
      lineChartRef,
      myarrdata,
      myarrlabel,
    }
  },
})
