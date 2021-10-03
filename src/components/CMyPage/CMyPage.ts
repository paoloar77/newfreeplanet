import {
  defineComponent, onMounted, ref, toRef, watch,
} from 'vue'

import { IMyPage } from '@src/model'
import { useGlobalStore } from '@store/globalStore'
import { Footer } from '@/components/Footer'

import { CImgTitle } from '../CImgTitle/index'
import { CTitle } from '../CTitle/index'

export default defineComponent({
  name: 'CMyPage',
  components: { Footer, CImgTitle, CTitle },
  props: {
    title: String,
    mypath: {
      type: String,
      required: false,
      default: '',
    },
    img: {
      type: String,
      required: false,
      default: '',
    },
    imgbackground: {
      type: String,
      required: false,
      default: '',
    },
    sizes: {
      type: String,
      required: false,
      default: '',
    },
    styleadd: {
      type: String,
      required: false,
      default: '',
    },
    nofooter: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  setup(props) {
    const rec = ref<IMyPage | null>(null)
    const mypath = toRef(props, 'mypath')

    const globalStore = useGlobalStore()

    const load = async (): Promise<void> => {
      // console.log('load', mypath.value)
      if (mypath.value !== '') rec.value = await globalStore.loadPage('/'+mypath.value)
    }

    watch(() => props.mypath, async (to: string, from: string) =>  {
      // console.log('load', mypath.value)
      if (mypath.value !== '') rec.value = await globalStore.loadPage('/'+mypath.value)
    })

    // onMounted(load)

    load()

    return { rec }
  },

})
