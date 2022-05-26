import { defineComponent, ref } from 'vue'

import { CCardDiscipline } from '../CCardDiscipline'
import { useGlobalStore } from '@store/globalStore'
import { tools } from '@store/Modules/tools'

export default defineComponent({
  name: 'CCardCarousel',
  components: { CCardDiscipline },
  props: {
    myarr: {
      type: Array,
      required: true,
    },
    directory: {
      type: String,
      required: false,
      default: '',
    }
  },
  setup(props, { emit }) {

    const globalStore = useGlobalStore()
    const slidedisc = ref(0)

    function getimgdisc(disc: any) {
      return props.directory + tools.getimgev(disc)
    }

    return {
      slidedisc,
      globalStore,
      tools,
      getimgdisc,
    }
  },
})
