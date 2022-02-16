import {
  computed,
  defineComponent, onBeforeMount, onBeforeUnmount, onMounted, ref, toRef, toRefs, watch,
} from 'vue'

import { tools } from '@store/Modules/tools'
import { costanti } from '@costanti'
import { useGlobalStore } from '@store/globalStore'
import { useUserStore } from '@store/UserStore'
import { useI18n } from '@/boot/i18n'

export default defineComponent({
  name: 'CTestServer',
  props: {
  },
  components: {
  },
  setup(props, { attrs, slots, emit }) {
    const { t } = useI18n()
    const globalStore = useGlobalStore()
    const userStore = useUserStore()

    const testServer = ref({})

    function mounted() {
      ricarica()
    }

    async function ricarica() {
      testServer.value = {}
      testServer.value = await globalStore.loadPageTest()
    }

    onMounted(mounted)

    return {
      t,
      tools,
      costanti,
      testServer,
      ricarica,
    }
  },
})
