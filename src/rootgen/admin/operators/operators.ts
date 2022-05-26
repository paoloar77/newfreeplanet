import { defineComponent, ref, onMounted } from 'vue'

import { CImgText } from '@/components/CImgText'
import { CCard } from '@/components/CCard'
import { CMyPage } from '@/components/CMyPage'
import { CTitleBanner } from '@/components/CTitleBanner'
import { CGridTableRec } from '@/components/CGridTableRec'

import { colmypage } from '@src/store/Modules/fieldsTable'
import { fieldsTable } from '@store/Modules/fieldsTable'
import MixinMetaTags from '@/mixins/mixin-metatags'

export default defineComponent({
  name: 'Operators',
  components: { CImgText, CCard, CMyPage, CTitleBanner, CGridTableRec },
  setup() {

    const { setmeta } = MixinMetaTags()

    return {
      colmypage,
      setmeta,
      fieldsTable,
    }
  }
})
