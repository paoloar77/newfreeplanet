import {
  defineComponent, toRef,
} from 'vue'

import { useQuasar } from 'quasar'
import { useI18n } from '@src/boot/i18n'
import { Api } from '@api'
import { serv_constants } from '@store/Modules/serv_constants'
import { toolsext } from '@src/store/Modules/toolsext'

export default defineComponent({
  name: 'FormNewsletter',
  props: {
    name: {
      required: false,
      type: String,
      default: '',
    },
    surname: {
      required: false,
      type: String,
      default: '',
    },
    email: {
      required: false,
      type: String,
      default: '',
    },
    accept: {
      required: false,
      type: Boolean,
      default: false,
    },
    idwebsite: {
      required: false,
      type: String,
      default: '',
    },
    locale: {
      required: false,
      type: String,
      default: '',
    },
  },
  setup(props) {
    const $q = useQuasar()
    const { t } = useI18n();
    const accept = toRef(props, 'accept')
    const name = toRef(props, 'name')
    const surname = toRef(props, 'surname')
    const email = toRef(props, 'email')
    const idwebsite = toRef(props, 'idwebsite')
    const locale = toRef(props, 'locale')

    const onSubmit = async function a2() {
      if (!accept.value) {
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: t('newsletter.license'),
        })
        return null
      }
      const usertosend = {
        email: email.value,
        firstName: name.value,
        lastName: surname.value,
        idwebsite: idwebsite.value,
        locale: locale.value,
        settomailchimp: toolsext.getValDb('MAILCHIMP_ON', true, false),
      }
      console.log(usertosend)

      return Api.SendReq('/news/signup', 'POST', usertosend, false)
        .then((res) => {
          // console.log('res', res)
          if (res.data.code === serv_constants.RIS_SUBSCRIBED_OK) {
            $q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              // message: t('newsletter.submitted')
              message: res.data.msg,
            })
          } else if (res.data.code === serv_constants.RIS_SUBSCRIBED_ALREADYEXIST) {
            $q.notify({
              color: 'orange-4',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              // message: t('newsletter.submitted')
              message: res.data.msg,
            })
          } else {
            $q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'fas fa-exclamation-triangle',
              message: res.data.msg,
            })
          }
        })
        .catch((error) => {
          console.error(error)
          // UserStore.mutations.setErrorCatch(error)
          return false
        })
    }

    function onReset() {
      name.value = ''
      surname.value = ''
      email.value = ''
      accept.value = false
    }

    return {
      onSubmit,
      onReset,
    }
  },

})
