
import { colTabledepartments } from '@src/store/Modules/fieldsTable'

import { CImgText } from '../../../components/CImgText/index'

import { defineComponent } from 'vue'
import { CCard } from '@/components/CCard'
import { CMyPage } from '@/components/CMyPage'
import { CTitleBanner } from '@/components/CTitleBanner'
import { CGridTableRec } from '@/components/CGridTableRec'

import MixinMetaTags from '../../../mixins/mixin-metatags'

export default defineComponent({
  name: 'StorehousePage',
  components: { CImgText, CCard, CMyPage, CTitleBanner, CGridTableRec },
  setup() {
    const pagination = {
      sortBy: 'name',
      descending: false,
      page: 2,
      rowsPerPage: 5
      // rowsNumber: xx if getting data from a server
    }

    const { setmeta } = MixinMetaTags()

    return {
      colTabledepartments,
      setmeta,
    }
  }

})
