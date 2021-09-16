import { defineComponent, onMounted, PropType, ref, watch } from 'vue'
import { tools } from '@src/store/Modules/tools'

import { date, useQuasar } from 'quasar'

export default defineComponent({
  name: 'CDate',
  props: {
    mydate: {
      type: Object as PropType<Date>,
      required: true,
    },
    label: {
      type: String,
      required: false,
      default: '',
    },
    data_class: {
      type: String,
      required: false,
      default: '',
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false,
    },
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
    color: {
      type: String,
      required: false,
      default: '',
    },
    rounded: {
      type: Boolean,
      required: false,
      default: false,
    },
    outlined: {
      type: Boolean,
      required: false,
      default: false,
    },
    dense: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {},
  setup(props, { emit }) {
    const $q = useQuasar()

    const valueInternal = ref(tools.getDateNull())

    const datePicker = ref(null)

    const mystyleicon = ref('font-size: 1.5rem;')

    watch(() => props.mydate, (value, oldval) => {
      valueInternal.value = value
    })

    function created() {
      valueInternal.value = props.mydate

      if (props.data_class !== '') {
        mystyleicon.value = 'font-size: 1rem;'
      }
    }

    function changedate(value: string) {
      const datavalida = tools.convertstrtoDate(value)
      if (!!datavalida) {
        valueInternal.value = datavalida
        console.log('EMIT: changedate', datavalida.toString())
        emit('input', getDate())
      } else {
        console.log('   DATA NON VALIDAAAAAAAAAAAAA ', value, datavalida)
      }
      if (datePicker.value) {
        // @ts-ignore
        datePicker.value.hide()
      }
    }

    function getdatestring() {
      const mydate = tools.getstrDate(valueInternal.value)
      console.log('getdatestring', mydate)
      return mydate
    }

    function getdateyymmddstring() {
      return tools.getstrYYMMDDDate(valueInternal.value)
    }

    function getDate() {
      return valueInternal
    }

    onMounted(created)

    return {
      getdatestring,
      getdateyymmddstring,
      changedate,
      datePicker,
    }
  },
})
