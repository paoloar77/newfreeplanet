import { defineComponent, ref, computed, PropType, toRef } from 'vue'
import { useUserStore } from '@store/UserStore'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '@store/globalStore'
import { useI18n } from '@/boot/i18n'
import { tools } from '@store/Modules/tools'
import { costanti } from '@store/Modules/costanti'
import { static_data } from '@src/db/static_data'


export default defineComponent({
  name: 'CCheckIfIsLogged',
  components: {  },
  props: {},
  setup(props, { emit }) {

    const userStore = useUserStore()
    const $router = useRouter()
    const globalStore = useGlobalStore()
    const { t } = useI18n()

    return {
      userStore,
      tools,
      costanti,
      static_data,
    }
  }
})
