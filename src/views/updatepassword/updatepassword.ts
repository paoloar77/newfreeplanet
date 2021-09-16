import { serv_constants } from '@store/Modules/serv_constants'

import { tools } from '@store/Modules/tools'
import { Logo } from '../../components/logo'
import { CTitleBanner } from '../../components/CTitleBanner'
import { validations } from './request-resetpwd-validate'

import { defineComponent, ref, reactive } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'
import useVuelidate from '@vuelidate/core'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Updatepassword',
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
    const $router = useRouter()
    const $route = useRoute()

    const emailsent = ref(false)
    const form = reactive({
      password: '',
      repeatPassword: '',
      tokenforgot: '',
      email: '',
      idapp: ''
    })

    // @ts-ignore
    const v$ = useVuelidate(validations, form)

    function created() {
      // load()
    }


    function submit() {
      v$.value.$touch()

      if (v$.value.$error) {
        tools.showNotif($q, t('reg.err.errore_generico'))
        return
      }

      $q.loading.show({ message: t('reset.incorso') })

      // console.log('$route.query', $route.query)
      if ($route.query.tokenforgot) {
        form.tokenforgot = $route.query.tokenforgot.toString()
      }
      if ($route.query.email) {
        form.email = $route.query.email.toString()
      }
      form.idapp = process.env.APP_ID ? process.env.APP_ID : '1'

      console.log(form)
      userStore.resetpwd(form)
        .then((ris) => {
          console.log('ris', ris)
          if (ris.code === serv_constants.RIS_CODE_OK)
            $router.push('/signin')
          else if (ris.code === serv_constants.RIS_CODE_TOKEN_RESETPASSWORD_NOT_FOUND)
            tools.showNegativeNotif($q, t('reset.token_scaduto'))
          else
            tools.showNegativeNotif($q, t('fetch.errore_server'))

          $q.loading.hide()
        }).catch(error => {
        console.log('ERROR = ' + error)
        $q.loading.hide()
      })

    }

    function errorMsg(cosa: string, item: any) {
      try {
        if (!item.$error) {
          return ''
        }
        // console.log('errorMsg', cosa, item)
        if (item.$params.email && !item.email) {
          return t('reg.err.email')
        }

        if (cosa === 'repeatpassword') {
          if (!item.sameAsPassword) {
            return t('reg.err.sameaspassword')
          }
        }

        // console.log('item', item)

        if (item.minLength !== undefined) {
          if (!item.minLength) {
            return t('reg.err.atleast') + ` ${item.$params.minLength.min} ` + t('reg.err.char')
          }
        }
        if (item.complexity !== undefined) {
          if (!item.complexity) {
            return t('reg.err.complexity')
          }
        }
// if (!item.maxLength) { return t('reg.err.notmore') + ` ${item.$params.maxLength.max} ` + t('reg.err.char') }

        if (item.required !== undefined) {
          if (!item.required) {
            return t('reg.err.required')
          }
        }

        // console.log('    ....avanti')
        if (cosa === 'email') {
          // console.log("EMAIL " + item.isUnique);
          // console.log(item);
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
      form,
      emailsent,
      submit,
      errorMsg,
    }
  }
})
