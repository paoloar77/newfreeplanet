import { defineComponent, onMounted, ref } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'CMySelect',
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
      required: true,
    },
    funcgetvaluebyid: {
      type: Function,
      required: true,
    },
  },
  components: {},
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()
    const globalStore = useGlobalStore()

    const myvalue = ref('')

    function changeval(newval: any) {
      console.log('changeval', newval)
      emit('update:value', newval)
      emit('changeval', newval)
    }

    function mounted() {
      const rec: any = props.options.find((myrec: any) => myrec[`${props.optval}`] === props.value)
      // console.log('rec', rec)
      if (!props.useinput) {
        myvalue.value = props.value!.toString()
      } else {
        if (rec) {
          if (props.funcgetvaluebyid)
            myvalue.value = props.funcgetvaluebyid(rec[`${props.optval}`])
          else
            myvalue.value = rec[`${props.optlab}`]

          // console.log('myvalue', myvalue, 'optval', optval, 'rec', rec[`${optval}`])
        }
      }
    }

    onMounted(mounted)

    return {
      changeval,
      myvalue,
    }
  }
})

