import { computed, defineComponent, PropType, ref } from 'vue'

import { ICalcStat, IOperators } from '../../model'
import { useUserStore } from '../../store/UserStore'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '../../store/globalStore'
import { useI18n } from '../../boot/i18n'
import { CTitleBanner } from '@/components/CTitleBanner'
import { tools } from '@store/Modules/tools'

import { CVerifyEmail } from '@src/components/CVerifyEmail'
import { CVerifyTelegram } from '@src/components/CVerifyTelegram'

import { static_data } from '@src/db/static_data'

import MixinUsers from '@/mixins/mixin-users'


export default defineComponent({
  name: 'CUserNonVerif',
  components: {
    CTitleBanner, CVerifyTelegram, CVerifyEmail,
  },
  props: {
  },
  setup(props) {

    const userStore = useUserStore()
    const globalStore = useGlobalStore()

    return {
      userStore,
      globalStore,
      tools,
      static_data,
    }
  },
})
