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
      searchList.value = []
      filtercustom.value = []
      arrfilterand.value = []
    }

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
    }
  }
})
