import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useUserStore } from '@store/UserStore'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from '@/boot/i18n'
import { useQuasar } from 'quasar'
import { CMyCardPopup } from '@/components/CMyCardPopup'
import { CMyPage } from '@/components/CMyPage'
import { CNotifSettings } from '@/components/CNotifSettings'
import { toolsext } from '@store/Modules/toolsext'
import { tools } from '@store/Modules/tools'
import { shared_consts } from '@src/common/shared_vuejs'

export default defineComponent({
  name: 'usernotifs',
  components: { CMyCardPopup, CNotifSettings, CMyPage },
  props: {},
  setup() {
    const userStore = useUserStore()
    const $route = useRoute()
    const $q = useQuasar()
    const { t } = useI18n()

    return {
      t,
      toolsext,
      tools,
      shared_consts,
    }
  }
})
