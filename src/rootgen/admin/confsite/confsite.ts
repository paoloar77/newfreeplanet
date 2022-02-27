import { defineComponent, ref, onMounted } from 'vue'

import { CImgText } from '../../../components/CImgText/index'
import { CCard } from '@/components/CCard'
import { CMyPage } from '@/components/CMyPage'
import { CTitleBanner } from '@/components/CTitleBanner'
import { CMyFieldRec } from '@/components/CMyFieldRec'

import MixinMetaTags from '@/mixins/mixin-metatags'
import { IMyBot } from 'model'
import { shared_consts } from '@/common/shared_vuejs'
import { useGlobalStore } from '@store/globalStore'

export default defineComponent({
  name: 'Confsite',
  components: { CImgText, CCard, CMyPage, CTitleBanner, CMyFieldRec },
  setup() {

    const mysite = ref(null)

    const globalStore = useGlobalStore()

    async function mounted() {
      mysite.value = await globalStore.caricaTabella('sites', process.env.APP_ID!)
    }

    onMounted(mounted)

    return {
      mysite,
    }
  }
})
