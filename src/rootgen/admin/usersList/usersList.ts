import { defineComponent, onMounted, ref } from 'vue'

import { CMyPage } from '@/components/CMyPage'
import { CGridTableRec } from '@/components/CGridTableRec'
import { tools } from '@store/Modules/tools'
import { static_data } from '@/db/static_data'

import { fieldsTable } from '@src/store/Modules/fieldsTable'
import { shared_consts } from '@/common/shared_vuejs'

export default defineComponent({
  name: 'UsersList',
  components: { CGridTableRec, CMyPage },
  setup() {

    const arrfilterand: any = ref([])

    function mounted() {
      if (tools.appid() === tools.IDAPP_RISO) {
        arrfilterand.value = [
          {
            label: 'Attivi',
            value: shared_consts.FILTER_ATTIVI
          },
          {
            label: 'Nascosti',
            value: shared_consts.FILTER_NASCOSTI
          },
          {
            label: 'Non hanno l\'Invitante',
            value: shared_consts.FILTER_USER_NO_INVITANTE
          },
          {
            label: 'No Approv. Invitante',
            value: shared_consts.FILTER_USER_NO_VERIFIED_APORTADOR
          },
          {
            label: 'No Telegram ID',
            value: shared_consts.FILTER_USER_NO_TELEGRAM_ID
          },
          {
            label: 'SI Telegram ID',
            value: shared_consts.FILTER_USER_SI_TELEGRAM_ID
          },
          {
            label: 'NO Username Teleg',
            value: shared_consts.FILTER_USER_WITHOUT_USERNAME_TELEGRAM
          },
          {
            label: 'Verifica Teleg interrotta',
            value: shared_consts.FILTER_USER_CODICE_AUTH_TELEGRAM
          },
          {
            label: 'Email non Verificata',
            value: shared_consts.FILTER_USER_NO_EMAIL_VERIFICATA
          },
          {
            label: 'Telegram BOT Rimosso',
            value: shared_consts.FILTER_USER_TELEGRAM_BLOCKED
          }
        ]

      } else if (tools.appid() === tools.IDAPP_FREEPLANET) {
          arrfilterand.value = [
            {
              label: 'Attivi',
              value: shared_consts.FILTER_ATTIVI
            },
          ]
      }
    }

    function db_fieldsTable() {
      return fieldsTable
    }

    onMounted(mounted)

    return {
      arrfilterand,
      fieldsTable,
    }
  }
})


