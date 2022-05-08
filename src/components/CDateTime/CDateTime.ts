import { defineComponent, ref, toRef, watch } from 'vue'
import { tools } from '@src/store/Modules/tools'

import {  useQuasar } from 'quasar'
import { useCalendarStore } from '@store/CalendarStore'
import { useI18n } from '@/boot/i18n'
import { toolsext } from '@store/Modules/toolsext'

export default defineComponent({
  name: 'CDate',
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
    valueDate: {
      type: String,
      required: false,
      default: '',
    },
    data_class: {
      type: String,
      required: false,
      default: '',
    },
    canEdit: {
      type: Boolean,
      required: false,
      default: true,
    },
    label: {
      type: String,
      required: true,
      default: 'Val:',
    },
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
    bgcolor: {
      type: String,
      required: false,
      default: '',
    },
    dense: {
      type: Boolean,
      required: false,
      default: false,
    },
    minuteinterval: {
      type: String,
      required: false,
      default: '5',
    },
    view: {
      type: String,
      required: false,
      default: 'date-time',
    },
  },
  components: {},
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n();

    const showDateTimeScroller = ref(false)
    const saveit = ref(false)
    const myvalue = ref('')
    const valueprec = ref('')
    // const myvalueDate = toRef(props, 'valueDate')

    function getclass() {
      return 'calendar_comp ' + props.data_class
    }

    function Opening() {
      console.log('Opening', 'myvalue', myvalue.value)
      saveit.value = false
      valueprec.value = myvalue.value
      if (myvalue.value === '') {
        // myvalueDate.value = tools.getstrYYMMDDDateTime(new Date())
        myvalue.value = tools.getstrYYMMDDDateTime(new Date())
      }
      // console.log('Opening', myvalueDate, myvalue)
      emit('show')
    }

    function Closing() {
      // console.log('Closing')
      if (!saveit.value) {
        if (myvalue.value !== valueprec.value) {
          myvalue.value = valueprec.value
          tools.showNeutralNotif($q, t('db.reccanceled'))
        }
      }
    }

    watch(() =>  props.value, (value, oldval) => {
      if (value) {
        myvalue.value = tools.getstrYYMMDDDateTime(value)
        // myvalueDate.value = myvalue.value
        console.log('myvalue Date = ', myvalue.value)
      }

    })

    function savetoclose() {
      // console.log('Close')
      saveit.value = true
      showDateTimeScroller.value = false
      emit('savetoclose', myvalue.value, valueprec.value)
    }

    function scrollerPopupStyle280() {
      if ($q.screen.lt.sm) {
        return {
          width: '100vw',
          height: '100vh',
        }
      } else {
        return {
          maxHeight: '400px',
          height: '400px',
          width: '280px',
        }
      }
    }

    function created() {
      if (props.value !== null) {
        myvalue.value = tools.getstrYYMMDDDateTime(props.value)
      }

      // console.log('created myvalue', myvalue)
    }

    function changeval(newval: Date) {
      // console.log('changeval', newval, 'value=', value, 'myvalue=', myvalue)
      emit('update:value', newval)
      saveit.value = true
      emit('savetoclose', myvalue.value, valueprec.value)
    }

    function mystyle() {
      if (props.label !== '')
        return ''
      else
        return ''
    }

    function getstrDate(mydate: Date) {
      if (props.view === 'date-time') {
        return tools.getstrDateTime(mydate)
      } else {
        return tools.getstrDate(mydate)
      }
    }

    created()

    return {
      toolsext,
      changeval,
      scrollerPopupStyle280,
      mystyle,
      getstrDate,
      savetoclose,
      Closing,
      Opening,
      getclass,
      myvalue,
      showDateTimeScroller,
    }
  },
})
