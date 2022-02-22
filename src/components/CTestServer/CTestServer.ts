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

    const myrecfiltertoggle = ref(0)

    const SERVER_TEST = ref([
      { key: 1, label: 'Test', host: 'https://test.freeplanet.app:3001' },
      { key: 2, label: 'Produzione', host: 'https://freeplanet.app:3000' },
      { key: 3, label: 'Locale', host: 'http://192.168.0.200:3000' },
    ])

    watch(() =>
        myrecfiltertoggle.value, (value: any, oldValue: any) => {
        if (value) {
          const trovato = SERVER_TEST.value.find((rec: any) => rec.key === value)
          if (trovato) {
            globalStore.serverHost = trovato.host
            ricarica()
          }
        }
      },
    )
    const getoptions = computed( () => {
      const arr = []
      for (const rec of SERVER_TEST.value) {
        arr.push({label: rec.label, value: rec.key})
      }

      return arr
    })

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
      getoptions,
      costanti,
      testServer,
      ricarica,
      myrecfiltertoggle,
    }
  },
})
