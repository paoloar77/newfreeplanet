import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Offline',
  setup() {
    function logoimg() {
      return 'º' + process.env.LOGO_REG
    }

    return {
      logoimg,
    }
  },
})
