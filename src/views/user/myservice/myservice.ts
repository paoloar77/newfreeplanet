import { CMyFieldDb } from '@/components/CMyFieldDb'
import { CTitleBanner } from '@/components/CTitleBanner'
import { CProfile } from '@/components/CProfile'
import { CDateTime } from '@/components/CDateTime'
import { CMyPage } from '@/components/CMyPage'
import { CMyCardPopup } from '@/components/CMyCardPopup'
import { CCheckIfIsLogged } from '@/components/CCheckIfIsLogged'
import { CSkill } from '@/components/CSkill'
import { tools } from '@store/Modules/tools'
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useUserStore } from '@store/UserStore'
import { useRoute, useRouter } from 'vue-router'
import { useGlobalStore } from '@store/globalStore'
import { useI18n } from '@/boot/i18n'
import { toolsext } from '@store/Modules/toolsext'
import { useQuasar } from 'quasar'
import { costanti } from '@costanti'
import { IMySkill, IUserFields } from 'model'
import { shared_consts } from '@/common/shared_vuejs'
import { fieldsTable } from '@store/Modules/fieldsTable'

import { colCitys } from '@store/Modules/fieldsTable'


export default defineComponent({
  name: 'myservice',
  components: { CProfile, CTitleBanner, CMyFieldDb, CSkill, CDateTime, CMyPage, CCheckIfIsLogged, CMyCardPopup },
  props: {},
  setup() {
    const userStore = useUserStore()
    const globalStore = useGlobalStore()
    const $route = useRoute()
    const $q = useQuasar()
    const { t } = useI18n()

    const animation = ref('fade')

    const table = ref(toolsext.TABMYSKILLS)

    const idSkill = computed(() => $route.params.idSkill ? $route.params.idSkill.toString() : 0)

    const filtroutente = ref(<any[]>[])
    const showPic = ref(false)

    const myskill = ref(<IMySkill>{})

    const username = computed(() => (myskill.value && myskill.value.username) ? myskill.value.username : 'Servizio')

    function profile() {
      return userStore.my.profile
    }

    function myusername() {
      return userStore.my.username
    }

    function loadSkill() {
      // Carica il profilo di quest'utente
      if (idSkill.value) {
        /*
        userStore.loadSkill(idSkill.value).then((ris) => {
          myskill.value = ris
          if (ris.userId) {
            filtroutente.value = [{ userId: ris.userId , _id: ris._id }]

          }
        })
*/
      }
    }

    watch(() => idSkill.value, (to: any, from: any) => {
      loadSkill()
    })

    function mounted() {
      loadSkill()
    }

    function checkifShow(col: string) {
      //++Todo: checkifShow Permessi !
      return true
    }


    onMounted(mounted)

    return {
      profile,
      tools,
      costanti,
      myskill,
      toolsext,
      shared_consts,
      checkifShow,
      globalStore,
      filtroutente,
      showPic,
      myusername,
      userStore,
      t,
      animation,
      fieldsTable,
      colCitys,
      table,
      username,
      idSkill,
    }
  }
})
