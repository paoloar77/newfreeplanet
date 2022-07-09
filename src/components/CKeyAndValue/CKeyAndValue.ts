import { defineComponent, onMounted, PropType, ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from '@/boot/i18n'
import { useGlobalStore } from '@store/globalStore'
import { fieldsTable } from '@store/Modules/fieldsTable'
import { tools } from '@store/Modules/tools'
import { costanti } from '@costanti'
import { CDateTime } from '@/components/CDateTime'


export default defineComponent({
  name: 'CKeyAndValue',
  props: {
    mykey: {
      type: String,
      required: true,
    },
    myvalue: {
      type: String,
      required: false,
      default: '',
    },
    mydate: {
      type: Date,
      required: false,
      default: null,
    },
    color: {
      type: String,
      required: false,
      default: '',
    },
  },
  components: { CDateTime },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const globalStore = useGlobalStore()


    function mounted() {
      //
    }

    onMounted(mounted)

    return {
      tools,
      costanti,
      fieldsTable,
      globalStore,
    }
  },
})

