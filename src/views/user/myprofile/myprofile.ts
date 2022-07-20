import { CMyFieldDb } from '@/components/CMyFieldDb'
import { CMyFieldRec } from '@/components/CMyFieldRec'
import { CTitleBanner } from '@/components/CTitleBanner'
import { CProfile } from '@/components/CProfile'
import { CLabel } from '@/components/CLabel'
import { CCopyBtn } from '@/components/CCopyBtn'
import { CSkill } from '@/components/CSkill'
import { CDateTime } from '@/components/CDateTime'
import { CMyGroup } from '@/components/CMyGroup'
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
import { IMyGroup, IUserFields } from 'model'
import { shared_consts } from '@/common/shared_vuejs'
import { static_data } from '@/db/static_data'
import { fieldsTable } from '@store/Modules/fieldsTable'
import { useNotifStore } from '@store/NotifStore'
import MixinUsers from '@/mixins/mixin-users'


export default defineComponent({
  name: 'myprofile',
  components: {
    CProfile, CTitleBanner, CMyFieldDb, CSkill, CDateTime, CCopyBtn, CUserNonVerif, CMyFieldRec,
    CMyGroup, CLabel
  },
  props: {},
  setup() {
    const userStore = useUserStore()
    const globalStore = useGlobalStore()
    const $route = useRoute()
    const $q = useQuasar()
    const { t } = useI18n()

    const { getRefLink } = MixinUsers()

    const animation = ref('fade')

    const username = computed(() => $route.params.username ? $route.params.username.toString() : userStore.my.username)
    const idnotif = computed(() => $route.query.idnotif ? $route.query.idnotif.toString() : '')

    const filtroutente = ref(<any[]>[])
    const showPic = ref(false)
    const caricato = ref(false)

    const myuser = ref(<IUserFields | null>null)

    const actualcard = ref('mygoods')

    const notifStore = useNotifStore()

    const mycards = computed(() => {
      return costanti.MAINCARDS.filter((rec: any) => rec.table)
    })

    const listgroupsfiltered = ref(<IMyGroup[]>[])


    function profile() {
      return userStore.my.profile
    }

    function myusername() {
      return userStore.my.username
    }

    async function loadProfile() {
      // Carica il profilo di quest'utente
      if (username.value) {
        await userStore.loadUserProfile({ username: username.value, idnotif: idnotif.value }).then((ris) => {
          myuser.value = ris
          if (myuser.value) {
            filtroutente.value = [{ userId: myuser.value._id }]
            notifStore.setAsRead(idnotif.value)

            try {
              listgroupsfiltered.value = globalStore.mygroups.filter((grp: IMyGroup) => myuser.value!.profile.mygroups.findIndex((rec: IMyGroup) => rec.groupname === grp.groupname) >= 0)
            } catch (e) {
              listgroupsfiltered.value = []
            }

          }
        })

      }
      caricato.value = true
    }

    watch(() => username.value, (to: any, from: any) => {
      loadProfile()
    })

    watch(() => actualcard.value, (to: any, from: any) => {
      loadProfile()
    })

    function mounted() {
      console.log('idnotif', idnotif)
      loadProfile()
    }

    function getImgUser() {
      if (myuser.value)
        return userStore.getImgByProfile(myuser.value)
      else
        return ''
    }

    function checkifShow(col: string) {
      //++Todo: checkifShow Permessi !
      return true
    }

    function getLinkUserTelegram() {

      if (myuser.value) {
        if (!!myuser.value.profile.username_telegram) {
          return 'https://t.me/' + myuser.value.profile.username_telegram
        }
      } else {
        return ''
      }
    }

    function getLinkWebSite() {
      if (myuser.value) {
        let site = myuser.value.profile.website!
        if (site) {
          if (!site.startsWith('http')) {
            site = 'https://' + site
          }
        }
        return site
      } else {
        return ''
      }
    }

    function isMyRecord(username: string) {
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
      fieldsTable,
      mycards,
      actualcard,
      caricato,
      listgroupsfiltered,
      idnotif,
    }
  }
})
