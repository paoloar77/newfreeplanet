
import {
  defineComponent, ref, computed,
} from 'vue'

import { tools } from '@src/store/Modules/tools'
import { CSkill } from '@/components/CSkill'


export default defineComponent({
  name: 'Home',
  components: { CSkill },
  setup() {

    return {
      tools,
    }
  },
})
