import { defineComponent, PropType, ref, watch, toRef, onMounted, toRefs, computed } from 'vue'
import { useI18n } from '@src/boot/i18n'

import { tools } from '../../store/Modules/tools'

import { fieldsTable } from '@store/Modules/fieldsTable'

import { shared_consts } from '@/common/shared_vuejs'

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
import { CMyUser } from '../CMyUser'
import { CMyGroups } from '../CMyGroups'
import { CMyFieldDb } from '../CMyFieldDb'
import { CMyRecCard } from '../CMyRecCard'
import { CMyRecGrpCard } from '../CMyRecGrpCard'
import { CMySelect } from '../CMySelect'
import { CTitleBanner } from '../CTitleBanner'

import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'
import { costanti } from '@costanti'
import translate from '@/globalroutines/util'
import { toolsext } from '@store/Modules/toolsext'
import { CMyCardPopup } from '@/components/CMyCardPopup'
import { CMyCardGrpPopup } from '@/components/CMyCardGrpPopup'

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
      type: Number,
      required: false,
      default: 0,
    },
    prop_codeId: {
      type: String,
      required: false,
      default: '',
    },
/*    keyMain: {
      type: String,
      required: false,
      default: '',
    },

 */
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
    labelBtnAddExtra: {
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
    col_footer: {
      type: String,
      required: false,
      default: '',
    },
    col_tabfooter: {
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
    },
    visufind: {
      type: Number,
      required: false,
      default: costanti.FIND_PEOPLE,
    },
    extrafield: {
      type: String,
      required: false,
      default: '',
    },
  },
  components: { CMyPopupEdit, CTitleBanner, CMyFieldDb, CMySelect, CMyFriends, CMyGroups, CMyUser, CMyRecCard, CMyCardPopup, CMyRecGrpCard, CMyCardGrpPopup },
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
    const recSaved: any = ref({})
    const recModif: any = ref({})

    const mytable = ref('')
    const mytitle = ref('')
    const mycolumns = ref([])
    const colkey = ref('')
    const search = ref('')

    const tablesel = ref('')

    const loading = ref(false)

    const visupagedialog = ref(false)
    const myrecdialog = ref(null)

    const startsearch = ref(false)

    const serverData: any = ref([])
    const spinner_visible = ref(false)
    const searchList = ref(<ISearchList[]> [])

    let actual = ''

    let idsel = ''
    let colsel = ref(<IColGridTable | null>{ name: '', field: '', sortable: false })
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
    const colNotVisib: any = ref([])
    const colExtra: any = ref([])
    const actualDate: any = ref(<any>null)

    const rowclicksel = ref(<any>null)
    const colclicksel = ref(null)

    const selected: any = ref([])
    const showfilteradv = ref(false)  // filtri avanzati

    const filter = ref(0)
    const filtergrp = ref(costanti.MY_GROUPS)

    const mycodeid = toRef(props, 'prop_codeId')

    const myvertical = ref(props.vertical)

    const valoriopt = computed(() => (item: any, addall: boolean, addnone: boolean) => {
      // console.log('valoriopt', item.table)
      return globalStore.getTableJoinByName(item.table, addall, addnone, item.filter)
    })

    const labelcombo = computed(() => (item: any) => {
      let lab = item.label
      if (item.showcount)
        lab += ' (' + valoriopt.value(item, false, false).length + ')'
      return lab
    })

    watch(() => searchList.value, (to: any, from: any) => {
      // console.log('watch searchlist', to)
      refresh()
    })

    watch(() => showfilteradv.value, (newval: any, from: any) => {
      tools.setCookie('s_adv', newval)
    })

    watch(() => props.filtercustom, (to: any, from: any) => {
      // console.log('filtercustom', to)
      refresh()
    })

    function setCategBySector(tablecat: string, tabsector: string, newval: any) {

      const recSector = searchList.value.find((rec) => rec.table === tabsector)
      if (recSector)
        tools.setCookie(tools.COOK_SEARCH + tabsector, newval)

      for (const item of searchList.value) {
        if (item.table === tablecat) {
          const valsaved = tools.getCookie(tools.COOK_SEARCH + tablecat + '_' + newval, costanti.FILTER_TUTTI)
          const rec = searchList.value.find((rec) => rec.table === tablecat) // check if exist
          let trovato = false
          let arrvalues = []
          if (rec) {
            arrvalues = valoriopt.value(rec.value, false, false)
            if (arrvalues)
              trovato = arrvalues.find((rec: any) => rec[rec.key] === valsaved)
          }
          if (valsaved && trovato)
            item.value = valsaved
          else {
            if (arrvalues) {
              item.value = costanti.FILTER_TUTTI
            }
          }
        }
      }

    }

    function setProvinceByRegion(tableprov: string, tabregion: string, newval: any) {

      const recRegion = searchList.value.find((rec) => rec.table === tabregion)
      if (recRegion)
        tools.setCookie(tools.COOK_SEARCH + tabregion, newval)

      for (const item of searchList.value) {
        if (item.table === tableprov) {
          const valsaved = tools.getCookie(tools.COOK_SEARCH + tableprov + '_' + newval, costanti.FILTER_TUTTI)
          const rec = searchList.value.find((rec) => rec.table === tableprov) // check if exist
          let trovato = false
          let arrvalues = []
          if (rec) {
            arrvalues = valoriopt.value(rec.value, false, false)
            if (arrvalues)
              trovato = arrvalues.find((rec: any) => rec[rec.key] === valsaved)
          }
          if (valsaved && trovato)
            item.value = valsaved
          else {
            if (arrvalues) {
              item.value = costanti.FILTER_TUTTI
            }
          }
        } else if (item.table === toolsext.TABCITIES) {
          const valsaved = tools.getCookie(tools.COOK_SEARCH + toolsext.TABCITIES + '_' + newval, costanti.FILTER_TUTTI)
          const rec = searchList.value.find((rec) => rec.table === toolsext.TABCITIES) // check if exist
          let trovato = false
          let arrvalues = []
          if (rec) {
            arrvalues = valoriopt.value(rec.value, false, false)
            if (arrvalues)
              trovato = arrvalues.find((rec: any) => rec[rec.key] === valsaved)
          }
          if (valsaved && trovato)
            item.value = valsaved
          else {
            if (arrvalues) {
              item.value = costanti.FILTER_TUTTI
            }
          }
        }
      }

    }

    function searchval(newval: any, table: any) {
      console.log('searchval', newval, table)
      tools.setCookie(tools.COOK_SEARCH + table, newval)

      if (table === toolsext.TABSKILLS) {
        const recSector = searchList.value.find((rec) => rec.table === 'sectors')
        if (recSector) {
          tools.setCookie(tools.COOK_SEARCH + table + '_' + recSector.value, newval)
        }
      } else if (table === toolsext.TABSECTORS) {
        setCategBySector(toolsext.TABSKILLS, table, newval)
      } else if (table === toolsext.TABREGIONS) {
        setProvinceByRegion(toolsext.TABPROVINCE, table, newval)
      } else if (table === 'goods') {
        setCategBySector('sectorgoods', table, newval)
      }

      refresh()
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
      let filtersearch3and: any[] = []
      let filtercustom: any[] = [...props.filtercustom]

      let recSector = null
      let recSectorGood = null
      let recCities = null
      let recRegion = null
      let recProvince = null
      let recSkill = null
      let idSector = 0
      let idSectorGood = 0
      let idProvince = 0
      let idRegion = 0
      let idSkill = 0
      if (searchList.value) {
        recSector = searchList.value.find((item: ISearchList) => item.table === toolsext.TABSECTORS)
        idSector = recSector ? recSector.value : 0
      }
      if (searchList.value) {
        recSectorGood = searchList.value.find((item: ISearchList) => item.table === 'sectorgoods')
        idSectorGood = recSectorGood ? recSectorGood.value : 0
      }
      if (searchList.value) {
        recProvince = searchList.value.find((item: ISearchList) => item.table === 'provinces')
        idProvince = recProvince ? recProvince.value : 0
      }
      if (searchList.value) {
        recRegion = searchList.value.find((item: ISearchList) => item.table === 'regions')
        idRegion = recRegion ? recRegion.value : 0
      }
      if (searchList.value) {
        recCities = searchList.value.find((item: ISearchList) => item.table === 'cities')
      }

      if (searchList.value) {
        recSkill = searchList.value.find((item: ISearchList) => item.table === toolsext.TABSKILLS)
        idSkill = recSkill ? recSkill.value : 0
        console.log('recSkill', idSkill)
      }


      let arrfilter_cities: any = []
      let arrfilter_provices: any = []

      // console.table(searchList.value)

      if (searchList.value) {
        for (const item of searchList.value) {

          //searchList.value.forEach((item: ISearchList) => {
          if (!item.notinsearch) {
            let objitem: any = {}
            // console.log('        item ', item)
            let obj: any = {}

            if (item.table === 'regions') {

              let myfield = tools.getFieldSearchByTable(mytable.value, item.table, 'mycities.reg')
              obj[myfield] = item.value
              if (myfield) {
                obj['mycities.reg'] = item.value
                if (item.value !== '' && item.value !== costanti.FILTER_TUTTI) {
                  filtersearch3and.push(obj)
                }
              }

              if (item.value && recProvince && idRegion !== costanti.FILTER_TUTTI) {
                arrfilter_provices.push({key: 'reg', value: idRegion })
              }

            } else if (item.table === 'provinces') {

              let myfield = tools.getFieldSearchByTable(mytable.value, item.table, 'mycities.prov')
              obj[myfield] = item.value
              if (myfield) {
                if (item.value !== '' && item.value !== costanti.FILTER_TUTTI) {
                  filtersearch3and.push(obj)
                }
              }

              if (item.value && recCities && idProvince !== costanti.FILTER_TUTTI) {
                arrfilter_cities.push({key: 'prov', value: idProvince })
              }

            } else if (item.table === 'cities') {

              if (item.value && item.value.hasOwnProperty('_id')) {
                let myfield = tools.getFieldSearchByTable(mytable.value, item.table, 'idCity')
                if (myfield) {
                  obj[myfield] = item.value._id
                  if (item.value && item.value !== '' && item.value._id !== costanti.FILTER_TUTTI) {
                    filtersearch3and.push(obj)
                  }
                }
              }
            } else if (shared_consts.TABLES_WITH_FILTER_FIELD.includes(item.table)) {

              if (item.value) {
                if (item.value && item.value !== '' && item.value._id !== costanti.FILTER_TUTTI) {
                  const myr: any = globalStore.getRecordByTableSingle(item.table, item.value)

                  if (myr) {
                    filtercustom.push(myr.filter)
                  }

                }
              }
            } else if (item.value > 0) {
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

              if (item.table !== 'provinces') {
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
              if ((item.table === toolsext.TABSKILLS) && item.value === costanti.FILTER_TUTTI) {
                let obj2: any = {}

                if (idSector > 0) {
                  // idSector
                  obj2['sector._id'] = idSector
                  filtersearch2.push(obj2)
                }
                if (idSkill > 0) {
                  // idSector
                  obj2['idSkill'] = idSkill
                  filtersearch2.push(obj2)
                }
              } else if ((item.table === 'goods') && item.value === costanti.FILTER_TUTTI) {
                let obj2: any = {}
                if (idSectorGood > 0) {
                  // idSectorGood
                  obj2['sectorgood._id'] = idSectorGood
                  filtersearch2.push(obj2)
                }
              } else if ((item.table === 'subskills') && item.value === costanti.FILTER_TUTTI) {
                let obj2: any = {}
                // idSector
                if (idSkill > 0) {
                  obj2['myskill._id'] = idSkill
                  filtersearch2.push(obj2)
                }
              }
            }

          }
        }
      }

      if (arrfilter_cities.length > 0 && recCities) {
        let myobjfilt: any = {}
        for (const myrec of arrfilter_cities) {
          myobjfilt[myrec.key] = myrec.value
        }
        recCities.filter_extra = myobjfilt
      }

      if (arrfilter_provices.length > 0 && recProvince) {
        let myobjfilt: any = {}
        for (const myrec of arrfilter_provices) {
          myobjfilt[myrec.key] = myrec.value
        }
        recProvince.filter_extra = myobjfilt
      }


      // console.log('filtersearch', filtersearch)

      if (props.prop_search) {
        let nosearch = false
        if (filtersearch.length <= 0 && !param_myfilter) {
          nosearch = true
          returnedData.value = []
          returnedCount = 0
        } else {
          /*if (props.keyMain) {
            nosearch = true
            filtersearch.forEach((rec: any) => {
              if (!!rec[props.keyMain]) {
                nosearch = false
              }
            })
          }*/
        }
        // if ((false && nosearch && props.finder) || (props.finder_noNull && nosearch)) {
        if (props.finder_noNull && nosearch) {
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
        filtersearch3and: filtersearch3and,
        // @ts-ignore
        filtercustom: filtercustom,
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

    function onRequest(myprops: any) {
      const { page, rowsPerPage, rowsNumber, sortBy, descending } = myprops.pagination
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
      if (inmodif) {

      }
      if (col.jointable === toolsext.TABSECTORS) {
        // Sbianca la select della Categoria

        if (item && item.hasOwnProperty('idSkill')) {
          item['idSkill'] = costanti.FILTER_NESSUNO
          newRecord.value['idSkill'] = item['idSkill']
        }
      }
      rowsel = item
      idsel = item._id
      colsel.value = col
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
      colsel.value = { name: '', field: '', sortable: false }
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
      /*
      if (newRecord.value) {
        globalStore.DeleteRec({ table: mytable.value, id: newRecord.value._id })
          .then((ris) => {
            // console.log('deleted', ris)
            serverData.value.pop(ris)
            newRecord.value = null
            return true
          })
      }

       */
      newRecord.value = null
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
        colNotVisib.value = []
        colExtra.value = []
        mycolumns.value.forEach((elem: IColGridTable) => {

          const mysub = elem.subfield ? elem.subfield : ''
          if (elem) {
            if (elem.field !== costanti.NOFIELD) {
              if (checkIfColShow(elem.field)) {
                colVisib.value.push(elem.field + mysub)
              } else {
                colNotVisib.value.push(elem.field + mysub)
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

    function createNewRecordDialog() {

      const mydata: any = {
        table: mytable.value,
        data: {}
      }

      // if (props.defaultnewrec)
      //   mydata.data = props.defaultnewrec()

      // console.log('DATA=', mydata.data)


      // @ts-ignore
      if (props.defaultnewrec) {
        // @ts-ignore
        newRecord.value = props.defaultnewrec()
      }
      if (!newRecord.value) {
        newRecord.value = {}
      }
      newRecord.value['userId'] = userStore.my._id
      newRecord.value['idapp'] = process.env.APP_ID
      // globalStore.saveTable(mydata).then(ris => console.log('RISULT', ris))
      newRecordBool.value = true

    }


    function createNewRecord() {

      createNewRecordDialog()

      console.log('newRecord.value', newRecord.value)

      // serverData.value.push(newRecord.value)
      pagination.value.rowsNumber++

      loading.value = false
    }

    function saveFieldValue(mydata: any) {
      // console.log('saveFieldValue', mydata)

      if (newRecordBool.value){
        return false
      }

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

      myvertical.value = props.vertical
      // myvertical.value = tools.getCookie('myv_' + props.prop_mytable, props.vertical)

      showfilteradv.value = tools.getCookie('s_adv', false)
    }

    function mounted() {
      searchList.value = props.prop_searchList

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
          param2: {...item},
        }

        if (col.action === lists.MenuAction.CAN_EDIT_TABLE) {
          console.log('Edit', item)
          selItem(item, col)
          recModif.value = {...item}
          recSaved.value = {...item}
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
          console.log('item', item)
          let indelim = serverData.value.findIndex((rec: any) => rec._id === item._id)
          console.log('indexof', indelim)
          if (indelim >= 0)
            serverData.value.splice(indelim, 1)
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
      if (col.fieldtype === costanti.FieldType.html || col.fieldtype === costanti.FieldType.listimages || col.fieldtype === costanti.FieldType.listobj || col.noshowlabel) {
        return false
      } else {
        return true
      }
    }

    function checkIfColShow(field: string | undefined) {
      let vis = true
      /*if (shared_consts.TABLES_NOT_SHOW_IF_USERNAME.includes(props.prop_mytable) && !props.prop_search) {
        if (field === 'username') {
          vis = false
        }
      }*/
      return vis
    }

    function changeCol(newval: any) {
      // console.log('changecol', mytable.value)
      if (!!mytable.value) {
        let arrcol = []
        let col: IColGridTable = {name: '', sortable: false}
        for (col of mycolumns.value) {
          if (col.field !== costanti.NOFIELD) {
            let obj = {
              n: col.field + (col.subfield ? col.subfield : ''),
              v: 0
            }
            obj.v = colVisib.value.includes(obj.n) ? 1 : 0
            if (obj.v === 0) {
              // scrive solo quelli da nascondere !
              arrcol.push(obj.n + ',' + obj.v)
            }
          }
        }

        tools.setCookie(mytable.value + '_', arrcol.join('|'))
      }
    }

    function changeTable(mysel: any) {
      // console.log('changeTable', tablesel.value)
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
        // Leggi la lista delle colonne visibili:
        const myselcol = tools.getCookie(mytable.value + '_', '')

        colVisib.value = []

        let elem: IColGridTable
        if (tools.isArray(mycolumns.value)) {
          for (elem of mycolumns.value) {
            if (elem.field !== costanti.NOFIELD) {
              if (checkIfColShow(elem.field)) {
                colVisib.value.push(elem.field! + elem.subfield!)
              }
            }
          }


          if (!!myselcol && myselcol.length > 0) {
            const arrselcol = myselcol.split('|')

            for (const col of arrselcol) {
              const arrv = col.split(',')
              if (arrv.length > 1) {
                let field = arrv[0]
                let visib = arrv[1]
                const rec = mycolumns.value.find((rec: any) => (rec.field + rec.subfield) === field)


                if (rec) {
                  if (field) {
                    if (visib === '1') {
                      if (!colVisib.value.includes(field))
                        colVisib.value.push(field)  // se non incluso allora lo aggiungi
                    } else if (visib === '0') {
                      // Se da togliere, lo togli
                      if (colVisib.value.includes(field))
                        colVisib.value = colVisib.value.filter((rec: any) => rec !== field)
                    }
                  }
                }
              }
            }
          }
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

      //mycolumns.value.forEach((col: IColGridTable) => {
      let col: IColGridTable

      for (col of mycolumns.value) {
        if (col.required) {
          // console.log('newRecord.value', newRecord.value, newRecord.value[col.name])
          if (tools.isArray(newRecord.value[col.name])) {
            if (newRecord.value[col.name].length <= 0) {
              return false
            }
          } else {
            if (!newRecord.value[col.name]) {
              return false
            }
          }
        }
      }

      return ok
    }

    function getColMissing() {

      let col: IColGridTable

      for (col of mycolumns.value) {
        if (col.required) {
          // console.log('newRecord.value', newRecord.value, newRecord.value[col.name])
          if (tools.isArray(newRecord.value[col.name])) {
            if (newRecord.value[col.name].length <= 0){
              return translate(col.label_trans)
            }
          } else {
            if (!newRecord.value[col.name]) {
              // console.log('col.name', col.name)
              return translate(col.label_trans)
            }
          }
        }
      }

      return ''
    }

    async function saveNewRecord() {
      // check if the field are setted

      if (!enableSaveNewRec()) {
        tools.showNeutralNotif($q, 'Si prega di compilare il campo \'' + getColMissing() + '\'', 5000)

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
          if (ris.hasOwnProperty('code')) {
            tools.checkErrors($q, ris.code, '');
          } else {
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
                serverData.value = [ris, ...serverData.value]

              newRecord.value = null

              tools.showPositiveNotif($q, t('db.recupdated'))
              // refresh()
            } else {
              tools.showNegativeNotif($q, t('db.recfailed'))
            }
          }
        }).catch((e) => {
          tools.showNegativeNotif($q, t('db.recfailed'))
        })
    }

    function cancelrecModif() {
      recModif.value = {...recSaved.value}

      editRecordBool.value = false
      /*if (recModif.value._id) {
        const indrec = serverData.value.findIndex((rec: any) => rec._id === recModif.value._id)
        if (indrec >= 0)
          serverData.value[indrec] = recModif.value
        editRecordBool.value = false
      }

       */
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
            const indrec = serverData.value.findIndex((rec: any) => rec._id === ris._id)
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

    function showColCheck(col: IColGridTable, tipovis: number, visulabel:boolean, value: any = '', record: any = null){

      //if (col.isadvanced_field && !showfilteradv.value)
      //  return false

      const check = tools.checkIfShowField(col, tipovis, visulabel, value)

      let valuePresent = (colVisib.value.includes(col.field! + col.subfield) || colVisib.value.includes(col.field + '.' + col.subfield))

      if (valuePresent && col.visibleif! > 0 && record) {
        if (col.visib_field) {
          if (col.visibleif === costanti.BINARY_CHECK) {
            if (!tools.isBitActive(record[col.visib_field], col.visib_value))
              valuePresent = false
          }

        }

      }

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

    function getLabelFooterByRow(row: any) {
      if (props.col_footer) {

        let mycol = fieldsTable.getColByTable(tablesel.value, props.col_footer)
        if (mycol) {
          return tools.getValueByRemoteField(mycol, row, row[props.col_footer], props.col_tabfooter)
        }
      }
      return ''
    }

    function cmdExt(cmd: any, id: any, val2: any) {
      console.log('cmd', cmd)

      if (cmd === costanti.CMD_SHOW_PAGE) {
        visupagedialog.value = true
        myrecdialog.value = id
        return true
      }

      let action = 0
      if (cmd === costanti.CMD_DELETE) {
        action = lists.MenuAction.DELETE_RECTABLE
      } else if (cmd === costanti.CMD_MODIFY) {
        action = lists.MenuAction.CAN_EDIT_TABLE
      }

      if (action > 0) {
        const col = props.prop_mycolumns.find((rec: any) => rec.action === action)
        if (col) {
          const myarr = serverData.value.find((rec: any) => rec._id === id)
          if (myarr)
            clickFunz(myarr, col)
        }
      }
    }

    function showDate(mydate: any) {
      console.log('showDate', mydate)
      const datestr = tools.getstrVeryShortDate(mydate)
      if (actualDate.value !== datestr) {
        return true
      }
      return false
    }
    function getActualDate(mydate: any) {
      return actualDate.value
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
      cancelrecModif,
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
      recSaved,
      lists,
      refresh,
      spinner_visible,
      tablesel,
      myfilterand,
      tools,
      costanti,
      toolsext,
      fieldsTable,
      globalStore,
      searchList,
      searchval,
      checkIfShowRec,
      valoriopt,
      labelcombo,
      filter,
      filtergrp,
      myvertical,
      showColCheck,
      getValueExtra,
      shared_consts,
      getLabelFooterByRow,
      showfilteradv,
      cmdExt,
      visupagedialog,
      myrecdialog,
      showDate,
      getActualDate,
      actualDate,
      actual,
    }
  }
})
