import { defineComponent, ref, computed } from 'vue'

import { CImgText } from '../../../components/CImgText/index'
import { CCard } from '@/components/CCard'
import { CMyPage } from '@/components/CMyPage'
import { CTitleBanner } from '@/components/CTitleBanner'
import { CGridTableRec } from '@/components/CGridTableRec'

import { colgallery } from '@src/store/Modules/fieldsTable'

export default defineComponent({
  name: 'Gallery',
  components: { CImgText, CCard, CMyPage, CTitleBanner, CGridTableRec },
  setup() {
    return {
      colgallery
    }
  }
})
