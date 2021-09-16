import { defineComponent, ref, computed, PropType, toRef } from 'vue'
import { IOperators } from 'model'

export default defineComponent({
  name: 'CBook',
  props: {
    tab: {
      type: String,
      required: true,
    },
    op: {
      type: Object as PropType<IOperators>,
      required: true,
    },
  },
  setup(props, { emit }) {

    const mytab = toRef(props, 'tab')

    function clicca() {
      mytab.value = 'two'
    }

    function myop() {
      if (!!props.op) {
        return props.op
      } else {
        return {
          index: 0,
          tab: '',
          name: '',
          qualification: '',
          sub2: '',
          certifications: '',
          img: '',
          cell: '',
          email: '',
          paginaweb: '',
          paginafb: '',
          intro: '',
          info: ''
        }
      }
    }

    return {
      myop,
      clicca,
      mytab,
    }
  }
})
