import { CMyFieldDb } from '@/components/CMyFieldDb'
import { CTitleBanner } from '@/components/CTitleBanner'
import { CProfile } from '@/components/CProfile'
import { tools } from '@store/Modules/tools'
import { defineComponent } from 'vue'
import { useUserStore } from '@store/UserStore'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '@store/globalStore'
import { useI18n } from '@/boot/i18n'
import { toolsext } from '@store/Modules/toolsext'
import { useQuasar } from 'quasar'
import { costanti } from '@costanti'


export default defineComponent({
  name: 'Profile',
  components: { CProfile, CTitleBanner, CMyFieldDb },
  props: {},
  setup() {
    const userStore = useUserStore()
    const $router = useRouter()
    const globalStore = useGlobalStore()
    const $q = useQuasar()
    const { t } = useI18n();

    function getpayment() {
      return userStore.my.profile.paymenttypes
    }

    function profile() {
      return userStore.my.profile
    }

    function eliminaAccount() {

      $q.dialog({
        message: t('reg.cancellami', { sitename: t('ws.sitename') }),
        cancel: {
          label: t('dialog.cancel')
        },
        ok: {
          label: t('dialog.yes'),
          push: true
        },
        title: t('pages.profile')
      }).onOk(() => {
        $q.dialog({
          message: t('reg.cancellami_2', { sitename: t('ws.sitename') }),
          cancel: {
            label: t('dialog.cancel')
          },
          ok: {
            label: t('dialog.yes'),
            push: true
          },
          title: t('pages.profile')
        })
          .onOk(() => {
            globalStore.DeleteRec({ table: toolsext.TABUSER, id: userStore.my._id })
              .then((ris: any) => {
                if (ris) {
                  tools.showPositiveNotif($q, t('reg.account_cancellato'))
                  userStore.logout()
                  $router.replace('/')
                } else
                  tools.showNegativeNotif($q, t('db.recfailed'))

              })
          })
      })
    }

    return {
      eliminaAccount,
      profile,
      getpayment,
      tools,
      costanti,
    }
  }
})
