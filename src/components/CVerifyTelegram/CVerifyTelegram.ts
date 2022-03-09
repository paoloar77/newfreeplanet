import { defineComponent, ref, computed, onMounted, watch, onBeforeUnmount } from 'vue'

import MixinBase from '@src/mixins/mixin-base'
import { CCopyBtn } from '../CCopyBtn'
import { useUserStore } from '@store/UserStore'
import { useQuasar } from 'quasar'
import { useI18n } from '@/boot/i18n'
import { tools } from '@store/Modules/tools'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'CVerifyTelegram',
  components: { CCopyBtn },
  props: {},
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()

    const userStore = useUserStore()
    const $router = useRouter()

    const polling = ref()


    watch(() => $q.appVisible, (value: any, oldval: any) => {
      console.log('visible', value)

      if (value && !oldval) {
        // console.log('Ora è visibile !')
        start()
      }
      if (!value && oldval) {
        // console.log('Ora è invisibile !')
        end()
      }
    })

    function refresh() {
      console.log('refresh')
      userStore.autologin_FromLocalStorage($router, $q)
    }

    function load() {
      start()
    }

    function start() {
      refresh()
      if (tools.notFinishReg()) {
        if (!polling.value) {
          polling.value = setInterval(() => {
            refresh()
          }, 10000)
        }

      }
    }

    function end() {
      if (polling.value) {
        clearInterval(polling.value)
        polling.value = null
      }
    }

    function beforeDestroy() {
      end()
    }

    onMounted(load)
    onBeforeUnmount(beforeDestroy)

    return {
      tools,
    }
  }
})

