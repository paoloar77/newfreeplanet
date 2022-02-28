import { defineComponent, ref, computed } from 'vue'

import MixinBase from '@src/mixins/mixin-base'
import { CCopyBtn } from '../CCopyBtn'
import { useUserStore } from '@store/UserStore'
import { useQuasar } from 'quasar'
import { useI18n } from '@/boot/i18n'
import { tools } from '@store/Modules/tools'

export default defineComponent({
  name: 'CVerifyTelegram',
  components: { CCopyBtn },
  props: {},
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()

    const userStore = useUserStore()


    return {
      tools,
    }
  }
})

