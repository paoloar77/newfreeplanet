import {
  defineComponent, ref, computed,
} from 'vue'

import { tools } from '@src/store/Modules/tools'
import { CSkill } from '@/components/CSkill'
import { CMainView } from '@/components/CMainView'
import { CDashboard } from '@/components/CDashboard'
import { CChartMap } from '@src/components/CChartMap'
import { LandingFooter } from '@src/components/LandingFooter'
import { CUserNonVerif } from '@/components/CUserNonVerif'
import { CStatusReg } from '@/components/CStatusReg'
import { CCopyBtn } from '@/components/CCopyBtn'
import { CCheckIfIsLogged } from '@/components/CCheckIfIsLogged'
import { CMapsEsempio } from '@src/components/CMapsEsempio'
import { useGlobalStore } from '@store/globalStore'
import { useUserStore } from '@store/UserStore'
import { static_data } from '@/db/static_data'
import MixinBase from '@/mixins/mixin-base'
import MixinUsers from '@/mixins/mixin-users'
import { shared_consts } from '@/common/shared_vuejs'
import { CPresentazione } from '@/components'
import MixinMetaTags from '@/mixins/mixin-metatags'

export default defineComponent({
  name: 'mainview',
  components: { CSkill, CChartMap, CMapsEsempio, CDashboard, CUserNonVerif, CMainView, CCopyBtn, LandingFooter, CCheckIfIsLogged, CStatusReg, CPresentazione },
  setup() {
    const globalStore = useGlobalStore()
    const userStore = useUserStore()
    const { getValDb } = MixinBase()

    const { setmeta } = MixinMetaTags()

    const { getRefLink } = MixinUsers()

    return {
      tools,
      static_data,
      getRefLink,
      userStore,
      shared_consts,
      globalStore,
      setmeta,
    }
  },
})
