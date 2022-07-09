import {
  defineComponent, onMounted,  ref,
} from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useQuasar } from 'quasar'

// PropType,

export default defineComponent({
  name: 'BannerCookies',
  components: {},
  props: {
    urlInfo: {
      type: String,
      required: true,
    },
  },

  setup(props, context) {
    const { t } = useI18n();

    const $q = useQuasar()

    const elementId = ref<string>('id');
    const disableDecline = ref<boolean>(true);
    const debug = ref<boolean>(false);
    const status = ref<string | null>(null);
    const supportsLocalStorage = ref<boolean>(true);
    const isOpen = ref<boolean>(false);

    const getCookieStatus = (): string | null => {
      if (supportsLocalStorage.value) {
        return localStorage.getItem(`cookie-${elementId.value}`)
      }
      return null
      // return tinyCookie.get(`cookie-${this.elementId}`)
    }

    const init = (): void => {
      const visitedType = getCookieStatus()
      if (visitedType && (visitedType === 'accept' || visitedType === 'decline' || visitedType === 'postpone')) {
        isOpen.value = false
      }

      if (!visitedType) {
        isOpen.value = true
      }
      if (!supportsLocalStorage.value) isOpen.value = false

      status.value = visitedType
      context.emit('status', visitedType)
    }

    const checkLocalStorageFunctionality = (): void => {
      // Check for availability of localStorage
      try {
        const test = '__cookie-check-localStorage'
        window.localStorage.setItem(test, test)
        window.localStorage.removeItem(test)
      } catch (e) {
        console.error('Local storage is not supported, falling back to cookie use')
        supportsLocalStorage.value = false
      }
    }

    const setCookieStatus = (type: string): void => {
      if (supportsLocalStorage.value) {
        if (type === 'accept') {
          localStorage.setItem(`cookie-${elementId.value}`, 'accept')
        }
        if (type === 'decline') {
          localStorage.setItem(`cookie-${elementId.value}`, 'decline')
        }
        if (type === 'postpone') {
          localStorage.setItem(`cookie-${elementId.value}`, 'postpone')
        }
      } else {
        /* if (type === 'accept') {
          tinyCookie.set(`cookie-${elementId}`, 'accept')
        }
        if (type === 'decline') {
          tinyCookie.set(`cookie-${elementId}`, 'decline')
        }
        if (type === 'postpone') {
          tinyCookie.set(`cookie-${elementId}`, 'postpone')
        } */
      }
    }

    const accept = (): void => {
      if (!debug.value) {
        setCookieStatus('accept')
      }

      status.value = 'accept'
      isOpen.value = false
      context.emit('clicked-accept')
    }

    const decline = (): void => {

      const mytitle = 'Cookies'
      const mytext = t('reg.refuse_cookie')

      return $q.dialog({
        message: mytext,
        html: true,
        ok: {
          label: 'Rifiuta Cookies',
          push: true,
        },
        title: mytitle,
        cancel: true,
        persistent: false,
      }).onOk(() => {
        if (!debug.value) {
          setCookieStatus('decline')
        }

        status.value = 'decline'
        isOpen.value = false
        context.emit('clicked-decline')

      }).onCancel(() => {
        //
      })

    }

    const clickInfo = (): void => {
      isOpen.value = false
    }
    const postpone = (): void => {
      if (!debug.value) {
        setCookieStatus('postpone')
      }

      status.value = 'postpone'
      isOpen.value = false
      context.emit('clicked-postpone')
    }
    const removeCookie = (): void => {
      localStorage.removeItem(`cookie-${elementId.value}`)
      status.value = null
      context.emit('removed-cookie')
    }

    onMounted(init)

    return {
      disableDecline,
      decline,
      accept,
      postpone,
      checkLocalStorageFunctionality,
      clickInfo,
      removeCookie,
      isOpen,
      t,
    }
  },
})
