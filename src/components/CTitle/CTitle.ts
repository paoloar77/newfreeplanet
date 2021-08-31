import {
  defineComponent, onBeforeMount, onBeforeUnmount, onMounted, ref, toRef, toRefs, watch,
} from 'vue'

import { tools } from '@store/Modules/tools'

export default defineComponent({
  name: 'CTitle',
  props: {
    headtitle: {
      type: String,
      required: true,
      default: '',
    },
    imgbackground: {
      type: String,
      default: '',
    },
    imghead: {
      type: String,
      default: '',
    },
    sizes: {
      type: String,
      default: '',
    },
    styleadd: {
      type: String,
      default: '',
    },
  },

  setup(props, { attrs, slots, emit }) {
    const { headtitle } = toRefs(props) // REQUIRED PROP !
    const imgbackground = toRef(props, 'imgbackground') // OPTIONAL PROP

    function getsrc(): string {
      const filefull = tools.getimgFullpathbysize(imgbackground.value)

      return tools.getimgbysize(filefull.path, filefull.file)
    }

    function getaltimg(): string {
      if (headtitle.value) {
        return headtitle.value
      }
      const filefull = tools.getimgFullpathbysize(imgbackground.value)
      return tools.getaltimg(filefull.path, filefull.file, headtitle.value)
    }

    return {
      getsrc,
      getaltimg,
    }
  },
})
