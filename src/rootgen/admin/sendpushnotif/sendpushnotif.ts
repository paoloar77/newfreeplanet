import { CMyPage } from '../../../components/CMyPage/index'

import { shared_consts } from '@src/common/shared_vuejs'
import { tools } from '@src/store/Modules/tools'

import { defineComponent, ref, onMounted } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'Sendpushnotif',
  components: { CMyPage },
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
    const destination = ref(shared_consts.TypeMsg.SEND_TO_ALL)

    function created() {
      title.value = t('ws.sitename')
      openUrl.value = '/'
      openUrl2.value = ''
      tag.value = 'msg'
    }

    function SendMsg(params: any) {
      $q.dialog({
        message: t('dialog.continue') + ' ' + params.content + ' ?',
        cancel: {
          label: t('dialog.cancel')
        },
        ok: {
          label: t('dialog.yes'),
          push: true
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

    function SendMsgToParam(typemsg: any) {
      interface IPushParam {
        typemsg: string,
        title: string,
        content: string,
        openUrl: string,
        openUrl2: string,
        tag: string,
        actions: any[],
      }

      let param: IPushParam = {
        typemsg,
        title: title.value,
        content: content.value,
        openUrl: openUrl.value,
        openUrl2: openUrl2.value,
        tag: tag.value,
        actions: []
      }

      param.actions = []

      if (actiontype.value === shared_consts.TypeMsg_Actions.YESNO) {
        param.actions = [
          { action: 'confirm', title: 'Si', icon: '/statics/icons/opz1-icon-96x96.png' },
          { action: 'cancel', title: 'No', icon: '/statics/icons/opz2-icon-96x96.png' }
        ]
      } else if (actiontype.value === shared_consts.TypeMsg_Actions.OPZ1_2) {
        param.actions = [
          { action: 'opz1', title: opz1.value, icon: '/statics/icons/opz1-icon-96x96.png' },
          { action: 'opz2', title: opz2.value, icon: '/statics/icons/opz2-icon-96x96.png' }
        ]
      }

      //   action: A DOMString identifying a user action to be displayed on the notification.
      //   title: A DOMString containing action text to be shown to the user.
      //   icon: A USVString containing the URL of an icon to display with the action.

      return SendMsg(param)
    }

    function SendMsgToAll() {

      SendMsgToParam(destination.value)
    }

    onMounted(created)

    return {
      title,
      tag,
      openUrl,
      openUrl2,
      actiontype,
      destination,
      SendMsgToAll,
      opz1,
      opz2,
      content,
      shared_consts,
      incaricamento,
    }
  }
})


