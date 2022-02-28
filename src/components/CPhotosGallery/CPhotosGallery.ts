import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'

import { Logo } from '../../components/logo'

import { Footer } from '../../components/Footer'

import { toolsext } from '@src/store/Modules/toolsext'
import { CImgTitle } from '../../components/CImgTitle/index'
import { useQuasar } from 'quasar'
import { static_data } from '@src/db/static_data'
import { useI18n } from '@/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useRouter } from 'vue-router'
import { IColl } from 'model'


export default defineComponent({
  name: 'PhotosGallery',
  components: { Logo, Footer, CImgTitle },
  props: {
    mygallery: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()

    const userStore = useUserStore()
    const $router = useRouter()

    const text = ''
    let visibile = ref(false)
    const cardvisible = ref('hidden')
    const displaycard = ref('block')

    const firstClassSection = ref('fade homep-cover-img animate-fade homep-cover-img-1')

    const polling = ref()

    const slide2 = ref(1)
    const animare = ref(0)
    const activePanelImg = ref(0)
    const withThumbnails = ref(true)
    const withCaptions = ref(true)
    const allunga = ref(false)
    const fullscreen = ref(false)
    const myclass = ref('')
    const dimensione = ref('')
    const dimensioneImg: any = [
      {
        id: 0,
        label: 'Piccola',
        value: 0
      },
      {
        id: 1,
        label: 'Media',
        value: 1
      },
      {
        id: 2,
        label: 'Grande',
        value: 2
      },
      {
        id: 3,
        label: 'Molto Grande',
        value: 3
      }
    ]

    function changeAllunga(value: any, evt: any) {
      if (value)
        myclass.value = 'allunga'
      else
        myclass.value = ''
    }

    function getappname() {
      return t('msg.myAppName')
    }

    function mounted() {
      initprompt()

      let primo = true
      const mytime = 10000
      polling.value = setInterval(() => {

        firstClassSection.value = 'landing_background fade homep-cover-img ' + (primo ? 'homep-cover-img-2' : 'homep-cover-img-1')
        primo = !primo

        // console.log('firstClassSection', firstClassSection)

      }, mytime)
    }

    function appname() {
      return process.env.APP_NAME
    }

    function beforeDestroy() {
      console.log('beforeDestroy')
      clearInterval(polling.value)
    }

    function created() {
      animare.value = process.env.DEV ? 0 : 8000
    }

    function meta() {
      return {
        keywords: { name: 'keywords', content: 'Quasar website' },
        // meta tags
        meta: {
          mykey: { name: 'mykey', content: 'Key 1' },
          description: { name: 'description', content: 'Page 1' },
          keywords: { name: 'keywords', content: 'Quasar website' },
          equiv: { 'http-equiv': 'Content-Type', 'content': 'text/html; charset=UTF-8' }
        }
      }
    }

    function mystilecard() {
      return {
        visibility: cardvisible,
        display: displaycard
      }
    }

    function getenv(myvar: any) {
      return process.env[myvar]
    }

    function initprompt() {
      window.addEventListener('beforeinstallprompt', function (event) {
        // console.log('********************************   beforeinstallprompt fired')
        event.preventDefault()
        // console.log('§§§§§§§§§§§§§§§§§§§§  IMPOSTA DEFERRED PROMPT  !!!!!!!!!!!!!!!!!  ')
        // #Todo++ IMPOSTA DEFERRED PROMPT
        return false
      })

    }

    function isInCostruction() {
      return process.env.IN_CONSTRUCTION === '1'
    }

    function getPermission() {
      return Notification.permission
    }

    function NotServiceWorker() {
      return (!('serviceWorker' in navigator))
    }

    function PagLogin() {
      $router.replace('/signin')
    }

    function PagReg() {
      $router.replace('/signup')
    }

    function openCreatePostModal() {
      console.log('APERTO ! openCreatePostModal')

      visibile.value = !visibile.value

      if (visibile.value) {
        displaycard.value = 'block'
        cardvisible.value = 'visible'
      } else {
        displaycard.value = 'block'
        cardvisible.value = 'hidden'
      }

    }

    function getmywidth(rec: IColl) {
      return rec.width
    }

    function getmyheight(rec: IColl) {
      return rec.height
    }

    function setTransition(newVal: any, oldVal: any) {
      // console.log('setTransition', newVal, oldVal)
      activePanelImg.value = newVal
    }

    function getsubtitle(data: IColl) {
      if (data.subtitle[toolsext.getLocale()])
        return data.subtitle[toolsext.getLocale()]
      else {
        return data.subtitle[static_data.arrLangUsed[0]]
      }
    }

    function getTitle(data: IColl) {
      if (data.title[toolsext.getLocale()])
        return data.title[toolsext.getLocale()]
      else {
        return data.title[static_data.arrLangUsed[0]]
      }
    }

    function changedim(value: any) {
      myclass.value = 'allunga' + value
      // console.log('myclass', myclass, value)
    }

    onMounted(mounted)

    onBeforeUnmount(beforeDestroy)

    created()

    return {
      slide2,
      animare,
      activePanelImg,
      withThumbnails,
      withCaptions,
      allunga,
      fullscreen,
      myclass,
      dimensione,
      dimensioneImg,
      changeAllunga,
      getappname,
      appname,
      mystilecard,
      getenv,
      isInCostruction,
      getPermission,
      NotServiceWorker,
      PagLogin,
      PagReg,
      openCreatePostModal,
      getmywidth,
      getmyheight,
      setTransition,
      getsubtitle,
      getTitle,
      changedim,
    }
  }
})
