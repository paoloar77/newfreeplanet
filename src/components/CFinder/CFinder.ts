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

export default defineComponent({
  name: 'CFinder',
  props: {
    table: {
      type: String,
      required: true,
    },
  },
  components: {
    CMyFieldDb, CGridTableRec,
  },
  setup(props, { attrs, slots, emit }) {
    const mytable = 'users'
    const { t } = useI18n()
    const globalStore = useGlobalStore()
    const userStore = useUserStore()

    const arrfilterand: any = ref([])
    const filtercustom: any = ref([])
    const searchList = ref(<ISearchList[]>[])

    const search = ref('')
    const myrecfiltertoggle = ref(tools.FILTER_ALL)

    const prop_colkey = ref('idSkill')
    const col_title = ref('descr')
    const col_footer = ref('idCity')
    const col_tabfooter = ref('mycities')

    const col = ref(<IColGridTable>{})

    const idSector = computed(() => {
      let myval: any = null
      myval = searchList.value.find((rec) => (rec.table === 'sectors'))
      if (myval) {
        const ris = myval.value || 0
        // console.log('idSector=', ris)
        return ris
      } else {
        return 0
      }
    })

    watch(() => myrecfiltertoggle.value, (value: any, oldval: any) => {
        if (value === tools.FILTER_MYREC) {
          filtercustom.value = [{ userId: userStore.my._id }]
        } else {
          filtercustom.value = []
        }
      },
    )


    function mounted() {

      let obj = tools.getParamsByTable(props.table)

      col.value = fieldsTable.getArrColsByTable(props.table)

      prop_colkey.value = obj.prop_colkey
      col_title.value = obj.col_title
      col_footer.value = obj.col_footer
      col_tabfooter.value = obj.col_tabfooter


      function getFilterSkills(recSkill: any, index: number, arr: any) {
        const recsectors: any = searchList.value.find((rec) => rec.table === 'sectors')
        // console.log('getFilterSkills', recSkill.idSector, recsectors.value)
        if (recsectors) {
          return recSkill.idSector.includes(recsectors.value)
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

      function getFilterCitiesByProvince(recSubSkill: any, index: number, arr: any) {
        const recprov: any = searchList.value.find((rec) => rec.table === 'provinces')
        // console.log('recSubSkill', recSubSkill, 'recskills', recskills)
        if (recprov) {
          return recSubSkill.idSkill === recprov.value
        } else {
          return true
        }
      }




      searchList.value = [
        {
          label: 'Provincia',
          table: 'provinces',
          key: 'idProvince',
          type: costanti.FieldType.select,
          value: tools.getCookie(tools.COOK_SEARCH + 'provinces', costanti.FILTER_TUTTI),
          addall: true,
          arrvalue: [],
          filter: null,
          useinput: true,
          icon: 'flag',
        },
        {
          label: 'Città',
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
          table: 'sectors',
          key: 'idSector',
          value: tools.getCookie(tools.COOK_SEARCH + 'sectors', 0),
          arrvalue: [],
          type: costanti.FieldType.select,
          filter: null,
          addall: true,
          notinsearch: true,
          useinput: false,
        },
        {
          label: 'Competenza',
          table: 'skills',
          key: 'idSkill',
          value: tools.getCookie(tools.COOK_SEARCH + 'skills' + '_' + tools.getCookie(tools.COOK_SEARCH + 'sectors', costanti.FILTER_TUTTI), costanti.FILTER_TUTTI),
          arrvalue: [],
          type: costanti.FieldType.select,
          addall: true,
          filter: getFilterSkills,
          showcount: true,
          useinput: false,
        },
        {
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
        /*{
          label: 'Regione',
          table: 'regions',
          key: 'idReg',
          value: 0,
          type: costanti.FieldType.select,
          arrvalue: tools.getCookie(tools.COOK_SEARCH + 'regions', [costanti.FILTER_TUTTI]),
          filter: null,
          useinput: true,
        },*/
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
          label: 'Contributo',
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

      filtercustom.value = []
    }




    function extraparams() {
      return {
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
            idSubSkill: 1,
            myskill: 1,
            idStatusSkill: 1,
            idContribType: 1,
            idCity: 1,
            numLevel: 1,
            adType: 1,
            photos: 1,
            note: 1,
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
          lk_tab: 'sectors',
          lk_LF: 'recSkill.idSector',
          lk_FF: '_id',
          lk_as: 'sector',
          af_objId_tab: '',
        },
        lookup4: {
          lk_tab: 'subskills',
          lk_LF: 'idSubSkill',
          lk_FF: '_id',
          lk_as: 'myrec',
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

    function getdefaultnewrec(): any {
      if (props.table === toolsext.TABMYSKILLS) {
        return tools.getdefaultnewrec_MySkill()
      } else if (props.table === toolsext.TABMYBACHECAS) {
        return tools.getdefaultnewrec_MyBacheca()
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
      idSector,
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
    }
  },
})
