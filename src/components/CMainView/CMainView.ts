import { defineComponent, ref, computed, PropType, toRef } from 'vue'
import { useUserStore } from '@store/UserStore'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '@store/globalStore'
import { useI18n } from '@/boot/i18n'
import { tools } from '@store/Modules/tools'
import { costanti } from '@store/Modules/costanti'
import { CBigBtn } from '@/components/CBigBtn'


export default defineComponent({
  name: 'CMainView',
  components: { CBigBtn },
  props: {},
  setup(props, { emit }) {

    const userStore = useUserStore()
    const $router = useRouter()
    const globalStore = useGlobalStore()
    const { t } = useI18n()

    const showInfo = ref(false)

    const cardsbig = computed(() => {
      return costanti.MAINCARDS.filter((rec: any) => !rec.small)
    })

    const cardssmall = computed(() => {
      return costanti.MAINCARDS.filter((rec: any) => rec.small)
    })

    return {
      userStore,
      tools,
      costanti,
      cardsbig,
      cardssmall,
      showInfo,
    }
  }
})
