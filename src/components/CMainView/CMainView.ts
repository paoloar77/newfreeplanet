import { defineComponent, ref, computed, PropType, toRef } from 'vue'
import { useUserStore } from '@store/UserStore'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '@store/globalStore'
import { useI18n } from '@/boot/i18n'
import { tools } from '@store/Modules/tools'
import { costanti, IMainCard } from '@store/Modules/costanti'
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
      // @ts-ignore
      return costanti.MAINCARDS.filter((rec: IMainCard) => !rec.small && rec.visible && !rec.link && !rec.visuonstat)
    })

    const cardssmall = computed(() => {
      return costanti.MAINCARDS.filter((rec: any) => rec.small && rec.visible && !rec.link && !rec.visuonstat)
    })

    const arrlinks = computed(() => {
      return costanti.MAINCARDS.filter((rec: any) => rec.link && rec.visible)
    })

    return {
      userStore,
      tools,
      costanti,
      cardsbig,
      cardssmall,
      arrlinks,
      showInfo,
    }
  }
})
