import { tools } from '@store/Modules/tools'
import { useQuasar } from 'quasar'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'COpenStreetMap',
  props: {
    title: {
      type: String,
      required: true,
    },
    coordinates: {
      type: String,
      required: false,
      default: '',
    },
    coord_big: {
      type: String,
      required: false,
      default: '',
    },
    urlmap: {
      type: String,
      required: false,
      default: '',
    },
    imgmap: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props, { emit }) {
    const $q = useQuasar()

    function mywidth() {
      return tools.getwidth($q) - 20
    }

    function myheight() {
      return 450
    }


    return {
      mywidth,
      myheight,
    }
  }
})
