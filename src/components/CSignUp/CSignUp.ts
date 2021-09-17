import { tools } from '@store/Modules/tools'

import { ISignupOptions } from 'model'
import { validations, TSignup } from './CSignUp-validate'

import { Logo } from '../../components/logo'

// import 'vue-country-code/dist/vue-country-code.css'

import { CTitleBanner } from '../CTitleBanner'
import { computed, defineComponent, reactive, ref } from 'vue'
import { CSignIn } from '@/components/CSignIn'
import { useQuasar } from 'quasar'
import { useI18n } from '@/boot/i18n'
import { DefaultProfile, useUserStore } from '@store/UserStore'
import useValidate from '@vuelidate/core'
import useVuelidate from '@vuelidate/core'

import 'vue3-tel-input/dist/vue3-tel-input.css'


// import {Loading, QSpinnerFacebook, QSpinnerGears} from 'quasar'

export default defineComponent({
  name: 'CSignUp',
  components: { Logo, CTitleBanner },
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
    shownationality: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()

    const countryname = ref('')
    const iamadult = ref(false)
    const duplicate_email = ref(false)
    const duplicate_username = ref(false)

    const signup = reactive(<ISignupOptions> {
      email: process.env.TEST_EMAIL || '',
      username: process.env.TEST_USERNAME || '',
      name: process.env.TEST_NAME || '',
      surname: process.env.TEST_SURNAME || '',
      password: process.env.TEST_PASSWORD || '',
      repeatPassword: process.env.TEST_PASSWORD || '',
      terms: !process.env.PROD,
      profile: DefaultProfile,
      aportador_solidario: '',
    })

    // @ts-ignore
    const v$ = useVuelidate(validations, signup)

    function allowSubmit() {

      let error = v$.value.$error || v$.value.$invalid

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

      signup.name = tools.CapitalizeAllWords(signup.name)
      signup.surname = tools.CapitalizeAllWords(signup.surname)

      $q.loading.show({ message: t('reg.incorso') })

      console.log(signup)
      return userStore.signup(tools.clone(signup))
        .then((ris: any) => {
          if (tools.SignUpcheckErrors($q, ris.code, ris.msg))
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

    function selectcountry({ name, iso2, dialCode }: { name: string, iso2: string, dialCode: string }) {
      // console.log(name, iso2, dialCode)
      signup.profile.nationality = iso2
      countryname.value = name
    }

    function inputUsername(value: string) {
      signup.username = value.trim()
    }

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
      allowSubmit,
    }
  },
})
