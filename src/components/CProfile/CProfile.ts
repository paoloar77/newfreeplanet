import { defineComponent } from 'vue'
import { useI18n } from '@/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '../../store/globalStore'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'CProfile',
  setup() {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()
    const globalStore = useGlobalStore()

    return {
      t,
    }
  },
})
