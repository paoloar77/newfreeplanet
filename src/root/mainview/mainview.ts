import {
  defineComponent, ref, computed,
} from 'vue'

import { tools } from '@src/store/Modules/tools'
import { CSkill } from '@/components/CSkill'
import { CMainView } from '@/components/CMainView'
import { CDashboard } from '@/components/CDashboard'
import { CChartMap } from '@src/components/CChartMap'
import { CUserNonVerif } from '@/components/CUserNonVerif'
import { CCopyBtn } from '@/components/CCopyBtn'
import { CMapsEsempio } from '@src/components/CMapsEsempio'
import { CVerifyEmail } from '@src/components/CVerifyEmail'
import { CVerifyTelegram } from '@src/components/CVerifyTelegram'
import { useGlobalStore } from '@store/globalStore'
import { useUserStore } from '@store/UserStore'
import { static_data } from '@/db/static_data'
import MixinBase from '@/mixins/mixin-base'
import MixinUsers from '@/mixins/mixin-users'


export default defineComponent({
  name: 'mainview',
  components: { CSkill, CChartMap, CMapsEsempio, CVerifyEmail, CVerifyTelegram, CDashboard, CUserNonVerif, CMainView, CCopyBtn },
  setup() {
    const globalStore = useGlobalStore()
    const userStore = useUserStore()
    const { getValDb } = MixinBase()
    const { isEmailVerified, TelegVerificato } = MixinUsers()

    const { getRefLink } = MixinUsers()

    function TelegCode() {
      return userStore.my.profile.teleg_checkcode
    }

    function openrighttoolbar() {
      globalStore.rightDrawerOpen = true
    }

    function isLogged() {
      return userStore.isLogged
    }
    function isUserOk() {
      return userStore.isUserOk()
    }

    function getLinkBotTelegram(): string {
      if ( tools.isTest() && !process.env.DEV) {
        return getValDb('TELEG_BOT_LINK_TEST', false)
      } else{
        return getValDb('TELEG_BOT_LINK', false)
      }
    }

    return {
      tools,
      static_data,
      isEmailVerified,
      TelegCode,
      TelegVerificato,
      isLogged,
      openrighttoolbar,
      isUserOk,
      getLinkBotTelegram,
      getRefLink,
      userStore,
    }
  },
})
