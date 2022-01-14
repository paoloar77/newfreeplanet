import { defineComponent, onMounted, PropType, ref, watch } from 'vue'
import { useUserStore } from '@store/UserStore'
import { IImgGallery, IUserFields, IUserProfile } from 'model'
import { costanti } from '@costanti'
import { shared_consts } from '@/common/shared_vuejs'
import { tools } from '@store/Modules/tools'
import { useQuasar } from 'quasar'
import { useI18n } from '@/boot/i18n'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'CMyUser',
  emits: ['setCmd'],
  props: {
    mycontact: {
      type: Object as PropType<IUserFields | null>,
      required: false,
      default: null,
    },
    myusername: {
      type: String,
      required: false,
      default: null,
    },
    visu: {
      type: Number,
      required: true,
    }
  },

  setup(props, { emit }) {

    const userStore = useUserStore()
    const $q = useQuasar()
    const { t } = useI18n()
    const $router = useRouter()
    const $route = useRoute()

    const username = ref('')

    const contact = ref(<IUserFields | null>null)

    watch(() => props.mycontact, (newval, oldval) => {
      console.log('watch: mycontact')
      mounted()
    })

    function mounted() {
      if (!props.mycontact) {
        if (props.myusername) {
          username.value = props.myusername
          //++Todo: carica contact
          contact.value = null
        }
      } else {
        if (props.mycontact) {
          contact.value = props.mycontact
          username.value = props.mycontact.username
        }
      }
    }

    function getImgUser(profile: IUserFields) {
      return userStore.getImgByProfile(profile)
    }

    function naviga(path: string) {
      $router.push(path)
    }

    function setCmd(cmd: number, myusername: string, value: any = '') {
      emit('setCmd', cmd, myusername, value)
    }

    onMounted(mounted)

    return {
      contact,
      costanti,
      getImgUser,
      naviga,
      setCmd,
      shared_consts,
      userStore,
    }
  },
})
