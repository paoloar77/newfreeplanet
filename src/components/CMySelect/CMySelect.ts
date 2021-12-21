import { computed, defineComponent, onMounted, ref } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'
import { costanti } from '@costanti'
import { fieldsTable } from '@store/Modules/fieldsTable'
import { shared_consts } from '@/common/shared_vuejs'

export default defineComponent({
  name: 'CMySelect',
  emits: ['update:value', 'changeval'],
  props: {
    options: {
      type: Array,
      required: true,
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

    function changeval(newval: any) {
      if (props.tablesel === shared_consts.TAB_COUNTRY)
        myvalue.value = newval && newval['value'] ? newval['value'] : newval
      else if (props.tablesel === shared_consts.TAB_PHONES)
        myvalue.value = newval && newval['code'] ? newval['code'] : newval
      else
        myvalue.value = newval
      console.log('Myselect changeval', myvalue.value)
      emit('update:value', myvalue.value)
      emit('changeval', myvalue.value)
    }

    function mounted() {
      // console.log('mounted myselect', props.options)
      if (props.options) {
        const rec: any = props.options.find((myrec: any) => myrec[`${props.optval}`] === props.value)

        /*console.log('rec', rec, 'props.useinput', props.useinput)
        console.log('props.value', props.value)
        console.log('options', props.options)
        console.log('optval', props.optval)
        console.log('optlab', props.optlab)*/

        if (rec) {
          if (props.funcgetvaluebyid)
            myvalue.value = props.funcgetvaluebyid(rec[`${props.optval}`])
          else
            myvalue.value = rec[`${props.optlab}`]

          // console.log('myvalue', myvalue, 'optval', props.optval, 'rec', rec[`${props.optval}`])
        } else {
          if (!props.useinput) {
            if (props.value) {
              myvalue.value = props.value
            }
          }
        }
      }
      // console.log('cmyselect: myvalue.value', myvalue.value)
    }

    function filterFn(val: any, update: any, abort: any) {
      update(
        async () => {
          console.log('Filter val', val, val.length)
          let myarr: any = []

          if (val.length < 1) {
            abort()
            return
          }

          let mystr = val.toLocaleLowerCase()

          if (fieldsTable.tableRemotePickup.includes(props.tablesel)) {
            // if (myvalue.value.length > 1) {
            if (mystr !== '')
              myarr = await globalStore.loadPickup({ table: props.tablesel, search: mystr })
            // const needle = val.toLocaleLowerCase()
            // optFiltered.value = optFiltered.value.filter((v: any) => v.toLocaleLowerCase().indexOf(needle) > -1)
            // }
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

          valori.value = myarr

          console.log('tablesel', props.tablesel, 'filterFn', myarr)
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

    onMounted(mounted)

    valori.value = valoriload.value

    return {
      changeval,
      myvalue,
      valori,
      filterFn,
    }
  }
})

