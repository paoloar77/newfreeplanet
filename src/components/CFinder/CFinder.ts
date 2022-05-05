import {
  computed,
  defineComponent, onBeforeMount, onBeforeUnmount, onMounted, ref, toRef, toRefs, watch,
} from 'vue'

import { tools } from '@store/Modules/tools'
import { CMyFieldDb } from '@/components/CMyFieldDb'
import { costanti } from '@costanti'
import { useGlobalStore } from '@store/globalStore'
import { useUserStore } from '@store/UserStore'

import { CGridTableRec } from '@/components/CGridTableRec'
import { IColGridTable, IMyBacheca, IMySkill, ISearchList, ISkill } from 'model'
import { shared_consts } from '@/common/shared_vuejs'
import { useI18n } from '@/boot/i18n'
import { toolsext } from '@store/Modules/toolsext'
import { fieldsTable } from '@store/Modules/fieldsTable'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'CFinder',
  props: {
    table: {
      type: String,
      required: true,
    },
    showFilterPersonal: {
      type: Boolean,
      required: false,
      default: true,
    },
    ind: {
      type: Number,
      required: false,
      default: -1,
    }
  },
  components: {
    CMyFieldDb, CGridTableRec,
  },
  setup(props, { attrs, slots, emit }) {
    const { t } = useI18n()
    const $q = useQuasar()
    const globalStore = useGlobalStore()
    const userStore = useUserStore()

    const arrfilterand: any = ref([])
    const filtercustom: any = ref([])
    const searchList_Servizi = ref(<ISearchList[]>[])
    const searchList_Beni = ref(<ISearchList[]>[])
    const searchList_MyGroups = ref(<ISearchList[]>[])
    const searchList_Events = ref(<ISearchList[]>[])
    const searchList_Hosp = ref(<ISearchList[]>[])

    const search = ref('')
    const myrecfiltertoggle = ref(tools.FILTER_ALL)

    const prop_colkey = ref('idSkill')
    const col_title = ref('descr')
    const col_footer = ref('idCity')
    const col_tabfooter = ref('mycities')

    const strextra = ref('')


    const col = ref(<IColGridTable>{})

    /*
    const idSectorServizi = computed(() => {
      let myval: any = null
      myval = searchList_Servizi.value.find((rec) => (rec.table === toolsext.TABSECTORS))
      if (myval) {
        const ris = myval.value || 0
        // console.log('idSectorServizi=', ris)
        return ris
      } else {
        return 0
      }
    })

     */

    watch(() => myrecfiltertoggle.value, (value: any, oldval: any) => {
        if (value === tools.FILTER_MYREC) {
          if (props.table === toolsext.TABMYGROUPS) {
            filtercustom.value = [{
              'admins': {
                $elemMatch: { username: { $eq: userStore.my.username } }
              },
            }]

          } else {
            filtercustom.value = [{ userId: userStore.my._id }]
          }

        } else if (value === tools.FILTER_MYFOLLOW) {
          if (props.table === toolsext.TABMYGROUPS) {

          }
        } else {
          filtercustom.value = []
        }
      },
    )

    const mypagination = computed(() => {
      if (props.table === toolsext.TABMYBACHECAS)
        return { sortBy: 'dateTimeStart', descending: false, page: 1, rowsNumber: 20, rowsPerPage: 20 }

      return { sortBy: 'date_created', descending: true, page: 1, rowsNumber: 20, rowsPerPage: 20 }
    })

    const searchList = computed(() => {
      if (props.table === toolsext.TABMYGOODS)
        return searchList_Beni.value
      else if (props.table === toolsext.TABMYSKILLS)
        return searchList_Servizi.value
      else if (props.table === toolsext.TABMYGROUPS)
        return searchList_MyGroups.value
      else if (props.table === toolsext.TABMYBACHECAS)
        return searchList_Events.value
      else if (props.table === toolsext.TABMYHOSPS)
        return searchList_Hosp.value

      return searchList_Servizi.value
    })

    const showType = computed(() => {
      if (props.table === toolsext.TABMYGOODS)
        return costanti.SHOW_MYCARD
      else if (props.table === toolsext.TABMYSKILLS)
        return costanti.SHOW_MYCARD
      else if (props.table === toolsext.TABMYGROUPS)
        return costanti.SHOW_MYCARD

      return costanti.SHOW_MYCARD
    })

    const hint = computed(() => {
      if (props.table === toolsext.TABMYGOODS)
        return 'nome del Bene o settore da cercare'
      else if (props.table === toolsext.TABMYSKILLS)
        return 'nome del Servizio o settore da cercare'
      else if (props.table === toolsext.TABMYGROUPS)
        return 'nome del Gruppo da cercare'
      else if (props.table === toolsext.TABMYBACHECAS)
        return 'nome dell\'Evento da cercare'
      else if (props.table === toolsext.TABMYHOSPS)
        return 'nome dell\'Ospitalità da cercare'

      return 'nome da cercare'
    })

    const visuType = computed(() => {
      if (props.table === toolsext.TABMYGOODS)
        return $q.screen.gt.xs
      else if (props.table === toolsext.TABMYSKILLS)
        return $q.screen.gt.xs
      else if (props.table === toolsext.TABMYGROUPS)
        return $q.screen.gt.xs
      else if (props.table === toolsext.TABMYBACHECAS)
        return $q.screen.gt.xs

      return $q.screen.gt.xs
    })

    const noMsgRecord = computed(() => {
      if (props.table === toolsext.TABMYGOODS)
        return 'Nessun Bene trovato con i filtri selezionati'
      else if (props.table === toolsext.TABMYSKILLS)
        return 'Nessun Servizio trovato con i filtri selezionati'
      else if (props.table === toolsext.TABMYGROUPS)
        return 'Nessun Gruppo trovato con i filtri selezionati'
      else if (props.table === toolsext.TABMYBACHECAS)
        return 'Nessun Evento trovato con i filtri selezionati'
      else if (props.table === toolsext.TABMYHOSPS)
        return 'Nessuna Ospitalità trovata con i filtri selezionati'

      return 'Nessun dato trovato con i filtri selezionati'
    })


    function mounted() {

      let obj = tools.getParamsByTable(props.table)

      if (props.ind >= 0) {
        strextra.value = costanti.MAINCARDS[props.ind].strsingolo!
      }

      col.value = fieldsTable.getArrColsByTable(props.table)

      prop_colkey.value = obj.prop_colkey
      col_title.value = obj.col_title
      col_footer.value = obj.col_footer
      col_tabfooter.value = obj.col_tabfooter


      function getFilterSkills(recSkill: any, index: number, arr: any) {
        const recsectors: any = searchList.value.find((rec) => rec.table === toolsext.TABSECTORS)
        // console.log('getFilterSkills', recSkill.idSector, recsectors.value)
        if (recsectors && recSkill.idSector) {
          return recSkill.idSector.includes(recsectors.value)
        } else {
          return true
        }
      }

      function getFilterGoods(recGood: any, index: number, arr: any) {
        const recsectorGoods: any = searchList.value.find((rec) => rec.table === 'sectorgoods')
        // console.log('getFilterSkills', recSkill.idSector, recsectors.value)
        if (recsectorGoods && recGood.idSectorGood) {
          return recGood.idSectorGood.includes(recsectorGoods.value)
        } else {
          return true
        }
      }

      function getFilterSubSkills(recSubSkill: any, index: number, arr: any) {
        const recskills: any = searchList.value.find((rec) => rec.table === 'skills')
        // console.log('recSubSkill', recSubSkill, 'recskills', recskills)
        if (recskills) {
          return recSubSkill.idSkill === recskills.value
        } else {
          return true
        }
      }

      /*function getFilterCitiesByProvince(recCities: any, index: number, arr: any) {
        const recprov: any = searchList.value.find((rec) => rec.table === 'provinces')
        // console.log('recSubSkill', recSubSkill, 'recskills', recskills)
        if (recprov) {
          return recCities.idProvince === recprov.value
        } else {
          return true
        }
      }

       */

      function getFilterProvinceByRegion(recProvince: any, index: number, arr: any) {
        const recreg: any = searchList.value.find((rec) => rec.table === 'regions')
        if (recreg) {
          return recProvince.reg === recreg.value
        } else {
          return true
        }
      }


      searchList_Servizi.value = [
        {
          label: 'Stato',
          table: 'statusSkills',
          key: 'idStatusSkill',
          value: 0,
          arrvalue: tools.getCookie(tools.COOK_SEARCH + 'statusSkills', []),
          type: costanti.FieldType.multiselect,
          filter: null,
          useinput: false,
          icon: 'mood',
          filteradv: true,
        },
        {
          label: 'Regione',
          table: 'regions',
          key: 'idReg',
          type: costanti.FieldType.select,
          value: tools.getCookie(tools.COOK_SEARCH + 'regions', costanti.FILTER_TUTTI),
          addall: true,
          arrvalue: [],
          filter: null,
          useinput: false,
          icon: 'fas fa-globe-europe'
        },
        {
          label: 'Provincia',
          table: 'provinces',
          key: 'idProvince',
          type: costanti.FieldType.select,
          value: tools.getCookie(tools.COOK_SEARCH + 'provinces', costanti.FILTER_TUTTI),
          addall: true,
          arrvalue: [],
          filter: getFilterProvinceByRegion,
          useinput: true,
          icon: 'flag',
          tablesel: 'provinces',
        },
        {
          label: 'Comune',
          table: 'cities',
          key: 'idCity',
          type: costanti.FieldType.select_by_server,
          value: tools.getCookie(tools.COOK_SEARCH + 'cities', costanti.FILTER_TUTTI),
          addall: true,
          arrvalue: [],
          useinput: true,
          filter: null,
          // filter: getFilterCitiesByProvince,
          // param1: shared_consts.PARAM_SHOW_PROVINCE,
          tablesel: 'cities',
        },
        {
          label: 'Offro/Cerco',
          table: 'adtypes',
          key: 'adType',
          value: tools.getCookie(tools.COOK_SEARCH + 'adtypes', costanti.FILTER_TUTTI),
          arrvalue: [],
          addall: true,
          type: costanti.FieldType.select,
          filter: null,
          useinput: false,
        },
        {
          label: 'Settore',
          table: toolsext.TABSECTORS,
          key: 'idSector',
          value: tools.getCookie(tools.COOK_SEARCH + toolsext.TABSECTORS, 0),
          arrvalue: [],
          type: costanti.FieldType.select,
          filter: null,
          addall: true,
          notinsearch: true,
          useinput: false,
        },
        {
          label: 'Categoria',
          table: 'skills',
          key: 'idSkill',
          value: tools.getCookie(tools.COOK_SEARCH + 'skills' + '_' + tools.getCookie(tools.COOK_SEARCH + toolsext.TABSECTORS, costanti.FILTER_TUTTI), costanti.FILTER_TUTTI),
          arrvalue: [],
          type: costanti.FieldType.select,
          addall: true,
          filter: getFilterSkills,
          showcount: true,
          useinput: false,
        },
        /*{
          label: 'Specializzazione',
          table: 'subskills',
          key: 'idSubSkill',
          value: tools.getCookie(tools.COOK_SEARCH + 'subskills' + '_' + tools.getCookie(tools.COOK_SEARCH + 'skills', costanti.FILTER_TUTTI), costanti.FILTER_TUTTI),
          type: costanti.FieldType.select,
          arrvalue: [],
          addall: true,
          filter: getFilterSubSkills,
          showcount: true,
          useinput: false,
          icon: 'far fa-id-card',
        },
        */



        /*
        {
          label: 'Livello',
          table: 'levels',
          key: 'numLevel',
          value: tools.getCookie(tools.COOK_SEARCH + 'levels', costanti.FILTER_TUTTI),
          arrvalue: [],
          addall: true,
          type: costanti.FieldType.select,
          filter: null,
          useinput: false,
          filteradv: true,
        },


         */
        {
          label: 'In cambio di',
          table: 'contribtypes',
          key: 'idContribType',
          value: 0,
          arrvalue: tools.getCookie(tools.COOK_SEARCH + 'contribtypes', []),
          type: costanti.FieldType.multiselect,
          filter: null,
          useinput: false,
          icon: 'fas fa-hand-holding',
          filteradv: true,
          //icon: 'swap_horizontal_circle',
        },
        /*
        {
          label: '',
          table: '',
          key: '',
          value: 0,
          type: costanti.FieldType.separator,
          arrvalue: [],
          addall: true,
          filter: null,
          showcount: true,
          useinput: false,
          notinsearch: true,
          icon: '',
        },

         */

      ]

      searchList_Events.value = [
        {
          label: 'Stato',
          table: 'statusSkills',
          key: 'idStatusSkill',
          value: 0,
          arrvalue: tools.getCookie(tools.COOK_SEARCH + 'statusSkills', []),
          type: costanti.FieldType.multiselect,
          filter: null,
          useinput: false,
          icon: 'mood',
          filteradv: false,
        },
        {
          label: 'Regione',
          table: 'regions',
          key: 'idReg',
          type: costanti.FieldType.select,
          value: tools.getCookie(tools.COOK_SEARCH + 'regions', costanti.FILTER_TUTTI),
          addall: true,
          arrvalue: [],
          filter: null,
          useinput: false,
          icon: 'fas fa-globe-europe'
        },
        {
          label: 'Provincia',
          table: 'provinces',
          key: 'idProvince',
          type: costanti.FieldType.select,
          value: tools.getCookie(tools.COOK_SEARCH + 'provinces', costanti.FILTER_TUTTI),
          addall: true,
          arrvalue: [],
          filter: getFilterProvinceByRegion,
          useinput: true,
          icon: 'flag',
        },
        {
          label: 'Comune',
          table: 'cities',
          key: 'idCity',
          type: costanti.FieldType.select_by_server,
          value: tools.getCookie(tools.COOK_SEARCH + 'cities', costanti.FILTER_TUTTI),
          addall: true,
          arrvalue: [],
          useinput: true,
          filter: null,
          // filter: getFilterCitiesByProvince,
          // param1: shared_consts.PARAM_SHOW_PROVINCE,
          tablesel: 'cities',
        },
        {
          label: 'Data Inizio',
          table: 'caldate',
          key: 'dateTimeStart',
          value: 2,
          arrvalue: [],
          type: costanti.FieldType.select,
          addall: true,
          filter: null,
          useinput: false,
        },
        {
          label: 'Settore',
          table: toolsext.TABSECTORS,
          key: 'idSector',
          value: tools.getCookie(tools.COOK_SEARCH + toolsext.TABSECTORS, 0),
          arrvalue: [],
          type: costanti.FieldType.select,
          filter: null,
          addall: true,
          notinsearch: true,
          useinput: false,
        },
        {
          label: 'Categoria',
          table: 'skills',
          key: 'idSkill',
          value: tools.getCookie(tools.COOK_SEARCH + 'skills' + '_' + tools.getCookie(tools.COOK_SEARCH + toolsext.TABSECTORS, costanti.FILTER_TUTTI), costanti.FILTER_TUTTI),
          arrvalue: [],
          type: costanti.FieldType.select,
          addall: true,
          filter: getFilterSkills,
          showcount: true,
          useinput: false,
        },
        {
          label: 'In cambio di',
          table: 'contribtypes',
          key: 'idContribType',
          value: 0,
          arrvalue: tools.getCookie(tools.COOK_SEARCH + 'contribtypes', []),
          type: costanti.FieldType.multiselect,
          filter: null,
          useinput: false,
          icon: 'fas fa-hand-holding',
          filteradv: false,
          //icon: 'swap_horizontal_circle',
        },

      ]

      searchList_Hosp.value = [
        {
          label: 'Stato',
          table: 'statusSkills',
          key: 'idStatusSkill',
          value: 0,
          arrvalue: tools.getCookie(tools.COOK_SEARCH + 'statusSkills', []),
          type: costanti.FieldType.multiselect,
          filter: null,
          useinput: false,
          icon: 'mood',
          filteradv: false,
        },
        {
          label: 'Regione',
          table: 'regions',
          key: 'idReg',
          type: costanti.FieldType.select,
          value: tools.getCookie(tools.COOK_SEARCH + 'regions', costanti.FILTER_TUTTI),
          addall: true,
          arrvalue: [],
          filter: null,
          useinput: false,
          icon: 'fas fa-globe-europe'
        },
        {
          label: 'Provincia',
          table: 'provinces',
          key: 'idProvince',
          type: costanti.FieldType.select,
          value: tools.getCookie(tools.COOK_SEARCH + 'provinces', costanti.FILTER_TUTTI),
          addall: true,
          arrvalue: [],
          filter: getFilterProvinceByRegion,
          useinput: true,
          icon: 'flag',
        },
        {
          label: 'Comune',
          table: 'cities',
          key: 'idCity',
          type: costanti.FieldType.select_by_server,
          value: tools.getCookie(tools.COOK_SEARCH + 'cities', costanti.FILTER_TUTTI),
          addall: true,
          arrvalue: [],
          useinput: true,
          filter: null,
          // filter: getFilterCitiesByProvince,
          // param1: shared_consts.PARAM_SHOW_PROVINCE,
          tablesel: 'cities',
        },
        {
          label: 'Tipologia',
          table: toolsext.TABTYPEHOSP,
          key: 'typeHosp',
          type: costanti.FieldType.select,
          value: tools.getCookie(tools.COOK_SEARCH + 'typeHosp', costanti.FILTER_TUTTI),
          addall: true,
          arrvalue: [],
          filter: null,
          useinput: false,
          icon: 'flag',
        },
        {
          label: 'Numero Massimo di Ospiti',
          table: toolsext.TABPEOPLE,
          key: 'numMaxPeopleHosp',
          type: costanti.FieldType.select,
          value: tools.getCookie(tools.COOK_SEARCH + 'numMaxPeopleHosp', costanti.FILTER_TUTTI),
          addall: true,
          arrvalue: [],
          filter: null,
          useinput: false,
          icon: 'flag',
        },
        {
          label: 'In cambio di',
          table: 'contribtypes',
          key: 'idContribType',
          value: 0,
          arrvalue: tools.getCookie(tools.COOK_SEARCH + 'contribtypes', []),
          type: costanti.FieldType.multiselect,
          filter: null,
          useinput: false,
          icon: 'fas fa-hand-holding',
          filteradv: false,
          //icon: 'swap_horizontal_circle',
        },

      ]

      searchList_Beni.value = [
        {
          label: 'Regione',
          table: 'regions',
          key: 'idReg',
          type: costanti.FieldType.select,
          value: tools.getCookie(tools.COOK_SEARCH + 'regions', costanti.FILTER_TUTTI),
          addall: true,
          arrvalue: [],
          filter: null,
          useinput: false,
          icon: 'fas fa-globe-europe'
        },
        {
          label: 'Provincia',
          table: 'provinces',
          key: 'idProvince',
          type: costanti.FieldType.select,
          value: tools.getCookie(tools.COOK_SEARCH + 'provinces', costanti.FILTER_TUTTI),
          addall: true,
          arrvalue: [],
          filter: getFilterProvinceByRegion,
          useinput: true,
          icon: 'flag',
        },
        {
          label: 'Comune',
          table: 'cities',
          key: 'idCity',
          type: costanti.FieldType.select_by_server,
          value: tools.getCookie(tools.COOK_SEARCH + 'cities', costanti.FILTER_TUTTI),
          addall: true,
          arrvalue: [],
          useinput: true,
          filter: null,
          //filter: getFilterCitiesByProvince,
          // param1: shared_consts.PARAM_SHOW_PROVINCE,
          tablesel: 'cities',
        },
        {
          label: 'Offro/Cerco',
          table: 'adtypes',
          key: 'adType',
          value: tools.getCookie(tools.COOK_SEARCH + 'adtypes', costanti.FILTER_TUTTI),
          arrvalue: [],
          addall: true,
          type: costanti.FieldType.select,
          filter: null,
          useinput: false,
        },
        {
          label: 'Settore',
          table: 'sectorgoods',
          key: 'idSectorGood',
          value: tools.getCookie(tools.COOK_SEARCH + 'sectorgoods', 0),
          arrvalue: [],
          type: costanti.FieldType.select,
          filter: null,
          addall: true,
          notinsearch: true,
          useinput: false,
        },
        {
          label: 'Categoria',
          table: 'goods',
          key: 'idGood',
          value: tools.getCookie(tools.COOK_SEARCH + 'goods' + '_' + tools.getCookie(tools.COOK_SEARCH + 'sectorgoods', costanti.FILTER_TUTTI), costanti.FILTER_TUTTI),
          arrvalue: [],
          type: costanti.FieldType.select,
          addall: true,
          filter: getFilterGoods,
          showcount: true,
          useinput: false,
        },
        {
          label: 'Consegna',
          table: 'shippings',
          key: 'idShipping',
          value: tools.getCookie(tools.COOK_SEARCH + 'shippings', costanti.FILTER_TUTTI),
          arrvalue: [],
          type: costanti.FieldType.select,
          addall: true,
          filter: null,
          useinput: false,
        },
        /*{
          label: 'Specializzazione',
          table: 'subskills',
          key: 'idSubSkill',
          value: tools.getCookie(tools.COOK_SEARCH + 'subskills' + '_' + tools.getCookie(tools.COOK_SEARCH + 'skills', costanti.FILTER_TUTTI), costanti.FILTER_TUTTI),
          type: costanti.FieldType.select,
          arrvalue: [],
          addall: true,
          filter: getFilterSubSkills,
          showcount: true,
          useinput: false,
          icon: 'far fa-id-card',
        },
        */



        /*
        {
          label: 'Livello',
          table: 'levels',
          key: 'numLevel',
          value: tools.getCookie(tools.COOK_SEARCH + 'levels', costanti.FILTER_TUTTI),
          arrvalue: [],
          addall: true,
          type: costanti.FieldType.select,
          filter: null,
          useinput: false,
          filteradv: true,
        },


         */
        {
          label: 'In cambio di',
          table: 'contribtypes',
          key: 'idContribType',
          value: 0,
          arrvalue: tools.getCookie(tools.COOK_SEARCH + 'contribtypes', []),
          type: costanti.FieldType.multiselect,
          filter: null,
          useinput: false,
          icon: 'currency_exchange',
          filteradv: true,
          //icon: 'swap_horizontal_circle',
        },
        {
          label: 'Altri Filtri',
          table: 'otherfilters',
          key: 'otherfilters',
          arrvalue: tools.getCookie(tools.COOK_SEARCH + 'otherfilters', []),
          value: 0,
          type: costanti.FieldType.multiselect,
          addall: false,
          filter: null,
          useinput: false,
          icon: 'fas fa-filter'
        },
        {
          label: '',
          table: '',
          key: '',
          value: 0,
          type: costanti.FieldType.separator,
          arrvalue: [],
          addall: true,
          filter: null,
          showcount: true,
          useinput: false,
          notinsearch: true,
          icon: '',
        },

      ]

      searchList_MyGroups.value = [
        {
          label: 'Regione',
          table: 'regions',
          key: 'idReg',
          type: costanti.FieldType.select,
          value: tools.getCookie(tools.COOK_SEARCH + 'regions', costanti.FILTER_TUTTI),
          addall: true,
          arrvalue: [],
          filter: null,
          useinput: false,
          icon: 'fas fa-globe-europe'
        },
        {
          label: 'Provincia',
          table: 'provinces',
          key: 'idProvince',
          type: costanti.FieldType.select,
          value: tools.getCookie(tools.COOK_SEARCH + 'provinces', costanti.FILTER_TUTTI),
          addall: true,
          arrvalue: [],
          filter: getFilterProvinceByRegion,
          useinput: true,
          icon: 'flag',
        },
        {
          label: 'Comune',
          table: 'cities',
          key: 'idCity',
          type: costanti.FieldType.select_by_server,
          arrvalue: [],
          addall: true,
          value: tools.getCookie(tools.COOK_SEARCH + 'cities', costanti.FILTER_TUTTI),
          useinput: true,
          filter: null,
          // filter: getFilterCitiesByProvince,
          // param1: shared_consts.PARAM_SHOW_PROVINCE,
          tablesel: 'cities',
          icon: 'fas fa-map-marker-alt',
        },
        {
          label: 'Categorie',
          table: 'catgrps',
          key: 'idCatGrp',
          value: tools.getCookie(tools.COOK_SEARCH + 'catgrps', costanti.FILTER_TUTTI),
          arrvalue: [],
          type: costanti.FieldType.select,
          filter: null,
          addall: true,
          useinput: false,
          icon: 'engineering',
        },
      ]

      filtercustom.value = []
    }


    function extraparams() {
      if (props.table === toolsext.TABMYGROUPS) {

        let lk_tab = 'mygroups'
        let lk_LF = 'userId'
        let lk_FF = '_id'
        let lk_as = 'group'
        let af_objId_tab = 'myId'

        return {
          lookup1: {
            lk_tab,
            lk_LF,
            lk_FF,
            lk_as,
            af_objId_tab,
            lk_proj: {
              groupname: 1,
              title: 1,
              descr: 1,
              img: 1,
              visibility: 1,
              admins: 1,
              idCatGrp: 1,
              photos: 1,
              idCity: 1,
              note: 1,
              link_telegram: 1,
              website: 1,
              comune: 1,
              mycities: 1,
              sector: 1,
            }
          },
          lookup2: {
            lk_tab: 'catgrps',
            lk_LF: 'idCatGrp',
            lk_FF: '_id',
            lk_as: 'recCatGrp',
            lk_proj: {
              groupname: 1,
              title: 1,
              descr: 1,
              img: 1,
              visibility: 1,
              admins: 1,
              idCatGrp: 1,
              photos: 1,
              idCity: 1,
              note: 1,
              website: 1,
              link_telegram: 1,
              comune: 1,
              mycities: 1,
              sector: 1,
              recCatGrp: 1,
            }
          },
          lookup3: {
            lk_tab: 'cities',
            lk_LF: 'idCity',
            lk_FF: '_id',
            lk_as: 'comune',
            lk_proj: {
              groupname: 1,
              title: 1,
              descr: 1,
              img: 1,
              idCatGrp: 1,
              visibility: 1,
              admins: 1,
              photos: 1,
              idCity: 1,
              note: 1,
              //**ADDFIELD_MYGROUPS
              website: 1,
              link_telegram: 1,
              comune: 1,
              mycities: 1,
              recCatGrp: 1,
            }
          },
          lookup5: {
            lk_tab: 'cities',
            lk_LF: 'idCity',
            lk_FF: '_id',
            lk_as: 'mycities',
            af_objId_tab: '',
          },
        }

      } else if (props.table === toolsext.TABMYGOODS) {
        return {
          lookup1: {
            lk_tab: 'users',
            lk_LF: 'userId',
            lk_FF: '_id',
            lk_as: 'user',
            af_objId_tab: 'myId',
          },
          lookup2: {
            lk_tab: 'goods',
            lk_LF: 'idGood',
            lk_FF: '_id',
            lk_as: 'recGood',
            af_objId_tab: '',
            lk_proj: {
              recGood: 1,
              sectorGood: 1,
              idSectorGood: 1,
              idGood: 1,
              mygood: 1,
              idStatusSkill: 1,
              idContribType: 1,
              idCity: 1,
              numLevel: 1,
              adType: 1,
              photos: 1,
              note: 1,
              website: 1,
              //**ADDFIELD_MYSKILL
              descr: 1,
              date_created: 1,
              date_updated: 1,
              userId: 1,
              username: 1,
              name: 1,
              surname: 1,
              comune: 1,
              mycities: 1,
              'profile.img': 1,
              'profile.qualifica': 1,
            }
          },
          lookup3: {
            lk_tab: 'sectorgoods',
            lk_LF: 'recGood.idSectorGood',
            lk_FF: '_id',
            lk_as: 'sectorgood',
            af_objId_tab: '',
          },
          lookup5: {
            lk_tab: 'cities',
            lk_LF: 'idCity',
            lk_FF: '_id',
            lk_as: 'mycities',
            af_objId_tab: '',
          },
        }
      } else if (props.table === toolsext.TABMYBACHECAS) {
        return {
          // Servizi
          lookup1: {
            lk_tab: 'users',
            lk_LF: 'userId',
            lk_FF: '_id',
            lk_as: 'user',
            af_objId_tab: 'myId',
          },
          lookup2: {
            lk_tab: 'skills',
            lk_LF: 'idSkill',
            lk_FF: '_id',
            lk_as: 'recSkill',
            af_objId_tab: '',
            lk_proj: {
              recSkill: 1,
              sector: 1,
              idSector: 1,
              idSkill: 1,
              // idSubSkill: 1,
              myskill: 1,
              idStatusSkill: 1,
              idContribType: 1,
              idCity: 1,
              dateTimeStart: 1,
              dateTimeEnd: 1,
              numLevel: 1,
              adType: 1,
              photos: 1,
              note: 1,
              website: 1,
              //**ADDFIELD_MYSKILL
              descr: 1,
              date_created: 1,
              date_updated: 1,
              userId: 1,
              username: 1,
              name: 1,
              surname: 1,
              comune: 1,
              mycities: 1,
              'profile.img': 1,
              'profile.qualifica': 1,
            }
          },
          lookup3: {
            lk_tab: toolsext.TABSECTORS,
            lk_LF: 'recSkill.idSector',
            lk_FF: '_id',
            lk_as: 'sector',
            af_objId_tab: '',
          },
          lookup5: {
            lk_tab: 'cities',
            lk_LF: 'idCity',
            lk_FF: '_id',
            lk_as: 'mycities',
            af_objId_tab: '',
          },
        }

      } else if (props.table === toolsext.TABMYHOSPS) {
        return {
          // Servizi
          lookup1: {
            lk_tab: 'users',
            lk_LF: 'userId',
            lk_FF: '_id',
            lk_as: 'user',
            af_objId_tab: 'myId',
          },
          lookup2: {
            lk_tab: 'cities',
            lk_LF: 'idCity',
            lk_FF: '_id',
            lk_as: 'mycities',
            af_objId_tab: '',
            lk_proj: {
              typeHosp: 1,
              numMaxPeopleHosp: 1,
              accomodation: 1,
              preferences: 1,
              idContribType: 1,
              idCity: 1,
              note: 1,
              website: 1,
              descr: 1,
              date_created: 1,
              date_updated: 1,
              userId: 1,
              username: 1,
              name: 1,
              surname: 1,
              comune: 1,
              mycities: 1,
              'profile.img': 1,
              'profile.qualifica': 1,
            }
          },
        }

      } else {
        return {
          // Servizi
          lookup1: {
            lk_tab: 'users',
            lk_LF: 'userId',
            lk_FF: '_id',
            lk_as: 'user',
            af_objId_tab: 'myId',
          },
          lookup2: {
            lk_tab: 'skills',
            lk_LF: 'idSkill',
            lk_FF: '_id',
            lk_as: 'recSkill',
            af_objId_tab: '',
            lk_proj: {
              recSkill: 1,
              sector: 1,
              idSector: 1,
              idSkill: 1,
              // idSubSkill: 1,
              myskill: 1,
              idStatusSkill: 1,
              idContribType: 1,
              idCity: 1,
              numLevel: 1,
              adType: 1,
              photos: 1,
              note: 1,
              website: 1,
              //**ADDFIELD_MYSKILL
              descr: 1,
              date_created: 1,
              date_updated: 1,
              userId: 1,
              username: 1,
              name: 1,
              surname: 1,
              comune: 1,
              mycities: 1,
              'profile.img': 1,
              'profile.qualifica': 1,
            }
          },
          lookup3: {
            lk_tab: toolsext.TABSECTORS,
            lk_LF: 'recSkill.idSector',
            lk_FF: '_id',
            lk_as: 'sector',
            af_objId_tab: '',
          },
          lookup5: {
            lk_tab: 'cities',
            lk_LF: 'idCity',
            lk_FF: '_id',
            lk_as: 'mycities',
            af_objId_tab: '',
          },
        }
      }
    }

    function getdefaultnewrec(): any {
      if (props.table === toolsext.TABMYSKILLS) {
        return tools.getdefaultnewrec_MySkill()
      } else if (props.table === toolsext.TABMYBACHECAS) {
        return tools.getdefaultnewrec_MyBacheca()
      } else if (props.table === toolsext.TABMYHOSPS) {
        return tools.getdefaultnewrec_MyHosp()
      } else if (props.table === toolsext.TABMYGOODS) {
        return tools.getdefaultnewrec_MyGoods()
      } else if (props.table === toolsext.TABMYGROUPS) {
        return tools.getdefaultnewrec_MyGroup()
      }
      return null
    }


    function doSearch() {
      //
    }

    onMounted(mounted)

    return {
      t,
      tools,
      costanti,
      extraparams,
      arrfilterand,
      filtercustom,
      searchList,
      search,
      doSearch,
      myrecfiltertoggle,
      prop_colkey,
      col_title,
      col_footer,
      col_tabfooter,
      col,
      toolsext,
      getdefaultnewrec,
      mypagination,
      noMsgRecord,
      showType,
      visuType,
      hint,
      strextra,
    }
  },
})
