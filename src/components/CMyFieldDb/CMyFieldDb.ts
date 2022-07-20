import { defineComponent, onMounted, PropType, ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from '@/boot/i18n'
import { useGlobalStore } from '@store/globalStore'
import { fieldsTable } from '@store/Modules/fieldsTable'
import { tools } from '@store/Modules/tools'
import { costanti } from '@costanti'
import { CMyPopupEdit } from '@/components/CMyPopupEdit'
import { IColGridTable, IOperators, ISpecialField } from 'model'
import MixinBase from '@/mixins/mixin-base'


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
    specialField: {
      type: Object as PropType<ISpecialField>,
      required: false,
      default: null,
    },
    filter: {
      type: [String, Function],
      required: false,
      default: null,
    },
    indrec: {
      type: Number,
      required: false,
      default: -1,
    },
    maxlength: {
      type: Number,
      required: false,
      default: 0,
    },
    minlength: {
      type: Number,
      required: false,
      default: 0,
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
    canModify: {
      type: Boolean,
      required: false,
      default: true,
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
    rec: {
      type: Object,
      required: false,
      default: null,
    },
    mycol: {
      type: Object as PropType<IColGridTable>,
      required: false,
      default: () => {
        return { name: '' }
      },
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
    tablesel: {
      type: String,
      required: false,
      default: '',
    },
    pickup: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: { CMyPopupEdit },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const globalStore = useGlobalStore()

    const col = ref(<IColGridTable> { name: 'test', fieldtype: 0, showWhen: costanti.showWhen.NewRec + costanti.showWhen.InEdit + costanti.showWhen.InView, visible: true, maxlength: props.maxlength, minlength: props.minlength })
    const row = ref({})

    const { setValDb, getValDb } = MixinBase()

    function showandsel(row: any, col: any, newval: any, valinitial: any) {
      console.log('showandsel CMyFieldDb', row, col, newval)

      if (newval !== valinitial)
        setValDb($q, props.mykey, newval, props.type, props.serv, props.table, props.mysubkey, props.id, props.indrec, props.mysubsubkey, props.specialField)
    }

    function withBorder() {
      return col.value.fieldtype !== costanti.FieldType.onlydate && col.value.fieldtype !== costanti.FieldType.date
    }

    function mounted() {
      if (props.rec) {
        row.value = props.rec
      }
      if (props.mycol.name !== '') {
        col.value = props.mycol
      }
    }

    onMounted(mounted)

    return {
      tools,
      costanti,
      fieldsTable,
      globalStore,
      col,
      row,
      showandsel,
      withBorder,
    }
  },
})

