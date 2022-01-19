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

    const cosafare = ref(shared_consts.Cmd.PROVINCE)

    const inputfile = ref('')
    const risultato = ref('')

    const ListaCmd = ref(
      [
        {
          label: 'Importa Province',
          value: shared_consts.Cmd.PROVINCE
        },
        {
          label: 'Importa Comuni',
          value: shared_consts.Cmd.COMUNI
        },
        {
          label: 'Tabella Cities',
          value: shared_consts.Cmd.CITIES_SERVER
        },
      ]
    )

    function created() {
      inputfile.value = ''
    }

    function importCmd(cmd: number, testo: string) {

      let risultato = '(nessuno)'
      let delim = ','

      if (cmd === shared_consts.Cmd.PROVINCE) {
        delim = ','
      } else if ((cmd === shared_consts.Cmd.COMUNI) || (cmd === shared_consts.Cmd.CITIES_SERVER)) {
        delim = ';'
      }

      const myarr = tools.CSVToArray(testo, delim)

      let strris = ''

      let ind = 1

      for (const rec of myarr) {

        let lab = rec[0]
        let val = rec[1]
        if (cmd === shared_consts.Cmd.PROVINCE) {
          val = rec[2]

          strris += '{ \n'
          strris += '   label:\'' + lab + '\','
          strris += '   value:\'' + val + '\','
          strris += '}, \n'

        } else if (cmd === shared_consts.Cmd.COMUNI) {
          strris += '{ \n'
          strris += '   istat:\'' + rec[0] + '\','
          strris += '   comune:\'' + rec[1] + '\','
          strris += '   prov:\'' + rec[2] + '\''

        } else if (cmd === shared_consts.Cmd.CITIES_SERVER) {
          strris += '{ \n'
          strris += '   _id :' + ind + ',\n'
          strris += '   istat :\'' + rec[0] + '\'\n,'
          strris += '   comune :\'' + rec[1] + '\'\n,'
          strris += '   prov :\'' + rec[2] + '\'\n,'
          strris += '   reg :\'' + rec[3] + '\'\n,'
          strris += '   pref :\'' + rec[4] + '\'\n,'
          strris += '   cap :\'' + rec[5] + '\'\n,'
          strris += '   abitanti :\'' + rec[6] + '\'\n,'
          strris += '   country : \'IT\'\n'
          strris += '}, \n'
          ind += 1
        }

      }

      if (cmd === shared_consts.Cmd.CITIES_SERVER) {
        userStore.importToServerCmd($q, t, cmd, null)
      }
      risultato = strris

      return risultato
    }

    function loadTextFromFile(ev: any) {
      console.log('ev', ev)
      const file = ev.target.files[0]
      const reader = new FileReader()

      reader.onload = (e: any) => {

        const testo = e.target.result

        risultato.value = importCmd(cosafare.value, testo)
      }

      reader.readAsText(file)
    }

    function eseguiCmd() {
      risultato.value = ''
      userStore.importToServerCmd($q, t, cosafare.value, null)
    }

    onMounted(created)

    return {
      inputfile,
      shared_consts,
      loadTextFromFile,
      risultato,
      cosafare,
      ListaCmd,
      eseguiCmd,
    }
  }
})


