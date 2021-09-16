import { defineComponent } from 'vue'

import { Footer } from '@/components/Footer'
import { useUserStore } from '@store/UserStore'

export default defineComponent({
  name: 'Regok',
  components: { Footer },
  props: {},
  setup() {
    const userStore = useUserStore()

    function isEmailVerified() {
      if (userStore.my)
        return userStore.my.verified_email
      else
        return false
    }

    return {
      isEmailVerified,
    }
  },
})
