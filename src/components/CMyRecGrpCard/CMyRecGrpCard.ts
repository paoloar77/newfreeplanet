import { defineComponent, onMounted, PropType, ref, watch } from 'vue'
import { useUserStore } from '@store/UserStore'
import { IImgGallery, IUserFields, IUserProfile } from 'model'
import { costanti } from '@costanti'
import { shared_consts } from '@/common/shared_vuejs'
import { fieldsTable } from '@store/Modules/fieldsTable'
import { tools } from '@store/Modules/tools'
import { toolsext } from '@store/Modules/toolsext'
import { useQuasar } from 'quasar'
import { useI18n } from '@/boot/i18n'
import { CMyCardPopup } from '@/components/CMyCardPopup'
// import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'CMyRecGrpCard',
  components: { CMyCardPopup },
  emits: ['setCmd', 'cmdext'],
  props: {
    table: {
      type: String,
      required: true,
    },
    prop_myrec: {
      type: Object as PropType<any | null>,
      required: false,
      default: null,
    },
  },

  setup(props, { emit }) {

    const userStore = useUserStore()
    // const $q = useQuasar()
    const { t } = useI18n()
    // const $router = useRouter()

    const myrec = ref(<any | null>null)

    const visupage = ref(false)

    watch(() => props.prop_myrec, (newval, oldval) => {

      mounted()
    })

    function mounted() {
      if (props.prop_myrec) {
        myrec.value = props.prop_myrec
      }
    }

    function showBadge() {
      if (shared_consts.TABLES_SHOW_ADTYPE.includes(props.table)) {
        return true
      }

      return false
    }

    function getImgUser(profile: IUserFields) {
      return userStore.getImgByProfile(profile)
    }

    /*function naviga(path: string) {
      $router.push(path)
    }*/

    function setCmd($q: any, cmd: number, myusername: string, value: any, groupname: string) {
      emit('setCmd', $q, cmd, myusername, value, groupname)
    }

    function cmdExt(cmd: any, val1: any, val2: any) {
      emit('cmdext', cmd, val1, val2)
    }

    onMounted(mounted)

    return {
      t,
      myrec,
      costanti,
      getImgUser,
      // naviga,
      setCmd,
      shared_consts,
      userStore,
      tools,
      toolsext,
      fieldsTable,
      cmdExt,
      visupage,
      showBadge,
    }
  },
})
