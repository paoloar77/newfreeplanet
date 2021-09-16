import { defineComponent, PropType, onBeforeUpdate, reactive } from 'vue'
import { useI18n } from '@/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'

import MixinBase from '../../mixins/mixin-base'
import { tools } from '@store/Modules/tools'

export default defineComponent({
  name: 'CFacebookFrame',
  props: {
    urlfbpage: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    fbimage: {
      type: String,
      required: true,
    },
    myclass: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()
    const globalStore = useGlobalStore()

    function geturlfbpageEncoded() {
      return encodeURIComponent(props.urlfbpage)
    }

    function mywidth() {
      let myw = 340
      if (tools.getwidth($q) < 410)
        return myw
      if ((tools.getwidth($q) > 410) && (tools.getwidth($q) < 1100))
        return Math.round((tools.getwidth($q) / 3) - 30)
      else
        return myw
    }

    return {
      geturlfbpageEncoded,
      mywidth,
      tools,
    }
  }
})

