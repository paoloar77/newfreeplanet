import { defineComponent } from 'vue'
import { CSignIn } from '../../components/CSignIn'
import { tools } from '@store/Modules/tools'
import { useQuasar } from 'quasar'
import { useI18n } from '@/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useRoute, useRouter } from 'vue-router'


export default defineComponent({
  name: 'CSigninNoreg',
  components: { CSignIn },
  props: {
    showregbutt: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const $q = useQuasar()
    const $router = useRouter()
    const route = useRoute()
    const { t } = useI18n()

    console.log('SETUP - CSigninNoreg')

    function loginOk() {
      tools.loginOk($router, route, $q, true)
    }

    function loginInCorso() {
      tools.loginInCorso($q)
    }

    function checkErrors(riscode: number) {
      tools.SignIncheckErrors($q, $router, route, riscode, true)
    }

    function showNotif(msgcode: string) {
      tools.showNotif($q, t(msgcode))
    }

    return {
      loginOk,
      loginInCorso,
      checkErrors,
      showNotif,
    }
  },
})
