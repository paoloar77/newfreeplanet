import { defineComponent, onMounted, ref } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { tools } from '@store/Modules/tools'

export default defineComponent({
  name: 'CMyToggleList',
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: [String, Number, Array],
    label: {
      type: String,
      required: true,
    },
    myclass: {
      type: String,
      required: false,
      default: ''
    },
    optlab: {
      type: String,
      required: true,
    },
    optval: {
      type: String,
      required: true,
    },
    isarray: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {},
  setup(props, { emit }) {
    const { t } = useI18n()

    const myvalue = ref('')
    const myarrvalues = ref(<any>[])

    function changeval(newval: any) {
      // Update value
      let totale: any = null
      if (props.isarray) {
        totale = myarrvalues.value.filter((rec: any) => rec.valbool).map((a: any) => a.value)
      } else {
        totale = myarrvalues.value.filter((rec: any) => rec.valbool).reduce((sum: number, rec: any) => sum + rec.value, 0)
      }
      console.log('totale', totale)
      myvalue.value = totale

      // Refresh value
      emit('update:value', myvalue.value)
    }

    function mounted() {
      console.log('mounted')
      myarrvalues.value = []

      // console.log('value', value)
      // console.log('optval', optval)
      // console.log('optlab', optlab)

      if (props.isarray) {
        // console.table(options)
        props.options.forEach((rec: any) => {
          console.log('rec: ', rec, 'optval', props.optval, 'optlab', props.optlab)
          const mydata = {
            label: '',
            value: rec[props.optval],
            valbool: false
          }

          const lab = rec[`${props.optlab}`]
          console.log('lab', lab)

          if (tools.isObject(props.optlab)) {
            // @ts-ignore
            const arr = props.options.filter((myrec: any) => myrec[props.optval] === mydata.value).map(props.optlab)
            if (arr) {
              // @ts-ignore
              mydata.label = arr[0]
            }
          } else {
            mydata.label = t(rec[props.optlab])
          }

          if (props.value) {
            // @ts-ignore
            mydata.valbool = props.value.includes(rec[props.optval])
          }
          console.log('mydata ', mydata)
          myarrvalues.value.push(mydata)
        })

      } else {
        // console.table(options)
        props.options.forEach((rec: any) => {
          const mydata: any = {
            label: t(rec[props.optlab]),
            value: rec[props.optval],
            valbool: tools.isBitActive(props.value, rec[props.optval])
          }
          myarrvalues.value.push(mydata)
        })
      }
    }

    onMounted(mounted)

    return {
      tools,
      myarrvalues,
      changeval,
    }
  }
})
