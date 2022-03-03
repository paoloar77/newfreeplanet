import { computed, defineComponent, PropType, ref } from 'vue'

import { ICalcStat, IOperators } from '../../model'
import { useUserStore } from '../../store/UserStore'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '../../store/globalStore'
import { useI18n } from '../../boot/i18n'

import { shared_consts } from '@src/common/shared_vuejs'
import { costanti, IMainCard } from '@store/Modules/costanti'

import { tools } from '@store/Modules/tools'

export default defineComponent({
  name: 'CDashboard',
  props: {},
  setup(props) {

    const userStore = useUserStore()
    const $router = useRouter()
    const globalStore = useGlobalStore()
    const { t } = useI18n()

    const calcstat = computed(() => userStore.my.calcstat ? userStore.my.calcstat : {
      numUsersReg: 0,
      numByTab: {},
    })

    const visustat = computed(() => {
      // @ts-ignore
      return costanti.MAINCARDS.filter((rec: IMainCard) => rec.visuonstat)
    })

    return {
      userStore,
      tools,
      calcstat,
      shared_consts,
      visustat,
    }
  },
})
