import { defineComponent, ref, computed, watch } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'

import { tools } from '@store/Modules/tools'

import { IChat, IMessage, IMsgUsers, StatusMessage } from 'model'
import MixinUsers from '../../mixins/mixin-users'
import { CMyAvatar } from '../../components/CMyAvatar'
import { useRoute, useRouter } from 'vue-router'
import { useMessageStore } from '@store/MessageStore'
import { func_tools } from '@store/Modules/toolsext'


export default defineComponent({
  name: 'Messages',
  props: {
    mystr: {
      type: String,
      required: true,
      default: '',
    },
    myval: {
      type: Number,
      required: true,
      default: 0,
    },
    mybool: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  components: { CMyAvatar },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()
    const globalStore = useGlobalStore()
    const messageStore = useMessageStore()
    const $router = useRouter()
    const route = useRoute()

    const {
      getUsernameChatByMsg, getNumMsg,
      getImgByMsg, getMsgText, Username
    } = MixinUsers()

    const mydrawer = ref(true)
    const miniState = ref(false)
    const usernameloading = ref(<string | undefined>'')
    const widthdrawer = ref(300)
    const chatsel = ref(<IChat>{
      username: '',
      lasttimeActive: new Date()
    })
    const mytexttosend = ref('')
    const loading = ref(false)

    const lasts_messages = computed(() => messageStore.getlasts_messages)

    // function users_msg_saved: IMsgUsers[] = []


    function getLastUserChatted() {
      const lastmsg: IMessage = messageStore.getlasts_messages().slice(-1)[0]
      console.log('lastmsg', lastmsg)
      if (lastmsg) {
        return (lastmsg.origin!.username !== Username()) ? lastmsg.origin!.username : lastmsg.origin!.username
      } else {
        return ''
      }
    }

    function getlastdataread(username: string): any {
      const myrec = msgchat(username)
      // Get msg for this chat
      const lastdata: any = (myrec) ? myrec.lastdataread : tools.getLastDateReadReset()
      if (!lastdata)
        return null
      console.table(myrec)
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

      chatsel.value.username = ''

      return messageStore.updateMsgDataFromServer({
        username,
        lastdataread: getlastdataread(username)
      }).then((ris) => {
        usernameloading.value = username
        chatsel.value.username = username
        loading.value = false

        const element = document.getElementById('last')
        tools.scrollToElement(element)

        // changemsgs('', '')

      }).catch((err) => {
        loading.value = false
      })
    }


    const changeusername = watch(() => route.params.un, (newval, oldval) => {
      if (route.params.un === undefined || route.params.un === ':un') {
        usernameloading.value = getLastUserChatted()
      } else {
        let mystr2: any = route.params.un ? route.params.un : ''
        usernameloading.value = mystr2
      }

      if (!miniState.value && tools.isMobile()) {
        miniState.value = true
      }

      if (usernameloading.value) {
        // Retrieve last msgs data from the server
        refreshdata(usernameloading.value)
      }
    })

    function styletextbar() {

      let mystr = ''

      if (mydrawer.value) {
        if (!miniState.value)
          mystr = `left: ${widthdrawer.value}px;`
        else
          mystr = 'left: 57px;'
      } else {
        mystr = 'left: 0;'
      }

      // console.log('tools.getwidth', tools.getwidth)

      mystr += ` width: ${tools.getwidth($q) - widthdrawer.value - 40 - 300}px; `

      return mystr
    }

    function showNotif(msgcode: any) {
      tools.showNotif($q, (msgcode))
    }

    function drawerClick(e: any) {
      // if in "mini" state and user
      // click on drawer, we switch it to "normal" mode
      if (miniState.value) {
        miniState.value = false

        // notice we have registered an event with capture flag;
        // we need to stop further propagation as this click is
        // intended for switching drawer to "normal" mode only
        e.stopPropagation()
      }
    }

    function getheight() {
      // return height()
      return $q.screen.height - 43 // .toolbar
    }

    function isMenuActive(username: string) {
      return chatsel.value.username === username
    }

    function selChat(mymsg: IMessage) {
      if (chatsel.value.username !== mymsg.dest!.username)
        $router.replace('/messages/' + mymsg.dest!.username)
      else {
        // refresh
        refreshdata(chatsel.value.username)
      }
    }

    function msgchat(username: string): any {
      // Get msg for this chat
      if (messageStore.users_msg)
        return messageStore.users_msg.find((rec: IMsgUsers) => rec.username === username)
      // return users_msg_saved[username]
    }

    function msgchat_records(): IMessage[] {
      const myrec = msgchat(chatsel.value.username)
      // console.log('msgchat_records', myrec)
      // Get msg for this chat
      return (myrec) ? myrec.msgs : []
    }

    function sendMsg() {

      const data: IMessage = {
        dest: {
          idapp: process.env.APP_ID,
          username: chatsel.value.username
        },
        message: mytexttosend.value
      }
      data.dest!.username = chatsel.value.username
      data.message = mytexttosend.value

      mytexttosend.value = ''

      messageStore.SendMsgEvent(data).then((ris) => {
        data.status = StatusMessage.Sending

        const element = document.getElementById('last')
        tools.scrollToElement(element)

        if (!ris)
          tools.showNegativeNotif($q, t('cal.sendmsg_error'))

        // tools.showPositiveNotif(self.$q, self.('cal.sendmsg_sent'))
        // else
      })
    }

    function loadMorePosts() {
      // ....
    }


    // @ts-ignore
    function myonScroll({ target: { scrollTop, clientHeight, scrollHeight } }: {scrollTop: number, clientHeight: number, scrollHeight: number}) {
      if (scrollTop + clientHeight >= scrollHeight) {
        loadMorePosts()
      }
    }

    function created() {

      changeusername()
    }

    created()

    return {
      msgchat_records,
      msgchat,
      sendMsg,
      selChat,
      isMenuActive,
      getheight,
      drawerClick,
      showNotif,
      styletextbar,
      lasts_messages,
      myonScroll,
      widthdrawer,
      chatsel,
      mytexttosend,
      loading,
      mydrawer,
      getUsernameChatByMsg,
      getNumMsg,
      getImgByMsg,
      getMsgText,
      Username,
      func_tools,
      tools,
    }
  }
})
