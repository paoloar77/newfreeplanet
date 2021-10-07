import { defineComponent, PropType, ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from '@/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { IColGridTable } from 'model'
import { fieldsTable } from '@store/Modules/fieldsTable'
import { tools } from '@store/Modules/tools'
import { toolsext } from '@store/Modules/toolsext'
import { costanti } from '@costanti'
import MixinBase from '../../mixins/mixin-base'
import { CMyEditor } from '@/components/CMyEditor'
import { CMySelect } from '@/components/CMySelect'
import { CMyChipList } from '@/components/CMyChipList'
import { CMyToggleList } from '@/components/CMyToggleList'
import { CDateTime } from '@/components/CDateTime'


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
  components: { CMyEditor, CMySelect, CMyChipList, CMyToggleList, CDateTime },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const globalStore = useGlobalStore()

    const myvalue = ref('')

    const col: IColGridTable = { name: 'test' }

    const canEdit = ref(true)

    const countryname = ref('')

    const { setValDb, getValDb } = MixinBase()

    function crea() {

      myvalue.value = getValDb(props.mykey, props.serv, '', props.table, props.mysubkey, props.id, props.idmain)
      col.jointable = props.jointable
      col.fieldtype = props.type
      col.label = props.title

      // console.log('CMyFieldDb crea', myvalue)
    }

    watch(() => props.id, (newval, oldval) => {
      crea()
    })

    function getclassCol(col: any) {
      if (col) {
        let mycl = (props.disable || col.disable) ? '' : 'colmodif '
        mycl += ((col.fieldtype === costanti.FieldType.date) || (col.fieldtype === costanti.FieldType.onlydate)) ? ' coldate flex flex-container ' : ''

        return mycl
      } else {
        return ''
      }
    }

    function visuValByType(val: any) {
      if (col.fieldtype === costanti.FieldType.date) {
        if (val === undefined) {
          return '[]'
        } else {
          return tools.getstrDateTime(val)
        }
      } else if (col.fieldtype === costanti.FieldType.onlydate) {
        if (val === undefined) {
          return '[]'
        } else {
          return tools.getstrDate(val)
        }
      } else if (col.fieldtype === costanti.FieldType.boolean) {
        return (val) ? t('dialog.yes') : t('dialog.no')
      } else if (col.fieldtype === costanti.FieldType.binary) {
        if (val === undefined)
          return '[---]'
        else
          return globalStore.getArrStrByValueBinary(col, val)
      } else if (col.fieldtype === costanti.FieldType.select) {
        if (val === undefined)
          return '[---]'
        else
          return globalStore.getValueByTable(col, val)
      } else if (col.fieldtype === costanti.FieldType.multiselect) {
        if (val === undefined)
          return '[---]'
        else
          return globalStore.getMultiValueByTable(col, val)
      } else if (col.fieldtype === costanti.FieldType.multioption) {
        if (val === undefined)
          return '[---]'
        else
          return globalStore.getMultiValueByTable(col, val)
      } else if (col.fieldtype === costanti.FieldType.password) {
        if (val === undefined)
          return '[---]'
        else
          return '***************'
      } else {
        if (val === undefined)
          return ' <span class="text-grey">(' + t('reg.select') + ')</span> '
        else if (val === '') {
          return ' <span class="text-grey">(' + t('reg.select') + ')</span> '
        } else {
          let mystr = tools.firstchars(val, 5000)
          if (val) {
            if (val.length > 5000)
              mystr += '...'
          } else {
            return val
          }
          return mystr
        }
      }
    }

    function mycl() {
      if (props.disable) {
        return 'cldisable'
      }
    }

    function myvalprinted() {
      return visuValByType(myvalue.value)
    }

    function savefield(value: any, initialval: any, myq: any) {
      myvalue.value = value
      setValDb(myq, props.mykey, myvalue.value, props.type, props.serv, props.table, props.mysubkey, props.id, props.indrec, props.mysubsubkey)
    }

    function savefieldboolean(value: any) {
      if (myvalue.value === undefined)
        myvalue.value = 'true'
      else
        myvalue.value = value

      setValDb($q, props.mykey, myvalue, props.type, props.serv, props.table, props.mysubkey, props.id, props.indrec, props.mysubsubkey)
    }

    function selectcountry({ name, iso2, dialCode }: { name: string, iso2: string, dialCode: string }) {
      // console.log(name, iso2, dialCode)
      myvalue.value = iso2
      countryname.value = name
    }

    function intcode_change(coderec: any) {
      myvalue.value = '+' + coderec.dialCode
    }

    function onInput(phone: any, phoneObject: any, input: any) {
      if (phoneObject?.formatted) {
        myvalue.value = phoneObject.formatted
      }
    }

    crea()

    return {
      mycl,
      intcode_change,
      selectcountry,
      savefieldboolean,
      savefield,
      myvalprinted,
      getclassCol,
      canEdit,
      myvalue,
      col,
      countryname,
      onInput,
      tools,
      costanti,
      myq: $q,
      fieldsTable,
      globalStore,
    }
  },
})

