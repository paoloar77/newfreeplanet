import { defineComponent, ref } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'
import { CMyPage } from '@/components/CMyPage'
import { CTitleBanner } from '@/components/CTitleBanner'
import { CVideo } from '@/components/CVideo'
import { CMyFieldDb } from '@/components/CMyFieldDb'
import { CImgText } from '@/components/CImgText'
import { tools } from '@store/Modules/tools'
import { shared_consts } from '@/common/shared_vuejs'

export default defineComponent({
  name: 'CVideoPromo',
  props: {
    showconditions: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: { CMyPage, CTitleBanner, CImgText, CMyFieldDb, CVideo },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()
    const globalStore = useGlobalStore()

    const msg = ref('')
    const accetta_saw_video = ref(false)

    function created() {
      aggiorna()
    }

    function aggiorna() {
      accetta_saw_video.value = tools.isBitActive(userStore.my.profile.saw_and_accepted, shared_consts.Accepted.CHECK_SEE_VIDEO_PRINCIPI.value)
    }

    function changeval(value: any) {
      if (value)
        userStore.my.profile.saw_and_accepted = tools.SetBit(userStore.my.profile.saw_and_accepted, shared_consts.Accepted.CHECK_SEE_VIDEO_PRINCIPI.value)
      else
        userStore.my.profile.saw_and_accepted = tools.UnSetBit(userStore.my.profile.saw_and_accepted, shared_consts.Accepted.CHECK_SEE_VIDEO_PRINCIPI.value)

      const mydata = {
        'profile.saw_and_accepted': userStore.my.profile.saw_and_accepted
      }

      tools.saveFieldToServer($q, 'users', userStore.my._id, mydata)
    }

    created()

    return {
      msg,
      accetta_saw_video,
      changeval,
      aggiorna,
    }
  }
})
