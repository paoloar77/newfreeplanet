import { computed, defineComponent, ref, watch } from 'vue'
import { CSignUp } from '../../../components/CSignUp'
import { useQuasar } from 'quasar'
import { useI18n } from '@/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useRoute } from 'vue-router'
import { tools } from '@store/Modules/tools'

export default defineComponent({
  name: 'SignUp',
  components: { CSignUp },
  props: {},
  setup() {
    const $route = useRoute()

    const adult = ref(false)
    const invited = computed(() => $route.params.invited)

    // @ts-ignore
    watch(invited, (newval, oldval) => {
      console.log('$route.params.invited')
      adult.value = !!$route.params.invited
    })

   function created() {
      if (!tools.getCookie(tools.APORTADOR_SOLIDARIO, '')) {
        // @ts-ignore
        tools.setCookie(tools.APORTADOR_SOLIDARIO, $route.params.invited ? $route.params.invited : '')
      }
    }

    created()

    return {}
  },
})
