import { defineComponent, ref, onMounted } from 'vue'

import { CImgText } from '../../../components/CImgText/index'
import { CCard } from '@/components/CCard'
import { CMyPage } from '@/components/CMyPage'
import { CTitleBanner } from '@/components/CTitleBanner'
import { CGridTableRec } from '@/components/CGridTableRec'

import { colmybot } from '@src/store/Modules/fieldsTable'
import MixinMetaTags from '@/mixins/mixin-metatags'
import { IMyBot } from 'model'
import { shared_consts } from '@/common/shared_vuejs'

export default defineComponent({
  name: 'Bot',
  components: { CImgText, CCard, CMyPage, CTitleBanner, CGridTableRec },
  setup() {

    const { setmeta } = MixinMetaTags()

    function getdefaultnewrec(): IMyBot {
      return {
        page: 1,
        index: 1,
        riga: 1,
        active: false,
        label: '',
        type: 0,
        value: '',
        visibility: shared_consts.VISIB_ALL,
      }
    }

    return {
      colmybot,
      setmeta,
      getdefaultnewrec,
    }
  }
})
