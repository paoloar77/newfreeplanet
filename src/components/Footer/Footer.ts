import {
  defineComponent,
} from 'vue'

import { tools } from '@src/store/Modules/tools'
import { static_data } from '@src/db/static_data'

import { useQuasar } from 'quasar'
import { useGlobalStore } from '@store/globalStore'
import { Logo } from '@/components/logo'
import { useI18n } from '@src/boot/i18n'
import { toolsext } from '@store/Modules/toolsext'
import { FormNewsletter } from '@/components/FormNewsletter'
import { CFacebookFrame } from '@/components/CFacebookFrame'

import MixinBase from '../../mixins/mixin-base'

export default defineComponent({
  name: 'Footer',
  components: { Logo, FormNewsletter, CFacebookFrame },

  setup() {
    const $q = useQuasar()
    const globalStore = useGlobalStore()

    const { getarrValDb, getValDb } = MixinBase()

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
      return tools.getHttpForWhatsapp(this.Whatsapp_Cell())
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
      tools,
      toolsext,
      getarrValDb,
      getValDb
    }
  },
})
