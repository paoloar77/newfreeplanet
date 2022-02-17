import { CMyGroups } from '@/components/CMyGroups'
import { CGridTableRec } from '@/components/CGridTableRec'
import { tools } from '@store/Modules/tools'
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useUserStore } from '@store/UserStore'
import { useRoute, useRouter } from 'vue-router'
import { useGlobalStore } from '@store/globalStore'
import { useI18n } from '@/boot/i18n'
import { colmyUserGroup } from '@store/Modules/fieldsTable'
import { ISearchList } from 'model'
import { costanti } from '@costanti'
import { shared_consts } from '@/common/shared_vuejs'

export default defineComponent({
  name: 'mygroups',
  components: { CMyGroups, CGridTableRec },
  props: {},
  setup() {
    const userStore = useUserStore()
    const $route = useRoute()
    const { t } = useI18n()

    const arrfilterand: any = ref([])
    const filtercustom: any = ref([])
    const searchList = ref(<ISearchList[]>[])

    const filter = ref(costanti.FIND_GROUP)

    function mounted() {
      searchList.value = []
      filtercustom.value = []
      arrfilterand.value = []

      searchList.value = [
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
        },
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
      ]

      const filt_loaded = tools.getCookie(tools.COOK_SEARCH + tools.GROUP_SEARCH)
      filter.value = filt_loaded ? filt_loaded : costanti.FIND_GROUP
    }

    watch(() => filter.value, (newval: any, oldval) => {
      tools.setCookie(tools.COOK_SEARCH + tools.GROUP_SEARCH, newval)

    })

    function extraparams() {
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
            website: 1,
            comune: 1,
            mycities: 1,
            sector: 1,
          }
        },
        lookup2: {
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
            comune: 1,
            mycities: 1,
          }
        },

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
      colmyUserGroup,
      extraparams,
    }
  }
})
