import { defineComponent, ref, onMounted, watch, computed } from 'vue'

import { useGlobalStore } from '@store/globalStore'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Mypage',
  setup() {
    const rec = ref({})
    const globalStore = useGlobalStore()
    const route = useRoute()
    const path = computed(() => route.path)

    async function created() {
      // console.log('this.$route.path', this.$route.path)
      rec.value = await globalStore.loadPage(route.path)
      // console.log('mounted', this.rec)
    }

    watch(path, async (to: string, from: string) =>  {
      rec.value = await globalStore.loadPage(to)
    })

    function meta() {
      // return tools.metafunc(this)
    }

    onMounted(created)

    return {
      rec,
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
