import { defineComponent, PropType, ref } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'

import { validationMixin } from 'vuelidate'
import { Logo } from '../logo'
import { static_data } from '../../db/static_data'
import { tools } from '@store/Modules/tools'
import { ISigninOptions } from 'model'
import { serv_constants } from '@store/Modules/serv_constants'
import { useRouter } from 'vue-router'

// import { useFormChild } from 'quasar'

export default defineComponent({
  name: 'CSignIn',
  components: { Logo },
  props: {
    showregbutt: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()
    const $router = useRouter()
    const globalStore = useGlobalStore()

    const refUsername = ref(<any>null)
    const refPassword = ref(null)

    const loading = ref(false)

    const myForm = ref(null)

    const iswaitingforRes = ref(false)
    const signin = ref(<ISigninOptions>{
      username: process.env.TEST_USERNAME || '',
      password: process.env.TEST_PASSWORD || '',
    })

    function onReset() {
      signin.value.username = ''
      signin.value.password = ''
    }


    function created() {
      onReset()

      if (userStore.resStatus === serv_constants.RIS_CODE__HTTP_FORBIDDEN_INVALID_TOKEN) {
        emit('showNotif', 'fetch.error_doppiologin')
      }

    }

    function getlinkforgetpwd() {
      return '/requestresetpwd'
    }

    function errorMsg(cosa: string, item: any) {
      /*
      try {
        if (!item.$error) {
          return ''
        }
        if (item.$params.email && !item.email) {
          return t('reg.err.email')
        }

        if (!item.required) {
          return t('reg.err.required')
        }
        if (!item.minLength) {
          return t('reg.err.atleast') + ' ${item.$params.minLength.min} ' + t('reg.err.char')
        }
        if (!item.maxLength) {
          return t('reg.err.notmore') + ` ${item.$params.maxLength.max} ` + t('reg.err.char')
        }
        return ''
      } catch (err) {
        // console.log("ERR : " + error);
      }
      */

    }

    function isError() {
      if (refUsername.value) {
        // @ts-ignore
        return refUsername.value.hasError
      }
    }

    function onSubmit() {

      if (refUsername.value) {
        refUsername.value.validate()
      }

      // console.log('submit LOGIN')

      signin.value.username = tools.removespaces(signin.value.username)

      // $v.signin.$touch()

      if (isError()) {
        emit('showNotif', 'reg.err.errore_generico')
        return
      }

      emit('loginInCorso')

      // disable Button Login:
      iswaitingforRes.value = true

      if (process.env.DEBUG) {
        // console.log('signin', signin)
      }

      userStore.signin($router, signin.value)
        .then((riscode: number) => {
          console.log('signin FINITO CALL: riscode=', riscode)
          if (riscode === tools.OK) {
            // router.push('/signin')
          }
          return riscode
        })
        .then((riscode: number) => {
          if (process.env.DEBUG) {
            // console.log('  riscode(1) =', riscode)
          }

          return riscode
        })
        .then((riscode: number) => {
          if (riscode === tools.OK) {
            // console.log('  -> eseguo emit(loginOk)')

            emit('loginOk')

            // GlobalStore.actions.createPushSubscription()
            //   .then((rissub) => {
            //     // ...
            //   })
            //   .catch((e) => {
            //     console.log('ERROR Subscription = ' + e)
            //   })
          } else {
            emit('checkErrors', riscode)
          }

          iswaitingforRes.value = false

        })
        .catch((err: any) => {
          // console.log('ERROR SIGNIN = ' + error)

          emit('checkErrors', err)
        })
      // console.log('   END submit')
    }

    created()

    return {
      static_data,
      refUsername,
      onReset,
      onSubmit,
      errorMsg,
      signin,
      getlinkforgetpwd,
      myForm,
    }
  },
})
