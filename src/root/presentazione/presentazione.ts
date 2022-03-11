import { useUserStore } from '@store/UserStore'
import { useI18n } from '@src/boot/i18n'
import {
  defineComponent, ref, onBeforeUnmount, onMounted,
} from 'vue'
import { useRouter } from 'vue-router'
import { CPresentazione } from '@/components'
import { tools } from '@src/store/Modules/tools'

export default defineComponent({
  name: 'Presentazione',
  components: { CPresentazione },

  setup() {
    const { t } = useI18n();

    return {
      t,
      tools,
    }
  },
})
