import { defineComponent, ref } from 'vue'

import { CTitleBanner } from '../../../components/CTitleBanner'
import { CDateTime } from '../../../components/CDateTime'
import { CMyFieldDb } from '../../../components/CMyFieldDb'
import { useQuasar } from 'quasar'
import { useI18n } from '@/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { tools } from '@store/Modules/tools'

export default defineComponent({
  name: 'Dbop',
  components: { CTitleBanner, CDateTime, CMyFieldDb },
  props: {},
  setup() {
    const $q = useQuasar()
    const { t } = useI18n()

    const ris = ref('')
    const riga = ref(0)
    const numpersone = ref(7)
    const date_start = ref(new Date())
    const col = ref(0)
    const placca = ref('')
    const incaricamento = ref(false)

    function EseguiFunz(miafunz: string) {
      const userStore = useUserStore()
      const globalStore = useGlobalStore()

      $q.dialog({
        message: t('dialog.continue') + ' ' + miafunz + ' ?',
        cancel: {
          label: t('dialog.cancel'),
        },
        ok: {
          label: t('dialog.yes'),
          push: true,
        },
        title: 'Funzione:',
      }).onOk(async () => {
        const mydata = {
          dbop: miafunz,
          riga: riga,
          col: col,
          date_start: date_start,
          numpersone: numpersone,
        }

        incaricamento.value = true
        $q.loading.show({ message: t('otherpages.update') })

        const risfunz = await userStore.execDbOp({ mydata })

        $q.loading.hide()
        await globalStore.loadSite()

        incaricamento.value = false

        console.log('risfunz', risfunz)

        ris.value = ''

        if (miafunz === 'visuPlacca') {
          placca.value = risfunz.placca
        } else if (miafunz === 'visuListaIngresso' || miafunz === 'visuListaIngressoNuovi' || miafunz === 'visuNaviUtentiEliminati'
          || miafunz === 'visuListaNave' || miafunz === 'visuNave' || miafunz === 'creaNavi'
          || (miafunz === 'visuStat')) {
          placca.value = risfunz.mystr
        }
      })
    }

    return {
      EseguiFunz,
      tools,
    }
  },
})
