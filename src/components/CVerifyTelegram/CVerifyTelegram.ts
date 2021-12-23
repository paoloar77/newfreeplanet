import { defineComponent, ref, computed } from 'vue'

import MixinBase from '@src/mixins/mixin-base'
import { CCopyBtn } from '../CCopyBtn'
import { useUserStore } from '@store/UserStore'
import { useQuasar } from 'quasar'
import { useI18n } from '@/boot/i18n'

export default defineComponent({
  name: 'CVerifyTelegram',
  components: { CCopyBtn },
  props: {},
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()

    const userStore = useUserStore()

    const { setValDb, getValDb } = MixinBase()

    function TelegCode() {
      if (userStore.my.profile) {
        return userStore.my.profile.teleg_checkcode
      }else {
        return 0
      }
    }

    function TelegVerificato(): boolean {
      return userStore.my.profile ? userStore.my.profile.teleg_id! > 0 : false
    }

    function getLinkBotTelegram(): string {
      return getValDb('TELEG_BOT_LINK', false)
    }
    function getBotNameTelegram() {
      return t('ws.botname');
    }

    function isEmailVerified(): boolean {
      return userStore.my.verified_email!
    }

    return {
      TelegCode,
      TelegVerificato,
      getLinkBotTelegram,
      isEmailVerified,
      getBotNameTelegram,
    }
  }
})

