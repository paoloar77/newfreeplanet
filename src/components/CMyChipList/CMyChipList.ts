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
    type_out: {
      type: Number,
      required: false,
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
    const { t } = useI18n()

    const myval = toRef(props, 'value')
    const myarrvalues = ref(<any>[])

    watch(() => myval.value, (newval, oldval) => {
      refreshval()
    })

    function refreshval() {
      // console.log('refreshval')
      myarrvalues.value = []

      // console.log('options', props.options)
      if (props.options) {
        props.options.forEach((rec: any, index) => {
          if (props.type === costanti.FieldType.multiselect) {
            if (!!myval.value) {
              /*
              console.log('rec', rec)
              console.log('optval', props.optval)
              console.log('optlab', props.optlab)
              console.log('myval.value', myval.value)
              console.log('rec[props.optval]', rec[props.optval])

               */

              let trovato = false

              if (props.type_out === costanti.FieldType.object) {
                // @ts-ignore
                trovato = myval.value.find((recout) => recout[props.optval] === rec[props.optval])
              } else {
                // @ts-ignore
                trovato = myval.value.includes(rec[props.optval])
              }

              if (trovato) {
                const mydata: any = {
                  label: null,
                  value: rec[props.optval],
                  // myris = mylist.filter((myrec) => arrval.includes(myrec[key]))
                  valbool: true,
                  icon: '',
                  color: tools.getColorByIndexBest(index)
                }

                if (rec['color']) {
                  mydata.color = rec['color']
                }

                /*
                if (rec['theme']) {
                  mydata.class = rec['theme']
                }
                 */

                // console.log('mydata', mydata)

                if (tools.isObject(props.optlab)) {
                  // @ts-ignore
                  mydata.label = props.options.filter((myrec: any) => myrec[props.optval] === mydata.value).map(props.optlab)
                  if (mydata.label)
                    mydata.label = mydata.label[0]
                } else {
                  mydata.label = rec[props.optlab]
                }

                // console.log('mydata.label', mydata.label)

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

