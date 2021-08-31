import {
  defineComponent,
} from 'vue'
import { tools } from '@src/store/Modules/tools'
import { static_data } from '@src/db/static_data'

import { useQuasar } from 'quasar'
import { useGlobalStore } from '@store/globalStore'
import { FormNewsletter } from '../FormNewsletter'
import { MixinBase } from '../../mixins/mixin-base'
import { Logo } from '../logo'
import { useI18n } from '@src/boot/i18n'

export default defineComponent({
  name: 'TestPao',
  mixins: [MixinBase],
  components: { Logo, FormNewsletter },
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
