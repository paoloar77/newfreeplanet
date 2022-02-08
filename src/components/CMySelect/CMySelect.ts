import { computed, defineComponent, onMounted, PropType, ref, toRef, watch } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'
import { costanti } from '@costanti'
import { fieldsTable } from '@store/Modules/fieldsTable'
import { shared_consts } from '@/common/shared_vuejs'
import { IColGridTable, IOperators } from 'model'
import { tools } from '@store/Modules/tools'

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
    type_out: {
      type: Number,
      required: false,
    },
    row: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
    col: {
      type: Object as PropType<IColGridTable>,
      required: false,
      default: () => {
        return { name: '' }
      },
    },
    filter_table: {
      type: String,
      required: false,
      default: ''
    },
    filter_field: {
      type: String,
      required: false,
      default: ''
    },
    value_extra: {
      type: [String, Number],
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
    },
    sola_lettura: {
      type: Boolean,
      default: false,
    },
    withToggle: {
      type: Boolean,
      default: false,
    },
    icon_alternative: {
      type: String,
      required: false,
      default: '',
    },
    filter: {
      type: Function,
      required: false,
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

    const optionsreal: any = []

    const valoriload = computed(() => {
      return updateArrOptions()
    })

    watch(() => props.options, (value: any, oldval: any) => {
        if (!props.multiselect_by_server) {
          valori.value = valoriload.value
        } else {
          // console.log('@@@ VALORI CHANGED (1)', valori.value)
        }
      },
    )
    watch(() => props.value, (value: any, oldval: any) => {
        update()
      },
    )

    watch(() => props.arrvalue, (value: any, oldval: any) => {
        console.log(' MODIF props.arrvalue', props.arrvalue)
        update()
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
              localStorage.setItem(props.tablesel + num + props.optlab, tools.getValueByFunzOrVal(rec, props.optlab))

              num += 1
              localStorage.setItem(props.tablesel + 'NUM', num.toString())
            }
          }
        }
      }
    }


    function changeval(newval: any) {
      console.log(' ½½½½½½½ changeval', newval)
      if (props.multiple || props.multiselect_by_server) {
        // localStorage.setItem(props.tablesel + '_' + newval, valori.value[newval])

        if (props.type_out === costanti.FieldType.object) {
          // debugger;
          const arrout = []
          for (const val of newval) {
            let obj: any = {}
            if (typeof val !== 'object') {
              obj[props.optval] = val
              arrout.push(obj)
            } else {
              arrout.push(val)
            }
          }
          myarrvalue.value = arrout
        } else {
          myarrvalue.value = newval && newval['arrvalue'] ? newval['arrvalue'] : newval
        }

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
      optionsreal.value = props.options
      update()
    }

    function update() {
      // console.log('update')
      // console.log(' #### mounted myselect', props.options, 'arrvalue', myarrvalue.value)
      let rec: any
      if (optionsreal.value) {
        if (!props.multiselect_by_server) {
          rec = optionsreal.value.find((myrec: any) => myrec[`${props.optval}`] === props.value)
        }
      }
      if (props.multiselect_by_server) {
        const num = parseInt(localStorage.getItem(props.tablesel + 'NUM')!)
        // console.log('num LOADED ', num)
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

        // Check if exist other array:
        if (props.col) {
          if (props.col.remote_table && props.col.remote_key && props.col.remote_field) {

            try {
              const myarrremote = props.row[props.col.remote_table]

              for (const myrec of myarrremote) {
                let myidkey = myrec[props.col.remote_key]
                if (!arrtempOpt.value.includes(myidkey)){
                  let myobj: any = {}
                  myobj[props.col.remote_key] = myidkey
                  myobj[props.col.remote_field] = myrec[props.col.remote_field]
                  arrtempOpt.value.push(myobj)
                }
              }

            }catch (e){}

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

      if (props.tablesel === 'friendsandme') {
        // debugger;
      }

      if (props.multiple) {

        let arrrec = []
        if (props.arrvalue) {
          for (const val of props.arrvalue) {
            rec = optionsreal.value.find((myrec: any) => val === (myrec[`${props.optval}`]))
            if (rec) {
              arrrec.push(rec[`${props.optval}`])
            }
          }
        }
        if (arrrec.length > 0) {
          if (props.funcgetvaluebyid)
            myarrvalue.value = props.funcgetvaluebyid(arrrec)
          else
            myarrvalue.value = arrrec
        } else {
          if (props.arrvalue) {
            myarrvalue.value = props.arrvalue
          }
        }
      } else {
        if (rec) {
          if (props.funcgetvaluebyid)
            myvalue.value = props.funcgetvaluebyid(rec[`${props.optval}`])
          else
            myvalue.value = tools.getValueByFunzOrVal(rec, props.optlab)
        } else {
          // if (!props.useinput) {
          if (props.value) {
            myvalue.value = props.value
          }
          // }
        }
        // console.log('myvalue', props.tablesel, myvalue.value)
        // console.log('props.value', props.value)
      }

      if (props.multiselect_by_server) {
        valori.value = arrtempOpt.value
      } else {
        valori.value = valoriload.value
      }
      // console.log('cmyselect: myvalue.value', myvalue.value)
    }

    function updateArrOptions() {
      let myarr: any = []

      // console.log(props.col.jointable, props.filter)
      if (props.col.jointable) {
        optionsreal.value = globalStore.getTableJoinByName(props.col.jointable, props.col.addall, props.filter)
        // console.log('optionsreal.value', optionsreal.value)
      } else {
        optionsreal.value = props.options
      }

      // console.log('optionsreal.value', optionsreal.value)

      myarr = optionsreal.value
      if (!fieldsTable.tableRemotePickup.includes(props.tablesel)) {

        let needle: any = props.value_extra

        // console.log('needle', needle, 'props.multiple', props.multiple)
        if (props.filter_table) {
          // console.log('  FILTERTABLE', props.filter_field, myarr)
          if (props.multiple) {
            myarr = myarr.filter((rec: any) => rec[props.filter_field] === needle)
          } else {
            myarr = myarr.filter((rec: any) => rec[props.filter_field].includes(needle))
          }
          // console.log('  RISSSSSSSSS: ', myarr)
        }
      }

      if (props.addall) {
        let myobj: any = {}
        if (typeof props.optlab === 'string') {
          myobj[props.optlab] = '(Tutti)'
          myobj[props.optval] = costanti.FILTER_TUTTI
        }

        if (myarr)
          myarr = [myobj, ...myarr]
        // console.log('     myarr: ', myarr)
      }

      // console.log('     myarr: ', myarr)
      return myarr
    }

    function filterFn(val: any, update: any, abort: any) {
      update(
        async () => {
          console.log('Filter val', val, val.length)

          let myarr: any = []

          myarr = updateArrOptions()
          if (!fieldsTable.tableRemotePickup.includes(props.tablesel)) {
            if (myarr && myarr.length > 0) {
              valori.value = myarr
            } else {
              if (props.filter_table) {
                valori.value = []
              }
            }
            return
          }

          if (val.length <= 1) {
            console.log('@@@ LENGTH <= 1')
            abort()
            return
          }

          let mystr = val.toLocaleLowerCase()

          // console.log('props.tablesel', props.tablesel)

          if (fieldsTable.tableRemotePickup.includes(props.tablesel)) {
            try {
              myarr = optionsreal.value
              if (mystr !== '')
                // myarr = [{_id:1, prov: 'RN', descr: 'Rimini'}]
                myarr = await globalStore.loadPickup({ table: props.tablesel, search: mystr.trim() })

              if (myarr === null) {
                console.log('@@@ VALORI VALUE XXX', valori.value)
                valori.value = arrtempOpt.value
              }
            } catch (e) {
              console.log('@@@ VALORI VALUE XXX', valori.value)
              valori.value = arrtempOpt.value
            }
            // const needle = val.toLocaleLowerCase()
            // optFiltered.value = optFiltered.value.filter((v: any) => v.toLocaleLowerCase().indexOf(needle) > -1)
            if (props.addall) {
              let myobj: any = {}
              if (typeof props.optlab === 'string') {
                myobj[props.optlab] = '(Tutti)'
                myobj[props.optval] = costanti.FILTER_TUTTI
              }

              myarr = [myobj, ...myarr]
            }
          }

          if (myarr && myarr.length > 0) {
            valori.value = myarr
            if (props.multiselect_by_server) {
              // console.log('@@@ VALORI CHANGED (3)', valori.value)
            }
          }

          console.log('*** OUT: tablesel', props.tablesel, 'filterFn', myarr)
        },
        // "ref" is the Vue reference to the QSelect
        (ref: any) => {
          if (!props.useinput) {
            // console.log('ref.options', ref.options)
            if (val !== '' && ref.options.length > 0) {
              ref.setOptionIndex(-1) // reset optionIndex in case there is something selected
              ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
            }
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

    async function newvaluefuncfirst(value: any, done: any) {
      if (props.newvaluefunc && props.col) {
        const fieldval = fieldsTable.getLabelByTable(props.col.jointable!)
        // console.log('fieldval', fieldval, 'optionsreal.value', optionsreal.value)
        // Se esiste già, non crearlo
        const esiste = optionsreal.value.find((rec: any) => {
          // console.log('rec[fieldval]',rec[fieldval], value.toLowerCase())
          return rec[fieldval].toLowerCase() === value.toLowerCase() && (rec[props.filter_field] === props.value_extra)
        })
        console.log('esiste', esiste)
        if (!esiste || (esiste && esiste.length === 0)) {
          // console.log('non esiste, lo creo ! ', value)
          const newrec = await props.newvaluefunc(tools.CapitalizeAllWords(value))
          if (newrec) {
            if (props.col && props.col.jointable) {
              // Reload
              // console.log('  A1', optionsreal.value)
              // valori.value = valoriload.value
              // optionsreal.value = valori.value
              console.log('DOPO', optionsreal.value)
            }
            console.log('newrec', newrec)
            const myid = fieldsTable.getKeyByTable(props.col.jointable!)
            const recfound = valori.value.find((rec: any) => rec[myid] === newrec[myid])
            if (!recfound) {
              done(newrec, 'add-unique')
            }

            // console.log('myid', myid, optionsreal.value)
            // console.log('recfound',recfound)
            // console.log('newrec[myid]',newrec[myid])
            /*if (recfound) {
              const arrout = [...myarrvalue.value]
              if (!arrout.includes(recfound[myid])) {
                arrout.push(recfound[myid])
              }
              console.log('  arrout (1)', arrout)
              if (props.multiple || props.multiselect_by_server) {
                if (myid) {
                  done(newrec, 'add-unique')
                }
              } else {
                done(recfound[myid], 'add-unique')
              }

              /* if (props.multiple || props.multiselect_by_server) {
                console.log('arrout (2)', arrout)
                changeval(arrout)

              }
            }*/
          }
        }
      }
    }

    function getIcon() {
      if (props.icon_alternative)
        return props.icon_alternative
      if (props.col && props.col['icon']) {
        return props.col['icon']
      }
      return ''
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
      newvaluefuncfirst,
      getIcon,
      tools,
    }
  }
})

