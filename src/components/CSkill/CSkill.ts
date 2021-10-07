import {
  defineComponent, onBeforeMount, onBeforeUnmount, onMounted, ref, toRef, toRefs, watch,
} from 'vue'

import { tools } from '@store/Modules/tools'
import { CMyFieldDb } from '@/components/CMyFieldDb'
import { costanti } from '@costanti'
import { useGlobalStore } from '@store/globalStore'
import { useUserStore } from '@store/UserStore'
import { colmySkills } from '@store/Modules/fieldsTable'
import { CGridTableRec } from '@/components/CGridTableRec'

export default defineComponent({
  name: 'CSkill',
  props: {
    defaultnewrec: {
      type: Function,
      required: false,
    },
  },
  components: {
    CMyFieldDb, CGridTableRec,
  },
  setup(props, { attrs, slots, emit }) {
    const mytable = 'users'
    const globalStore = useGlobalStore()
    const userStore = useUserStore()

    async function createNewRecordInUserTable() {
      console.log('createNewRecordInUserTable')

      let mydata = {
        table: mytable,
        data: {
          userId: userStore.my._id,
          data: {},
          field: 'myskills'
        }
      };

      if (props.defaultnewrec) {

        mydata.data.data = props.defaultnewrec
      }

      console.log('mydata', mydata)
      const data = await globalStore.saveSubRec(mydata)
    }

    return {
      tools,
      costanti,
      colmySkills,
    }
  },
})
