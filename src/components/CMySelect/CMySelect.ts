import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'
import { costanti } from '@costanti'
import { fieldsTable } from '@store/Modules/fieldsTable'
import { shared_consts } from '@/common/shared_vuejs'

export default defineComponent({
  name: 'CMySelect',
  emits: ['update:value', 'update:arrvalue', 'changeval'],
  props: {
    options: {
      type: Array,
      required: true,
    },
    arrvalue: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },
    value: [String, Number],
    label: {
      type: String,
      required: true,
    },
    myclass: {
      type: String,
      required: false,
      default: ''
    },
    tablesel: {
      type: String,
      required: false,
      default: ''
    },
    optlab: [String, Function],
    optval: {
      type: String,
      required: true,
    },
    useinput: {
      type: Boolean,
      required: false,
      default: true
    },
    pickup: {
      type: Boolean,
      required: false,
      default: false
    },
    addall: {
      type: Boolean,
      required: false,
      default: false
    },
    dense: {
      type: Boolean,
      required: false,
      default: true
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    newvaluefunc: {
      type: Function,
      required: false,
    },
    funcgetvaluebyid: {
      type: Function,
      required: false,
    },
    multiselect_by_server: {
      type: Boolean,
      default: false,
    }
  },
  components: {},
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()
    const globalStore = useGlobalStore()

    const optFiltered = ref(<any>[])
    const valori = ref(<any>[])

    const myvalue = ref(<string | number>'')
    const myarrvalue = ref(<any[]>[])
    const arrtempOpt = ref(<any[]>[])

    const valoriload = computed(() => {
      let myarr = props.options
      if (props.addall) {
        let myobj: any = {}
        if (typeof props.optlab === 'string') {
          myobj[props.optlab] = '(Tutti)'
          myobj[props.optval] = costanti.FILTER_TUTTI
        }

        myarr = [myobj, ...myarr]
      }

      return myarr
    })

    watch(() => props.options, (value: any, oldval: any) => {
        if (!props.multiselect_by_server) {
          valori.value = valoriload.value
          // console.log('@@@ VALORI CHANGED (1)', valori.value)
        }
      },
    )
    watch(() => props.value, (value: any, oldval: any) => {
        mounted()
      },
    )

    watch(() => props.arrvalue, (value: any, oldval: any) => {
        console.log(' MODIF props.arrvalue', props.arrvalue)
        mounted()
      },
    )

    function saveOptInCookie(arrval: any) {

      if (arrval) {
        for (const id of arrval) {
          let trovato = arrtempOpt.value.find((rec) => rec._id === id)
          if (!trovato) {
            const rec = valori.value.find((rec: any) => rec._id === id)
            if (rec) {
              // console.log('SAVE OPT rec', rec)
              let obj: any = {}
              obj[`${props.optval}`] = id
              obj[`${props.optlab}`] = rec[`${props.optlab}`]
              arrtempOpt.value.push(obj)
              let num = localStorage.getItem(props.tablesel + 'NUM') || 0
              try {
                if (!num) {
                  num = 0
                } else {
                  num = parseInt(num.toString())
                }
              } catch (e) {
                num = 0
              }
              // console.log('-----------  valori.value', valori.value)
              // console.log('-----------  arrtempOpt.value', arrtempOpt.value)

              localStorage.setItem(props.tablesel + num + props.optval, id)
              localStorage.setItem(props.tablesel + num + props.optlab, rec[`${props.optlab}`])

              num += 1
              localStorage.setItem(props.tablesel + 'NUM', num.toString())
            }
          }
        }
      }
    }


    function changeval(newval: any) {
      // console.log(' ½½½½½½½ changeval', newval)
      if (props.multiselect_by_server) {
        // localStorage.setItem(props.tablesel + '_' + newval, valori.value[newval])
        myarrvalue.value = newval && newval['arrvalue'] ? newval['arrvalue'] : newval
        saveOptInCookie(newval)

        // console.log(' ----- Myselect changeval Arrvalue', myarrvalue.value)
        emit('update:arrvalue', myarrvalue.value)
        emit('changeval', myarrvalue.value)


      } else {
        if (props.tablesel === shared_consts.TAB_COUNTRY)
          myvalue.value = newval && newval['value'] ? newval['value'] : newval
        else if (props.tablesel === shared_consts.TAB_CITIES)
          myvalue.value = newval && newval['value'] ? newval['value'] : newval
        else if (props.tablesel === shared_consts.TAB_PHONES)
          myvalue.value = newval && newval['code'] ? newval['code'] : newval
        else
          myvalue.value = newval
        // console.log('Myselect changeval', myvalue.value)
        emit('update:value', myvalue.value)
        emit('changeval', myvalue.value)
      }
    }

    function mounted() {
      console.log(' #### mounted myselect', props.options, 'arrvalue', myarrvalue.value)
      let rec: any
      if (props.options) {
        if (!props.multiselect_by_server) {
          rec = props.options.find((myrec: any) => myrec[`${props.optval}`] === props.value)
        }
      }
      if (props.multiselect_by_server) {
        const num = parseInt(localStorage.getItem(props.tablesel + 'NUM')!)
        console.log('num LOADED ', num)
        arrtempOpt.value = []
        if (props.addall) {
          let myobj: any = {}
          if (typeof props.optlab === 'string') {
            myobj[props.optlab] = '(Tutti)'
            myobj[props.optval] = costanti.FILTER_TUTTI
          }

          arrtempOpt.value.push(myobj)
        }
        for (let i = 0; i < num; i++) {
          const itemId = parseInt(localStorage.getItem(props.tablesel + i + props.optval)!)
          const itemlab = localStorage.getItem(props.tablesel + i + props.optlab)
          if (itemId) {
            let obj: any = {}
            obj[`${props.optval}`] = itemId
            obj[`${props.optlab}`] = itemlab
            if (!arrtempOpt.value.find((rec) => rec._id === itemId))
              arrtempOpt.value.push(obj)
          }
        }

        myarrvalue.value = []
        for (const val of props.arrvalue) {
          rec = arrtempOpt.value.find((myrec: any) => val === (myrec[`${props.optval}`]))
          if (rec) {
            myarrvalue.value.push(rec[`${props.optval}`])
          }
        }
      }
      if (rec) {
        if (props.funcgetvaluebyid)
          myvalue.value = props.funcgetvaluebyid(rec[`${props.optval}`])
        else
          myvalue.value = rec[`${props.optlab}`]
      } else {
        // if (!props.useinput) {
        if (props.value) {
          myvalue.value = props.value
        }
        // }
      }
      if (!props.multiselect_by_server) {
        valori.value = valoriload.value
        console.log('@@@ VALORI CHANGED (4)', valori.value)
      } else {
        valori.value = arrtempOpt.value
      }
      // console.log('cmyselect: myvalue.value', myvalue.value)
    }

    function filterFn(val: any, update: any, abort: any) {
      update(
        () => {
          console.log('Filter val', val, val.length)
          let myarr: any = []

          if (val.length <= 1) {
            valori.value = arrtempOpt.value
            return
          }

          let mystr = val.toLocaleLowerCase()

          console.log('props.tablesel', props.tablesel)

          if (fieldsTable.tableRemotePickup.includes(props.tablesel)) {
            try {
              if (mystr !== '')
                return globalStore.loadPickup({ table: props.tablesel, search: mystr })
                  .then((ris) => {
                    myarr = props.options
                    if (ris) {
                      if (props.addall) {
                        let myobj: any = {}
                        if (typeof props.optlab === 'string') {
                          myobj[props.optlab] = '(Tutti)'
                          myobj[props.optval] = costanti.FILTER_TUTTI
                        }

                        ris = [myobj, ...ris]
                      }
                      valori.value = ris
                      if (props.multiselect_by_server) {
                        console.log('@@@ VALORI CHANGED (2)', valori.value)
                      }
                    }

                  })

              if (myarr === null) {
                valori.value = arrtempOpt.value
                return
              }
            } catch (e) {
              valori.value = arrtempOpt.value
              return
            }
            // const needle = val.toLocaleLowerCase()
            // optFiltered.value = optFiltered.value.filter((v: any) => v.toLocaleLowerCase().indexOf(needle) > -1)
          } else {
            myarr = props.options
          }

          if (props.addall) {
            let myobj: any = {}
            if (typeof props.optlab === 'string') {
              myobj[props.optlab] = '(Tutti)'
              myobj[props.optval] = costanti.FILTER_TUTTI
            }

            myarr = [myobj, ...myarr]
          }

          if (myarr && myarr.length > 0) {
            valori.value = myarr
            if (props.multiselect_by_server) {
              console.log('@@@ VALORI CHANGED (3)', valori.value)
            }
          }

          console.log('*** OUT: tablesel', props.tablesel, 'filterFn', myarr)
        },
        // "ref" is the Vue reference to the QSelect
        (ref: any) => {
          if (val !== '' && ref.options.length > 0) {
            ref.setOptionIndex(-1) // reset optionIndex in case there is something selected
            ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
          }
        }
      )
    }

    function abortFilterFn() {
      console.log('delayed filter aborted')
    }

    function checkIfShowRec(rec: any) {
      return (rec._id > 0 && typeof rec._id === 'number') || rec._id !== 'number'
    }

    onMounted(mounted)


    return {
      changeval,
      myvalue,
      myarrvalue,
      valori,
      filterFn,
      fieldsTable,
      checkIfShowRec,
      abortFilterFn,
    }
  }
})

