import { defineComponent, ref, onMounted } from 'vue'
import { IMyPage } from 'model'
import { useGlobalStore } from '@store/globalStore'
import { CImgText } from '@/components/CImgText'
import { CCard } from '@/components/CCard'
import { CMyPage } from '@/components/CMyPage'
import { CTitleBanner } from '@/components/CTitleBanner'

export default defineComponent({
  name: 'CMyInnerPage',
  props: {
    path: {
      type: String,
      required: true,
    },
  },
  components: { CImgText, CCard, CMyPage, CTitleBanner },
  setup(props) {
    // const heightimg
    // const imgback
    const rec = ref(<IMyPage | undefined>{})
    const globalStore = useGlobalStore()

    function mounted() {
      // console.log('$route.path', $route.path)
      rec.value = globalStore.getPage(props.path)
      console.log(rec)
    }

    onMounted(mounted)

    return {
      rec,
    }
  },

})
