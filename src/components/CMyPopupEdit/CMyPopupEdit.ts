import { defineComponent, onMounted, ref, toRef } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'
import { IColGridTable } from 'model'
import { CMyChipList } from '../CMyChipList'
import { CDate } from '../CDate'
import { CDateTime } from '../CDateTime'
import { CMyToggleList } from '../CMyToggleList'
import { CMySelect } from '../CMySelect'
import { CMyEditor } from '../CMyEditor'
import { CGallery } from '../CGallery'
import { tools } from '@store/Modules/tools'
import { costanti } from '@costanti'

import { fieldsTable } from '@store/Modules/fieldsTable'

export default defineComponent({
  name: 'CMyPopupEdit',
  props: {
    row: {
      type: Object,
      required: true,
    },
    col: {
      type: Object,
      required: true,
    },
    canEdit: {
      type: Boolean,
      required: false,
      default: false,
    },
    field: {
      type: String,
      required: false,
      default: '',
    },
    subfield: {
      type: String,
      required: false,
      default: '',
    },
    showall: {
      type: Boolean,
      required: false,
      default: false,
    },
    view: {
      type: String,
      required: false,
      default: 'row',
    },
    minuteinterval: {
      type: String,
      required: false,
      default: '5',
    },
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
    visulabel: {
      type: Boolean,
      required: false,
      default: false,
    },

  },
  components: { CMyChipList, CDateTime, CDate, CMyToggleList, CMySelect, CMyEditor, CGallery },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()
    const globalStore = useGlobalStore()

    const myvalue = ref('')
    const myvalueprec = ref('false')
    const countryname = ref('')
    const visueditor = ref(false)
    const showeditor = ref(true)

    const myrow = toRef(props, 'row')

    function isviewfield() {
      return props.view === 'field'
    }

    function changeval(newval: any) {
      console.log('changeval update:row', newval)
      emit('update:row', newval)
    }

    function getrealval(newval: any) {
      if (props.col.fieldtype === costanti.FieldType.hours) {
        newval = newval.value
      }
    }

    function changevalRec(newval: any) {
      console.log('row', props.row, 'col', props.col, 'newval', newval)
      console.log('row[col.name]', props.row[props.col.name])
      myrow.value[props.col.name] = newval
      console.log('changevalRec update:row', newval)
      emit('update:row', props.row)
    }

    function changevalRecHours(newval: any) {
      if (props.col.fieldtype === costanti.FieldType.hours) {
        newval = newval.value
      }
      changevalRec(newval)

      myvalue.value = newval
    }

    function updatedata() {
      mounted()
    }

    function mounted() {
      // console.log('mounted')
      if (props.subfield !== '') {
        if (props.row[props.field] === undefined) {
          myrow.value[props.field] = {}
          myvalue.value = ''
        } else {
          myvalue.value = myrow.value[props.field][props.subfield]
        }
      } else {
        if (props.field !== '')
          myvalue.value = myrow.value[props.field]
        else {
          // @ts-ignore
          myvalue.value = myrow.value
        }
      }

      myvalueprec.value = myvalue.value

      // console.log('myvalueprec', myvalueprec)
    }

    function OpenEdit() {
      // console.log('OpenEdit')
      emit('show')
    }

    function getval() {
      let myval: any = 'false'

      if ((props.subfield !== '') && (props.subfield !== '')) {
        if (myrow.value[props.field] === undefined) {
          myrow.value[props.field] = {}
          myval = ''
        } else {
          myval = myrow.value[props.field][props.subfield]
        }
      } else {
        if (props.field !== '')
          myval = myrow.value[props.field]
        else
          myval = myrow.value
      }

      return myval
    }

    function SaveValueInt(newVal: any, valinitial: any) {

      // console.log('SaveValueInt', newVal, valinitial)

      // Update value in table memory
      if (props.subfield !== '') {
        if (myrow.value[props.field] === undefined)
          myrow.value[props.field] = {}
        myrow.value[props.field][props.subfield] = newVal
      } else {
        if (props.field !== '')
          myrow.value[props.field] = newVal
        else
          myrow.value = newVal
      }

      emit('save', newVal, valinitial)
    }

    function annulla(val: any) {
      emit('annulla', true)
    }

    function Savedb(newVal: any, valinitial: any) {

      if (props.col.fieldtype === costanti.FieldType.boolean) {
        // console.log('myvalue', myvalue, newVal, myvalueprec)
        if (myvalueprec.value === undefined) {
          newVal = true
          myvalueprec.value = myvalue.value
          myvalue.value = newVal

        }
        // console.log('DOPO myvalue', myvalue, newVal, myvalueprec)
      }

      // console.log('Savedb', newVal)

      emit('showandsave', props.row, props.col, newVal, valinitial)
      visueditor.value = false
    }

    function visuValByType(val: any, col: IColGridTable, row: any) {
      if (col === undefined || row === undefined)
        return

      // let val = ''
      // if (props.col.subfield !== '') {
      //   if (row[props.col.field] === undefined)
      //     row[props.col.field] = {}
      //
      //   val = row[props.col.field][props.col.subfield]
      // } else {
      //   val = row[props.col.field]
      // }
      //
      if (props.col.fieldtype === costanti.FieldType.date) {
        if (val === undefined) {
          return '[]'
        } else {
          return tools.getstrDateTime(val)
        }
      } else if (props.col.fieldtype === costanti.FieldType.onlydate) {
        if (val === undefined) {
          return '[]'
        } else {
          return tools.getstrDate(val)
        }
      } else if (props.col.fieldtype === costanti.FieldType.boolean) {
        return (val) ? t('dialog.yes') : t('dialog.no')
      } else if (props.col.fieldtype === costanti.FieldType.binary) {
        if (val === undefined)
          return '[---]'
        else
          return globalStore.getArrStrByValueBinary(col, val)
      } else if (props.col.fieldtype === costanti.FieldType.select) {
        if (val === undefined)
          return '[---]'
        else
          return globalStore.getValueByTable(col, val)
      } else if (props.col.fieldtype === costanti.FieldType.multiselect) {
        if (val === undefined)
          return '[---]'
        else
          return globalStore.getMultiValueByTable(col, val)
      } else {
        if (val === undefined || val === null)
          return '[]'
        else if (val === '') {
          return '[]'
        } else {
          let mystr = ''
          if (props.showall) {
            return val
          } else {
            mystr = tools.firstchars(val, tools.MAX_CHARACTERS)
          }
          if (val) {
            if (val.length > tools.MAX_CHARACTERS)
              mystr += '...'
          } else {
            return val
          }
          return mystr
        }
      }
    }

    function visInNewRec(col: any) {
      return !props.col.notShowInNewRec
    }

    function getclassCol(col: any) {
      if (col) {
        let mycl = (props.col.disable || isviewfield()) ? '' : 'colmodif'
        mycl += ((props.col.fieldtype === costanti.FieldType.date) || (props.col.fieldtype === costanti.FieldType.onlydate)) ? ' coldate flex flex-container' : ''

        return mycl
      } else {
        return ''
      }
    }

    function selectcountry({ name, iso2, dialCode }: {name: string, iso2: string, dialCode: string}) {
      // console.log(name, iso2, dialCode)
      myvalueprec.value = myvalue.value
      myvalue.value = iso2
      countryname.value = name
    }

    function intcode_change(coderec: any) {
      myvalueprec.value = myvalue.value
      myvalue.value = '+' + coderec.dialCode
    }

    function onInput(phone: any, phoneObject: any, input: any) {
      if (phoneObject?.formatted) {
        myvalue.value = phoneObject.formatted
      }
    }

    onMounted(mounted)

    return {
      myvalue,
      countryname,
      visueditor,
      showeditor,
      isviewfield,
      changeval,
      changevalRec,
      changevalRecHours,
      updatedata,
      OpenEdit,
      getval,
      SaveValueInt,
      annulla,
      Savedb,
      visuValByType,
      visInNewRec,
      getclassCol,
      selectcountry,
      intcode_change,
      tools,
      costanti,
      fieldsTable,
      onInput,
      globalStore,
    }
  }
})

