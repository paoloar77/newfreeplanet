import { defineComponent, PropType, ref } from 'vue'
import { useQuasar } from 'quasar'
import { CTitleBanner } from '@/components/CTitleBanner'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { tools } from '@store/Modules/tools'

export default defineComponent({
  name: 'Extralist',
  components: { CTitleBanner },
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
  setup() {
    const userStore = useUserStore()

    const users_imported = ref('')
    const myloadingImport = ref(false)
    const errimport = ref(false)
    const okimport = ref(false)
    const myrisimport = ref('')

    async function importExtraList() {
      myloadingImport.value = true
      errimport.value = false
      okimport.value = false

      const mydata = {
        strdata: users_imported,
        locale: tools.getLocale(),
      }

      const res: any = await userStore.importExtraList(mydata)

      let esistiti = ''
      if (res.data.numalreadyexisted > 0)
        esistiti = ` ${res.data.numalreadyexisted} email già esistenti`

      if (res.data.numadded > 0) {
        okimport.value = true
        myrisimport.value = `(${res.data.numadded} / ${res.data.numtot}) utenti extra importati !` + esistiti
      } else {
        errimport.value = true
        myrisimport.value = `Nessun utente extra importato (trovate ${res.data.numtot})` + esistiti
      }

      myloadingImport.value = false
    }


    return {
      users_imported,
      myloadingImport,
      errimport,
      okimport,
      myrisimport,
      importExtraList,
    }
  },
})
