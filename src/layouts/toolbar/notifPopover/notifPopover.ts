import { computed, defineComponent, onMounted, ref, watch } from 'vue'

import {
  IChat,
  IMessage, IMsgUsers, INotif,
} from '@model'

import './notifPopover.scss'
import { tools } from '@src/store/Modules/tools'

import { useRouter } from 'vue-router'
import MixinUsers from '../../../mixins/mixin-users'
import { useNotifStore } from '@store/NotifStore'
import { useUserStore } from '@store/UserStore'

import { CTitleBanner } from '@/components/CTitleBanner'
import { CMyFieldRec } from '@/components/CMyFieldRec'
import { CMyFieldDb } from '@/components/CMyFieldDb'
import { shared_consts } from '@/common/shared_vuejs'
import { useI18n } from '@/boot/i18n'
import { useQuasar } from 'quasar'
import { costanti } from '@costanti'

const namespace = 'notifModule'

export default defineComponent({
  name: 'notifPopover',
  components: { CTitleBanner, CMyFieldRec, CMyFieldDb },

  setup(props) {
    const $router = useRouter()
    const userStore = useUserStore()
    const notifStore = useNotifStore()

    const { t } = useI18n()
    const $q = useQuasar()

    const loading = ref(false)

    const myuser = ref({})

    const lasts_notifs = computed(() => notifStore.getlasts_notifs)
    const usernotifs = computed(() => userStore.my.profile.notifs)

    const userId = ref('')
    const open = ref(false)

    const notifsel = ref(<INotif>{
      dest: '',
      datenotif: new Date()
    })

    const { getNumNotifUnread, getNumNotif, getUsernameChatByNotif, getImgByNotif, getNotifText } = MixinUsers()

    // function lasts_notifs (state: IUserState) => IMessage[] {
    //
    // }


    watch(() => usernotifs.value, async (to: any, from: any) => {

      if (usernotifs.value) {
        console.log('usernotifs.value', usernotifs.value, to)
        const ret = await userStore.setUserNotifs(usernotifs.value)
        if (ret) {
          tools.showPositiveNotif($q, t('db.recupdated'))
        } else {
          tools.showNegativeNotif($q, t('db.recfailed'))
        }
      }
    })

    function clickChat(msg: IMessage) {
      // $router.replace(`/notifs/${ msg.dest.username}`)
    }

    function getlastnotif(username: string): any {
      // Get msg for this chat
      if (notifStore.last_notifs)
        return notifStore.last_notifs.find((rec: INotif) => rec.dest === username)
      // return users_msg_saved[username]
    }

    function getlastdataread(username: string): any {
      // Get msg for this

      let myrec = getlastnotif(username)
      const lastdata: any = (myrec) ? myrec.lastdataread : tools.getLastDateReadReset()

      let mydate = ''
      if (!tools.isIsoDate(lastdata))
        mydate = lastdata.toISOString()
      else
        return lastdata

      // console.log('getlastdataread', mydate)
      return mydate
    }


    function refreshdata(username: string) {
      loading.value = true
      userId.value = userStore.my._id

      notifsel.value.dest = ''

      return notifStore.updateNotifDataFromServer({
        username,
        lastdataread: getlastdataread(username)
      }).then((ris) => {
        notifsel.value.dest = username
        loading.value = false

        const element = document.getElementById('last')
        tools.scrollToElement(element)

        // changemsgs('', '')

      }).catch((err) => {
        loading.value = false
      })
    }

    function mounted() {
      myuser.value = userStore.my
      refreshdata(userStore.my.username)
    }

    onMounted(mounted)

    return {
      lasts_notifs,
      clickChat,
      getNumNotifUnread,
      getNumNotif,
      getUsernameChatByNotif,
      getImgByNotif,
      getNotifText,
      tools,
      usernotifs,
      shared_consts,
      userId,
      myuser,
      costanti,
      open,
    }
  },
})
