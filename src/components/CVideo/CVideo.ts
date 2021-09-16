import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CVideo',
  props: {
    myvideokey: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props, { emit }) {

    return {

    }
  }
})

