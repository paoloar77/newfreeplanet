import { CCard } from '@components'
import MixinOperator from '../../mixins/mixin-operator'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CCardOperator',
  components: { CCard },
  props:{
    username: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const tab = ref('one')

    const { getOperatorByUsername } = MixinOperator()

    return {
      tab,
      getOperatorByUsername,
    }
  },
})
