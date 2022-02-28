import {
  defineComponent, ref, computed,
} from 'vue'

import { tools } from '@src/store/Modules/tools'
import { CSkill } from '@/components/CSkill'
import { CMainView } from '@/components/CMainView'
import { CDashboard } from '@/components/CDashboard'
import { CChartMap } from '@src/components/CChartMap'
import { Footer } from '@src/components/Footer'
import { CUserNonVerif } from '@/components/CUserNonVerif'
import { CCopyBtn } from '@/components/CCopyBtn'
import { CMapsEsempio } from '@src/components/CMapsEsempio'
import { useGlobalStore } from '@store/globalStore'
import { useUserStore } from '@store/UserStore'
import { static_data } from '@/db/static_data'
import MixinBase from '@/mixins/mixin-base'
import MixinUsers from '@/mixins/mixin-users'


export default defineComponent({
  name: 'mainview',
  components: { CSkill, CChartMap, CMapsEsempio, CDashboard, CUserNonVerif, CMainView, CCopyBtn, Footer },
  setup() {
    const globalStore = useGlobalStore()
    const userStore = useUserStore()
    const { getValDb } = MixinBase()

    const { getRefLink } = MixinUsers()

    function openrighttoolbar() {
      globalStore.rightDrawerOpen = true
    }

    return {
      tools,
      static_data,
      openrighttoolbar,
      getRefLink,
      userStore,
    }
  },
})
