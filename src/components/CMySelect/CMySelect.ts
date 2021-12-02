import { defineComponent, onMounted, ref } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'

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

    const myvalue = ref(<string | number>'')

    function changeval(newval: any) {
      console.log('changeval', newval)
      myvalue.value = newval
      emit('update:value', newval)
      emit('changeval', newval)
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

    onMounted(mounted)

    return {
      changeval,
      myvalue,
    }
  }
})

