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


export default defineComponent({
  name: 'myuser',
  components: { CProfile, CTitleBanner, CMyFieldDb, CSkill, CDateTime },
  props: {},
  setup() {
    const userStore = useUserStore()
    const $route = useRoute()
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
        arr = listTrusted.value.filter((user: IUserFields) => !user.verified_by_aportador)
      }else if (filter.value === costanti.TRUSTED) {
        arr = listTrusted.value.filter((user: IUserFields) => !user.verified_by_aportador)
      }

      return arr
    })

    const numFriends = computed(() => {
      const arr = listFriends.value
      return (arr) ? arr.length : 0
    })

    const numAskTrust = computed(() => {
      const arr = listTrusted.value.filter((user: IUserFields) => !user.verified_by_aportador)
      return (arr) ? arr.length : 0
    })

    const numAskTrusted = computed(() => {
      const arr = listTrusted.value.filter((user: IUserFields) => user.verified_by_aportador)
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
      numAskTrusted,
    }
  }
})
