import { CMyFriends } from '@/components/CMyFriends'
import { CGridTableRec } from '@/components/CGridTableRec'
import { tools } from '@store/Modules/tools'
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useUserStore } from '@store/UserStore'
import { useRoute, useRouter } from 'vue-router'
import { useGlobalStore } from '@store/globalStore'
import { useI18n } from '@/boot/i18n'
import { colmyUserPeople } from '@store/Modules/fieldsTable'
import { ISearchList } from 'model'
import { costanti } from '@costanti'
import { shared_consts } from '@/common/shared_vuejs'
import { toolsext } from '@store/Modules/toolsext'

export default defineComponent({
  name: 'myfriends',
  components: { CMyFriends, CGridTableRec },
  props: {},
  setup() {
    const userStore = useUserStore()
    const $route = useRoute()
    const { t } = useI18n()

    const arrfilterand: any = ref([])
    const filtercustom: any = ref([])
    const searchList = ref(<ISearchList[]>[])

    const filter = ref(costanti.FIND_PEOPLE)

    function mounted() {
      searchList.value = [
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

      ]

      filtercustom.value = []
      arrfilterand.value = []

      const filt_loaded = tools.getCookie(tools.COOK_SEARCH + tools.FRIENDS_SEARCH)
      filter.value = filt_loaded ? filt_loaded : costanti.FIND_PEOPLE
    }
    watch(() => filter.value, (newval: any, oldval) => {
      tools.setCookie(tools.COOK_SEARCH + tools.FRIENDS_SEARCH, newval)

    })

    function extraparams() {
      let lk_tab = 'users'
      let lk_LF = 'userId'
      let lk_FF = '_id'
      let lk_as = 'user'
      let af_objId_tab = 'myId'

      return {
        lookup1: {
          lk_tab,
          lk_LF,
          lk_FF,
          lk_as,
          af_objId_tab,
          lk_proj: {
            username: 1,
            name: 1,
            'profile.img': 1,
            'profile.qualifica': 1,
          }
        }
      }
    }

    function getFilterProvinceByRegion(recProvince: any, index: number, arr: any) {
      const recreg: any = searchList.value.find((rec) => rec.table === 'regions')
      if (recreg) {
        return recProvince.reg === recreg.value
      } else {
        return true
      }
    }


    onMounted(mounted)

    return {
      filter,
      costanti,
      shared_consts,
      arrfilterand,
      filtercustom,
      searchList,
      colmyUserPeople,
      extraparams,
      getFilterProvinceByRegion,
    }
  }
})
