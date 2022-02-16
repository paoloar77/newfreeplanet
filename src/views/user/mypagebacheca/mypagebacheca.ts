import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useUserStore } from '@store/UserStore'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from '@/boot/i18n'
import { useQuasar } from 'quasar'
import { CMyCardPopup } from '@/components/CMyCardPopup'
import { toolsext } from '@store/Modules/toolsext'

export default defineComponent({
  name: 'mypagebacheca',
  components: { CMyCardPopup },
  props: {},
  setup() {
    const userStore = useUserStore()
    const $route = useRoute()
    const $q = useQuasar()
    const { t } = useI18n()

    const idBacheca = computed(() => $route.params.idBacheca ? $route.params.idBacheca.toString() : 0)

    return {
      t,
      idBacheca,
      toolsext,
    }
  }
})
