import { defineComponent, ref, onMounted } from 'vue'

import { CImgText } from '../../../components/CImgText/index'
import { CCard } from '@/components/CCard'
import { CMyPage } from '@/components/CMyPage'
import { CTitleBanner } from '@/components/CTitleBanner'
import { CGridTableRec } from '@/components/CGridTableRec'

import { getcolorderscart } from '@src/store/Modules/fieldsTable'
import MixinMetaTags from '@/mixins/mixin-metatags'

export default defineComponent({
  name: 'StorehousePage',
  components: { CImgText, CCard, CMyPage, CTitleBanner, CGridTableRec },
  setup() {

    const { setmeta } = MixinMetaTags()

    return {
      getcolorderscart,
      setmeta,
    }
  }
})
