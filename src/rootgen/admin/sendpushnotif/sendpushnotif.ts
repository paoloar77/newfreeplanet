import { CMyPage } from '../../../components/CMyPage/index'
import { CMyEditor } from '../../../components/CMyEditor/index'

import { shared_consts } from '@src/common/shared_vuejs'
import { tools } from '@src/store/Modules/tools'

import { defineComponent, ref, onMounted, watch } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'
import { IMsgGlobParam } from 'model'

export default defineComponent({
  name: 'Sendpushnotif',
  components: { CMyPage, CMyEditor },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()
    const globalStore = useGlobalStore()

    const incaricamento = ref(false)

    const title= ref('')
    const content= ref('')
    const openUrl= ref('')
    const openUrl2= ref('')
    const opz1= ref('')
    const opz2= ref('')
    const tag= ref('')
    const actiontype = ref(shared_consts.TypeMsg_Actions.NORMAL)
    const whatMsg = ref(shared_consts.whatMsgToSend.MSG_TEXT)
    const destination = ref(shared_consts.TypeMsg.SEND_TO_MYSELF)
    const sendreally = ref(false)
    const templmsgid = ref(0)
    const mytempl = ref(<any>null)

    const mytab = ref('telegram')
    const arrTemplate = ref(<any>[])
    const recMsgTempl = ref(<any>[])
    const mymsg = ref('')
    const msgold = ref('')

    watch(() => whatMsg.value, (newval: any, oldval) => {

      if (whatMsg.value !== shared_consts.whatMsgToSend.MSG_TEXT) {
        msgold.value = mymsg.value
      } else {
        mymsg.value = msgold.value
      }

      load()

    })

    watch(() => templmsgid.value, (newval: any, oldval) => {

      if (newval && recMsgTempl.value.length > 0) {
        mytempl.value = recMsgTempl.value.find((rec: any) => rec._id === newval)
        mymsg.value = mytempl.value.msg_it
      }

    })

    async function load() {
      if (whatMsg.value === shared_consts.whatMsgToSend.MSG_OF_TEMPLATE) {
        recMsgTempl.value = await globalStore.GetMsgTemplates()

        for (const rec of recMsgTempl.value) {
          arrTemplate.value.push({id: rec._id, value: rec._id, label: rec.title})
        }

        if (templmsgid.value) {
          if (recMsgTempl.value.length > 0) {
            templmsgid.value = recMsgTempl.value[0]._id;
          }
        }
        if (templmsgid.value) {
          mytempl.value = recMsgTempl.value.find((rec: any) => rec._id === templmsgid.value)
          mymsg.value = ''
          mymsg.value = mytempl.value.msg_it
        }
      }

    }

    function created() {
      title.value = t('ws.sitename')
      openUrl.value = '/'
      openUrl2.value = ''
      tag.value = 'msg'

      load()
    }

    function SendMsg(params: any) {
      $q.dialog({
        message: t('dialog.continue') + ' ' + params.content + ' ?',
        ok: {
          label: t('dialog.yes'),
          push: true
        },
        cancel: {
          label: t('dialog.cancel')
        },
        title: params.title
      }).onOk(async () => {

        incaricamento.value = true
        $q.loading.show({ message: t('otherpages.update') })

        const ris = await globalStore.sendPushNotif({ params })

        if (!!ris.msg)
          tools.showPositiveNotif($q, ris.msg)

        $q.loading.hide()

        incaricamento.value = false

      })
    }

    function SendMsgToParam(typemsg: any, typesend: number = shared_consts.TypeSend.PUSH_NOTIFICATION, sendreally: any = false) {

      let param: IMsgGlobParam = {
        typemsg,
        title: title.value,
        content: content.value,
        openUrl: openUrl.value,
        openUrl2: openUrl2.value,
        tag: tag.value,
        actions: [],
        typesend,
        sendreally
      }

      if (typesend === shared_consts.TypeSend.TELEGRAM) {
        param.content = mymsg.value
      }


      param.actions = []

      if (actiontype.value === shared_consts.TypeMsg_Actions.YESNO) {
        param.actions = [
          { action: 'confirm', title: 'Si', icon: '/images/opz1-icon-96x96.jpg' },
          { action: 'cancel', title: 'No', icon: '/images/opz2-icon-96x96.jpg' }
        ]
      } else if (actiontype.value === shared_consts.TypeMsg_Actions.OPZ1_2) {
        param.actions = [
          { action: 'opz1', title: opz1.value, icon: '/images/opz1-icon-96x96.jpg' },
          { action: 'opz2', title: opz2.value, icon: '/images/opz2-icon-96x96.jpg' }
        ]
      }

      //   action: A DOMString identifying a user action to be displayed on the notification.
      //   title: A DOMString containing action text to be shown to the user.
      //   icon: A USVString containing the URL of an icon to display with the action.

      return SendMsg(param)
    }

    function SendMsgToAll(typesend: number) {

      SendMsgToParam(destination.value, typesend, sendreally.value)
    }

    onMounted(created)

    return {
      title,
      tag,
      openUrl,
      openUrl2,
      actiontype,
      whatMsg,
      destination,
      sendreally,
      SendMsgToAll,
      opz1,
      opz2,
      content,
      shared_consts,
      incaricamento,
      mytab,
      templmsgid,
      arrTemplate,
      mytempl,
      mymsg,
    }
  }
})


