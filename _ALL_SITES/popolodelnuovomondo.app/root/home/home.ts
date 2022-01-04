import {
  defineComponent, ref, computed,
} from 'vue'

import { tools } from '@src/store/Modules/tools'
import { CSkill } from '@/components/CSkill'
import { CFinder } from '@/components/CFinder'
import { CChartMap } from '@src/components/CChartMap'
import { CMapsEsempio } from '@src/components/CMapsEsempio'
import { CVerifyEmail } from '@src/components/CVerifyEmail'
import { CVerifyTelegram } from '@src/components/CVerifyTelegram'
import { useGlobalStore } from '@store/globalStore'
import { useUserStore } from '@store/UserStore'
import { static_data } from '@/db/static_data'


export default defineComponent({
  name: 'Home',
  components: { CSkill, CChartMap, CMapsEsempio, CFinder, CVerifyEmail, CVerifyTelegram },
  setup() {
    const globalStore = useGlobalStore()
    const userStore = useUserStore()

    function isEmailVerified() {
      return userStore.my.verified_email
    }

    function TelegCode() {
      return userStore.my.profile.teleg_checkcode
    }

    function TelegVerificato(): boolean {
      return userStore.my.profile ? userStore.my.profile.teleg_id! > 0 : false
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

    return {
      tools,
      static_data,
      isEmailVerified,
      TelegCode,
      TelegVerificato,
      isLogged,
      openrighttoolbar,
      isUserOk,
    }
  },
})
