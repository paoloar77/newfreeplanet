import {
  defineComponent,
} from 'vue'
import { tools } from '@src/store/Modules/tools'
import { useQuasar } from 'quasar'
import { useI18n } from '@src/boot/i18n'

export default defineComponent({
  name: 'Logo',
  props: {
    mystyle: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  setup() {
    function logoimg() {
      return `${tools.getimglogo()}`
    }

    function logoalt() {
      const { t } = useI18n();
      return t('ws.sitename')
    }

    return {
      logoimg,
      logoalt,
    }
  },
})
