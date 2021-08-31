import {
  defineComponent, onBeforeMount, onBeforeUnmount, onMounted, ref, toRef, toRefs, watch,
} from 'vue'

import { tools } from '@src/store/Modules/tools'

export default defineComponent({
  name: 'CImgText',
  props: {
    src: {
      type: String,
      default: '',
    },
    src2: {
      type: String,
      default: '',
    },
    class1: {
      type: String,
      default: 'myclimg',
    },
    style1: {
      type: String,
      default: '',
    },
    alt1: {
      type: String,
      default: 'image',
    },
    alt2: {
      type: String,
      default: 'image',
    },
  },

  setup() {
    function clrowcol() {
      let mycl = 'row'
      if (tools.isMobile()) mycl = 'column'

      return mycl
    }

    function myclass() {
      return `${clrowcol()} items-start q-col-gutter-xs imgtext `
    }

    return {
      clrowcol,
      myclass,
    }
  },
})
