import { defineComponent, onMounted, onBeforeMount, PropType, ref, toRef, watch } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'
import { IColGridTable, IImgGallery } from 'model'
import { CMyChipList } from '../CMyChipList'
import { CDate } from '../CDate'
import { CDateTime } from '../CDateTime'
import { CMyToggleList } from '../CMyToggleList'
import { CMySelect } from '../CMySelect'
import { CMyEditor } from '../CMyEditor'
import { CGallery } from '../CGallery'
import { tools } from '@store/Modules/tools'
import { costanti } from '@costanti'


// @ts-ignore
// import VueTelInput from 'vue3-tel-input'
// import 'vue3-tel-input/dist/vue3-tel-input.css'

import { fieldsTable } from '@store/Modules/fieldsTable'
import MixinBase from '@/mixins/mixin-base'
import MixinUsers from '@/mixins/mixin-users'

export default defineComponent({
  name: 'CMyPopupEdit',
  emits: ['showandsave', 'update:row', 'show', 'save', 'annulla'],
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    row: {
      type: Object,
      required: true,
    },
    mycol: {
      type: Object as PropType<IColGridTable>,
      required: true,
    },
    canEdit: {
      type: Boolean,
      required: false,
      default: false,
    },
    isInModif: {
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
    mysubsubkey: {
      type: String,
      required: false,
      default: '',
    },
    serv: {
      type: Boolean,
      required: false,
      default: false,
    },
    indrec: {
      type: Number,
      required: false,
      default: -1,
    },
    type: {
      type: Number,
      required: false,
      default: 0,
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
    jointable: {
      type: String,
      required: false,
      default: '',
    },
    table: {
      type: String,
      required: false,
      default: '',
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
  components: { CMyChipList, CDateTime, CDate, CMyToggleList, CMySelect, CMyEditor, CGallery },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()
    const globalStore = useGlobalStore()

    const myvalue = ref(<any>'')
    const myvalueprec = ref('false')
    const countryname = ref('')
    const visueditor = ref(false)
    const showeditor = ref(false)

    const myImgGall = ref(<IImgGallery[]>[{}])

    const col = ref(<IColGridTable> { name: 'test', fieldtype: 0 })

    const myrow = toRef(props, 'row')

    const { setValDb, getValDb } = MixinBase()
    const { getMyUsername } = MixinUsers()

    watch(() => props.row, (newval, oldval) => {
      refresh()
    })

    function crea() {
      // console.log('crea', isFieldDb())

      if (isFieldDb()) {
        // mykey -> field
        // mysubkey -> subfield
        // table -> table
        // serv -> serv
        // id -> id
        // idmain -> idmain

        // console.table(props)

        myvalue.value = getValDb(props.field, props.serv, '', props.table, props.subfield, props.id, props.idmain)
        // console.log('myvalue.value', myvalue.value)
        col.value.jointable = props.jointable
        col.value.fieldtype = props.type
        col.value.label = props.title

        if (props.type === costanti.FieldType.image) {
          myImgGall.value = [{
            _id: '',
            imagefile: myvalue.value,
            // order: 1,
            alt: 'img',
          }]
        }

        // console.log('col', col.value);
      } else {
        col.value = {...props.mycol}
      }

      // console.log('CMyFieldDb crea', myvalue)
    }

    watch(() => props.id, (newval, oldval) => {
      crea()
    })


    function isFieldDb(){
      return props.type !== 0
    }

    function isviewfield() {
      return props.view === 'field'
    }

    function changeval(newval: any) {
      console.log('changeval update:row', newval)
      emit('update:row', props.row)
      if (props.isInModif)
        OpenEdit()

    }

    function getrealval(newval: any) {
      if (col.value.fieldtype === costanti.FieldType.hours) {
        newval = newval.value
      }
    }

    function changevalRec(newval: any) {
      console.log('popypedit: changevalRec', newval)
      // console.log('row', props.row, 'col', props.mycol, 'newval', newval)
      // console.log('row[col.value.name]', props.row[col.value.name])
      if (props.type === costanti.FieldType.image) {
        console.log('image', newval)
      }
      myrow.value[col.value.name] = newval
      // console.log('changevalRec update:row', newval)
      emit('update:row', props.row)
      if (props.isInModif)
        OpenEdit()
    }

    function changevalRecHours(newval: any) {
      if (col.value.fieldtype === costanti.FieldType.hours) {
        newval = newval.value
      }
      changevalRec(newval)

      myvalue.value = newval
    }

    function updatedata() {
      mounted()
    }

    function mounted() {

      // console.log('mounted', 'isFieldDb()', isFieldDb())
      if (isFieldDb()) {

      } else {
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
      }

      // console.log('popupedit: myvalue.value', myvalue.value)

      if (col.value.fieldtype === costanti.FieldType.listimages) {
        if (myvalue.value === '' || myvalue.value === undefined) {
          // console.log('set default myvalue.value ')
          myvalue.value = {
            title: 'Galleria',
            directory: 'none',
            list: []
          }
        }
      }
      // console.log('myvalue.value', myvalue.value)
      myvalueprec.value = myvalue.value

      // console.log('myvalueprec', myvalueprec)
    }

    function refresh() {
      mounted()
    }


    function OpenEdit() {
      // console.log('OpenEdit')
      emit('show')
    }

    /*function getval() {
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
    }*/

    function SaveValueInt(newVal: any, valinitial: any) {

      // console.log('SaveValueInt', newVal, valinitial)

      if (isFieldDb()) {
        savefield(newVal, valinitial, $q);
      } else {
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
    }

    function savefield(value: any, initialval: any, myq: any) {
      myvalue.value = value
      setValDb(myq, props.field, myvalue.value, props.type, props.serv, props.table, props.subfield, props.id, props.indrec, props.mysubsubkey)
    }


    function annulla(val: any) {
      emit('annulla', true)
    }

    function savefieldboolean(value: any) {
      if (myvalue.value === undefined)
        myvalue.value = 'true'
      else
        myvalue.value = value

      setValDb($q, props.field, myvalue, props.type, props.serv, props.table, props.subfield, props.id, props.indrec, props.mysubsubkey)
    }


    function Savedb(newVal: any, valinitial: any) {
      console.log('Savedb')

      if (col.value.fieldtype === costanti.FieldType.boolean) {
        // console.log('myvalue', myvalue, newVal, myvalueprec)
        if (myvalueprec.value === undefined) {
          newVal = true
          myvalueprec.value = myvalue.value
          myvalue.value = newVal

        }
        // console.log('DOPO myvalue', myvalue, newVal, myvalueprec)
      }

      if (col.value.fieldtype === costanti.FieldType.image) {
        console.log('newVal.imagefile', newVal)
        myvalue.value = newVal
      }

      // console.log('Savedb', newVal)

      emit('showandsave', props.row, props.mycol, newVal, valinitial)
      visueditor.value = false
    }

    function visuValByType(val: any, col: IColGridTable, row: any) {
      if (col === undefined || row === undefined)
        return

      // let val = ''
      // if (col.subfield !== '') {
      //   if (row[col.field] === undefined)
      //     row[col.field] = {}
      //
      //   val = row[col.field][col.subfield]
      // } else {
      //   val = row[col.field]
      // }
      //
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
        if (val === undefined || val === null)
          return ' <span class="text-grey">(' + t('reg.select') + ')</span> '
        else if (val === '') {
          return ' <span class="text-grey">(' + t('reg.select') + ')</span> '
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
      return !col.notShowInNewRec
    }

    function getclassCol(col: any) {
      if (col) {
        let mycl = (col.disable || isviewfield()) ? '' : 'colmodif'
        mycl += ((col.fieldtype === costanti.FieldType.date) || (col.fieldtype === costanti.FieldType.onlydate)) ? ' coldate flex flex-container' : ''

        return mycl
      } else {
        return ''
      }
    }

    function mycl() {
      if (props.disable) {
        return 'cldisable'
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

    function getTitleGall() {
      if (fieldsTable.tableForUsers.includes(props.table)) {
        return 'Profilo'
      } else {
        return fieldsTable.getTitleImgByTable(props.table);
      }
    }
    function getDirectoryGall() {
      if (fieldsTable.tableForUsers.includes(props.table)) {
        return 'profile/' + userStore.my.username + '/' + props.table
      }else if (props.table === 'users') {
        return 'profile/' + userStore.my.username
      } else {
        return props.table
      }

    }

    function uploaded(info: any) {

      if (info.files) {
        myvalue.value = tools.geturlrelativeprofile()+ '/' + getMyUsername() + '/' + info.files[0].name
        console.log('uploaded', myvalue.value)
        savefield(myvalue.value, '', $q)
      }
      // info.files[0].name
    }


    function removephoto() {
      myvalue.value = ''
      SaveValueInt(myvalue.value, '')
    }

    function noPopupeditByCol(mycol: IColGridTable) {
      return (mycol.fieldtype !== costanti.FieldType.html
        && mycol.fieldtype !== costanti.FieldType.image
        && mycol.fieldtype !== costanti.FieldType.listimages
        && mycol.fieldtype !== costanti.FieldType.number
      )
    }


    onBeforeMount(mounted)

    crea()

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
      getTitleGall,
      getDirectoryGall,
      removephoto,
      isFieldDb,
      col,
      myImgGall,
      noPopupeditByCol,
    }
  }
})

