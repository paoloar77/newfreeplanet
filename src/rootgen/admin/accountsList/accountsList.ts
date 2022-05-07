import { defineComponent, onMounted, ref } from 'vue'

import { CMyPage } from '@/components/CMyPage'
import { CGridTableRec } from '@/components/CGridTableRec'
import { tools } from '@store/Modules/tools'
import { static_data } from '@/db/static_data'

import { fieldsTable } from '@src/store/Modules/fieldsTable'
import { shared_consts } from '@/common/shared_vuejs'

export default defineComponent({
  name: 'accountsList',
  // @ts-ignore
  components: { CGridTableRec, CMyPage },
  setup() {

    const arrfilterand: any = ref([])

    function mounted() {
      if (tools.appid() === tools.IDAPP_RISO) {
        arrfilterand.value = [
        ]
      }
    }

    onMounted(mounted)

    return {
      arrfilterand,
      fieldsTable,
    }
  }
})


