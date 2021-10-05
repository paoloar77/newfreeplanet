
import {
  defineComponent, ref, computed,
} from 'vue'

import { tools } from '@src/store/Modules/tools'


export default defineComponent({
  name: 'Home',
  setup() {

    return {
      tools,
    }
  },
})
