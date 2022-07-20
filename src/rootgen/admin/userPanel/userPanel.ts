import { defineComponent, onMounted, ref } from 'vue'

import { CMyPage } from '@/components/CMyPage'
import { CCopyBtn } from '@/components/CCopyBtn'
import { CKeyAndValue } from '@/components/CKeyAndValue'
import { CGridTableRec } from '@/components/CGridTableRec'
import { tools } from '@store/Modules/tools'
import { static_data } from '@/db/static_data'

import { fieldsTable } from '@src/store/Modules/fieldsTable'
import { shared_consts } from '@/common/shared_vuejs'
import { DefaultProfile, useUserStore } from '@store/UserStore'
import { costanti } from '@costanti'
import { useQuasar } from 'quasar'
import { useNotifStore } from '@store/NotifStore'
import { INotif } from 'model'
import { IUserFields } from '@model/UserStore'
import { useI18n } from '@/boot/i18n'

export default defineComponent({
  name: 'userPanel',
  components: { CMyPage, CKeyAndValue, CCopyBtn },
  setup() {

    const arrfilterand: any = ref([])
    const $q = useQuasar()

    const search = ref('')
    const colVisib = ref('')
    const mycolumns = ref([])
    const myuser = ref(<IUserFields>{_id: '', username: '', name: '', surname: '', profile: DefaultProfile})
    const risultato = ref('')
    const mynotif = ref('')
    const mylink = ref('')
    const notiftype = ref(1)

    const listnotif = ref(<any>[])
    const { t } = useI18n();


    const userStore = useUserStore()
    const notifStore = useNotifStore()

    async function mounted() {
      //
      search.value = tools.getCookie(tools.COOK_SEARCH + 'searchpanel')
      await refresh()

      listnotif.value = shared_consts.UsersNotif_Adv_List
      for (const rec of listnotif.value) {
        rec.label = t(rec.labeltrans)
      }
    }

    function changeCol(newval: any) {
      //
    }

    async function refresh() {
      if (!!search.value)
        myuser.value = await userStore.loadUserPanel(search.value)
      else
        myuser.value = {_id: '', username: '', name: '', surname: '', profile: DefaultProfile}

    }

    function db_fieldsTable() {
      return fieldsTable
    }

    async function doSearch() {
      tools.setCookie(tools.COOK_SEARCH + 'searchpanel', search.value)
      await refresh()
    }

    async function exportListaEmail() {
      risultato.value = await tools.exportListaEmail()

      tools.copyStringToClipboard($q, risultato.value, false)
    }

    async function sendNotifToUser() {

      if (!!myuser.value) {
        const notif: INotif = {
          type: notiftype.value,
          sender: userStore.my.username,
          dest: myuser.value.username,
          descr: mynotif.value,
          link: mylink.value,
        }
        await notifStore.SendNotifEvent(notif)

      }
    }

    onMounted(mounted)

    return {
      arrfilterand,
      fieldsTable,
      search,
      tools,
      shared_consts,
      doSearch,
      changeCol,
      myuser,
      refresh,
      mycolumns,
      colVisib,
      exportListaEmail,
      sendNotifToUser,
      risultato,
      mynotif,
      mylink,
      notiftype,
      listnotif,
    }
  }
})


