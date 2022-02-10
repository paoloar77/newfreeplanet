import {
  computed,
  defineComponent, onBeforeMount, onBeforeUnmount, onMounted, ref, toRef, toRefs, watch,
} from 'vue'

import { tools } from '@store/Modules/tools'
import { CMyFieldDb } from '@/components/CMyFieldDb'
import { costanti } from '@costanti'
import { useGlobalStore } from '@store/globalStore'
import { useUserStore } from '@store/UserStore'
import { colmySkills } from '@store/Modules/fieldsTable'
import { CGridTableRec } from '@/components/CGridTableRec'
import { IMySkill, ISearchList, ISkill } from 'model'
import { shared_consts } from '@/common/shared_vuejs'
import { useI18n } from '@/boot/i18n'

export default defineComponent({
  name: 'CFinder',
  props: {
    defaultnewrec: {
      type: Function,
      required: false,
    },
  },
  components: {
    CMyFieldDb, CGridTableRec,
  },
  setup(props, { attrs, slots, emit }) {
    const mytable = 'users'
    const { t } = useI18n();
    const globalStore = useGlobalStore()
    const userStore = useUserStore()

    const arrfilterand: any = ref([])
    const filtercustom: any = ref([])
    const searchList = ref(<ISearchList[]>[])

    const search = ref('')

    const idSector = computed(() => {
      let myval: any = null
      myval = searchList.value.find((rec) => (rec.table === 'sectors'))
      if (myval) {
        const ris = myval.value || 0
        console.log('idSector=', ris)
        return ris
      } else {
        return 0
      }
    })

    function mounted() {
      /*arrfilterand.value = [
        {
          label: 'Competenze',
          value: shared_consts.FILTER_MYSKILL_SKILL
        },

      ]*/

      function getFilterSkills(recSkill: any, index: number, arr: any) {
        const recsectors:any = searchList.value.find((rec) => rec.table === 'sectors')
        // console.log('getFilterSkills', recSkill.idSector, recsectors.value)
        if (recsectors) {
          return recSkill.idSector.includes(recsectors.value)
        } else {
          return true
        }
      }

      function getFilterSubSkills(recSubSkill: any, index: number, arr: any) {
        const recskills:any = searchList.value.find((rec) => rec.table === 'skills')
        // console.log('recSubSkill', recSubSkill, 'recskills', recskills)
        if (recskills) {
          return recSubSkill.idSkill === recskills.value
        } else {
          return true
        }
      }

      function getFilterCitiesByProvince(recSubSkill: any, index: number, arr: any) {
        const recprov:any = searchList.value.find((rec) => rec.table === 'provinces')
        // console.log('recSubSkill', recSubSkill, 'recskills', recskills)
        if (recprov) {
          return recSubSkill.idSkill === recprov.value
        } else {
          return true
        }
      }


      searchList.value = [
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
          label: 'Provincia',
          table: 'provinces',
          key: 'idProvince',
          type: costanti.FieldType.multiselect,
          value: 0,
          addall: true,
          arrvalue: tools.getCookie(tools.COOK_SEARCH + 'provinces', [costanti.FILTER_TUTTI]),
          filter: null,
          useinput: true,
          icon: 'flag',
        },
        {
          label: 'Città',
          table: 'cities',
          key: 'idCity',
          type: costanti.FieldType.multiselect_by_server,
          value: 0,
          addall: true,
          arrvalue: tools.getCookie(tools.COOK_SEARCH + 'cities', [costanti.FILTER_TUTTI]),
          useinput: true,
          filter: null,
          // filter: getFilterCitiesByProvince,
          // param1: shared_consts.PARAM_SHOW_PROVINCE,
          tablesel: 'cities',
        },
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
          //icon: 'swap_horizontal_circle',
        },

      ]

      filtercustom.value = []
    }


    async function createNewRecordInUserTable() {
      console.log('createNewRecordInUserTable')

      let mydata = {
        table: mytable,
        data: {
          userId: userStore.my._id,
          data: {},
          field: 'myskills'
        }
      };

      if (props.defaultnewrec) {

        mydata.data.data = props.defaultnewrec
      }

      console.log('mydata', mydata)
      const data = await globalStore.saveSubRec(mydata)
    }

    function getdefaultnewrec(): IMySkill {
      return {
        _id: 0,
        idSector: 0,
        idSkill: 0,
        idSubSkill: [],
        idStatusSkill: [],
        idContribType: [],
        idCity: [],
        NumLevel: 0,
        photos: [],
        note: '',
        subTitle: '',
      }
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
            idStatusSkill: 1,
            idContribType: 1,
            idCity: 1,
            numLevel: 1,
            photos: 1,
            note: 1,
            subTitle: 1,
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
          lk_as: 'myskill',
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

    function doSearch() {
      //
    }

    onMounted(mounted)

    return {
      t,
      tools,
      costanti,
      colmySkills,
      getdefaultnewrec,
      extraparams,
      arrfilterand,
      filtercustom,
      searchList,
      idSector,
      search,
      doSearch,
    }
  },
})
