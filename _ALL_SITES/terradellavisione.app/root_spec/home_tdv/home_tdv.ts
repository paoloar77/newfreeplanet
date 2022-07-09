import { defineComponent, ref, onMounted, watch, computed } from 'vue'

import { useGlobalStore } from '@store/globalStore'
import { useRoute } from 'vue-router'
import { useUserStore } from '@store/UserStore'

import { Logo } from '../../components/logo'

import { LandingFooter } from '../../components/LandingFooter'
import { CMyPage } from '../../components/CMyPage/index'

import { tools } from '@src/store/Modules/tools'
import { static_data } from '@src/db/static_data'
import { toolsext } from '@src/store/Modules/toolsext'
import { Screen } from 'quasar'
import { CCardCarousel, CEventsCalendar, COpenStreetMap } from '@components'
import MixinBase from '@src/mixins/mixin-base'
import { firstimagehome } from '@src/db/static_data'
import MixinMetaTags from '@/mixins/mixin-metatags'
import { IGallery } from 'model'

export default defineComponent({
  name: 'Home_tdv',
  components: { Logo, LandingFooter, CMyPage, CCardCarousel, CEventsCalendar, COpenStreetMap },

  setup() {
    const animare = ref(0)
    const slide = ref('first')
    const slide2 = ref(0)

    const getImmagini = ref([
      {
        title: '', subtitle: '',
        alt: 'Noi insieme',
        img: 'images/terradellavisione_noi.jpg'
      },
    ])

    const userStore = useUserStore()
    const globalStore = useGlobalStore()

    const { setValDb, getValDb } = MixinBase()
    const { setmeta, getsrcbyimg } = MixinMetaTags()

    function getheightgallery() {
      if (tools.isMobile())
        return '400px'
      else
        return '600px'
    }

    function created() {
      //
    }

    function getArrDisciplines() {
      return globalStore.disciplines.filter((rec: any) => rec.showinhome)
    }

    function getGall(): any {
      return globalStore.gallery.find((rec: any) => rec.title === 'slidehome')
    }

    function getArrImgSlideHome() {
      const mygall: any = getGall()
      if (!!mygall) {
        return mygall.list
      }
      return []
    }

    function getdirectory() {
      const mygall: any = getGall()
      if (!!mygall) {
        return 'upload/' + mygall.directory
      }
      return []
    }

    created()

    return {
      tools,
      toolsext,
      static_data,
      animare,
      slide,
      slide2,
      getheightgallery,
      getArrDisciplines,
      getArrImgSlideHome,
      getImmagini,
      getdirectory,
      getValDb,
      firstimagehome,
      getsrcbyimg,
      setmeta,
    }
  },
})

