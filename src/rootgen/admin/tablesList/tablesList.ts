import { defineComponent } from 'vue'

import { CImgText } from '../../../components/CImgText/index'
import { CCard } from '@/components/CCard'
import { CMyPage } from '@/components/CMyPage'
import { CTitleBanner } from '@/components/CTitleBanner'
import { CGridTableRec } from '@/components/CGridTableRec'

import { func } from '@src/store/Modules/fieldsTable'
import MixinMetaTags from '@/mixins/mixin-metatags'

export default defineComponent({
  name: 'TablesList',
  components: { CImgText, CCard, CMyPage, CTitleBanner, CGridTableRec },
  setup() {

    const { setmeta } = MixinMetaTags()

    function gettablesList() {
      return func.gettablesList()
    }

    return {
      gettablesList,
      setmeta,
    }
  }
})
