import { defineComponent, ref, onMounted } from 'vue'

import { CImgText } from '../../../components/CImgText/index'
import { CCard } from '@/components/CCard'
import { CMyPage } from '@/components/CMyPage'
import { CTitleBanner } from '@/components/CTitleBanner'
import { CGridTableRec } from '@/components/CGridTableRec'

import { colmsg_templates } from '@src/store/Modules/fieldsTable'
import { useGlobalStore } from '@store/globalStore'
import MixinMetaTags from '@/mixins/mixin-metatags'

export default defineComponent({
  name: 'Msgtemplate',
  components: { CImgText, CCard, CMyPage, CTitleBanner, CGridTableRec },
  setup() {
    const globalStore = useGlobalStore()

    const dataMsg_Templates = ref([])

    const { setmeta } = MixinMetaTags()

    async function mounted() {
      dataMsg_Templates.value = await globalStore.GetMsgTemplates()
    }

    onMounted(mounted)

    return {
      colmsg_templates,
      dataMsg_Templates,
      setmeta,
    }
  }
})
