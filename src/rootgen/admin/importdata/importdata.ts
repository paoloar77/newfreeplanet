import { CMyPage } from '../../../components/CMyPage/index'

import { shared_consts } from '@src/common/shared_vuejs'
import { tools } from '@src/store/Modules/tools'

import { defineComponent, ref, onMounted } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'
import { IParamsQuery } from 'model'

export default defineComponent({
  name: 'Sendpushnotif',
  components: { CMyPage },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()
    const globalStore = useGlobalStore()

    const arrSector = ref(<any[]>[])
    const arrSkill = ref(<any[]>[])


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
        {
          label: 'Importa Categorie da TXT',
          value: shared_consts.Cmd.CAT_TXT
        },
        {
          label: 'converti da TXT seperato senza spazi',
          value: shared_consts.Cmd.CAT_NO_SPAZI
        },
      ]
    )

    function created() {
      inputfile.value = ''

      const sortBy = 'descr'
      const descending = 1
      const myobj: any = {}
      if (descending)
        myobj[sortBy] = -1
      else
        myobj[sortBy] = 1

      const params: IParamsQuery = {
        table: 'sectors',
        startRow: 0,
        endRow: 10000,
        filter: '',
        filterand: '',
        filtersearch: '',
        filtersearch2: '',
        filtercustom: '',
        sortBy: myobj,
        descending,
        userId: ''
      }

      globalStore.loadTable(params).then((data) => {
        arrSector.value = data.rows
      })


      params.table = 'skills'
      globalStore.loadTable(params).then((data) => {
        arrSkill.value = data.rows
      })

    }

    function createSector(cat: string) {
      const myid = arrSector.value.length + 1
      arrSector.value.push({_id: myid, descr: cat})
      return myid
    }

    function findidSector(cat: string) {
      const rec = arrSector.value.find((rec) => rec.descr === cat)
      if (rec) {
        return rec._id
      }
      return 0;
    }
    function findidSkill(cat: string) {
      const rec = arrSkill.value.find((rec) => rec.descr === cat)
      if (rec) {
        return rec._id
      }
      return 0;
    }

    function createSkill(cat: string) {
      const myid = arrSkill.value.length + 1
      arrSkill.value.push({_id: myid, descr: cat})
      return myid
    }


    function importCmdTxt(cmd: number, testo: string) {

      const delim = '\n';
      const righe = 1;
      let indrec = 0;
      let myarr = tools.CSVToArray(testo, delim)

      let sector = ''
      let skill = ''
      let sotto_cat = ''
      let idSector = 0
      let idSkill = 0

      let strskills = '';
      let strsubskills = '';
      let strsectors = '';

      let indrecsub = 1;

      myarr = myarr[0]
      let arrstr = []

      // debugger;
      for (let i = 0; i < myarr.length; i = i + righe) {
        arrstr = myarr[i].split(',')
        sector = arrstr[0]
        skill = arrstr[1]
        sotto_cat = arrstr[2]
        // sotto_cat = myarr[i].replace('\'', '\\\'')
        // sector = myarr[i+2]
        if (skill)
          skill = skill.replace('\'', '\\\'')
        if (sector)
          sector = sector.replace('\'', '\\\'')

        if (sector) {
          idSector = findidSector(sector)
          if (!idSector) {
            idSector = createSector(sector)

            // sectors
            strsectors += '{ \n'
            strsectors += '   _id:' + idSector + ','
            strsectors += '   descr:\'' + sector + '\','
            strsectors += '}, \n'
          }

          if (skill !== '') {
            idSkill = findidSkill(skill)
            if (!idSkill) {
              idSkill = createSkill(skill)

              // skills
              strskills += '{ \n'
              strsectors += '   _id:' + idSkill + ','
              strskills += '   idSector: [' + idSector + '],'
              strskills += '   descr:\'' + skill + '\','
              strskills += '}, \n'
            }
          }

          if (sotto_cat !== '') {
            // subskills
            strsubskills += '{ \n'
            strsubskills += '   idSkill: ' + idSkill + ','
            strsubskills += '   descr:\'' + sotto_cat + '\','
            strsubskills += '}, \n'
          }
        }

        indrecsub++
      }

      let ris = 'module.exports = {\n' +
        '  list: [' + strsectors + ']'
      ris += '<br><br><br><br>'
      ris += 'module.exports = {\n' +
        '  list: [' + strskills + ']'
      ris += '<br><br><br><br>'
      ris += 'module.exports = {\n' +
        '  list: [' + strsubskills + ']'

      return ris

    }

    function importNoSpazi(cmd: number, testo: string) {

      const delim = '\n';
      const righe = 3;
      let indrec = 0;
      let myarr = tools.CSVToArray(testo, delim)

      let sector = ''
      let sotto_cat = ''

      myarr = myarr[0]

      let txt = ''

      // debugger;
      for (let i = 0; i < myarr.length; i = i + righe) {
        sotto_cat = myarr[i].replace('\'', '\\\'')
        sector = myarr[i+2]

        txt += sotto_cat + ',' + sector + '<br>'
      }

      return txt

    }

    function importCmd(cmd: number, testo: string) {

      let risultato = '(nessuno)'
      let delim = ','

      if (cmd === shared_consts.Cmd.PROVINCE) {
        delim = ','
      } else if ((cmd === shared_consts.Cmd.COMUNI) || (cmd === shared_consts.Cmd.CITIES_SERVER)) {
        delim = ';'
      } else if (cmd === shared_consts.Cmd.CAT_TXT) {
        return importCmdTxt(cmd, testo);
      } else if (cmd === shared_consts.Cmd.CAT_NO_SPAZI) {
        return importNoSpazi(cmd, testo);
      }

      const myarr = tools.CSVToArray(testo, delim)

      let strris = ''

      let ind = 1

      for (const rec of myarr) {

        let lab = tools.addslashes(rec[0])
        let val = tools.addslashes(rec[1])
        if (cmd === shared_consts.Cmd.PROVINCE) {

          strris += '{ \n'
          strris += '   _id:' + ind + ','
          strris += '   prov:\'' + val + '\','
          strris += '   descr:\'' + lab + '\','
          strris += '}, \n'

        } else if (cmd === shared_consts.Cmd.COMUNI) {
          strris += '{ \n'
          strris += '   istat:\'' + tools.addslashes(rec[0]) + '\','
          strris += '   comune:\'' + tools.addslashes(rec[1]) + '\','
          strris += '   prov:\'' + tools.addslashes(rec[2]) + '\''

        } else if (cmd === shared_consts.Cmd.CITIES_SERVER) {
          strris += '{ \n'
          strris += '   _id :' + ind + ',\n'
          strris += '   istat :\'' + rec[0] + '\'\n,'
          strris += '   comune :\'' + tools.addslashes(rec[1]) + '\'\n,'
          strris += '   prov :\'' + rec[2] + '\'\n,'
          strris += '   reg :\'' + tools.addslashes(rec[3]) + '\'\n,'
          strris += '   pref :\'' + tools.addslashes(rec[4]) + '\'\n,'
          strris += '   cap :\'' + rec[5] + '\'\n,'
          strris += '   abitanti :\'' + rec[6] + '\'\n,'
          strris += '   country : \'IT\'\n'
          strris += '}, \n'
        }
        ind += 1

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


