import { computed, defineComponent, onMounted, PropType, ref, watch } from 'vue'

import { CMyFieldDb } from '@/components/CMyFieldDb'
import { CTitleBanner } from '@/components/CTitleBanner'
import { CProfile } from '@/components/CProfile'
import { CDateTime } from '@/components/CDateTime'
import { CMyPage } from '@/components/CMyPage'
import { CMyFieldRec } from '@/components/CMyFieldRec'
import { tools } from '@store/Modules/tools'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useI18n } from '@/boot/i18n'
import { toolsext } from '@store/Modules/toolsext'
import { useQuasar } from 'quasar'
import { costanti } from '@costanti'
import { IColGridTable, IImgGallery, IUserFields } from 'model'
import { shared_consts } from '@/common/shared_vuejs'
import { colCitys, fieldsTable } from '@store/Modules/fieldsTable'

export default defineComponent({
  name: 'CMyCardGrpPopup',
  components: { CProfile, CTitleBanner, CMyFieldDb, CDateTime, CMyPage, CMyFieldRec },
  props: {
    table: {
      type: String,
      required: true,
    },
    prop_myrec: {
      type: Object as PropType<any>,
      required: false,
      default: null,
    },
    idRec: {
      type: Number,
      required: false,
      default: 0
    }
  },
  setup(props) {

    const userStore = useUserStore()
    const globalStore = useGlobalStore()
    const $q = useQuasar()
    const { t } = useI18n()

    const showPic = ref(false)

    const myrec = ref({})
    const col = ref(<IColGridTable>{})

    function profile() {
      return userStore.my.profile
    }

    function load() {
      // Carica il profilo di quest'utente
      if (props.idRec > 0) {
        userStore.loadGeneric(props.table, props.idRec).then((ris) => {
          myrec.value = ris
        })

      } else {
        myrec.value = props.prop_myrec
      }

      col.value = fieldsTable.getArrColsByTable(props.table)
    }

    watch(() => props.idRec, (to: any, from: any) => {
      load()
    })

    function mounted() {
      load()
    }

    function condividipag() {
      return tools.copyStringToClipboard($q, self.location.host + tools.getPathByGroup(myrec.value, props.table), true)
    }

    onMounted(mounted)

    return {
      profile,
      tools,
      costanti,
      myrec,
      shared_consts,
      globalStore,
      showPic,
      userStore,
      t,
      fieldsTable,
      colCitys,
      toolsext,
      col,
      condividipag,
    }
  }
})
