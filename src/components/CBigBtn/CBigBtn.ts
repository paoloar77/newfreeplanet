import { defineComponent, ref, computed, PropType, toRef } from 'vue'
import { useUserStore } from '@store/UserStore'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '@store/globalStore'
import { useI18n } from '@/boot/i18n'
import { tools } from '@store/Modules/tools'


export default defineComponent({
  name: 'CBigBtn',
  components: {},
  props: {
    label: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: false,
      default: ''
    },
    icon: {
      type: String,
      required: false,
      default: ''
    },
    color: {
      type: String,
      required: false,
      default: 'grey'
    },
    small: {
      type: Boolean,
      required: false,
      default: false
    },
    numcol: {
      type: Number,
      required: false,
      default: 3
    },
  },
  setup(props, { emit }) {

    const userStore = useUserStore()
    const $router = useRouter()
    const globalStore = useGlobalStore()
    const { t } = useI18n();

    return {
      userStore,
      tools,
    }
  }
})
