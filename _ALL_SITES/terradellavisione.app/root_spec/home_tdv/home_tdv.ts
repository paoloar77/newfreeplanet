import { defineComponent, ref, onMounted, watch, computed } from 'vue'

import { useGlobalStore } from '@store/globalStore'
import { useRoute } from 'vue-router'
import { useUserStore } from '@store/UserStore'

import { Logo } from '../../components/logo'

import { Footer } from '../../components/Footer'
import { CMyPage } from '../../components/CMyPage/index'

import { tools } from '@src/store/Modules/tools'
import { static_data } from '@src/db/static_data'
import { toolsext } from '@src/store/Modules/toolsext'
import { Screen } from 'quasar'
import { CCardCarousel, CEventsCalendar, COpenStreetMap } from '@components'
import MixinBase from '@src/mixins/mixin-base'
import { firstimagehome } from '@src/db/static_data'
import MixinMetaTags from '@/mixins/mixin-metatags'

export default defineComponent({
  name: 'Home_tdv',
  components: { Logo, Footer, CMyPage, CCardCarousel, CEventsCalendar, COpenStreetMap },

  setup() {
    const animare = ref(0)
    const slide = ref('first')
    const slide2 = ref(1)

    const getImmagini = ref([
      {
        title: '', subtitle: '',
        alt: 'Elisa e Cristina insieme',
        img: '../../statics/images/eventi_esterni/IMG_6035.jpg'
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
      getImmagini,
      getValDb,
      firstimagehome,
      getsrcbyimg,
      setmeta,
    }
  },
})

