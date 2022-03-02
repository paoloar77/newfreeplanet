import {
  defineComponent, ref, computed,
} from 'vue'

import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { CSkill } from '@/components/CSkill'
import { CFinder } from '@/components/CFinder'
import { Footer } from '@/components/Footer'
import { CDashboard } from '@/components/CDashboard'
import { CChartMap } from '@src/components/CChartMap'
import { CUserNonVerif } from '@/components/CUserNonVerif'
import { CTitlePage } from '@/components/CTitlePage'
import { CMapsEsempio } from '@src/components/CMapsEsempio'
import { CVerifyEmail } from '@src/components/CVerifyEmail'
import { CVerifyTelegram } from '@src/components/CVerifyTelegram'
import { useGlobalStore } from '@store/globalStore'
import { useUserStore } from '@store/UserStore'
import { static_data } from '@/db/static_data'
import MixinBase from '@/mixins/mixin-base'
import MixinUsers from '@/mixins/mixin-users'

import { colmyBachecas } from '@store/Modules/fieldsTable'

export default defineComponent({
  name: 'eventi',
  components: { CSkill, CChartMap, CMapsEsempio, CFinder, CVerifyEmail, CVerifyTelegram, CDashboard, CUserNonVerif, CTitlePage, Footer },
  setup() {
    return {
      colmyBachecas,
      tools,
      toolsext,
      static_data,
    }
  },
})
