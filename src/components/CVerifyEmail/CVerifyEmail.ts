import { defineComponent } from 'vue'

import { CCopyBtn } from '../CCopyBtn'
import { useUserStore } from '@store/UserStore'
import { tools } from '@store/Modules/tools'

export default defineComponent({
  name: 'CVerifyEmail',
  components: { CCopyBtn },
  props: {},
  setup() {

    return {
      tools,
    }
  }
})

