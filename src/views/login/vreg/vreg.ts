import { defineComponent, ref } from 'vue'

import { serv_constants } from '../../../store/Modules/serv_constants'

import './vreg.scss'
import { ICallResult, ILinkReg } from '../../../model/other'
import { CSigninNoreg } from '../../../components/CSigninNoreg'
import { useQuasar } from 'quasar'
import { useI18n } from '@src/boot/i18n'
import { useGlobalStore } from '@store/globalStore'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@store/UserStore'
import { tools } from '@store/Modules/tools'


export default defineComponent({
  name: 'Vreg',
  components: { CSigninNoreg },

  setup(props) {
    const $q = useQuasar()
    const route = useRoute()
    const $router = useRouter()
    const { t } = useI18n()
    const globalStore = useGlobalStore()
    const userStore = useUserStore()

    const risultato = ref('---')
    const riscode = ref(0)

    function myrisultato() {
      return risultato
    }

    function giaverificato() {
      return riscode.value !== serv_constants.RIS_CODE_EMAIL_VERIFIED
    }

    function verificatook() {
      return riscode.value === serv_constants.RIS_CODE_EMAIL_VERIFIED
    }

    function load() {
      // console.log('load')
      let param: ILinkReg
      param = { idlink: route.query.idlink!.toString() }
      console.log('idlink = ', param)
      return userStore.vreg(param)
        .then((ris: any) => {
          riscode.value = ris.code
          risultato.value = ris.msg
          console.log('RIS = ', ris)

          if (verificatook()) {
            setTimeout(() => {
              $router.replace('/signin')
            }, 2000)
          }

        }).catch((err: any) => {
          console.log('ERR = ' + err)
        })
    }

    load()

    return {
      tools,
      verificatook,
      giaverificato,
      myrisultato,
    }
  },

})
