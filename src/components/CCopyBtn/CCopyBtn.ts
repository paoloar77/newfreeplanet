import { tools } from '../../store/Modules/tools'
import { useQuasar } from 'quasar'
import { useI18n } from '@src/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CCopyBtn',
  props: {
    texttocopy: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
  components: {},
  setup(props) {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()
    const globalStore = useGlobalStore()

    function copytoclip() {
      tools.copyStringToClipboard($q, props.texttocopy, true)
    }

    return {
      copytoclip,
      tools,
    }
  },
})
