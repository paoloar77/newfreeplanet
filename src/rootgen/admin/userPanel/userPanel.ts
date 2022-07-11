import { defineComponent, onMounted, ref } from 'vue'

import { CMyPage } from '@/components/CMyPage'
import { CCopyBtn } from '@/components/CCopyBtn'
import { CKeyAndValue } from '@/components/CKeyAndValue'
import { CGridTableRec } from '@/components/CGridTableRec'
import { tools } from '@store/Modules/tools'
import { static_data } from '@/db/static_data'

import { fieldsTable } from '@src/store/Modules/fieldsTable'
import { shared_consts } from '@/common/shared_vuejs'
import { useUserStore } from '@store/UserStore'
import { costanti } from '@costanti'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'userPanel',
  components: { CMyPage, CKeyAndValue, CCopyBtn },
  setup() {

    const arrfilterand: any = ref([])
    const $q = useQuasar()

    const search = ref('')
    const colVisib = ref('')
    const mycolumns = ref([])
    const myuser = ref({})
    const risultato = ref('')

    const userStore = useUserStore()

    async function mounted() {
      //
      search.value = tools.getCookie(tools.COOK_SEARCH + 'searchpanel')
      await refresh()
    }

    function changeCol(newval: any) {
      //
    }

    async function refresh() {
      if (!!search.value)
        myuser.value = await userStore.loadUserPanel(search.value)
      else
        myuser.value = {}

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

    onMounted(mounted)

    return {
      arrfilterand,
      fieldsTable,
      search,
      tools,
      doSearch,
      changeCol,
      myuser,
      refresh,
      mycolumns,
      colVisib,
      exportListaEmail,
      risultato,
    }
  }
})


