import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { BannerCookies } from '@components'
import { useI18n } from '@src/boot/i18n'
import { useGlobalStore } from './store/globalStore'
import { useUserStore } from './store/UserStore'
import { Header } from './components/Header'

export default {
  components: {
    appHeader: Header,
    BannerCookies, /* , CPreloadImages */
  },
  setup() {
    const route = useRoute()

    const backgroundColor = 'whitesmoke'
    const $q = useQuasar()
    const userStore = useUserStore()
    const globalStore = useGlobalStore()
    const { t } = useI18n();

    const listaRoutingNoLogin = ['/vreg?', '/offline']

    function meta() {
      return {
        title: t('msg.myAppName'),
        keywords: [{ name: 'keywords', content: 'associazione shen, centro olistico lugo' },
          { name: 'description', content: t('msg.myAppDescription') }],
        //   equiv: { 'http-equiv': 'Content-Type', 'content': 'text/html; charset=UTF-8' }
      }
    }

    function created() {
      if (process.env.DEV) {
        console.info('SESSIONE IN SVILUPPO ! (DEV)')
        // console.info(process.env)
      }
      if (process.env.PROD) {
        console.info('SESSIONE IN PRODUZIONE!')
        // console.info(process.env)
      }

      // Make autologin only if some routing

      // console.log('window.location.href', window.location.href)

      let chiamaautologin = true
      listaRoutingNoLogin.forEach((mystr) => {
        if (window.location.href.includes(mystr)) {
          chiamaautologin = false
        }
      })

      if (chiamaautologin) {
        // console.log('CHIAMA autologin_FromLocalStorage')
        userStore.autologin_FromLocalStorage()
          .then((loadstorage) => {
            if (loadstorage) {

              /*
              if (toolsext.getLocale() !== '') {
                // console.log('SETLOCALE :', this.$i18n.locale)
                this.$i18n.locale = toolsext.getLocale()    // Set Lang
              } else {
                userStore.setlang(this.$i18n.locale)
              }
              */

              // console.log('lang CARICATO:', this.$i18n.locale)

              // ++Todo: conv: globalroutines(this, 'loadapp', '')
              // this.$router.replace('/')

              // Create Subscription to Push Notification
              // ++Todo: conv: globalStore.createPushSubscription()
            }
          })
      }

      // Calling the Server for updates ?
      // Check the verified_email
    }

    created()

    return {

    }
  },
}
