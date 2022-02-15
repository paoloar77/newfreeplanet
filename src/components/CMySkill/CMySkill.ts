import { defineComponent, onMounted, PropType, ref, watch } from 'vue'
import { useUserStore } from '@store/UserStore'
import { IImgGallery, IMySkill, IUserFields, IUserProfile } from 'model'
import { costanti } from '@costanti'
import { shared_consts } from '@/common/shared_vuejs'
import { fieldsTable } from '@store/Modules/fieldsTable'
import { tools } from '@store/Modules/tools'
import { useQuasar } from 'quasar'
import { useI18n } from '@/boot/i18n'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'CMySkill',
  emits: ['setCmd', 'cmdext'],
  props: {
    prop_myskill: {
      type: Object as PropType<IMySkill | null>,
      required: false,
      default: null,
    },
  },

  setup(props, { emit }) {

    const userStore = useUserStore()
    const $q = useQuasar()
    const { t } = useI18n()
    const $router = useRouter()
    const $route = useRoute()

    const username = ref('')

    const myskill = ref(<IMySkill | null>null)

    watch(() => props.prop_myskill, (newval, oldval) => {
      console.log('watch: myskill')
      mounted()
    })

    function mounted() {
      if (props.prop_myskill) {
        myskill.value = props.prop_myskill
      }
    }

    function getImgUser(profile: IUserFields) {
      return userStore.getImgByProfile(profile)
    }

    function naviga(path: string) {
      $router.push(path)
    }

    function setCmd($q: any, cmd: number, myusername: string, value: any, groupname: string) {
      emit('setCmd', $q, cmd, myusername, value, groupname)
    }

    function cmdExt(cmd: any, val1: any, val2: any) {
      emit('cmdext', cmd, val1, val2)
    }

    onMounted(mounted)

    return {
      myskill,
      costanti,
      getImgUser,
      naviga,
      setCmd,
      shared_consts,
      userStore,
      tools,
      fieldsTable,
      cmdExt,
    }
  },
})
