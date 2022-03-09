import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { BannerCookies } from '@/components/BannerCookies'
import { useI18n } from '@src/boot/i18n'
import { useGlobalStore } from '@store/globalStore'
import { useUserStore } from '@store/UserStore'
import { Header } from '@/components/Header'
import { MyFooter } from '@/components/MyFooter'
import { CFirstPageApp } from '@/components/CFirstPageApp'
import { computed } from 'vue'
import { CProvaPao } from '@/components/CProvaPao'
import { tools } from '@store/Modules/tools'

export default {
  components: {
    appHeader: Header,
    appFooter: MyFooter,
    CFirstPageApp,
    CProvaPao,
    BannerCookies, /* , CPreloadImages */
  },
  setup() {
    const route = useRoute()

    const backgroundColor = 'whitesmoke'
    const $q = useQuasar()
    const userStore = useUserStore()
    const $router = useRouter()
    const globalStore = useGlobalStore()
    const { t } = useI18n();

    const finishLoading = computed(() => globalStore.finishLoading)

    const listaRoutingNoLogin = ['/vreg?', '/offline']

    function meta() {
      return {
        title: t('msg.myAppName'),
        keywords: [{ name: 'keywords', content: 'associazione shen, centro olistico lugo' },
          { name: 'description', content: t('msg.myAppDescription') }],
        //   equiv: { 'http-equiv': 'Content-Type', 'content': 'text/html; charset=UTF-8' }
      }
    }

    async function created() {
      try {
        if (process.env.DEV) {
          console.info('SESSIONE IN SVILUPPO ! (DEV)')
          // console.info(process.env)
        }
        if ( tools.isTest() && !process.env.DEV) {
          console.info('SESSIONE IN TEST ! (TEST)')
        } else {
          if (process.env.PROD) {
            console.info('SESSIONE IN PRODUZIONE!')
            // console.info(process.env)
          }
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
          await userStore.autologin_FromLocalStorage($router, $q)
        } else {
          globalStore.finishLoading = true
        }
      } catch (e) {
        globalStore.finishLoading = true
      }

      // Calling the Server for updates ?
      // Check the verified_email
    }

    created()

    return {
      finishLoading,
    }
  },
}
