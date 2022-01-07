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
import { IUserFields, IUserProfile } from 'model'
import { shared_consts } from '@/common/shared_vuejs'


export default defineComponent({
  name: 'myuser',
  components: { CProfile, CTitleBanner, CMyFieldDb, CSkill, CDateTime },
  props: {},
  setup() {
    const userStore = useUserStore()
    const $router = useRouter()
    const $route = useRoute()
    const $q = useQuasar()
    const { t } = useI18n()

    const username = ref('')
    const filter = ref(costanti.FRIENDS)
    const listFriends = ref([])
    const listTrusted = ref([])

    const filtroutente = ref(<any[]>[])

    const listfriendsfiltered = computed(() => {
      let arr: any[] = []
      if (filter.value === costanti.FRIENDS) {
        arr = listFriends.value
      }else if (filter.value === costanti.ASK_TRUST) {
        arr = listTrusted.value.filter((user: IUserFields) => user.verified_by_aportador === undefined)
      }else if (filter.value === costanti.TRUSTED) {
        arr = listTrusted.value.filter((user: IUserFields) => user.verified_by_aportador)
      }else if (filter.value === costanti.REEJECTED) {
        arr = listTrusted.value.filter((user: IUserFields) => user.verified_by_aportador === false)
      }

      return arr
    })

    const numFriends = computed(() => {
      const arr = listFriends.value
      return (arr) ? arr.length : 0
    })

    const numAskTrust = computed(() => {
      const arr = listTrusted.value.filter((user: IUserFields) => user.verified_by_aportador === undefined)
      return (arr) ? arr.length : 0
    })

    const numTrusted = computed(() => {
      const arr = listTrusted.value.filter((user: IUserFields) => user.verified_by_aportador)
      return (arr) ? arr.length : 0
    })

    const numRejected = computed(() => {
      const arr = listTrusted.value.filter((user: IUserFields) => user.verified_by_aportador === false)
      return (arr) ? arr.length : 0
    })

    function loadFriends() {
      // Carica il profilo di quest'utente
      if (username.value) {
        userStore.loadFriends(username.value).then((ris) => {
          console.log('ris', ris)
          if (ris) {
            listFriends.value = ris.listFriends
            listTrusted.value = ris.listTrusted
            filtroutente.value = [{ userId: userStore.my._id }]
          }
        })

      }
    }

    function mounted() {
      username.value = userStore.my.username
      loadFriends()
    }

    function getImgUser(profile: IUserFields) {
      return userStore.getImgByProfile(profile)
    }

    function setRequestTrust(usernameDest: string, value: any) {
      userStore.setFriendsCmd($q, t, username.value, usernameDest, shared_consts.FRIENDSCMD.SETTRUST, value).then((res) => {
        if (res) {
          const myuser: IUserFields|undefined = listTrusted.value.find((rec: IUserFields) => rec.username === usernameDest )
          if (myuser) {
            listFriends.value.push(myuser)
            listTrusted.value = listTrusted.value.filter((rec: IUserFields) => rec.username !== usernameDest)
          }
          tools.showPositiveNotif($q, t('db.trusted'))

        } else {
          tools.showNegativeNotif($q, t('db.recfailed'))
        }
      })
    }

    function removeFromMyFriends(usernameDest: string) {
      userStore.setFriendsCmd($q, t, username.value, usernameDest, shared_consts.FRIENDSCMD.REMOVE_FROM_MYFRIENDS, null).then((res) => {
        if (res) {
          listFriends.value = listFriends.value.filter((rec: IUserFields) => rec.username !== usernameDest)
          tools.showPositiveNotif($q, t('db.removedfriend'))
        }
      })
    }

    function blockUser(usernameDest: string) {
      userStore.setFriendsCmd($q, t, username.value, usernameDest, shared_consts.FRIENDSCMD.REMOVE_FROM_MYFRIENDS, null).then((res) => {
        if (res) {
          listFriends.value = listFriends.value.filter((rec: IUserFields) => rec.username !== usernameDest)
          tools.showPositiveNotif($q, t('db.blockedfriend'))
        }
      })
    }

    function naviga(path: string) {
      $router.push(path)
    }

    onMounted(mounted)

    return {
      listfriends: listFriends,
      tools,
      costanti,
      getImgUser,
      filtroutente,
      filter,
      listfriendsfiltered,
      numFriends,
      numAskTrust,
      numTrusted,
      numRejected,
      setRequestTrust,
      removeFromMyFriends,
      blockUser,
      naviga,
    }
  }
})
