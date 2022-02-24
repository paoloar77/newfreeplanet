import { defineComponent, onMounted, PropType, ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from '@/boot/i18n'
import { useGlobalStore } from '@store/globalStore'
import { fieldsTable } from '@store/Modules/fieldsTable'
import { tools } from '@store/Modules/tools'
import { costanti } from '@costanti'
import { CMyPopupEdit } from '@/components/CMyPopupEdit'
import { IColGridTable } from 'model'
import MixinBase from '@/mixins/mixin-base'


export default defineComponent({
  name: 'CMyFieldRec',
  props: {
    table: {
      type: String,
      required: true,
    },
    tablesel: {
      type: String,
      required: false,
      default: '',
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
    rec: {
      type: Object,
      required: true,
    },
    field: {
      type: String,
      required: false,
      default: '',
    },
    myimg: {
      type: String,
      required: false,
      default: '',
    },
    canModify: {
      type: Boolean,
      required: false,
      default: true,
    },
    canEdit: {
      type: Boolean,
      required: false,
      default: false,
    },
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
    id: {
      type: [String, Number],
      required: false,
      default: '',
    },
    idmain: {
      type: String,
      required: false,
      default: '',
    },
    indrec: {
      type: Number,
      required: false,
      default: -1,
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
    sameclassasfielddb: {
      tupe: Boolean,
      required: false,
      default: false,
    }
  },
  components: { CMyPopupEdit },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const globalStore = useGlobalStore()

    const mytitle = ref('')
    const col = ref(<any>{})
    const keytab = ref(<any>'')
    const optlab = ref('')

    const pickup = ref(false)
    const jointable = ref('')
    const recordCol = ref(<any>{})

    const mykey = ref('')
    const mysubkey = ref('')
    const mysubsubkey = ref('')

    const { setValDb, getValDb } = MixinBase()

    function mounted() {
      mytitle.value = props.title
      keytab.value = fieldsTable.getKeyByTable(props.table)
      optlab.value = fieldsTable.getLabelByTable(props.table)
      // recordCol.value = fieldsTable.getrecTableList(props.table)
      let columns = fieldsTable.getArrColsByTable(props.table)

      if (columns) {
        col.value = columns.find((col: any) => col.name === props.field)
      } else {
        col.value = fieldsTable.getColByTable(props.table, props.field)
      }

      if (col.value) {
        jointable.value = col.value.jointable!
      }

      const arrk = props.field.split('.')
      if (arrk) {
        if (arrk.length >= 0)
          mykey.value = arrk[0]
        if (arrk.length > 1)
          mysubkey.value = arrk[1]
        if (arrk.length > 2)
          mysubsubkey.value = arrk[2]
      }

    }

    function showandsel(row: any, col: any, newval: any, valinitial: any) {
      console.log('showandsel CMyFieldDb', row, col, newval)

      if (newval !== valinitial)
        setValDb($q, mykey.value, newval, col.value.fieldtype, false, props.table, mysubkey.value, props.id, props.indrec, mysubsubkey.value)
    }

    function withBorder() {
      return col.value.fieldtype !== costanti.FieldType.onlydate && col.value.fieldtype !== costanti.FieldType.date
    }

    function getValue() {
      let myvalue = ''

      if (mysubkey.value !== '') {
        if (props.rec[mykey.value] === undefined) {
          myvalue = ''
        } else {
          myvalue = props.rec[mykey.value][mysubkey.value]
        }
      } else {
        if (mykey.value !== '') {
          myvalue = props.rec[mykey.value]
        }
      }

      if (Array.isArray(myvalue)) {
        if (myvalue.length === 0)
          return null
      }
      return myvalue
    }

    function getclass() {
      if (props.sameclassasfielddb) {
        return 'q-ma-sm q-pa-sm col-grow popupedit'
      }
    }

    function visuElem() {

      if (col.value) {
        return !!col.value.name && (props.canEdit || (!props.canEdit && getValue()))
      } else {
        return false
      }
    }

    onMounted(mounted)

    return {
      tools,
      withBorder,
      costanti,
      fieldsTable,
      globalStore,
      mytitle,
      col,
      keytab,
      optlab,
      recordCol,
      pickup,
      jointable,
      showandsel,
      mykey,
      mysubkey,
      mysubsubkey,
      visuElem,
      getclass,
    }
  },
})

