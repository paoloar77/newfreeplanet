import { defineComponent } from 'vue'

import { CCopyBtn } from '../CCopyBtn'
import { useUserStore } from '@store/UserStore'

export default defineComponent({
  name: 'CVerifyEmail',
  components: { CCopyBtn },
  props: {},
  setup() {

    const userStore = useUserStore()

    function isEmailVerified(): boolean {
      return userStore.my.verified_email!
    }

    return {
      isEmailVerified,
    }
  }
})

