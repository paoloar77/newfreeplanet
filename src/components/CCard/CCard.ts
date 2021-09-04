import { computed, defineComponent, PropType, ref } from 'vue'

import { IOperators } from '../../model'
import { tools } from '@store/Modules/tools'

export default defineComponent({
  name: 'CCard',
  props: {
    tab: {
      type: String,
      required: true,
      default: 'one',
    },
    op: {
      type: Object as PropType<IOperators>,
      required: true,
    },
  },
  setup(props) {

    const mytab = ref(props.tab)

    function clicca() {
      mytab.value = 'two'
    }

    const myop = computed(() => {
      if (!!props.op) {
        return props.op
      } else {
        return {
          tab: '',
          username: '',
          name: '',
          surname: '',
          qualification: '',
          usertelegram: '',
          disciplines: '',
          certifications: '',
          img: '',
          cell: '',
          email: '',
          paginaweb: '',
          paginafb: '',
          intro: '',
          info: '',
        }
      }
    })

    return {
      mytab,
      myop,
      tools,
      clicca,
    }
  },
})
