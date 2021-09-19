import { serv_constants } from '@store/Modules/serv_constants'

import { tools } from '@store/Modules/tools'
import { Logo } from '../../components/logo'
import { CTitleBanner } from '../../components/CTitleBanner'

import { defineComponent, reactive, ref } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'
import useVuelidate from '@vuelidate/core'
import { validations } from '@src/views/requestresetpwd/request-resetpwd-validate'


export default defineComponent({
  name: 'RequestResetPwd',
  components: { Logo, CTitleBanner },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()
    const globalStore = useGlobalStore()

    const emailsent = ref(false)
    const form = reactive({
      email: '',
      tokenforgot: ''
    })

    // @ts-ignore
    const v$ = useVuelidate(validations, form)

    const emailRef = ref(null)

    function emailinviata() {
      return emailsent.value
    }

    function submit() {
      console.log('submit')
      // v$.form.touch()

      /*if (v$.form.$error) {
        tools.showNotif($q, t('reg.err.errore_generico'))
        return
      }*/

      // @ts-ignore
      emailRef.value!.validate()

      // @ts-ignore
      if (emailRef.value!.hasError) {
        // form has error
        tools.showNotif($q, t('reg.err.errore_generico'))
        return
      }

      $q.loading.show({ message: t('reset.incorso') })

      form.tokenforgot = ''

      userStore.requestpwd(form)
        .then((ris: any) => {
          if (ris.code === serv_constants.RIS_CODE_OK)
            emailsent.value = true
          else if (ris.code === serv_constants.RIS_CODE_EMAIL_NOT_EXIST)
            tools.showNegativeNotif($q, t('reg.err.email_not_exist'))
          $q.loading.hide()
        }).catch((err: any) => {
        console.log('ERROR = ' + err.error)
        $q.loading.hide()
      })

    }

    return {
      emailinviata,
      submit,
      form,
      emailRef,
      v$,
      tools,
    }
  }
})

