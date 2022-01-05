import { defineComponent, ref, onMounted,  watch, computed } from 'vue'


import { tools } from '@src/store/Modules/tools'
import {
  colnewstosent,
  coltemplemail,
  colopzemail,
  colmailinglist,
  colmsg_templates, fieldsTable
} from '@src/store/Modules/fieldsTable'
import { DefaultNewsState, INewsState } from '@src/model/index'
import translate from '../../../globalroutines/util'
import { CTitle } from '../../../components/CTitle'
import { CMyPage } from '../../../components/CMyPage'
import MixinBase from '../../../mixins/mixin-base'
import { useGlobalStore } from '@store/globalStore'
import { CGridTableRec } from '@/components/CGridTableRec'
import { CTitleBanner } from '@/components/CTitleBanner'
import { CMyFieldDb } from '@/components/CMyFieldDb'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { useI18n } from '@/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { toolsext } from '@store/Modules/toolsext'
import { costanti } from '@costanti'

export default defineComponent({
  name: 'newsletter',
  components: { CTitle, CMyPage, CGridTableRec, CTitleBanner, CMyFieldDb },
  setup() {
    const globalStore = useGlobalStore()
    const userStore = useUserStore()

    const $q = useQuasar()
    const { getValDb } = MixinBase()

    const $route = useRoute()

    const myloadingload = ref(false)
    const myloading = ref(false)
    const myloadingprew = ref(false)
    const myloading2 = ref(false)
    const myloading3 = ref(false)
    const myloading4 = ref(false)
    const myloadingState = ref(false)
    const myloadingImport = ref(false)
    const mailinglist_imported = ref('')
    const myrisimport = ref('')
    const errimport = ref(false)
    const okimport = ref(false)
    const newsstate = ref (<INewsState>{})
    const percsubscribed = ref(0.0)
    const polling = ref(<any> null)
    const tab = ref('')
    const emailtextheader = ref('')
    const eseguipolling = ref(false)

    const idparam = computed( () => $route.params.idparam.toString())


    async function mounted() {
      await load()
      newsstate.value = DefaultNewsState
      // tab = tools.getCookie('formnews', 'check')
      tab.value = $route.params.idparam.toString()
      emailtextheader.value = getValDb('EMAIL_TEXT', true)

    }

    function checkifpolling() {
      if (eseguipolling.value) {
        // Is Still sending email, so, every minutes, check the status
        if (!polling.value) {
          console.log('esegui POLLING....')
          polling.value = setInterval(() => {
            load()
          }, 15000)
        }
      }
    }

    watch(() => idparam.value, (newval, oldval) => {
      tab.value = newval
    })

    async function createNewsletter(minuti: number, loading: boolean) {
      loading = true
      // Crea nuovo record tra N minuti
      const mynews = {
        idapp: process.env.APP_ID,
        label: 'Newsletter creata il ' + tools.getstrDateTimeAll(tools.getDateNow()),
        activate: true,
        datetoSent: tools.addMinutes(tools.getDateNow(), minuti),
        templemail_str: globalStore.gettemplemailbyId(getValDb('TEMPLEMAIL_ID', true))
      }
      await tools.createNewRecord($q, 'newstosent', mynews).then((myrecris) => {
        // reload data
        load()
        loading = false
      })
    }

    function beforeDestroy() {
      console.log('beforeDestroy')
      if (polling.value)
        clearInterval(polling.value)
    }

    async function load() {
      console.log('Newsletter load')
      myloadingload.value = true
      const mydata = {
        locale: tools.getLocale()
      }
      const myris = await userStore.newsletterload(mydata)
      newsstate.value = myris.newsstate
      globalStore.serv_settings = myris.serv_settings
      globalStore.templemail = myris.templemail
      globalStore.opzemail = myris.opzemail

      // console.log('newsstate')
      // console.table('globalStore.serv_settings', globalStore.serv_settings)

      percsubscribed.value = newsstate.value.totsubscribed / newsstate.value.totemail

      if (newsstate.value.lastnewstosent)
        eseguipolling.value = (eseguipolling.value || newsstate.value.lastnewstosent.starting_job! && !newsstate.value.lastnewstosent.finish_job!)

      if (newsstate.value.nextnewstosent)
        eseguipolling.value = eseguipolling.value || true

      // console.log('eseguipolling', eseguipolling)
      myloadingload.value = false

      checkifpolling()
    }

    function DisableNewsletter() {
      return setActiveDisactiveNewsletter(false)
    }

    function EnableNewsletter() {
      return setActiveDisactiveNewsletter(true)
    }

    function setActiveDisactiveNewsletter(activate: any) {
      let mytext = ''
      const mytitle = 'Newsletter'
      if (activate)
        mytext = 'Procedo a far Ripartire la newsletter?'
      else
        mytext = 'Procedo a fermare l\'Invio della newsletter?'

      $q.dialog({
        message: mytext,
        ok: {
          label: translate('dialog.yes'),
          push: true
        },
        title: mytitle,
        cancel: true,
        persistent: false
      }).onOk(async () => {

        myloadingState.value = true
        const mydata = {
          _id: newsstate.value.lastnewstosent!._id,
          locale: tools.getLocale(),
          activate
        }
        newsstate.value = await userStore.newsletter_setactivate(mydata)
        myloadingState.value = false

      })

    }

    function emailtest() {
      return getValDb('EMAIL_TEST', true)
    }

    async function sendNewsletterTest(previewonly: any) {
      if (previewonly)
        myloadingprew.value = true
      else
        myloading.value = true

      const res = await globalStore.sendEmailTest({ previewonly })

      if (res)
        tools.showPositiveNotif($q, 'Email di Test Inviata')
      else {
        tools.showNegativeNotif($q, 'Email di Test Non Inviata')
      }

      if (previewonly)
        myloadingprew.value = false
      else
        myloading.value = false
    }

    function changetabnews(value: any, oldval: any) {
      console.log('changetabnews')
      tools.setCookie('formnews', value)
    }

    function getcolnewstosent() {
      return colnewstosent
    }

    function getcolmailinglist() {
      return colmailinglist
    }

    function getcoltemplemail() {
      return coltemplemail
    }

    function getcolopzemail() {
      return colopzemail
    }

    async function importMailinglist() {
      myloadingImport.value = true
      errimport.value = false
      okimport.value = false

      const mydata = {
        strdataemail: mailinglist_imported,
        locale: tools.getLocale(),
        settomailchimp: getValDb('MAILCHIMP_ON', true, false)
      }

      const res: any = await userStore.importemail(mydata)

      let esistiti = ''
      if (res.data.numalreadyexisted > 0)
        esistiti = ` ${res.data.numalreadyexisted} email già esistenti`

      if (res.data.numadded > 0) {
        okimport.value = true
        myrisimport.value = `(${res.data.numadded} / ${res.data.numtot}) email importate !` + esistiti
      } else {
        errimport.value = true
        myrisimport.value = `Nessuna email importata (trovate ${res.data.numtot})` + esistiti
      }

      myloadingImport.value = false
    }

    function progresslabsubscribed() {
      return (percsubscribed.value * 100).toFixed(0) + '%'
    }

    function percsent(next: any) {
      let rec = newsstate.value.lastnewstosent!
      if (next)
        rec = newsstate.value.nextnewstosent!

      let val = 0
      if (rec) {
        val = rec.numemail_sent! / rec.numemail_tot! * 100
        if (val > 100)
          val = 100
      }
      return val.toFixed(2)
    }


    onMounted(mounted)

    return {
      colmsg_templates,
      DisableNewsletter,
      EnableNewsletter,
      emailtest,
      sendNewsletterTest,
      changetabnews,
      getcolnewstosent,
      getcolmailinglist,
      getcoltemplemail,
      getcolopzemail,
      importMailinglist,
      progresslabsubscribed,
      percsent,
      myloadingload,
      myloading,
      myloadingprew,
      myloading2,
      myloading3,
      myloading4,
      myloadingState,
      myloadingImport,
      mailinglist_imported,
      myrisimport,
      errimport,
      okimport,
      newsstate,
      percsubscribed,
      polling,
      tab,
      emailtextheader,
      eseguipolling,
      createNewsletter,
      tools,
      toolsext,
      costanti,
      fieldsTable,
      globalStore,
    }
  }
})
