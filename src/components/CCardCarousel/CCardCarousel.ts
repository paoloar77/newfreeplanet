import { defineComponent, ref } from 'vue'

import { CCardDiscipline } from '../CCardDiscipline'
import { useGlobalStore } from '@store/globalStore'

export default defineComponent({
  name: 'CCardCarousel',
  components: { CCardDiscipline },
  props: {
    myarr: {
      type: Array,
      required: true,
    },
  },
  setup() {

    const globalStore = useGlobalStore()
    const slidedisc = ref(0)

    return {
      slidedisc,
      globalStore,
    }
  },
})
