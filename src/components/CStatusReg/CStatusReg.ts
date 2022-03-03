import {
  computed,
  defineComponent, onBeforeMount, onBeforeUnmount, onMounted, ref, toRef, toRefs, watch,
} from 'vue'

import { INotData } from '../../model/index'
import MixinBase from '@src/mixins/mixin-base'
import { CTitleBanner } from '@components'
import { CCardState } from '../CCardState'
import { CMyFieldRec } from '../CMyFieldRec'
import { CCardStat } from '../CCardStat'
import { CLineChart } from '@components'

// import { CGeoChart } from '@components'
// import { CListNationality } from '@components'


import { tools } from '@store/Modules/tools'
import { costanti } from '@costanti'
import { useGlobalStore } from '@store/globalStore'
import { useUserStore } from '@store/UserStore'
import { useI18n } from '@/boot/i18n'

export default defineComponent({
  name: 'CStatusReg',
  props: {},
  components: { CTitleBanner, CCardState, CCardStat, CLineChart, CMyFieldRec },
  setup(props, { attrs, slots, emit }) {
    const { t } = useI18n()
    const globalStore = useGlobalStore()
    const userStore = useUserStore()

    const NUMSEC_TO_POLLING = ref(300)
    const MAXNUM_POLLING = ref(10)

    const myloadingload = ref(false)
    const eseguipolling = ref(false)
    const polling = ref(<any>null)
    const numpolled = ref(0)

    const datastat = ref(<any>{
      num_reg: 0,
      num_passeggeri: 0,
      num_imbarcati: 0,
      num_teleg_attivo: 0,
      email_non_verif: 0,
      num_teleg_pending: 0,
      lastsreg: [],
      checkuser: { verified_email: false }
    })

    const visustat = computed(() => {
      return datastat.value.num_reg! > 0
    })

    const telegnonattivi = computed(() => {
      return datastat.value.num_reg! - datastat.value.num_teleg_attivo!
    })

    const emailnonverif = computed(() => {
      return datastat.value.email_non_verif
    })

    const lastsreg = computed(() => {
      return datastat.value.lastsreg
    })

    function checkifpolling() {
      if (userStore.my.profile) {
        if (!tools.isUserOk() && tools.appid() === tools.IDAPP_RISO)
          NUMSEC_TO_POLLING.value = 10
      }

      if (eseguipolling.value) {
        clearInterval(polling.value)
        polling.value = null
        if (numpolled.value > 100) {
          NUMSEC_TO_POLLING.value = 60 * 5
        }
        if (numpolled.value < MAXNUM_POLLING.value) {
          if (!polling.value) {
            polling.value = setInterval(() => {
              load()
              numpolled.value++
            }, NUMSEC_TO_POLLING.value * 1000)
          }
        }
      }
    }

    function beforeDestroy() {
      clearInterval(polling.value)
    }

    function created() {
      if (tools.isManager()) {
        MAXNUM_POLLING.value = 100
      }
      load()
    }

    async function load() {
      // console.log('load')
      myloadingload.value = true
      datastat.value = await globalStore.getStatSite()

      // console.log('datastat.value.lastsreg')
      // console.table(datastat.value.lastsreg)

      // console.log('newsstate')
      // console.table('GlobalStore.state.serv_settings', GlobalStore.state.serv_settings)

      eseguipolling.value = true

      // console.log('eseguipolling', eseguipolling)
      myloadingload.value = false

      if (userStore.my) {
        if (datastat.value.checkuser) {
          if (datastat.value.checkuser.verified_email && !userStore.my.verified_email) {
            userStore.my.verified_email = true
            riaggiorna()
          }
          if (userStore.my.profile && datastat.value.checkuser.profile) {
            if ((userStore.my.profile.teleg_id! <= 0 && datastat.value.checkuser.profile.teleg_id > 0) ||
              (userStore.my.profile.teleg_id! !== datastat.value.checkuser.profile.teleg_id!)) {
              userStore.my.profile.teleg_id = datastat.value.checkuser.profile.teleg_id
              riaggiorna()
            }
            if ((userStore.my.profile.teleg_checkcode! <= 0 && datastat.value.checkuser.profile.teleg_checkcode > 0) ||
              (userStore.my.profile.teleg_checkcode !== datastat.value.checkuser.profile.teleg_checkcode)) {
              userStore.my.profile.teleg_checkcode = datastat.value.checkuser.profile.teleg_checkcode
              riaggiorna()
            }
          }
        }
      }

      checkifpolling()
    }

    function riaggiorna() {
      // clearInterval(polling)
      // polling = null
      checkifpolling()
    }

    function calcperc(val1: number, valmax: number) {
      if (valmax > 0)
        return (val1 / valmax * 100)
      else
        return 0
    }

    created()

    onBeforeUnmount(beforeDestroy)

    return {
      calcperc,
      riaggiorna,
      visustat,
      telegnonattivi,
      emailnonverif,
      lastsreg,
      datastat,
      tools,
      costanti,
    }

  }
})
