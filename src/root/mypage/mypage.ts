import { defineComponent, ref, onMounted, watch, computed } from 'vue'

import { useGlobalStore } from '@store/globalStore'
import { useRoute } from 'vue-router'
import MixinMetaTags from '@/mixins/mixin-metatags'
import { CMyPage } from '@/components/CMyPage'

export default defineComponent({
  name: 'Mypage',
  components: { CMyPage },
  setup() {
    const rec = ref({})
    const globalStore = useGlobalStore()
    const route = useRoute()
    const path = computed(() => route.path)

    const isfinishLoading = computed(() => globalStore.finishLoading)

    const { setmeta } = MixinMetaTags()

    async function created() {
      rec.value = await globalStore.loadPage(route.path)
      // console.log('MyPage created', rec.value)

      // console.log('mounted', this.rec)
    }

    watch(path, async (to: string, from: string) =>  {
      // console.log('watch path', path)
      rec.value = await globalStore.loadPage(to)
      // console.log('path change', rec.value)
    })

    function meta() {
      // return tools.metafunc(this)
    }

    created()

    return {
      rec,
      setmeta,
      isfinishLoading,
    }
  },
})
/*
export default class Mypage extends MixinMetaTags {
  public heightimg
  public imgback
  public rec: IMyPage = {}

  public async mounted() {
    // console.log('this.$route.path', this.$route.path)
    this.rec = await GlobalStore.loadPage(this.$route.path)
    // console.log('mounted', this.rec)
  }

  @Watch('$route.path')
  public async changepage() {
    // console.log('changepage')
    this.rec = await GlobalStore.loadPage(this.$route.path)
  }

  public meta() {
    return tools.metafunc(this)
  }

  get static_data() {
    return static_data
  }
}
*/
