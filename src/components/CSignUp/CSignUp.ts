import { tools } from '@store/Modules/tools'

import { ISignupOptions } from 'model'

import { Logo } from '@/components/logo'

// import 'vue-country-code/dist/vue-country-code.css'

import { CTitleBanner } from '../CTitleBanner'
import { PagePolicy } from '../PagePolicy'
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { CSignIn } from '@/components/CSignIn'
import { useQuasar } from 'quasar'
import { useI18n } from '@/boot/i18n'
import { DefaultProfile, useUserStore } from '@store/UserStore'
import useValidate from '@vuelidate/core'
import useVuelidate from '@vuelidate/core'

import { minLength, required, sameAs } from '@vuelidate/validators'

// import { ValidationRuleset } from 'vuelidate'
import { complexity, complexityUser, registereduser, aportadorexist } from '../../validation'

// import 'vue3-tel-input/dist/vue3-tel-input.css'
import { useRoute, useRouter } from 'vue-router'
import { static_data } from '@/db/static_data'
import { useGlobalStore } from '@store/globalStore'

// import {Loading, QSpinnerFacebook, QSpinnerGears} from 'quasar'

export default defineComponent({
  name: 'CSignUp',
  components: { Logo, CTitleBanner, PagePolicy },
  props: {
    showadultcheck: {
      type: Boolean,
      required: false,
      default: false,
    },
    showcell: {
      type: Boolean,
      required: false,
      default: false,
    },
    showaportador: {
      type: Boolean,
      required: false,
      default: false,
    },
    shownationality: {
      type: Boolean,
      required: false,
      default: false,
    },
    show_namesurname: {
      type: Boolean,
      required: false,
      default: true,
    },
    need_Telegram: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()
    const $route = useRoute()
    const $router = useRouter()

    const countryname = ref('')
    const iamadult = ref(false)
    const duplicate_email = ref(false)
    const duplicate_username = ref(false)
    const visureg = ref(false)
    const showpolicy = ref(false)

    const globalStore = useGlobalStore()

    const signup = reactive(<ISignupOptions>{
      email: process.env.TEST_EMAIL || '',
      username: process.env.TEST_USERNAME || '',
      name: static_data.functionality.SHOW_NAMESURNAME ? (process.env.TEST_NAME || '') : '',
      surname: static_data.functionality.SHOW_NAMESURNAME ? (process.env.TEST_SURNAME || '') : '',
      password: process.env.TEST_PASSWORD || '',
      repeatPassword: process.env.TEST_PASSWORD || '',
      terms: !process.env.PROD,
      profile: DefaultProfile,
      aportador_solidario: '',
    })

    const validations: any = computed(() => {
      let valid: any = {
        repeatPassword: {
          required,
          repeatPassword: sameAs(signup.password),
        },
        password: {
          required,
          minLength: minLength(8),
          complexity,
        },
        username: {
          required,
          minLength: minLength(6),
          complexityUser,
          registereduser,
        },
        terms: {
          required,
        },
        aportador_solidario: {
          aportadorexist,
          required
        }
      }

      if (props.show_namesurname) {
        valid.name = {
          required,
        }
        valid.surname = {
          required,
        }
      }

      return valid
    })

    // @ts-ignore
    const v$ = useVuelidate(validations, signup)

    const invited = ref($route.params.invited)
    const usernameteleg = ref($route.params.usernameteleg)
    const idteleg = ref($route.params.idteleg)

    watch(() => invited, (to: any, from: any) => {
      if (props.showaportador) {
        console.log('changeaportador', $route.params.invited)
        if (!signup.aportador_solidario) {
          if ($route.params.invited) {
              // @ts-ignore
              signup.aportador_solidario = $route.params.invited
            }
        }
      }
    })

    function allowSubmit() {

      let error = v$.value.$error || v$.value.$invalid || globalStore.serverError

      if (props.showadultcheck)
        error = error || !iamadult.value

      if (props.showcell) {
        if (signup.profile)
          error = error || signup.profile.cell!.length <= 6
        else
          error = true
      }

      return !error
    }

    function env() {
      return process.env
    }


    function changeemail() {
      signup.email = tools.removespaces(signup.email!)
      signup.email = signup.email.toLowerCase()
      emit('update:value', signup.email)
    }

    function changeusername(value: string) {
      signup.username = tools.removespaces(signup.username)
      emit('update:value', signup.username)
    }

    function submitOk() {
      v$.value.$touch()

      signup.email = tools.removespaces(signup.email!)
      signup.email = signup.email.toLowerCase()
      signup.username = tools.removespaces(signup.username)

      duplicate_email.value = false
      duplicate_username.value = false

      if (!signup.terms) {
        tools.showNotif($q, t('reg.err.terms'))
        return
      }

      /*if (v$.signup.$error) {
        tools.showNotif($q, t('reg.err.errore_generico'))
        return
      } */

      if (signup.name) {
        signup.name = tools.CapitalizeAllWords(signup.name)
        signup.surname = tools.CapitalizeAllWords(signup.surname)
      }

      $q.loading.show({ message: t('reg.incorso') })

      console.log(signup)
      return userStore.signup(tools.clone(signup))
        .then((ris: any) => {
          if (tools.SignUpcheckErrors($q, $router, ris.code, ris.msg))
            $q.loading.hide()
        }).catch((error: string) => {
          console.log('ERROR = ' + error)
          $q.loading.hide()
        })

    }

    function intcode_change(coderec: any) {
      // console.log('intcode', coderec)
      if (signup.profile) {
        signup.profile.intcode_cell = '+' + coderec.dialCode
        signup.profile.iso2_cell = coderec.iso2
      }
    }

    function selectcountry({ name, iso2, dialCode }: {name: string, iso2: string, dialCode: string}) {
      // console.log(name, iso2, dialCode)
      signup.profile.nationality = iso2
      countryname.value = name
    }

    function inputUsername(value: string) {
      signup.username = value.trim()
    }

    function created() {

      console.log('$route.params', $route.params)

      signup.aportador_solidario = !!$route.params.invited ? $route.params.invited.toString() : ''
      signup.username = !!$route.params.usernameteleg ? $route.params.usernameteleg.toString() : ''
      signup.profile.username_telegram = signup.username
      if (!!$route.params.idteleg) {
        signup.profile.teleg_id = $route.params.idteleg ? parseInt($route.params.idteleg.toString()) : 0
      }

      console.log('1) aportador_solidario', signup.aportador_solidario)

      if (!signup.aportador_solidario)
        signup.aportador_solidario = tools.getCookie(tools.APORTADOR_SOLIDARIO, signup.aportador_solidario)

      if (!signup.aportador_solidario || signup.aportador_solidario === 'undefined') {
        signup.aportador_solidario = tools.APORTADOR_NONE
      }

      console.log('signup.aportador_solidario', signup.aportador_solidario)

      if (!signup.username || !signup.profile.teleg_id) {
        window.location.href = tools.getLinkBotTelegram()
      }
    }

    function myRuleEmail(val: string) {

      return new Promise((resolve, reject) => {
        // call
        //  resolve(true)
        //     --> content is valid
        //  resolve(false)
        //     --> content is NOT valid, no error message
        //  resolve(error_message)
        //     --> content is NOT valid, we have error message
        tools.registeredemail(val).then((ris) => {
          let risp = !!ris || t('reg.err.duplicate_email')
          if (ris) {
            risp = tools.isEmail(val) || t('reg.err.invalid_email')
          }
          resolve(risp)

        })

        // calling reject(...) will also mark the input
        // as having an error, but there will not be any
        // error message displayed below the input
        // (only in browser console)
      })

    }

    created()

    return {
      changeemail,
      changeusername,
      submitOk,
      inputUsername,
      selectcountry,
      intcode_change,
      tools,
      countryname,
      signup,
      iamadult,
      v$,
      t,
      allowSubmit,
      myRuleEmail,
      visureg,
      showpolicy,
    }
  },
})
