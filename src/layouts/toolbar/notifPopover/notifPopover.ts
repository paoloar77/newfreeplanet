import { computed, defineComponent, ref } from 'vue'

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

const namespace = 'notifModule'

export default defineComponent({
  name: 'notifPopover',

  setup(props) {
    const $router = useRouter()
    const userStore = useUserStore()
    const notifStore = useNotifStore()

    const loading = ref(false)

    const lasts_notifs = computed(() => notifStore.getlasts_notifs)

    const notifsel = ref(<INotif>{
      dest: '',
      datenotif: new Date()
    })

    const { getNumNotifUnread, getNumNotif, getUsernameChatByNotif, getImgByNotif, getNotifText } = MixinUsers()

    // function lasts_notifs (state: IUserState) => IMessage[] {
    //
    // }


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
      refreshdata(userStore.my.username)
    }

    return {
      lasts_notifs,
      clickChat,
      getNumNotifUnread,
      getNumNotif,
      getUsernameChatByNotif,
      getImgByNotif,
      getNotifText,
      tools,
    }
  },
})
