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
      if (tools.appid() === tools.IDAPP_AYNI) {
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
            label: 'Navi Non Presenti!',
            value: shared_consts.FILTER_NAVI_NON_PRESENTI
          },
          {
            label: 'Non hanno visto Zoom',
            value: shared_consts.FILTER_USER_NO_ZOOM
          },
          {
            label: 'hanno detto di aver visto lo Zoom',
            value: shared_consts.FILTER_ASK_ZOOM_VISTO
          },
          {
            label: 'Non hanno l\'Invitante',
            value: shared_consts.FILTER_USER_NO_INVITANTE
          },
          {
            label: 'No Telegram ID',
            value: shared_consts.FILTER_USER_NO_TELEGRAM_ID
          },
          {
            label: 'Verifica Telegram interrotta',
            value: shared_consts.FILTER_USER_CODICE_AUTH_TELEGRAM
          },
          {
            label: 'Email non Verificata',
            value: shared_consts.FILTER_USER_NO_EMAIL_VERIFICATA
          },
          {
            label: 'Non hanno compilato il sogno',
            value: shared_consts.FILTER_USER_NO_DREAM
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

    function userlist() {

      if (static_data.functionality.ENABLE_REG_AYNI) {
        return db_fieldsTable().colTableUsers
      } else if (static_data.functionality.ENABLE_REG_CNM) {
        return db_fieldsTable().colTableUsersCNM
      } else if (static_data.functionality.ENABLE_REG_ISP) {
        return db_fieldsTable().colTableUsersISP
      } else {
        return db_fieldsTable().colTableUsersBase
      }
    }

    onMounted(mounted)

    return {
      arrfilterand,
      userlist,
    }
  }
})


