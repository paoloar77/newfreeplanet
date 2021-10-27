
import {
  defineComponent, ref, computed,
} from 'vue'

import { tools } from '@src/store/Modules/tools'
import { CSkill } from '@/components/CSkill'
import { CChartMap } from '@src/components/CChartMap'
import { CMapsEsempio } from '@src/components/CMapsEsempio'


export default defineComponent({
  name: 'Home',
  components: { CSkill, CChartMap, CMapsEsempio },
  setup() {

    return {
      tools,
    }
  },
})
