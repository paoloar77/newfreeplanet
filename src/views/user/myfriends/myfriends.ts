import { CMyFieldDb } from '@/components/CMyFieldDb'
import { CTitleBanner } from '@/components/CTitleBanner'
import { CProfile } from '@/components/CProfile'
import { CSkill } from '@/components/CSkill'
import { CDateTime } from '@/components/CDateTime'
import { CGridTableRec } from '@/components/CGridTableRec'
import { CMyUser } from '@/components/CMyUser'
import { tools } from '@store/Modules/tools'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useUserStore } from '@store/UserStore'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from '@/boot/i18n'
import { useQuasar } from 'quasar'
import { costanti } from '@costanti'
import { ISearchList, IUserFields } from 'model'
import { shared_consts } from '@/common/shared_vuejs'
import { colmyUserPeople } from '@store/Modules/fieldsTable'


export default defineComponent({
  name: 'myuser',
  components: { CProfile, CTitleBanner, CMyFieldDb, CSkill, CDateTime, CGridTableRec, CMyUser},
  props: {},
  setup() {
    const userStore = useUserStore()
    const $router = useRouter()
    const $route = useRoute()
    const $q = useQuasar()
    const { t } = useI18n()

    const username = ref('')
    const filter = ref(costanti.FIND_PEOPLE)
    const listFriends = ref(<IUserFields[]>[])
    const listTrusted = ref(<IUserFields[]>[])

    const filtroutente = ref(<any[]>[])

    const arrfilterand: any = ref([])
    const filtercustom: any = ref([])
    const searchList = ref(<ISearchList[]>[])

    const listfriendsfiltered = computed(() => {
      let arr: any[] = []
      if (filter.value === costanti.FRIENDS) {
        arr = listFriends.value
      } else if (filter.value === costanti.ASK_TRUST) {
        arr = listTrusted.value.filter((user: IUserFields) => user.verified_by_aportador === undefined)
      } else if (filter.value === costanti.TRUSTED) {
        arr = listTrusted.value.filter((user: IUserFields) => user.verified_by_aportador)
      } else if (filter.value === costanti.REEJECTED) {
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

    function setRequestTrust(usernameDest: string, value: any) {
      let msg = ''
      if (value) {
        msg = t('db.domanda_trusted', { username: usernameDest })
      } else {
        msg = t('db.domanda_rejectedtrust', { username: usernameDest })
      }

      $q.dialog({
        message: msg,
        ok: {
          label: t('dialog.yes'),
          push: true
        },
        cancel: {
          label: t('dialog.cancel')
        },
        title: t('db.domanda')
      }).onOk(() => {

        userStore.setFriendsCmd($q, t, username.value, usernameDest, shared_consts.FRIENDSCMD.SETTRUST, value).then((res) => {
          if (res) {
            const myuser: IUserFields = listTrusted.value.find((rec: IUserFields) => rec.username === usernameDest)!
            if (myuser) {
              myuser.verified_by_aportador = value
              if (value) {
                // ADD to Trusted
                listFriends.value.push(myuser)
              } else {
                // REMOVE to Trusted and to Friends
                listFriends.value = listFriends.value.filter((rec: IUserFields) => rec.username !== usernameDest)
              }
            }
            tools.showPositiveNotif($q, t('db.trusted'))

          } else {
            tools.showNegativeNotif($q, t('db.recfailed'))
          }
        })
      })
    }

    function addToMyFriends(usernameDest: string) {
      $q.dialog({
        message: t('db.domanda_addtofriend', { username: usernameDest }),
        ok: { label: t('dialog.yes'), push: true },
        cancel: { label: t('dialog.cancel') },
        title: t('db.domanda')
      }).onOk(() => {

        userStore.setFriendsCmd($q, t, username.value, usernameDest, shared_consts.FRIENDSCMD.SETFRIEND, null)
          .then((res: any) => {
            if (res) {
              console.log('res = ', res)
              listFriends.value = [...listFriends.value, res]
              tools.showPositiveNotif($q, t('db.addedfriend'))
            }
          })
      })
    }

    function removeFromMyFriends(usernameDest: string) {
      $q.dialog({
        message: t('db.domanda_removefriend', { username: usernameDest }),
        ok: { label: t('dialog.yes'), push: true },
        cancel: { label: t('dialog.cancel') },
        title: t('db.domanda')
      }).onOk(() => {

        userStore.setFriendsCmd($q, t, username.value, usernameDest, shared_consts.FRIENDSCMD.REMOVE_FROM_MYFRIENDS, null).then((res) => {
          if (res) {
            listFriends.value = listFriends.value.filter((rec: IUserFields) => rec.username !== usernameDest)
            tools.showPositiveNotif($q, t('db.removedfriend'))
          }
        })
      })
    }

    function blockUser(usernameDest: string) {
      $q.dialog({
        message: t('db.domanda_blockuser', { username: usernameDest }),
        ok: { label: t('dialog.yes'), push: true },
        cancel: { label: t('dialog.cancel') },
        title: t('db.domanda')
      }).onOk(() => {
        userStore.setFriendsCmd($q, t, username.value, usernameDest, shared_consts.FRIENDSCMD.BLOCK_USER, null).then((res) => {
          if (res) {
            listFriends.value = listFriends.value.filter((rec: IUserFields) => rec.username !== usernameDest)
            tools.showPositiveNotif($q, t('db.blockedfriend'))
          }
        })
      })
    }

    function setCmd(cmd: number, usernameDest: string, value: any = '') {
      if (cmd === shared_consts.FRIENDSCMD.SETTRUST) {
        setRequestTrust(usernameDest, value)
      } else if (cmd === shared_consts.FRIENDSCMD.REMOVE_FROM_MYFRIENDS) {
        removeFromMyFriends(usernameDest)
      } else if (cmd === shared_consts.FRIENDSCMD.BLOCK_USER) {
        blockUser(usernameDest)
      } else if (cmd === shared_consts.FRIENDSCMD.SETFRIEND) {
        addToMyFriends(usernameDest)
      }
    }

    function mounted() {
      username.value = userStore.my.username
      loadFriends()

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
          }
        }
      }
    }

    onMounted(mounted)

    return {
      listfriends: listFriends,
      tools,
      costanti,
      shared_consts,
      filtroutente,
      filter,
      listfriendsfiltered,
      numFriends,
      numAskTrust,
      numTrusted,
      numRejected,
      arrfilterand,
      filtercustom,
      searchList,
      colmyUserPeople,
      extraparams,
      setCmd,
    }
  }
})
