import { computed, defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'CProvaPao',
  props: {
    username: {
      type: String,
      required: true,
      default: '',
    },
  },
})
