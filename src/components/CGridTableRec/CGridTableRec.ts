import { defineComponent, PropType, ref, watch, toRef, onMounted, toRefs, computed } from 'vue'
import { useI18n } from '@src/boot/i18n'

import { tools } from '../../store/Modules/tools'

import { fieldsTable } from '@store/Modules/fieldsTable'

import {
  IColGridTable,
  IFilter,
  ITableRec,
  ISearchList,
  IPagination,
  IParamDialog,
  IMySkill
} from 'model'
import { lists } from '@store/Modules/lists'
import { IParamsQuery } from 'model'
import { CMyPopupEdit } from '../CMyPopupEdit'
import { CMyFriends } from '../CMyFriends'
import { CMyFieldDb } from '../CMyFieldDb'
import { CMySelect } from '../CMySelect'
import { CTitleBanner } from '../CTitleBanner'

import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'
import { costanti } from '@costanti'
import translate from '@/globalroutines/util'

export default defineComponent({
  name: 'CGridTableRec',
  props: {
    prop_mytitle: {
      type: String,
      required: true,
    },
    prop_mytable: {
      type: String,
      required: false,
      default: '',
    },
    prop_mycolumns: {
      type: Object as PropType<[]>,
      required: false,
      default: null,
    },
    prop_colkey: {
      type: String,
      required: false,
      default: '',
    },
    hint: {
      type: String,
      required: false,
      default: 'Cerca',
    },
    prop_search: {
      type: Boolean,
      required: false,
      default: true,
    },
    butt_modif_new: {
      type: Boolean,
      required: false,
      default: true,
    },
    finder: {
      type: Boolean,
      required: false,
      default: false,
    },
    visuinpage: {
      type: Boolean,
      required: false,
      default: false,
    },
    showType: {
      type: Number,
      required: false,
      default: 0,
    },
    finder_noNull: {
      type: Boolean,
      required: false,
      default: false,
    },
    vertical: {
      type: Boolean,
      required: false,
      default: false,
    },
    prop_codeId: {
      type: String,
      required: false,
      default: '',
    },
    keyMain: {
      type: String,
      required: false,
      default: '',
    },
    nodataLabel: {
      type: String,
      required: false,
      default: '',
    },
    labelBtnAddRow: {
      type: String,
      required: false,
      default: 'Aggiungi',
    },
    noresultLabel: {
      type: String,
      required: false,
      default: '',
    },
    tablesList: {
      type: Object as PropType<ITableRec[]>,
      required: false,
      default: null,
    },
    prop_searchList: {
      type: Object as PropType<ISearchList[]>,
      required: false,
      default: null,
    },
    arrfilters: {
      type: Object as PropType<IFilter[]>,
      required: false,
      default: null,
    },
    filterdef: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },
    filtercustom: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },
    extraparams: {
      required: false,
      default: {},
    },
    options: {
      required: false,
      default: 0,
    },
    prop_pagination: {
      type: Object as PropType<IPagination>,
      required: false,
      default: () => {
        return { sortBy: 'desc', descending: false, page: 1, rowsNumber: 0, rowsPerPage: 10 }
      },
    },
    defaultnewrec: {
      type: Function,
      required: false,
    },
    col_title: {
      type: String,
      required: false,
      default: '',
    },
    showCol: {
      type: Boolean,
      required: false,
      default: true
    },
    choose_visutype: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: { CMyPopupEdit, CTitleBanner, CMyFieldDb, CMySelect, CMyFriends },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()
    const globalStore = useGlobalStore()
    const isfinishLoading = computed(() => globalStore.finishLoading)

    const pagination = ref(<IPagination>{ sortBy: 'desc', descending: false, page: 1, rowsNumber: 10, rowsPerPage: 10 })

    const addRow = ref('Aggiungi')

    const newRecordBool = ref(false)
    const editRecordBool = ref(false)
    const newRecord: any = ref({})
    const recModif: any = ref({})

    const mytable = ref('')
    const mytitle = ref('')
    const mycolumns = ref([])
    const colkey = ref('')
    const search = ref('')

    const tablesel = ref('')

    const loading = ref(false)

    const startsearch = ref(false)

    const serverData: any = ref([])
    const spinner_visible = ref(false)
    const searchList = toRef(props, 'prop_searchList')

    let idsel = ''
    let colsel = ref(<IColGridTable | null>{ name: '', field: '' })
    let valPrec = ''

    let separator: 'horizontal'
    const myfilter = ref('')
    const myfilterand: any = ref([])
    let rowsel: any = {}
    let dark = true
    const canEdit = ref(false)

    let returnedData: any = ref([])
    let returnedCount = 0
    const colVisib: any = ref([])
    const colExtra: any = ref([])

    const rowclicksel = ref(<any>null)
    const colclicksel = ref(null)

    const selected: any = ref([])

    const filter = ref(0)

    const mycodeid = toRef(props, 'prop_codeId')

    const myvertical = ref(0)

    const valoriopt = computed(() => (item: any, addall: boolean) => {
      // console.log('valoriopt', item.table)
      return globalStore.getTableJoinByName(item.table, addall, item.filter)
    })

    const labelcombo = computed(() => (item: any) => {
      let lab = item.label
      if (item.showcount)
        lab += ' (' + valoriopt.value(item, false).length + ')'
      return lab
    })

    watch(() => searchList.value, (to: any, from: any) => {
      console.log('watch searchlist', to)
      refresh()
    })

    watch(() => props.filtercustom, (to: any, from: any) => {
      console.log('filtercustom', to)
      refresh()
    })

    function searchval(newval: any, table: any) {
      console.log('searchval', newval, table)
      tools.setCookie(tools.COOK_SEARCH + table, newval)

      if (table === 'skills') {
        const recSector = searchList.value.find((rec) => rec.table === 'sectors')
        if (recSector)
          tools.setCookie(tools.COOK_SEARCH + table + '_' + recSector.value, newval)
      }

      if (table === 'sectors') {
        for (const item of searchList.value) {
          if ((item.table === 'subskills')) {
            // item.arrvalue = [costanti.FILTER_TUTTI]
          }
          if (item.table === 'skills') {
            // console.log('---PRIMA ', item.value)
            const valsaved = tools.getCookie(tools.COOK_SEARCH + 'skills' + '_' + newval, costanti.FILTER_TUTTI)
            // check if exist
            const recSkill = searchList.value.find((rec) => rec.table === 'skills')
            let trovato = false
            if (recSkill) {
              console.log('recSkill.value', recSkill)
              const arrvalues = valoriopt.value(recSkill.value, false)
              console.log('arrvalues', arrvalues)
              if (arrvalues)
                trovato = arrvalues.find((rec: any) => rec[recSkill.key] === valsaved)
            }
            if (valsaved && trovato)
              item.value = valsaved
            else
              item.value = costanti.FILTER_TUTTI
            // console.log('---DOPO ', item.value)
          }
        }
      }
      /*if (table === 'skills') {
        for (const item of searchList.value) {
          if (item.table === 'subskills') {
            item.arrvalue = [costanti.FILTER_TUTTI]
          }
        }
      } */

      refresh()
    }

    function canModifyThisRec(rec: any) {
      // console.log('rec', rec)
      if (rec.hasOwnProperty('userId')) {
        let userId = rec.userId
        if (userId === userStore.my._id) {
          // E' il mio, quindi modificalo
          return true
        }
      } else {
        return false
      }
      if (userStore.isAdmin || userStore.isManager)
        return true
    }

    // emulate 'SELECT count(*) FROM ...WHERE...'
    function getRowsNumberCount(myfilter?: any) {

      // if (!myfilter) {
      //   return original.length
      // }
      // let count = 0
      // original.forEach((treat) => {
      //   if (treat['name'].includes(myfilter)) {
      //     ++count
      //   }
      // })
      // return count

      return returnedCount
    }

    // emulate ajax call
    // SELECT * FROM ... WHERE...LIMIT...
    async function fetchFromServer(startRow: any, endRow: any, param_myfilter: any, param_myfilterand: any, sortBy: any, descending: any) {

      let myobj: any = {}
      if (sortBy) {
        myobj = {}
        if (descending) {
          myobj[sortBy] = -1
        } else {
          myobj[sortBy] = 1
        }
      }

      // console.log('sortBy', sortBy)

      let filtersearch: any[] = []
      let filtersearch2: any[] = []
      let filtersearch3or: any[] = []

      let recSector = null
      let recProvince = null
      let recSkill = null
      let idSector = 0
      let idProvince = 0
      let idSkill = 0
      if (searchList.value) {
        recSector = searchList.value.find((item: ISearchList) => item.table === 'sectors')
        idSector = recSector ? recSector.value : 0
      }
      if (searchList.value) {
        recProvince = searchList.value.find((item: ISearchList) => item.table === 'provinces')
        idProvince = recProvince ? recProvince.value : 0
      }

      if (searchList.value) {
        recSkill = searchList.value.find((item: ISearchList) => item.table === 'skills')
        idSkill = recSkill ? recSkill.value : 0
      }

      // console.table(searchList.value)

      if (searchList.value) {
        for (const item of searchList.value) {
          //searchList.value.forEach((item: ISearchList) => {
          if (!item.notinsearch) {
            let objitem: any = {}
            // console.log('        item ', item)
            if (item.value > 0) {
              objitem[item.key] = item.value
              filtersearch.push(objitem)
            } else if (item.arrvalue.length > 0) {
              const myarr = item.arrvalue.filter((value: any) => {
                if (typeof value === 'number') {
                  return value > 0
                }
                return true
              })

              let arr2: any = []

              if (item.table === 'provinces') {
                arr2 = []
                myarr.forEach((myval: any) => {
                  let objitem3: any = {}
                  objitem3['mycities.prov'] = myval
                  arr2.push(objitem3)
                })
                let obj2: any = {
                  $or: arr2
                }
                if (arr2.length > 0) {
                  filtersearch3or = arr2
                }
              } else {
                myarr.forEach((myval: any) => {
                  let objitem2: any = {}
                  objitem2[item.key] = myval
                  arr2.push(objitem2)
                })

                let obj2: any = {
                  $or: arr2
                }
                if (arr2.length > 0) {
                  filtersearch.push(obj2)
                }
              }

            } else {
              if ((item.table === 'skills') && item.value === costanti.FILTER_TUTTI) {
                let obj2: any = {}
                // idSector
                obj2['sector._id'] = idSector
                filtersearch2.push(obj2)
              }
              if ((item.table === 'subskills') && item.value === costanti.FILTER_TUTTI) {
                let obj2: any = {}
                // idSector
                obj2['myskill._id'] = idSkill
                filtersearch2.push(obj2)
              }
            }

          }
        }
      }

      // console.log('filtersearch', filtersearch)

      if (props.prop_search) {
        let nosearch = false
        if (filtersearch.length <= 0 && !param_myfilter) {
          nosearch = true
          returnedData.value = []
          returnedCount = 0
        } else {
          if (props.keyMain) {
            nosearch = true
            filtersearch.forEach((rec: any) => {
              if (!!rec[props.keyMain]) {
                nosearch = false
              }
            })
          }
        }
        if ((false && nosearch && props.finder) || (props.finder_noNull && nosearch)) {
          returnedData.value = []
          returnedCount = 0
          return true
        }
      }

      // console.log('filtercustom', props.filtercustom)


      let params: IParamsQuery = {
        table: mytable.value,
        startRow,
        endRow,
        filter: param_myfilter,
        filterand: param_myfilterand,
        // @ts-ignore
        filtersearch: filtersearch,
        // @ts-ignore
        filtersearch2: filtersearch2,
        filtersearch3or: filtersearch3or,
        // @ts-ignore
        filtercustom: props.filtercustom,
        sortBy: myobj,
        descending,
        userId: userStore.my._id,
        codeId: '',
        options: props.options,
      }

      params.codeId = mycodeid.value

      // console.log('params', params)
      // console.log('props.extraparams', props.extraparams)

      params = { ...params, ...props.extraparams }

      const data = await globalStore.loadTable(params)

      if (data) {
        returnedData.value = data.rows
        returnedCount = data.count
      } else {
        returnedData.value = []
        returnedCount = 0
      }

      return true

    }

    function savefilter() {
      // console.log('Close')
      emit('savefilter', myfilterand)
    }

    function onRequest(props: any) {
      const { page, rowsPerPage, rowsNumber, sortBy, descending } = props.pagination
      const myfilternow = myfilter.value
      const myfilterandnow = myfilterand.value

      savefilter()

      if (!mytable.value)
        return

      // console.log('myfilterandnow', myfilterandnow, 'myfilterandnow', myfilterandnow)

      // console.log('onRequest', 'myfilter = ', myfilter.value)

      loading.value = true

      spinner_visible.value = true

      // update rowsCount with appropriate value

      // function all rows if "All" (0) is rowsel
      const fetchCount = rowsPerPage === 0 ? rowsNumber : rowsPerPage

      // calculate starting row of data
      const startRow = (page - 1) * rowsPerPage
      const endRow = startRow + fetchCount

      // console.log('startRow', startRow, 'endRow', endRow)

      serverData.value = []

      // fetch data from "server"
      return fetchFromServer(startRow, endRow, myfilternow, myfilterandnow, sortBy, descending).then((ris: any) => {

        pagination.value.rowsNumber = getRowsNumberCount(myfilter)

        // clear out existing data and add new
        if (returnedData.value === []) {
          serverData.value = []
        } else {
          // if (serverData.length > 0)
          //   serverData.splice(0, serverData.length, ...returnedData)
          // else
          try {
            serverData.value = [...returnedData.value]
          } catch (e) {
            serverData.value = []
          }
        }

        // console.log('serverData', serverData)

        // don't forfunction to update local pagination object
        pagination.value.page = page
        pagination.value.rowsPerPage = rowsPerPage
        pagination.value.sortBy = sortBy
        pagination.value.descending = descending

        // console.log('pagination', pagination)

        // ...and turn of loading indicator
        loading.value = false
        spinner_visible.value = false
      })
    }


    function refresh_arr() {
      const myarr = [...serverData.value]
      serverData.value = []
      serverData.value = [...myarr]
    }

    function refresh_table() {
      onRequest({
        pagination: pagination.value
      })
      rowclicksel.value = null
    }


    function refresh() {
      // console.log('refresh')
      if (!startsearch.value)
        return false

      serverData.value = []

      search.value = search.value.trim()

      // console.log('refresh')
      // console.log('search', search)
      if (!!search.value && search.value !== '')
        myfilter.value = search.value
      else
        myfilter.value = ''

      // console.log('myfilter', myfilter.value)

      refresh_table()
    }

    watch(() => mycodeid.value, (newval, oldval) => {
      refresh()
    })

    /*watch(() => myfilterand.value, (newval, oldval) => {
      refresh()
    })*/

    watch(() => props.filtercustom, (newval, oldval) => {
      // console.log('myfiltercustom change')
      // refresh()
    })

    function isTutor() {
      return userStore.isTutor
    }

    function disabilita() {
      if ((mytable.value === 'users') && (isTutor())) {
        return true
      }

      return false
    }

    function tableClass() {
      if (dark) {
        return 'bg-black'
      }
    }

    function selItem(item: any, col: IColGridTable, inmodif?: boolean) {
      console.log('selItem', item, col)
      rowsel = item
      idsel = item._id
      colsel.value = col
      if (inmodif) {

      }
    }

    function undoVal() {
      // console.log('undoVal', 'colsel', colsel.value, 'valprec', valPrec, 'colkey', colkey, 'selected', rowsel.value)
      // console.table(serverData)
      if (colsel.value) {
        if (colsel.value.subfield !== '') {
          if (rowsel[colsel.value.field!] === undefined)
            rowsel[colsel.value.field!] = {}
          rowsel[colsel.value.field!][colsel.value.subfield!] = valPrec
        } else {
          rowsel[colsel.value.field!] = valPrec
        }
      }

      // serverData[colsel] = valPrec

    }

    function SaveValdb(newVal: any, valinitial: any) {
      // console.log('SaveValdb', newVal)
      // console.log('SaveValue', newVal, 'rowsel', rowsel)

      colsel.value = colclicksel.value
      // console.log('colsel', colsel)
      SaveValue(newVal, valinitial)
      colsel.value = { name: '', field: '' }
    }


    function showandsel(row: any, col: any, newval: any, valinitial: any) {
      console.log('showandsel CGridTable', row, col, newval)
      rowsel = row
      colsel.value = col
      idsel = row._id
      SaveValue(newval, valinitial)

      // rowclicksel = null
    }

    function annulla(val: any) {
      console.log('annulla')
      if (newRecord.value) {
        globalStore.DeleteRec({ table: mytable.value, id: newRecord.value._id })
          .then((ris) => {
            // console.log('deleted', ris)
            serverData.value.pop(ris)
            newRecord.value = null
            return true
          })
      }
    }

    function SaveValue(newVal: any, valinitial: any) {
      // console.log('SaveValue', newVal)
      // console.log('rowsel', rowsel, 'colsel', colsel.value)
      let myfield = ''
      let subf = ''
      if (colsel.value) {
        myfield = colsel.value.field!
        subf = colsel.value.subfield!
      }

      if (myfield) {
        if (colsel.value) {
          // Update value in table memory
          if (subf !== '') {
            if (rowsel[myfield] === undefined)
              rowsel[myfield] = {}
            rowsel[myfield][subf] = newVal
          } else {
            rowsel[myfield] = newVal
          }
        }

        const mydata = <any>{
          id: idsel,
          table: mytable.value,
          fieldsvalue: {}
        }


        if (colsel.value) {
          if (subf !== '') {
            if (mydata.fieldsvalue[myfield] === undefined) {
              mydata.fieldsvalue[myfield + '.' + subf] = newVal
            }
            // mydata.fieldsvalue[colsel.value.field][colsel.subfield] = newVal
          } else {
            mydata.fieldsvalue[myfield] = newVal
          }
        }

        // if (colsel.value)
        //   console.log(' -> rowsel[myfield]', rowsel[myfield])

        valPrec = valinitial

        // console.log('rowsel FINALE', rowsel)

        saveFieldValue(mydata)
      }
    }

    function updatedcol() {
      // console.log('updatedcol')
      if (mycolumns.value) {
        colVisib.value = []
        colExtra.value = []
        mycolumns.value.forEach((elem: IColGridTable) => {

          const mysub = elem.subfield ? elem.subfield : ''
          if (elem) {
            if (elem.field !== costanti.NOFIELD) {
              if (checkIfColShow(elem.field)) {
                colVisib.value.push(elem.field + mysub)
              }
            }

            if (elem.visible && elem.field === costanti.NOFIELD) {
              colExtra.value.push(elem.name)
            }
          }
        })
      }
    }

    function getrows() {
      return pagination.value.rowsNumber
    }

    async function createNewRecordDialog() {

      const mydata: any = {
        table: mytable.value,
        data: {}
      }

      if (props.defaultnewrec)
        mydata.data = props.defaultnewrec()

      // console.log('DATA=', mydata.data)

      newRecord.value = await globalStore.saveTable(mydata)
      newRecordBool.value = true

    }


    async function createNewRecord() {

      await createNewRecordDialog()

      serverData.value.push(newRecord.value)
      pagination.value.rowsNumber++

      loading.value = false
    }

    function saveFieldValue(mydata: any) {
      // console.log('saveFieldValue', mydata)

      // Save on Server
      globalStore.saveFieldValue(mydata).then((esito) => {
        if (esito) {
          tools.showPositiveNotif($q, t('db.recupdated'))
        } else {
          tools.showNegativeNotif($q, t('db.recfailed'))
          undoVal()
        }
      })
    }

    function created() {
      mytable.value = props.prop_mytable
      mytitle.value = props.prop_mytitle
      mycolumns.value = props.prop_mycolumns
      colkey.value = props.prop_colkey
      pagination.value = props.prop_pagination

      myvertical.value = props.vertical ? -1 : 0
      if (props.finder) {
        myvertical.value = tools.getCookie('myv', 0)
      }
    }

    function mounted() {
      // console.log('GridTable mounted', tablesel.value)

      // console.log('props.filtercustom', props.filtercustom)


      if (!!props.tablesList) {
        canEdit.value = tools.getCookie(tools.CAN_EDIT, canEdit) === 'true'
        tablesel.value = tools.getCookie('tablesel', tablesel.value)
      }

      myfilterand.value = props.filterdef
      // myfiltercustom.value = props.filtercustom
      // console.log('tablesel', tablesel)

      if (tablesel.value === '') {
        if (!!props.tablesList)
          tablesel.value = props.tablesList[0].value
        else
          tablesel.value = mytable.value
      }

      // console.log('2) tablesel', tablesel.value)

      changeTable(tablesel.value)

    }

    function exec_func_table(table: string, func: number, par: IParamDialog) {

      if (func === lists.MenuAction.DELETE_RECTABLE) {
        globalStore.DeleteRec({ table, id: par.param1 }).then((ris) => {
          if (ris) {
            ActionAfterYes(func, par.param2, null)
            tools.showPositiveNotif($q, t('db.deletedrecord'))
          } else {
            tools.showNegativeNotif($q, t('db.recdelfailed'))
          }
        })
      } else if (func === lists.MenuAction.DUPLICATE_RECTABLE) {
        globalStore.DuplicateRec({ table, id: par.param1 }).then((ris) => {
          if (ris) {
            ActionAfterYes(func, par.param2, ris.data)
            tools.showPositiveNotif($q, t('db.duplicatedrecord'))
          } else
            tools.showNegativeNotif($q, t('db.recdupfailed'))
        })
      }
    }


    function clickFunz(item: any, col: IColGridTable) {
      if (!!col && col.action) {

        const table = mytable.value
        const ok = translate('dialog.yes')
        const cancel = translate('dialog.no')
        const funccancel = 0
        const par = {
          param1: item._id,
          param2: item,
        }

        if (col.action === lists.MenuAction.CAN_EDIT_TABLE) {
          console.log('Edit', item)
          selItem(item, col)
          recModif.value = item
          editRecordBool.value = true
        } else {

          return $q.dialog({
            message: translate(col.askaction) + '?',
            html: true,
            ok: {
              label: ok,
              push: true,
            },
            title: translate(col.label_trans),
            cancel: true,
            persistent: false,
          }).onOk(() => {
            // console.log('OK')
            exec_func_table(table, col.action, par)
            return true
          }).onCancel(() => {
            // console.log('CANCEL')
            exec_func_table(table, funccancel, par)
            return false
          })
        }

      }
    }

    function ActionAfterYes(action: number, item: any, data?: any) {
      if (action === lists.MenuAction.DELETE_RECTABLE) {
        if ((serverData.value.length > 0) && item) {
          serverData.value.splice(serverData.value.indexOf(item), 1)
          refresh_arr()
        }
      } else if (action === lists.MenuAction.DUPLICATE_RECTABLE) {
        // Add record duplicated
        // serverData.push(data)
        refresh()
      }
    }

    function visCol(col: IColGridTable) {
      if ((!tools.isBitActive(col.showWhen, costanti.showWhen.NewRec)) && !tools.isBitActive(col.showWhen, costanti.showWhen.InView)
        && !tools.isBitActive(col.showWhen, costanti.showWhen.InView_OnlyifExist) && tools.isBitActive(col.showWhen, costanti.showWhen.InEdit)) {
        return (canEdit.value)
      } else {
        return true
      }
    }

    function clByCol(col: IColGridTable) {
      if (!visuIntestazCol(col)) {
        return 'row justify-center vertical-middle'
      } else {
        return ''
      }
    }

    function visuIntestazCol(col: IColGridTable) {
      if (col.fieldtype === costanti.FieldType.html || col.fieldtype === costanti.FieldType.listimages || col.noshowlabel) {
        return false
      } else {
        return true
      }
    }

    function checkIfColShow(field: string | undefined) {
      let vis = true
      if (props.prop_mytable === 'myskills' && !props.prop_search) {
        if (field === 'username') {
          vis = false
        }
      }
      return vis
    }

    function changeCol(newval: any) {
      // console.log('changecol', mytable.value)
      if (!!mytable.value) {
        tools.setCookie(mytable.value, colVisib.value.join('|'))
      }
    }

    function changeTable(mysel: any) {
      console.log('changeTable', tablesel.value)
      if (tablesel.value === undefined || tablesel.value === '')
        return

      // console.log('changeTable mysel=', mysel, 'tablesel', tablesel.value)
      // console.log('tablesList=')
      // console.table(tablesList)

      let mytab = null
      if (props.tablesList) {
        mytab = props.tablesList.find((rec: any) => rec.value === mysel)
      }

      if (mytab === undefined) {
        tablesel.value = props.tablesList[0].value
        if (props.tablesList) {
          mytab = props.tablesList.find((rec: any) => rec.value === tablesel.value)
        }
      }

      // console.log('tablesel', tablesel.value, 'mytab', mytab)

      if (mytab) {
        mytitle.value = mytab.label
        colkey.value = mytab.colkey
        if (mytab.columns) {
          // @ts-ignore
          mycolumns.value = [...mytab.columns]
        }
      }

      // console.log('mycolumns')
      // console.log(mycolumns)
      // console.log('tablesList:')
      // console.table(tablesList)

      if (!!mycolumns.value) {
        mycolumns.value.forEach((rec: IColGridTable) => {
          if (rec.label_trans)
            rec.label = t(rec.label_trans)
        })
      }

      if (mytab) {
        mytable.value = mytab.value
      }

      if (!!props.tablesList) {
        tools.setCookie('tablesel', tablesel.value)
      }

      updatedcol()

      if (!!mytable.value) {
        const myselcol = tools.getCookie(mytable.value, '')
        if (!!myselcol && myselcol.length > 0) {
          colVisib.value = myselcol.split('|')
        } else {
          mycolumns.value.forEach((elem: any) => {
            if (elem.field !== costanti.NOFIELD) {
              if (checkIfColShow(elem.field)) {
                colVisib.value.push(elem.field + elem.subfield)
              }
            }
          })
        }
      }

      startsearch.value = true

      refresh()
    }

    function doSearch() {
      refresh()
    }

    function changefuncAct(newval: any) {
      if (!disabilita()) {
        tools.setCookie(tools.CAN_EDIT, newval)
      }
    }

    function clickrowcol(row: any, col: any) {
      if (!canEdit.value) {
        if (!selected.value[0]) {
          const uguali = rowclicksel.value!._id === row._id
          console.log('id', rowclicksel.value!._id, 'id2', row._id)
          rowclicksel.value = null
          colclicksel.value = null
        } else {
          rowclicksel.value = row
          colclicksel.value = col
        }
      }
    }

    function getclrow(myrow: any) {
      if (rowclicksel.value === myrow)
        return 'colsel'
      else
        return ''
    }

    function getSelectedString() {
      return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${serverData.value.length}`
    }

    function selectionclick(details: any) {
      // console.log('selectionclick selected', selected, 'details', details)
      if (details.added) {
        rowclicksel.value = details.rows[0]
        colclicksel.value = details.keys[0]
      } else {
        rowclicksel.value = null
        colclicksel.value = null
      }

      // console.log('rowclicksel', rowclicksel)
    }

    function getusernamesel() {
      try {
        if (rowclicksel.value) {
          return rowclicksel.value.username
        }
      } catch (e) {
        return ''
      }
    }

    function enableSaveNewRec() {

      let ok = true

      mycolumns.value.forEach((col: IColGridTable) => {
        if (col.required) {
          // console.log('newRecord.value', newRecord.value, newRecord.value[col.name])
          if (!newRecord.value[col.name]) {
            ok = false
          }
        }
      })

      return ok
    }

    async function saveNewRecord() {
      // check if the field are setted

      if (!enableSaveNewRec()) {
        return false
      }

      console.log('saveNewRecord')
      const mydata = {
        table: mytable.value,
        data: {}
      }

      const myobj = newRecord.value


      //++ Eliminare eventuali campi ?
      mycolumns.value.forEach((col: IColGridTable) => {
        if (col.notsave) {
          delete myobj[col.name]
        }
      })

      mydata.data = myobj

      const data = await globalStore.saveTable(mydata)
        .then((ris) => {
          if (ris) {
            // console.log('ris', ris)
            newRecordBool.value = false
            const indrec = serverData.value.findIndex((rec: any) => rec._id === ris._id)
            console.log('indrec', indrec, serverData.value[indrec])

            if (fieldsTable.tableWithUsername.includes(props.prop_mytable)) {
              ris.username = userStore.my.username
            }

            // console.table(serverData.value)
            if (indrec >= 0)
              serverData.value[indrec] = ris
            else
              serverData.value.push(ris)

            newRecord.value = null
            // refresh()
          }
        })
    }

    async function saverecModif() {
      console.log('saverecModif')
      const mydata = {
        table: mytable.value,
        data: {}
      }

      mydata.data = recModif.value

      const oldrec = serverData.value.find((rec: IMySkill) => rec._id === recModif.value._id)

      const data = await globalStore.saveTable(mydata)
        .then((ris) => {
          // console.log('ris', ris)
          if (ris) {
            editRecordBool.value = false
            const indrec = serverData.value.findIndex((rec: IMySkill) => rec._id === ris._id)
            console.log('indrec', indrec, serverData.value[indrec])
            mycolumns.value.forEach((col: IColGridTable) => {
              if (!col.foredit) {
                ris[col.name] = oldrec[col.name]
              }
            })
            if (indrec >= 0)
              serverData.value[indrec] = ris
          }
        })
    }

    function hidewindow() {
      annulla(0)
    }

    function getlabelAddRow() {
      return props.labelBtnAddRow
    }

    function visButtRow() {
      return props.labelBtnAddRow !== addRow.value
    }

    function checkIfShowRec(rec: any) {
      return ((rec._id > 0 && typeof rec._id === 'number') || rec._id !== 'number') && rec !== -100
    }

    function showColCheck(col: IColGridTable, tipovis: number, visulabel:boolean, value: any = ''){
      const check = tools.checkIfShowField(col, tipovis, visulabel, value)

      const valuePresent = (colVisib.value.includes(col.field! + col.subfield) || colVisib.value.includes(col.field + '.' + col.subfield))

      return check && valuePresent
    }

    function getValueExtra(col: IColGridTable, record: any) {
      if (record) {
        if (col.filter_field! in record) {
          return col.filter_field ? record[col.filter_field] || '' : ''
        }
      }
      return ''
    }

    // onMounted(mounted)

    created()
    mounted()

    return {
      selItem,
      SaveValdb,
      showandsel,
      annulla,
      SaveValue,
      updatedcol,
      getrows,
      createNewRecordDialog,
      createNewRecord,
      saveFieldValue,
      clickFunz,
      visCol,
      visuIntestazCol,
      clByCol,
      changeCol,
      changeTable,
      doSearch,
      changefuncAct,
      clickrowcol,
      getclrow,
      getSelectedString,
      selectionclick,
      getusernamesel,
      saveNewRecord,
      saverecModif,
      hidewindow,
      isfinishLoading,
      getlabelAddRow,
      visButtRow,
      mytable,
      mytitle,
      mycolumns,
      colkey,
      search,
      canEdit,
      rowclicksel,
      colVisib,
      colExtra,
      colclicksel,
      selected,
      pagination,
      loading,
      onRequest,
      serverData,
      myfilter,
      disabilita,
      newRecordBool,
      editRecordBool,
      newRecord,
      recModif,
      lists,
      refresh,
      spinner_visible,
      tablesel,
      myfilterand,
      tools,
      costanti,
      fieldsTable,
      globalStore,
      searchList,
      searchval,
      canModifyThisRec,
      checkIfShowRec,
      valoriopt,
      labelcombo,
      filter,
      myvertical,
      showColCheck,
      getValueExtra,
    }
  }
})
