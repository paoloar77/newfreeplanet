import { CMyFieldDb } from '@/components/CMyFieldDb'
import { CTitleBanner } from '@/components/CTitleBanner'
import { CProfile } from '@/components/CProfile'
import { CCopyBtn } from '@/components/CCopyBtn'
import { CSkill } from '@/components/CSkill'
import { CDateTime } from '@/components/CDateTime'
import { CUserNonVerif } from '@/components/CUserNonVerif'
import { tools } from '@store/Modules/tools'
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useUserStore } from '@store/UserStore'
import { useRoute, useRouter } from 'vue-router'
import { useGlobalStore } from '@store/globalStore'
import { useI18n } from '@/boot/i18n'
import { toolsext } from '@store/Modules/toolsext'
import { useQuasar } from 'quasar'
import { costanti } from '@costanti'
import { IUserFields } from 'model'
import { shared_consts } from '@/common/shared_vuejs'
import { static_data } from '@/db/static_data'
import MixinUsers from '@/mixins/mixin-users'


export default defineComponent({
  name: 'myprofile',
  components: { CProfile, CTitleBanner, CMyFieldDb, CSkill, CDateTime, CCopyBtn, CUserNonVerif },
  props: {},
  setup() {
    const userStore = useUserStore()
    const $route = useRoute()
    const $q = useQuasar()
    const { t } = useI18n()

    const { getRefLink } = MixinUsers()

    const animation = ref('fade')

    const username = computed(() => $route.params.username ? $route.params.username.toString() : userStore.my.username)

    const filtroutente = ref(<any[]>[])
    const showPic = ref(false)

    const myuser = ref(<IUserFields>{})

    function profile() {
      return userStore.my.profile
    }

    function myusername() {
      return userStore.my.username
    }

    function loadProfile() {
      // Carica il profilo di quest'utente
      if (username.value) {
        userStore.loadUserProfile(username.value).then((ris) => {
          myuser.value = ris
          filtroutente.value = [{ userId: myuser.value._id }]
        })

      }
    }

    watch(() => username.value, (to: any, from: any) => {
      loadProfile()
    })

    function mounted() {
      loadProfile()
    }

    function getImgUser() {
      return userStore.getImgByProfile(myuser.value)
    }

    function checkifShow(col: string) {
      //++Todo: checkifShow Permessi !
      return true
    }

    function getLinkUserTelegram() {

      if (!!myuser.value.profile.username_telegram) {
        return 'https://t.me/' + myuser.value.profile.username_telegram
      }
    }

    function getLinkWebSite() {
      let site = myuser.value.profile.website!
      if (site) {
        if (!site.startsWith('http')) {
          site = 'https://' + site
        }
      }
      return site
    }

    function isMyRecord(username: string){
      return username === userStore.my.username
    }

    onMounted(mounted)

    return {
      username,
      profile,
      tools,
      costanti,
      myuser,
      shared_consts,
      getImgUser,
      checkifShow,
      getLinkUserTelegram,
      getLinkWebSite,
      filtroutente,
      showPic,
      myusername,
      userStore,
      t,
      static_data,
      animation,
      isMyRecord,
      getRefLink,
    }
  }
})
