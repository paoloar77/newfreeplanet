import { defineComponent } from 'vue'

import { Footer } from '@/components/Footer'
import { useUserStore } from '@store/UserStore'
import MixinUsers from '@/mixins/mixin-users'

export default defineComponent({
  name: 'Regok',
  components: { Footer },
  props: {},
  setup() {
    const userStore = useUserStore()
    const { isEmailVerified } = MixinUsers()

    return {
      isEmailVerified,
    }
  },
})
