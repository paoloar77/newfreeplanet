import { defineComponent } from 'vue'
import menuOne from '../menuone/menuOne.vue'

export default defineComponent({
  name: 'Drawer',
  components: {
    menuOne,
  },
  props: {
    clBase: {
      type: String,
      required: false,
      default: 'my-menu',
    },
  },

  setup(props) {
    return {}
  },
})
