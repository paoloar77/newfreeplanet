import { defineComponent, ref } from 'vue'

import { tools } from '@src/store/Modules/tools'

export default defineComponent({
  name: 'CImgTitle',
  props: {
    src: {
      type: String,
      required: false,
      default: '',
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
    myheight: {
      type: Number,
      required: false,
      default: 0,
    },
    myheightmobile: {
      type: Number,
      required: false,
      default: 0,
    },
    legendinside: {
      type: String,
      required: false,
      default: '',
    },
    legend: {
      type: String,
      required: false,
      default: '',
    },
  },

  setup(props) {
    function getsrc(): string {
      const filefull = tools.getimgFullpathbysize(props.src)

      return tools.getimgbysize(filefull.path, filefull.file)
    }

    function getaltimg(): string {
      const filefull = tools.getimgFullpathbysize(props.src)
      return tools.getaltimg(filefull.path, filefull.file, props.title)
    }

    return {
      getsrc,
      getaltimg,
    }
  },

})
