import { defineComponent, ref, watch, toRef, onMounted } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useQuasar } from 'quasar'
import { tools } from '@store/Modules/tools'
import { costanti } from '@costanti'

export default defineComponent({
  name: 'CMyChipList',
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: [String, Number, Array],
    type: {
      type: Number,
      required: true,
    },
    optlab: {
      type: String,
      required: true,
    },
    optval: {
      type: String,
      required: true,
    },
    myclass: {
      type: String,
      required: false,
      default: ''
    },
    opticon: {
      type: String,
      required: false,
      default: ''
    },
    optcolor: {
      type: String,
      required: false,
      default: ''
    },
  },
  components: {},
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()

    const myval = toRef(props, 'value')
    const myarrvalues = ref(<any>[])

    watch(() => myval.value, (newval, oldval) => {
      refreshval()
    })

    function refreshval() {
      myarrvalues.value = []

      // console.table(options)
      if (props.options) {
        props.options.forEach((rec: any, index) => {
          if (props.type === costanti.FieldType.multiselect) {
            if (!!myval.value) {
              // @ts-ignore
              if (myval.value.includes(rec[props.optval])) {
                const mydata: any = {
                  label: null,
                  value: rec[props.optval],
                  // myris = mylist.filter((myrec) => arrval.includes(myrec[key]))
                  valbool: true,
                  icon: '',
                  color: tools.getColorByIndexBest(index)
                }

                if (tools.isObject(props.optlab)) {
                  // @ts-ignore
                  mydata.label = props.options.filter((myrec: any) => myrec[props.optval] === mydata.value).map(props.optlab)
                  if (mydata.label)
                    mydata.label = mydata.label[0]
                } else {
                  mydata.label = rec[props.optlab]
                }

                if (props.opticon)
                  mydata.icon = rec[props.opticon]
                if (props.optcolor)
                  mydata.color = rec[props.optcolor]

                myarrvalues.value.push(mydata)
              }
            }
          } else if (props.type === costanti.FieldType.select) {
            if (myval.value === rec[props.optval]) {
              const mydata: any = {
                value: myval.value,
                valbool: true,
                icon: '',
                color: tools.getColorByIndexBest(index)
              }

              // console.log('mydata', mydata, 'optlab', optlab, 'myval.value', myval.value)

              if (tools.isObject(props.optlab)) {
                // @ts-ignore
                mydata.label = props.options.filter((myrec: any) => myrec[props.optval] === mydata.value).map(props.optlab)
                if (mydata.label)
                  mydata.label = mydata.label[0]
              } else {
                mydata.label = rec[props.optlab]
              }

              if (props.opticon)
                mydata.icon = rec[props.opticon]
              if (props.optcolor)
                mydata.color = rec[props.optcolor]

              myarrvalues.value.push(mydata)
            }

          } else {
            if (tools.isBitActive(myval.value, rec[props.optval])) {
              const mydata = {
                label: t(rec[props.optlab]),
                value: rec[props.optval],
                valbool: tools.isBitActive(myval.value, rec[props.optval]),
                icon: '',
                color: tools.getColorByIndexBest(index)
              }

              if (props.opticon)
                mydata.icon = rec[props.opticon]
              if (props.optcolor)
                mydata.color = rec[props.optcolor]

              myarrvalues.value.push(mydata)
            }
          }
        })
      }

      if (myarrvalues.value.length === 0)
        myarrvalues.value.push({ label: t('otherpages.manage.nessuno'), color: 'gray' })

      // console.log('arrvalues=', myarrvalues)
    }

    function mounted() {
      refreshval()
    }

    onMounted(mounted)

    return {
      myarrvalues,
    }
  }
})

