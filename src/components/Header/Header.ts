import { useQuasar } from 'quasar'
import {
  defineComponent, onBeforeMount, onBeforeUnmount, onMounted, ref, toRefs, watch, inject, computed,
} from 'vue'

import { tools } from '@store/Modules/tools'

import { shared_consts } from '@src/common/shared_vuejs'
import { useI18n } from '@src/boot/i18n'
import { boot } from 'quasar/wrappers'
import { useRouter } from 'vue-router'
import MixinUsers from '../../mixins/mixin-users'
import { static_data } from '../../db/static_data'
import messagePopover from '../../layouts/toolbar/messagePopover/messagePopover.vue'
import drawer from '../../layouts/drawer/drawer.vue'
import { toolsext } from '@store/Modules/toolsext'
import { useGlobalStore } from '@store/globalStore'
import { useTestStore } from '@store/testStore'
import { useUserStore } from '@store/UserStore'

export default defineComponent({
  name: 'Header',
  mixins: [MixinUsers],
  components: {
    drawer, messagePopover, // CSigninNoreg, CMyAvatar, CMyCart
  },
  props: {
    extraContent: {
      required: false,
      default: '',
    },
    clBase: {
      required: false,
      default: '',
    },
  },

  setup() {
    const store = inject('store')
    const $q = useQuasar()
    const { t } = useI18n()

    const isUserNotAuth = ref(false)
    const iconConn = ref('wifi')
    const clIconConn = ref('clIconOnline')
    const strConn = ref('')
    const langshort = ref('')
    const clCloudUpload = ref('')
    const clCloudDownload = ref('')
    const clCloudUp_Indexeddb = ref('')
    const tabcmd = ref('')
    const clCloudDown_Indexeddb = ref('clIndexeddbsend')
    const photo = ref('')
    const visuimg = ref(true)

    const userStore = useUserStore()
    const globalStore = useGlobalStore()
    const testStore = useTestStore()

    const stateconn = ref(globalStore.stateConnection)

    function isonline() {
      return globalStore.stateConnection === 'online'
    }

    function isAdmin() {
      return userStore.isAdmin
    }

    function isManager() {
      return userStore.isManager
    }

    const isSocio = computed(() => userStore.my.profile.socio)

    function isSocioResidente() {
      return userStore.my.profile.socioresidente
    }

    function isConsiglio() {
      return userStore.my.profile.consiglio
    }

    function getcolormenu() {
      // @ts-ignore
      return this.isSocio ? 'green-7' : 'white'
    }

    function isTutor() {
      return userStore.isTutor
    }

    function isZoomeri() {
      return userStore.isZoomeri
    }

    function isTratuttrici() {
      return userStore.isTratuttrici
    }

    function conndata_changed() {
      return globalStore.connData
    }

    function snakeToCamel(str: string) {
      return str.replace(/(-\w)/g, (m) => m[1].toUpperCase())
    }

    function setLangAtt(mylang: string) {
      console.log('LANG =', mylang)
      // console.log('PRIMA $q.lang.isoName', $q.lang.isoName)

      // dynamic import, so loading on demand only
      import(`quasar/lang/${mylang}`).then((lang) => {
        $q.lang.set(lang.default)

        import('../../statics/i18n').then(() => {
          // console.log('MY LANG DOPO=', $q.lang.isoName)
        })
      })

      globalStore.addDynamicPages()
    }

    function setshortlang(lang: string) {
      for (const indrec in static_data.lang_available) {
        if (static_data.lang_available[indrec].value === lang) {
          // console.log('static_data.lang_available[indrec].short', static_data.lang_available[indrec].short, static_data.lang_available[indrec].value)
          langshort.value = static_data.lang_available[indrec].short
          return
        }
      }
    }

    function isNewVersionAvailable() {
      return globalStore.isNewVersionAvailable
    }

    // -------------------------------------------------------------------------
    // QUASAR Example using myevent to open drawer from another component or page
    // -------------------------------------------------------------------------
    // (1) This code is inside layout file that have a drawer
    //     if leftDrawerOpen is true, drawer is displayed

    // (2) Listen for an myevent in created
    /*    created(){
          $root.$on("openLeftDrawer", openLeftDrawercb);
        },
        methods: {
          openURL,
          // (3) Define the callback in methods
          openLeftDrawercb() {
          leftDrawerOpen = !leftDrawerOpen;
        }
      }

      // (4) In another component or page, emit the myevent!
      //     Call the method when clicking button etc.
      methods: {
        openLeftDrawer() {
          $root.$emit("openLeftDrawer");
        }
      }
    // -------------------------------------------------------------------------
    */

    const leftDrawerOpen = computed({
      get: () => globalStore.leftDrawerOpen,
      set: val => {
        globalStore.leftDrawerOpen = val
      },
    })

    const rightDrawerOpen = computed({
      get: () => globalStore.rightDrawerOpen,
      set: val => {
        globalStore.rightDrawerOpen = val
        if (globalStore.rightDrawerOpen) globalStore.rightCartOpen = false
      },
    })

    const rightCartOpen = computed({
      get: () => globalStore.rightCartOpen,
      set: val => {
        globalStore.rightCartOpen = val
        if (globalStore.rightCartOpen) globalStore.rightDrawerOpen = false
      },
    })

    const lang = computed({
      get: () => $q.lang.isoName,
      set: mylang => {
        console.log('set lang', $q.lang.getLocale())
        $q.lang.set(snakeToCamel(mylang))
        // tools.showNotif($q, 'IMPOSTA LANG= ' + $i18n.locale)
        // console.log('IMPOSTA LANG= ' + $i18n.locale)

        userStore.setlang($q.lang.getLocale())

        let mylangtopass = mylang

        mylangtopass = toolsext.checkLangPassed(mylangtopass)

        setshortlang(mylangtopass)

        setLangAtt(mylangtopass)

        userStore.setLangServer()
      },
    })

    watch(
      stateconn,
      // @ts-ignore
      (value: string, oldValue: string) => {
        globalStore.stateConnection = value
      },
    )

    watch(
      conndata_changed,
      (value, oldValue) => {
        clCloudUpload.value = (value.uploading_server === 1) ? 'clCloudUpload send' : 'clCloudUpload'
        clCloudUpload.value = (value.downloading_server === 1) ? 'clCloudUpload receive' : 'clCloudUpload'
        clCloudUp_Indexeddb.value = (value.uploading_indexeddb === 1) ? 'clIndexeddb send' : 'clIndexeddb'
        clCloudUp_Indexeddb.value = (value.downloading_indexeddb === 1) ? 'clIndexeddb receive' : 'clIndexeddb'

        /* clCloudUpload.value = (value.uploading_server === -1) ? 'clCloudUpload error' : clCloudUpload
        clCloudUpload.value = (value.downloading_server === -1) ? 'clCloudUpload error' : clCloudDownload
        clCloudUp_Indexeddb.value = (value.uploading_indexeddb === -1) ? 'clIndexeddb error' : clCloudUp_Indexeddb
        clCloudUp_Indexeddb.value = (value.downloading_indexeddb === -1) ? 'clIndexeddb error' : clCloudDown_Indexeddb

         */
      },
    )

    /*
  @Watch('conn_changed', { immediate: true, deep: true })
  function changeconn_changed(value: string, oldValue: string) {
    if (value !== oldValue) {

      // console.log('SSSSSSSS: ', value, oldValue)

      const color = (value === 'online') ? 'positive' : 'warning'
      const statoconn = t('connection.conn') + ' ' + ((value === 'online') ? t('connection.online') : t('connection.offline'))

      if (static_data.functionality.SHOW_IF_IS_SERVER_CONNECTION) {

        if (!!oldValue) {
          tools.showNotif($q, statoconn, {
            color,
            icon: 'wifi'
          })
        }

        changeIconConn()
      }
    }
  }

     */

    function RefreshApp() {
      // Unregister Service Worker
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister()
        }
      })
      window.location.reload(true)
    }

    function changeIconConn() {
      iconConn.value = globalStore.stateConnection === 'online' ? 'wifi' : 'wifi_off'
      clIconConn.value = globalStore.stateConnection === 'online' ? 'clIconOnline' : 'clIconOffline'
    }

    function getAppVersion() {
      // return "AA"
      let strv = ''
      if (process.env.DEV) {
        strv = 'DEV '
      } else if (process.env.TEST) {
        strv = 'TEST '
      }
      return `[${strv}${process.env.APP_VERSION}]`
    }

    function getLangAtt() {
      return $q.lang.isoName
    }

    function BeforeMount() {
      // Estrai la Lang dal Localstorage

      // console.log('$q.i18n=', $q.i18n, '$q.getLocale()=', $q.lang.isoName)
      const mybrowserLang = getLangAtt()
      // tools.showNotif($q, 'prima: ' + String(my))

      let mylang = tools.getItemLS(toolsext.localStorage.lang)
      if (mylang === '') {
        if (navigator) {
          mylang = navigator.language
          // console.log(`LANG2 NAVIGATOR ${mylang}`)
        } else {
          mylang = $q.lang.isoName
        }

        // console.log('IMPOSTA LANGMY', mylang)
      }

      mylang = toolsext.checkLangPassed(mylang)

      setLangAtt(mylang)
      setshortlang(mylang)
    }

    function mounted() {
      // Test this by running the code snippet below and then
      // use the "TableOnlyView" checkbox in DevTools Network panel

      // console.log('Event LOAD')
      if (window) {
        window.addEventListener('load', () => {
          // console.log('2) ENTERING Event LOAD')

          function updateOnlineStatus(event: any) {
            if (navigator.onLine) {
              console.log('EVENT ONLINE!')
              // handle online status
              globalStore.setStateConnection('online')
              // mychangeIconConn()
            } else {
              console.log('EVENT OFFLINE!')
              // handle offline status
              globalStore.setStateConnection('offline')
              // mychangeIconConn()
            }
          }

          window.addEventListener('online', updateOnlineStatus)
          window.addEventListener('offline', updateOnlineStatus)
        })
      }
    }

    function imglogo() {
      return `../../${tools.getimglogo()}`
    }

    function getappname() {
      return tools.getsuffisso() + tools.getappname(tools.isMobile())
    }

    function toggleanimation() {
      console.log('toggleanimation')
      visuimg.value = false
      setTimeout(() => {
        visuimg.value = true
      }, 100)
    }

    function logoutHandler() {
      userStore.logout()
        .then(() => {
          // $router.replace('/logout')
          //
          // setTimeout(() => {
          //   $router.replace('/')
          // }, 1000)

          tools.showNotif($q, t('logout.uscito'), { icon: 'exit_to_app' })
        })
    }

    function isLogged() {
      return userStore.isLogged
    }

    function isEmailVerified() {
      return userStore.my.verified_email
    }

    function clickregister() {
      rightDrawerOpen.value = false

      const $router = useRouter()
      $router.replace('/signup')
    }

    function getnumItemsCart() {
      /* const arrcart = Products.cart
      if (!!arrcart) {
        if (!!arrcart.items) {
          const total = arrcart.items.reduce((sum, item) => sum + item.order.quantity, 0)
          return total
        }
      }

       */
      return 0
    }

    function getnumOrdersCart() {
      /* const arrorderscart = Products.orders.filter((rec) => rec.status < shared_consts.OrderStatus.RECEIVED)
      // const arrorderscart = Products.orders
      if (!!arrorderscart) {
        return arrorderscart.length
      }

       */
      return 0
    }

    function getcart() {
      // return Products.cart
      return null
    }

    function getClassColorHeader() {
      if (tools.isTest()) return 'bg-warning'
      if (tools.isDebug()) return 'bg-info'
      return 'bg-primary'
    }

    function changecmd(value: any) {
      console.log('changecmd', value)
      globalStore.changeCmdClick(value)
    }

    onBeforeMount(BeforeMount)
    onMounted(mounted)

    return {
      store,
      static_data,
      globalStore,
      leftDrawerOpen,
      rightDrawerOpen,
      rightCartOpen,
      lang,
      isLogged,
      isEmailVerified,
      getnumOrdersCart,
      t,
      isonline,
      isAdmin,
      isManager, isSocio, isSocioResidente, isConsiglio, getcolormenu,
      isNewVersionAvailable,
      getAppVersion,
      RefreshApp,
      changecmd,
      imglogo,
      getappname,
      toggleanimation,
    }
  },

})
