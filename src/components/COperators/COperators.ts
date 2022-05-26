import { computed, defineComponent, ref, watch } from 'vue'

import { tools } from '@store/Modules/tools'
import { CMyAvatar } from '../CMyAvatar'
import MixinOperator from '../../mixins/mixin-operator'
import MixinUsers from '../../mixins/mixin-users'
import { useGlobalStore } from '@store/globalStore'


export default defineComponent({
  name: 'CMyTeacher',
  components: { CMyAvatar },
  props: {
    myop: {
      type: Object,
      required: true,
    },
  },
  setup(props) {

    const globalStore = useGlobalStore()
    const showuserdetails = ref(false)
    const autoplaydiscsaved = ref(0)
    const tab = ref('one')

    const mydir = ref('images/')

    watch(() => showuserdetails, (value: any, old: any) => {
      if (!showuserdetails.value) {
        globalStore.autoplaydisc = autoplaydiscsaved.value
      }
    })

    function executeclick(event: any) {
      console.log('executeclick')
      showuserdetails.value = true

      autoplaydiscsaved.value = globalStore.autoplaydisc
      globalStore.autoplaydisc = 0
    }
    return {
      tab,
      executeclick,
      showuserdetails,
      tools,
      mydir,
    }
  },
})
