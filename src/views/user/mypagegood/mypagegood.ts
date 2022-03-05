import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useUserStore } from '@store/UserStore'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from '@/boot/i18n'
import { useQuasar } from 'quasar'
import { CMyCardPopup } from '@/components/CMyCardPopup'
import { CMyPage } from '@/components/CMyPage'
import { CCheckIfIsLogged } from '@/components/CCheckIfIsLogged'
import { toolsext } from '@store/Modules/toolsext'
import { tools } from '@store/Modules/tools'

export default defineComponent({
  name: 'mypagegood',
  components: { CMyCardPopup, CMyPage, CCheckIfIsLogged },
  props: {},
  setup() {
    const userStore = useUserStore()
    const $route = useRoute()
    const $q = useQuasar()
    const { t } = useI18n()

    const idGood = computed(() => $route.params.idGood ? $route.params.idGood.toString() : 0)

    return {
      t,
      idGood,
      toolsext,
      tools,
    }
  }
})
