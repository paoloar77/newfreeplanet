import { useQuasar } from 'quasar'
import {
  defineComponent, onBeforeMount, onBeforeUnmount, onMounted, ref, toRefs, watch, inject, computed,
} from 'vue'

import { tools } from '@store/Modules/tools'

import { shared_consts } from '@src/common/shared_vuejs'
import { useI18n } from '@src/boot/i18n'
import { useRouter } from 'vue-router'
import { static_data } from '@/db/static_data'
import { useGlobalStore } from '@store/globalStore'
import { useUserStore } from '@store/UserStore'

import MixinUsers from '../../mixins/mixin-users'

export default defineComponent({
  name: 'MyFooter',
  components: {},
  props: {},

  setup() {
    const $q = useQuasar()
    const { t } = useI18n()
    const $router = useRouter()

    const userStore = useUserStore()
    const globalStore = useGlobalStore()

    const { getMyUsername, Username } = MixinUsers()

    function mounted() {
      // mounted
    }

    onMounted(mounted)

    return {
      static_data,
      globalStore,
      t,
      getMyUsername,
      Username,
    }
  },

})
