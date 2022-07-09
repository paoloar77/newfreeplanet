import { defineComponent, ref, computed, PropType, toRef, onMounted, onBeforeUnmount } from 'vue'
import { useUserStore } from '@store/UserStore'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '@store/globalStore'
import { useI18n } from '@/boot/i18n'
import { tools } from '@store/Modules/tools'
import { LandingFooter, Logo } from '@components'


export default defineComponent({
  name: 'CPresentazione',
  components: {Logo, LandingFooter},
  props: {},
  setup() {
    const { t } = useI18n();
    const $router = useRouter()
    const visibile = ref(false)
    const cardvisible = ref('hidden')
    const displaycard = ref('block')
    const firstClassSection = ref('fade homep-cover-img animate-fade homep-cover-img-1')
    const polling: any = ref()
    const slide = ref('first')
    const animare = ref(0)

    function initprompt() {
      window.addEventListener('beforeinstallprompt', (event) => {
        // console.log('********************************   beforeinstallprompt fired')
        event.preventDefault()
        // console.log('§§§§§§§§§§§§§§§§§§§§  IMPOSTA DEFERRED PROMPT  !!!!!!!!!!!!!!!!!  ')
        // #Todo++ IMPOSTA DEFERRED PROMPT
        return false
      })
    }

    function created() {
      initprompt()

      animare.value = process.env.DEV ? 0 : 8000
    }

    onMounted(() => {
      let primo = true
      const mytime = 10000
      polling.value = setInterval(() => {
        firstClassSection.value = `landing_background fade homep-cover-img ${primo ? 'homep-cover-img-2' : 'homep-cover-img-1'}`
        primo = !primo

        // console.log('this.firstClassSection', this.firstClassSection)
      }, mytime)
    })

    function appname() {
      return t('msg.myAppName')
    }

    onBeforeUnmount(() => {
      console.log('beforeDestroy')
      clearInterval(polling.value)
    })

    function meta() {
      return {
        keywords: { name: 'keywords', content: 'Quasar website' },
        // meta tags
        meta: {
          mykey: { name: 'mykey', content: 'Key 1' },
          description: { name: 'description', content: 'Page 1' },
          keywords: { name: 'keywords', content: 'Quasar website' },
          equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
        },
      }
    }

    function mystilecard() {
      return {
        visibility: cardvisible.value,
        display: displaycard.value,
      }
    }

    function getenv(myvar: any) {
      try {
        return process.env[myvar]
      } catch (e) {
        return ''
      }
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

    created()

    return {
      t,
      appname,
      meta,
      mystilecard,
      getenv,
      getPermission,
      NotServiceWorker,
      PagLogin,
      PagReg,
      openCreatePostModal,
      slide,
      tools,
      animare,
    }
  },
})
