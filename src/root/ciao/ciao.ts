import { useUserStore } from '@store/UserStore'
import { useI18n } from '@src/boot/i18n'
import {
  defineComponent, ref, onBeforeUnmount, onMounted,
} from 'vue'
import { useRouter } from 'vue-router'
import { Logo } from '../../components/logo'
import { useQuasar } from 'quasar'
import { TestPao } from '../../components/testpao'

export default defineComponent({
  name: 'Ciao',
  components: { Logo, TestPao },

  setup() {
    const $q = useQuasar()

    const { t } = useI18n();

    return {
      t,
    }
  },
})
