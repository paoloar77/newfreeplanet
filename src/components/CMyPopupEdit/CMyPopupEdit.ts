import { defineComponent, onMounted, onBeforeMount, PropType, ref, toRef, watch, computed } from 'vue'
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
import { toolsext } from '@store/Modules/toolsext'
import { shared_consts } from '@/common/shared_vuejs'

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
    rec: {
      type: Object,
      required: false,
      default: null,
    },
    isrec: {
      type: Boolean,
      required: false,
      default: false,
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
    insertMode: {
      type: Boolean,
      required: false,
      default: false,
    },
    canModify: {
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
    field_extra: {
      type: String,
      required: false,
      default: '',
    },
    value_extra: {
      type: [String, Number],
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
      type: [String, Number],
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
  components: { CMyChipList, CDateTime, CDate, CMyToggleList, CMySelect, CMyEditor, CGallery },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()
    const globalStore = useGlobalStore()

    const myvalue = ref(<any>null)
    const myvalueprec = ref('false')
    const countryname = ref('')
    const visueditor = ref(false)
    const visuhtml = ref(false)
    const showeditor = ref(false)

    const myImgGall = ref(<IImgGallery[]>[{}])

    const col = ref(<IColGridTable> { name: 'test', fieldtype: 0, showWhen: costanti.showWhen.NewRec + costanti.showWhen.InEdit + costanti.showWhen.InView, visible: true, maxlength: props.mycol ? props.mycol.maxlength : 0 })

    const { setValDb, getValDb } = MixinBase()
    const { getMyUsername } = MixinUsers()

    const myrealrow = toRef(props, 'row')

    watch(() => props.row, (newval, oldval) => {
      refresh()
    })


    const myrow = computed(() => {
        return props.rec && props.isrec ? props.rec : props.row
    })

    function crea() {
      // console.log('crea', isFieldDb())

      if (props.isrec) {
        col.value = props.mycol

      } else {
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
          col.value = { ...props.mycol }
        }
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
      if (!props.isrec) {
        emit('update:row', props.row)
      }
      if (props.isInModif)
        OpenEdit()


    }

    function getrealval(newval: any) {
      if (col.value.fieldtype === costanti.FieldType.hours) {
        newval = newval.value
      }
    }

    async function addNewValue(value: any) {
      console.log('addNewValue', value, col.value)

      if (col.value.allowNewValue && col.value.jointable) {
        let myrec: any = {}

        let mylabel = fieldsTable.getLabelByTable(col.value.jointable)
        myrec[mylabel] = value

        if (col.value.filter_field && props.value_extra) {
          myrec[col.value.filter_field] = props.value_extra
        }

        // console.log('value_extra', props.value_extra)
        if (props.table) {
          return await globalStore.saveNewRecord(col.value.jointable, myrec)
        }
      }
      return null
    }

    function changevalRec(newval: any) {
      if (col.value && col.value.allowchar === costanti.ALLOWCHAR_CODE) {
        myvalue.value = tools.removespaces(newval)
      }
      console.log('popypedit: changevalRec', newval)
      // console.log('row', props.row, 'col', props.mycol, 'newval', newval)
      // console.log('row[col.value.name]', props.row[col.value.name])
      if (props.type === costanti.FieldType.image) {
        // console.log('image', newval)
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

      try {

        // console.log('mounted', 'isFieldDb()', isFieldDb())
        if (isFieldDb() && !props.isrec) {

        } else {
          if (props.subfield !== '') {
            if (myrow.value[props.field] === undefined) {
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
      } catch (e) {

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
          else {
            if (!props.isrec) {
              // @ts-ignore
              myrealrow.value = newVal
            }

          }
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
      } else if ((col.fieldtype === costanti.FieldType.nationality) || (col.fieldtype === costanti.FieldType.select_by_server) || (col.fieldtype === costanti.FieldType.multiselect_by_server)) {
        if (!val)
          return '[---]'
        else
          return val
      } else if (col.fieldtype === costanti.FieldType.intcode) {
        if (!val)
          return '[---]'
        else
          return val
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
        if (val === undefined || val === null) {
          if (props.canEdit)
            return ' <span class="text-grey">(' + t('reg.select') + ')</span> '
          else
            return ''
        } else if (val === '') {
          if (props.canEdit)
            return ' <span class="text-grey">(' + t('reg.select') + ')</span> '
          else
            return ''
        } else {
          let mystr = ''
          let mylink = ''

          if (col.link)
            mylink = col.link.replace(col.name, val)
          if (col.tipovisu === costanti.TipoVisu.LINK && col.link) {
            return "<a href='"+mylink+"'>" + val + '</a>'
          } else if (col.tipovisu === costanti.TipoVisu.BUTTON && col.link) {
            return ''
          }


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
      let ris = ''
      if (fieldsTable.tableForUsers.includes(props.table)) {
        ris = 'profile/' + myrow.value['username'] + '/' + props.table
      }else if (props.table === 'users') {
        ris = 'profile/' + userStore.my.username
      }else if (props.table === 'mygroups') {
        if (myrow.value.hasOwnProperty('groupname'))
          ris = 'mygroups/' + myrow.value['groupname']
      } else {
        ris = props.table
      }
      return ris
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

    function getTitleEditor(col: IColGridTable, row: any) {

      let title = ''
      if (!!col.field_extra1) {
        try {
          title = tools.getValue(row, col.field_extra1, col.subfield_extra1!)
        }catch (e){}
      }

      return title

    }

    function getToByCol(col: IColGridTable){
      if (shared_consts.TABLES_REC_ID.includes(props.table)) {
        return '/' + tools.getDirectoryByTable(props.table) + '/' + props.row['_id']
      } else if (props.table === 'mygroups') {
        return '/grp/' + props.row['groupname']
      }

      return ''
    }

    onBeforeMount(mounted)

    crea()

    return {
      myvalue,
      countryname,
      visueditor,
      visuhtml,
      showeditor,
      isviewfield,
      changeval,
      changevalRec,
      addNewValue,
      changevalRecHours,
      updatedata,
      OpenEdit,
      SaveValueInt,
      annulla,
      Savedb,
      visuValByType,
      getclassCol,
      selectcountry,
      intcode_change,
      tools,
      costanti,
      fieldsTable,
      onInput,
      globalStore,
      userStore,
      getTitleGall,
      getDirectoryGall,
      removephoto,
      isFieldDb,
      col,
      myImgGall,
      noPopupeditByCol,
      getTitleEditor,
      getToByCol,
      t,
    }
  }
})

