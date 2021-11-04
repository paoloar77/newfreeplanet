import { defineComponent, PropType, ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from '@/boot/i18n'
import { useGlobalStore } from '@store/globalStore'
import { fieldsTable } from '@store/Modules/fieldsTable'
import { tools } from '@store/Modules/tools'
import { costanti } from '@costanti'
import { CMyPopupEdit } from '@/components/CMyPopupEdit'
import { IColGridTable } from 'model'


export default defineComponent({
  name: 'CMyFieldDb',
  props: {
    title: {
      type: String,
      required: true,
    },
    mykey: {
      type: String,
      required: true,
    },
    mysubkey: {
      type: String,
      required: false,
      default: '',
    },
    indrec: {
      type: Number,
      required: false,
      default: -1,
    },
    mysubsubkey: {
      type: String,
      required: false,
      default: '',
    },
    type: {
      type: Number,
      required: true,
    },
    serv: {
      type: Boolean,
      required: false,
      default: false,
    },
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
    jointable: {
      type: String,
      required: false,
      default: '',
    },
    table: {
      type: String,
      required: false,
      default: 'settings',
    },
    myimg: {
      type: String,
      required: false,
      default: '',
    },
    id: {
      type: String,
      required: false,
      default: '',
    },
    idmain: {
      type: String,
      required: false,
      default: '',
    },
  },
  components: { CMyPopupEdit },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const globalStore = useGlobalStore()

    const col = ref(<IColGridTable> { name: 'test' })
    const row = ref({})

    return {
      tools,
      costanti,
      fieldsTable,
      globalStore,
      col,
      row,
    }
  },
})

