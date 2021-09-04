import { defineComponent } from 'vue'

import { tools } from '@store/Modules/tools'

export default defineComponent({
  name: 'CCardStat',
  props: {
    mytext: {
      type: String,
      required: true,
      default: '',
    },
    myval: {
      type: Number,
      required: true,
      default: 0,
    },
    mycol: {
      type: String,
      required: false,
      default: '',
    },
  },

  setup() {
    function getsize() {
      if (tools.isMobile())
        return '130px'
      else
        return '150px'
    }

    return {
      getsize,
    }
  },
})
