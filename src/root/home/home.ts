
import {
  defineComponent, ref, computed,
} from 'vue'

import { tools } from '@src/store/Modules/tools'
import { CSkill } from '@/components/CSkill'
import { CFinder } from '@/components/CFinder'
import { CChartMap } from '@src/components/CChartMap'
import { CMapsEsempio } from '@src/components/CMapsEsempio'


export default defineComponent({
  name: 'Home',
  components: { CSkill, CChartMap, CMapsEsempio, CFinder },
  setup() {

    return {
      tools,
    }
  },
})
