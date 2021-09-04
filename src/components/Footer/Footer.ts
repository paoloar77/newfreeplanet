import {
  defineComponent,
} from 'vue'

import { tools } from '@src/store/Modules/tools'
import { static_data } from '@src/db/static_data'

import { useQuasar } from 'quasar'
import { useGlobalStore } from '@store/globalStore'
import { Logo } from '../logo'
import { useI18n } from '@src/boot/i18n'
import { FormNewsletter } from '@components'

export default defineComponent({
  name: 'Footer',
  components: { Logo, FormNewsletter },

  setup() {
    const $q = useQuasar()
    const { t } = useI18n()
    const globalStore = useGlobalStore()

    console.log('Footer - INIT')

    function TelegramSupport() {
      return globalStore.getValueSettingsByKey('TELEGRAM_SUPPORT', false)
    }

    function Whatsapp_Cell() {
      return globalStore.getValueSettingsByKey('WHATSAPP_CELL', false)
    }

    function Telegram_UsernameHttp() {
      return tools.getHttpForTelegram(globalStore.getValueSettingsByKey('TELEGRAM_USERNAME', false))
    }

    function FBPage() {
      const fb = globalStore.getValueSettingsByKey('URL_FACEBOOK', false)
      return fb
    }

    function InstagramPage() {
      return globalStore.getValueSettingsByKey('URL_INSTAGRAM', false)
    }

    function TwitterPage() {
      return globalStore.getValueSettingsByKey('URL_TWITTER', false)
    }

    function ChatWhatsapp() {
      // @ts-ignore
      return tools.getHttpForWhatsapp(this.Whatsapp_Cell)
    }

    return {
      TelegramSupport,
      InstagramPage,
      Whatsapp_Cell,
      TwitterPage,
      ChatWhatsapp,
      FBPage,
      Telegram_UsernameHttp,
      static_data,
      t,
    }
  },
})
