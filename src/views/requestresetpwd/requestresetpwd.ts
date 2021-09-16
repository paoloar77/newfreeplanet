import { serv_constants } from '@store/Modules/serv_constants'

import { tools } from '@store/Modules/tools'
import { Logo } from '../../components/logo'
import { CTitleBanner } from '../../components/CTitleBanner'

import { defineComponent, ref } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'

import useValidate from '@vuelidate/core'

// https://learnvue.co/2020/01/getting-smart-with-vue-form-validation-vuelidate-tutorial/

export default defineComponent({
  name: 'RequestResetPwd',
  props: {
    mystr: {
      type: String,
      required: true,
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
  components: { Logo, CTitleBanner },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()
    const globalStore = useGlobalStore()

    const v$ = useValidate()

    const emailsent = ref(false)
    const form = ref({
      email: '',
      tokenforgot: ''
    })

    function emailinviata() {
      return emailsent.value
    }

    function submit() {
      // v$.form.touch()

      /*if (v$.form.$error) {
        tools.showNotif($q, t('reg.err.errore_generico'))
        return
      }*/

      $q.loading.show({ message: t('reset.incorso') })

      form.value.tokenforgot = ''

      console.log(form.value)
      userStore.requestpwd(form.value)
        .then((ris: any) => {
          if (ris.code === serv_constants.RIS_CODE_OK)
            emailsent.value = true
          else if (ris.code === serv_constants.RIS_CODE_EMAIL_NOT_EXIST)
            tools.showNegativeNotif($q, t('reg.err.email_not_exist'))
          $q.loading.hide()
        }).catch((err) => {
        console.log('ERROR = ' + err.error)
        $q.loading.hide()
      })

    }

    function errorMsg(cosa: string, item: any) {
      try {
        if (!item.$error) {
          return ''
        }
        if (item.$params.email && !item.email) {
          return t('reg.err.email')
        }

        if (item.required !== undefined) {
          if (!item.required) {
            return t('reg.err.required')
          }
        }

        if (cosa === 'email') {
          if (!item.isUnique) {
            return t('reg.err.duplicate_email')
          }
        }

        return ''
      } catch (error) {
        // console.log("ERR : " + error);
      }
    }


    return {
      emailinviata,
      errorMsg,
      submit,
      form,
      v$,
    }
  }
})

