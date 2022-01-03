import { CMyFieldDb } from '@/components/CMyFieldDb'
import { CTitleBanner } from '@/components/CTitleBanner'
import { CProfile } from '@/components/CProfile'
import { CSkill } from '@/components/CSkill'
import { CDateTime } from '@/components/CDateTime'
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


export default defineComponent({
  name: 'myuser',
  components: { CProfile, CTitleBanner, CMyFieldDb, CSkill, CDateTime },
  props: {},
  setup() {
    const userStore = useUserStore()
    const $route = useRoute()
    const { t } = useI18n()

    const username = computed(() => $route.params.username.toString())

    const filtroutente = ref(<any[]>[])
    const showPic = ref(false)

    const myuser = ref(<IUserFields>{})

    function profile() {
      return userStore.my.profile
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

    watch(() => username, (to: any, from: any) => {
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

    onMounted(mounted)

    return {
      username,
      profile,
      tools,
      costanti,
      myuser,
      getImgUser,
      checkifShow,
      getLinkUserTelegram,
      filtroutente,
      showPic,
    }
  }
})
