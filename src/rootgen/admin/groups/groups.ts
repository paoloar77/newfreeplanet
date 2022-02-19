import { defineComponent, ref, computed } from 'vue'

import { CImgText } from '../../../components/CImgText/index'
import { CCard } from '@/components/CCard'
import { CMyPage } from '@/components/CMyPage'
import { CTitleBanner } from '@/components/CTitleBanner'
import { CGridTableRec } from '@/components/CGridTableRec'

import { colTablegroups } from '@src/store/Modules/fieldsTable'
import { tools } from '@store/Modules/tools'

export default defineComponent({
  name: 'GroupPage',
  components: { CImgText, CCard, CMyPage, CTitleBanner, CGridTableRec },
  setup() {

    function getdefaultnewrec(): any {
      return tools.getdefaultnewrec_MyGroup()
    }

    return {
      colTablegroups,
      getdefaultnewrec
    }
  }
})
