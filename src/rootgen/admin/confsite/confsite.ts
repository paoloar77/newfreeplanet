import { defineComponent, ref, onMounted } from 'vue'

import { CImgText } from '../../../components/CImgText/index'
import { CCard } from '@/components/CCard'
import { CMyPage } from '@/components/CMyPage'
import { CTitleBanner } from '@/components/CTitleBanner'
import { CMyFieldRec } from '@/components/CMyFieldRec'
import { CMyFieldDb } from '@/components/CMyFieldDb'

import { useGlobalStore } from '@store/globalStore'
import { costanti } from '@costanti'

export default defineComponent({
  name: 'Confsite',
  components: { CImgText, CCard, CMyPage, CTitleBanner, CMyFieldRec, CMyFieldDb },
  setup() {

    const mysite = ref(null)

    const globalStore = useGlobalStore()

    async function mounted() {
      mysite.value = await globalStore.caricaTabella('sites', process.env.APP_ID!)
    }

    onMounted(mounted)

    return {
      mysite,
      costanti,
    }
  }
})
