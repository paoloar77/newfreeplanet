import { defineComponent, PropType, ref, watch, toRef, onMounted } from 'vue'
import { useI18n } from '@src/boot/i18n'

import { tools } from '../../store/Modules/tools'

import { IColGridTable, IFilter, ITableRec, IPagination } from '../../model'
import { lists } from '../../store/Modules/lists'
import { IParamsQuery } from '../../model/GlobalStore'
import { CMyPopupEdit } from '../CMyPopupEdit'
import { CTitleBanner } from '../CTitleBanner'

import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'
import { costanti } from '@costanti'

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
    prop_codeId: {
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
    extraparams: {
      required: false,
      default: {},
    },
    pagination: {
      type: Object as PropType<IPagination>,
      required: false,
      default: () => {
        return { sortBy: '', descending: false, page: 1, rowsNumber: 10, rowsPerPage: 10 }
      },
    },
    defaultnewrec: {
      type: Function,
      required: true,
    },
  },
  components: { CMyPopupEdit, CTitleBanner },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()
    const globalStore = useGlobalStore()

    const addRow = ref('Aggiungi')

    const newRecordBool = ref(false)
    const newRecord: any = ref({})
    const savenewRec = ref(false)

    const mytable = ref('')
    const mytitle = ref('')
    const mycolumns = ref([])
    const colkey = ref('')
    const search = ref('')

    const tablesel = ref('')

    const loading = ref(false)

    const serverData: any = ref([])
    const spinner_visible = ref(false)

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

    const mycodeid = toRef(props, 'prop_codeId')

    const mypag = toRef(props, 'pagination')

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
    async function fetchFromServer(startRow: any, endRow: any, myfilter: any, myfilterand: any, sortBy: any, descending: any) {

      let myobj = null
      if (sortBy) {
        myobj = {}
        if (descending) { // @ts-ignore
          myobj[sortBy] = -1
        } else { // @ts-ignore
          myobj[sortBy] = 1
        }
      }

      let params: IParamsQuery = {
        table: mytable.value,
        startRow,
        endRow,
        filter: myfilter,
        filterand: myfilterand,
        sortBy: myobj,
        descending,
        userId: userStore.my._id,
        codeId: '',
      }

      params.codeId = mycodeid.value

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

    function onRequest(myprops: any) {
      // console.log('onRequest', 'myfilter = ', myfilter)
      const { page, rowsPerPage, rowsNumber, sortBy, descending } = myprops.pagination
      const myfilternow = myfilter.value
      const myfilterandnow = myfilterand.value

      savefilter()

      if (!mytable.value)
        return

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
      fetchFromServer(startRow, endRow, myfilternow, myfilterandnow, sortBy, descending).then((ris: any) => {

        myprops.pagination.rowsNumber = getRowsNumberCount(myfilter)

        // clear out existing data and add new
        if (returnedData.value === []) {
          serverData.value = []
        } else {
          // if (serverData.length > 0)
          //   serverData.splice(0, serverData.length, ...returnedData)
          // else
          serverData.value = [...returnedData.value]
        }

        // console.log('serverData', serverData)

        // don't forfunction to update local pagination object
        myprops.pagination.page = page
        myprops.pagination.rowsPerPage = rowsPerPage
        myprops.pagination.sortBy = sortBy
        myprops.pagination.descending = descending

        // console.log('pagination', pagination)

        // ...and turn of loading indicator
        loading.value = false
        spinner_visible.value = false
      })
    }


    function refresh_table() {
      onRequest({
        pagination: props.pagination
      })
      rowclicksel.value = null
    }


    function refresh() {
      serverData.value = []

      search.value = search.value.trim()

      // console.log('refresh')
      // console.log('search', search)
      if (!!search.value && search.value !== '')
        myfilter.value = search.value
      else
        myfilter.value = ''

      // console.log('myfilter', myfilter)

      refresh_table()
    }

    watch(() => mycodeid.value, (newval, oldval) => {
      refresh()
    })

    watch(() => myfilterand.value, (newval, oldval) => {
      refresh()
    })

    function isTutor() {
      return userStore.isTutor
    }

    function disabilita() {
      if ((mytable.value === 'users') && (isTutor)) {
        return true
      }

      return false
    }

    function tableClass() {
      if (dark) {
        return 'bg-black'
      }
    }

    function selItem(item: any, col: IColGridTable) {
      // console.log('selItem', item)
      rowsel = item
      idsel = item._id
      colsel.value = col
    }

    function undoVal() {
      console.log('undoVal', 'colsel', colsel, 'valprec', valPrec, 'colkey', colkey, 'selected', rowsel)
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
      // console.log('showandsel', row, col, newval)
      rowsel = row
      colsel = col
      idsel = row._id
      SaveValue(newval, valinitial)

      // rowclicksel = null
    }

    function annulla(val: any) {
      console.log('annulla')
      globalStore.DeleteRec({ table: mytable.value, id: newRecord.value._id })
        .then((ris) => {
          return true
        })
    }

    function SaveValue(newVal: any, valinitial: any) {
      // console.log('SaveValue', newVal, 'rowsel', rowsel)

      if (colsel.value) {
        // Update value in table memory
        if (colsel.value.subfield !== '') {
          if (rowsel[colsel.value.field!] === undefined)
            rowsel[colsel.value.field!] = {}
          rowsel[colsel.value.field!][colsel.value.subfield!] = newVal
        } else {
          rowsel[colsel.value.field!] = newVal
        }
      }

      const mydata = <any>{
        id: idsel,
        table: mytable,
        fieldsvalue: {}
      }


      if (colsel.value) {
        if (colsel.value.subfield !== '') {
          if (mydata.fieldsvalue[colsel.value.field!] === undefined) {
            mydata.fieldsvalue[colsel.value.field! + '.' + colsel.value.subfield!] = newVal
          }
          // mydata.fieldsvalue[colsel.value.field][colsel.subfield] = newVal
        } else {
          if (colsel.value) {
            mydata.fieldsvalue[colsel.value.field!] = newVal
          }
        }
      }

      valPrec = valinitial

      saveFieldValue(mydata)

    }

    function created() {
      console.log('created')
      // serverData = mylist.slice() // [{ chiave: 'chiave1', valore: 'valore 1' }]

      mytable.value = props.prop_mytable
      mytitle.value = props.prop_mytitle
      mycolumns.value = props.prop_mycolumns
      colkey.value = props.prop_colkey

      changeTable(false)
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
              colVisib.value.push(elem.field + mysub)
            }

            if (elem.visible && elem.field === costanti.NOFIELD) {
              colExtra.value.push(elem.name)
            }
          }
        })
      }
    }

    function getrows() {
      return props.pagination.rowsNumber
    }

    async function createNewRecordDialog() {

      const mydata: any = {
        table: mytable,
        data: function () {
          return {}
        }
      }

      mydata.data = props.defaultnewrec

      // const mykey = fieldsTable.getKeyByTable(mytable)

      // mydata.data[mykey] = ''

      console.log('mydata', mydata)

      newRecord.value = await globalStore.saveTable(mydata)
      newRecordBool.value = true

    }

    async function createNewRecord() {
      loading.value = true

      const mydata = {
        table: mytable,
        data: {}
      }

      mydata.data = props.defaultnewrec

      // const mykey = fieldsTable.getKeyByTable(mytable)

      // mydata.data[mykey] = ''

      console.log('mydata', mydata)
      const data = await globalStore.saveTable(mydata)

      serverData.value.push(data)
      mypag.value.rowsNumber++

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

    function mounted() {
      console.log('GridTable mounted', tablesel)

      if (!!props.tablesList) {
        canEdit.value = tools.getCookie(tools.CAN_EDIT, canEdit) === 'true'
        tablesel.value = tools.getCookie('tablesel', tablesel)
      }
      myfilterand.value = props.filterdef
      console.log('tablesel', tablesel)

      if (tablesel.value === '') {
        if (!!props.tablesList)
          tablesel.value = props.tablesList[0].value
        else
          tablesel.value = mytable.value
      }

      console.log('2) tablesel', tablesel)

      changeTable(false)

    }


    function clickFunz(item: any, col: IColGridTable) {
      if (col.action) {
        tools.ActionRecTable(null, col.action, mytable.value, item._id, item, col.askaction)
      }
    }

    function ActionAfterYes(action: number, item: any, data?: any) {
      if (action === lists.MenuAction.DELETE_RECTABLE) {
        if ((serverData.value.length > 0) && item) {
          serverData.value.splice(serverData.value.indexOf(item), 1)
          refresh_table()
        }
      } else if (action === lists.MenuAction.DUPLICATE_RECTABLE) {
        // Add record duplicated
        // serverData.push(data)
        refresh()
      }
    }

    function visCol(col: IColGridTable) {
      if (col.visuonlyEditVal) {
        if (canEdit.value) {
          return col.visuonlyEditVal
        } else {
          return false
        }
      } else {
        return true
      }
    }

    function changeCol(newval: any) {
      console.log('changecol', mytable)
      if (!!mytable.value) {
        tools.setCookie(mytable, colVisib.value.join('|'))
      }
    }

    function changeTable(mysel: any) {
      if (tablesel.value === undefined || tablesel.value === '')
        return

      // console.log('changeTable mysel=', mysel, 'tablesel', tablesel)
      // console.log('tablesList=')
      // console.table(tablesList)

      let mytab = null
      if (props.tablesList) {
        mytab = props.tablesList.find((rec: any) => rec.value === tablesel.value)
      }

      if (mytab === undefined) {
        tablesel.value = props.tablesList[0].value
        if (props.tablesList) {
          mytab = props.tablesList.find((rec: any) => rec.value === tablesel.value)
        }
      }

      // console.log('tablesel', tablesel, 'mytab', mytab)

      if (mytab) {
        mytitle.value = mytab.label
        colkey.value = mytab.colkey
        // @ts-ignore
        mycolumns.value = [...mytab.columns]
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
        const myselcol = tools.getCookie(mytable, '')
        if (!!myselcol && myselcol.length > 0) {
          colVisib.value = myselcol.split('|')
        } else {
          mycolumns.value.forEach((elem: any) => {
            if (elem.field !== costanti.NOFIELD)
              colVisib.value.push(elem.field + elem.subfield)
          })
        }
      }

      refresh()
    }

    function doSearch() {
      refresh()
    }

    function changefuncAct(newval: any) {
      if (!disabilita) {
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

    async function saveNewRecord() {
      console.log('saveNewRecord')
      savenewRec.value = true
      const mydata = {
        table: mytable,
        data: {}
      }

      mydata.data = newRecord

      const data = await globalStore.saveTable(mydata)
        .then((ris) => {
          if (ris) {
            // console.log('ris', ris)
            newRecordBool.value = false
            refresh()
          }
        })
    }

    function hidewindow() {
      console.log('hidewindow')
      if (!savenewRec.value) {
        annulla(0)
      }
    }

    function isfinishLoading() {
      return globalStore.finishLoading
    }

    function getlabelAddRow() {
      return props.labelBtnAddRow
    }

    function visButtRow() {
      return props.labelBtnAddRow !== addRow.value
    }

    onMounted(mounted)

    created()

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
    }
  }
})
