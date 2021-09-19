import { defineComponent } from 'vue'

import { CMyPage } from '@/components/CMyPage'
import { CGridTableRec } from '@/components/CGridTableRec'

import { fieldsTable } from '@src/store/Modules/fieldsTable'

export default defineComponent({
  name: 'ZoomList',
  components: { CMyPage,CGridTableRec },
  setup() {
    function db_fieldsTable() {
      return fieldsTable
    }

    return {
      db_fieldsTable,
    }
  }
})
