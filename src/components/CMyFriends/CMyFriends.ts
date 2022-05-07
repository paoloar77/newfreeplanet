import { CMyUser } from '@/components/CMyUser'
import { CUserNonVerif } from '@/components/CUserNonVerif'
import { computed, defineComponent, onMounted, PropType, ref, toRef } from 'vue'
import { useUserStore } from '@store/UserStore'
import { useI18n } from '@/boot/i18n'
import { useQuasar } from 'quasar'
import { costanti } from '@costanti'
import { IFriends, ISearchList, IUserFields } from 'model'
import { shared_consts } from '@/common/shared_vuejs'
import { tools } from '@store/Modules/tools'


export default defineComponent({
  name: 'CMyFriends',
  components: { CMyUser, CUserNonVerif },
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Number,
      required: false,
      default: 0,
    },
    finder: {
      type: Boolean,
      required: true,
    },
    mycontact: {
      type: Object as PropType<IUserFields | null>,
      required: false,
      default: null,
    },
    myusername: {
      type: String,
      required: false,
      default: null,
    },
    visu: {
      type: Number,
      required: false,
      default: 0,
    },
    groupname: {
      type: String,
      required: false,
      default: '',
    },
    labelextra: {
      type: String,
      required: false,
      default: '',
    }
  },
  setup(props, { emit }) {
    const userStore = useUserStore()
    const $q = useQuasar()
    const { t } = useI18n()

    const username = ref('')
    const listTrusted = ref(<IUserFields[]>[])

    const filtroutente = ref(<any[]>[])

    const listfriendsfiltered = computed(() => {
      let arr: any[] = []
      try {
        if (props.modelValue === costanti.FRIENDS) {
          arr = userStore.my.profile.friends
        } else if (props.modelValue === costanti.REQ_FRIENDS) {
          arr = userStore.my.profile.req_friends
        } else if (props.modelValue === costanti.ASK_SENT_FRIENDS) {
          arr = userStore.my.profile.asked_friends
        } else if (props.modelValue === costanti.ASK_TRUST) {
          arr = listTrusted.value.filter((user: IUserFields) => user.verified_by_aportador === undefined)
        } else if (props.modelValue === costanti.TRUSTED) {
          arr = listTrusted.value.filter((user: IUserFields) => user.verified_by_aportador)
        } else if (props.modelValue === costanti.REJECTED) {
          arr = listTrusted.value.filter((user: IUserFields) => user.verified_by_aportador === false)
        }
      } catch (e) {
        arr = []
      }

      return arr
    })

    const myoptions = computed(() => {
      const mybutt = []
      mybutt.push({ label: t('mypages.find_people'), value: costanti.FIND_PEOPLE })

      if (numFriends.value > 0 || props.modelValue === costanti.FRIENDS)
        mybutt.push({ label: t('mypages.friends') + ' (' + numFriends.value + ')', value: costanti.FRIENDS })

      if (numReqFriends.value > 0 || props.modelValue === costanti.REQ_FRIENDS)
        mybutt.push({
          label: t('mypages.request_friends') + ' (' + numReqFriends.value + ')',
          value: costanti.REQ_FRIENDS
        })
      if (numAskSentFriends.value > 0 || props.modelValue === costanti.ASK_SENT_FRIENDS)
        mybutt.push({
          label: t('mypages.request_sent_friends') + ' (' + numAskSentFriends.value + ')',
          value: costanti.ASK_SENT_FRIENDS
        })
      if (numAskTrust.value > 0 || props.modelValue === costanti.ASK_TRUST)
        mybutt.push({ label: t('mypages.request_trust') + ' (' + numAskTrust.value + ')', value: costanti.ASK_TRUST })
      if (numTrusted.value > 0 || props.modelValue === costanti.TRUSTED)
        mybutt.push({ label: t('mypages.trusted') + ' (' + numTrusted.value + ')', value: costanti.TRUSTED })
      if (numRejected.value > 0 || props.modelValue === costanti.REJECTED)
        mybutt.push({ label: t('mypages.rejected') + ' (' + numRejected.value + ')', value: costanti.REJECTED })

      return mybutt
    })

    const numFriends = computed(() => {
      const arr = userStore.my.profile.friends
      return (arr) ? arr.length : 0
    })

    const numReqFriends = computed(() => {
      const arr = userStore.my.profile.req_friends
      return (arr) ? arr.length : 0
    })

    const numAskSentFriends = computed(() => {
      const arr = userStore.my.profile.asked_friends
      return (arr) ? arr.length : 0
    })

    const numAskSentGroups = computed(() => {
      const arr = userStore.my.profile.asked_groups
      return (arr) ? arr.length : 0
    })

    const numAskTrust = computed(() => {
      if (!listTrusted.value)
        return 0
      const arr = listTrusted.value.filter((user: IUserFields) => user.verified_by_aportador === undefined)
      return (arr) ? arr.length : 0
    })

    const numTrusted = computed(() => {
      if (!listTrusted.value)
        return 0
      const arr = listTrusted.value.filter((user: IUserFields) => user.verified_by_aportador)
      return (arr) ? arr.length : 0
    })

    const numRejected = computed(() => {
      if (!listTrusted.value)
        return 0
      const arr = listTrusted.value.filter((user: IUserFields) => user.verified_by_aportador === false)
      return (arr) ? arr.length : 0
    })

    function loadFriends() {
      // Carica il profilo di quest'utente
      if (username.value) {
        userStore.loadFriends(username.value).then((ris) => {
          // console.log('ris', ris)
          if (ris) {
            listTrusted.value = ris.listTrusted ? ris.listTrusted : []
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
                // add to my friends
                userStore.my.profile.friends = [...userStore.my.profile.friends, res]
              } else {
                // REMOVE to Trusted
                listTrusted.value = listTrusted.value.filter((rec: IUserFields) => rec.username !== usernameDest)
              }
            }
            tools.showPositiveNotif($q, t('db.trusted'))

          } else {
            tools.showNegativeNotif($q, t('db.recfailed'))
          }
        })
      })
    }


    function setCmd($q: any, cmd: number, username: string, value: any, usernameDest: string) {
      tools.setCmd($q, cmd, username, value, usernameDest)

      if (cmd === shared_consts.FRIENDSCMD.SETTRUST) {
        setRequestTrust(usernameDest, value)
      }
    }

    function mounted() {
      username.value = userStore.my.username
      loadFriends()

    }

    function updateValue(val: number) {
      emit('update:modelValue', val)
    }

    onMounted(mounted)

    return {
      tools,
      costanti,
      shared_consts,
      filtroutente,
      listfriendsfiltered,
      setCmd,
      updateValue,
      myoptions,
    }
  }
})
