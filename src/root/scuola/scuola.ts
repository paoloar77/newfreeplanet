import {
  defineComponent, ref, computed,
} from 'vue'

import { tools } from '@src/store/Modules/tools'
import { CSkill } from '@/components/CSkill'
import { CFinder } from '@/components/CFinder'
import { CDashboard } from '@/components/CDashboard'
import { CTitleBanner } from '@/components/CTitleBanner'
import { CChartMap } from '@src/components/CChartMap'
import { CUserNonVerif } from '@/components/CUserNonVerif'
import { CMapsEsempio } from '@src/components/CMapsEsempio'
import { CVerifyEmail } from '@src/components/CVerifyEmail'
import { CVerifyTelegram } from '@src/components/CVerifyTelegram'
import { useGlobalStore } from '@store/globalStore'
import { useUserStore } from '@store/UserStore'
import { static_data } from '@/db/static_data'
import MixinBase from '@/mixins/mixin-base'
import MixinUsers from '@/mixins/mixin-users'


export default defineComponent({
  name: 'work',
  components: { CSkill, CChartMap, CMapsEsempio, CFinder, CVerifyEmail, CVerifyTelegram, CDashboard, CUserNonVerif, CTitleBanner },
  setup() {

    return {
      tools,
      static_data,
    }
  },
})
