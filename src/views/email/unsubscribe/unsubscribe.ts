import { serv_constants } from '@store/Modules/serv_constants'

import { tools } from '@store/Modules/tools'

import { defineComponent, ref } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Unsubscribe',
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
  components: {},
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()
    const $route = useRoute()

    const risultato = ref('...')
    const riscode = ref(0)

    function disiscritto() {
      return riscode.value === serv_constants.RIS_UNSUBSCRIBED_OK
    }

    function errore() {
      return riscode.value !== serv_constants.RIS_UNSUBSCRIBED_OK
    }

    function email() {
      return $route.query.email
    }

    function load() {
      // console.log('load')
      let param
      param = { em: $route.query.em, mc: $route.query.mc, locale: tools.getLocale() }
      console.log('idlink = ', param)
      return userStore.unsubscribe(param)
        .then((ris: any) => {
          riscode.value = ris.code
          risultato.value = ris.msg

        }).catch((err) => {
          console.log('ERR = ' + err)
        })
    }

    load()

    return {
      disiscritto,
      errore,
      email,
      risultato,
    }
  }
})
