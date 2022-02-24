import { defineComponent, ref, toRef, watch } from 'vue'
import { tools } from '@src/store/Modules/tools'

import {  useQuasar } from 'quasar'
import { useI18n } from '@/boot/i18n'
import { toolsext } from '@store/Modules/toolsext'

export default defineComponent({
  name: 'CLabel',
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
    label: {
      type: String,
      required: true,
      default: '',
    },
  },
  components: {},
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n();

    function copytoclip() {
      tools.copyStringToClipboard($q, props.value, true)
    }

    return {
      tools,
      toolsext,
      copytoclip,
    }
  },
})
