import { tools } from '@src/store/Modules/tools'

import { defineComponent, ref,  watch } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'CProgress',
  props: {
    progressval: {
      type: Number,
      required: true,
    },
    descr: {
      type: String,
      required: false,
      default: '',
    },
    slider: {
      type: Boolean,
      required: false,
      default: false,
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props, { emit }) {

    const cpr_colProgress = ref('blue')
    const cpr_percProgress = ref('cpr-percProgress')
    const progressvalinternal = ref(0)

    watch(() => props.progressval, (newval, oldval) => {
      updateclasses()
    })


    function updateclasses() {
      cpr_colProgress.value = tools.getProgressColor(progressvalinternal.value)
    }

    function setchange(value: any) {
      progressvalinternal.value = value
      console.log('setchange', progressvalinternal.value)
      emit('input', progressvalinternal.value)
    }

    function getdescr()
    {
      if (!!props.descr) {
        return props.descr + ': '
      }
    }

    function create() {
      updateclasses()
    }

    create()

    return {
      getdescr,
      setchange,
      updateclasses,
      cpr_percProgress,
      cpr_colProgress,
    }
  }
})
