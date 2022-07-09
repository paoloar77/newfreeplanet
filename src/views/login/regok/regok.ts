import { defineComponent } from 'vue'

import { LandingFooter } from '@/components/LandingFooter'
import { useUserStore } from '@store/UserStore'
import MixinUsers from '@/mixins/mixin-users'

export default defineComponent({
  name: 'Regok',
  components: { LandingFooter },
  props: {},
  setup() {
    const userStore = useUserStore()

    return {
    }
  },
})
