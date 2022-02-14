import { defineComponent, onMounted, PropType, ref, watch } from 'vue'
import { useUserStore } from '@store/UserStore'
import { IMyGroup, IImgGallery, IUserFields, IUserProfile } from 'model'
import { costanti } from '@costanti'
import { shared_consts } from '@/common/shared_vuejs'
import { tools } from '@store/Modules/tools'
import { useQuasar } from 'quasar'
import { useI18n } from '@/boot/i18n'
import { useRoute, useRouter } from 'vue-router'
import { CUserNonVerif } from '@/components/CUserNonVerif'

export default defineComponent({
  name: 'CMyGroup',
  emits: ['setCmd'],
  components: {CUserNonVerif},
  props: {
    mygrp: {
      type: Object as PropType<IMyGroup | null>,
      required: false,
      default: null,
    },
    mygroupname: {
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

    const groupname = ref('')

    const grp = ref(<IMyGroup | null>null)

    watch(() => props.mygrp, (newval, oldval) => {
      mounted()
    })

    function mounted() {
      if (!props.mygrp) {
        if (props.mygroupname) {
          groupname.value = props.mygroupname
          //++Todo: carica contact
          grp.value = null
        }
      } else {
        if (props.mygrp) {
          grp.value = props.mygrp
          groupname.value = props.mygrp.groupname
        }
      }
    }

    function getImgGroup(group: IMyGroup) {
      return userStore.getImgByGroup(group)
    }

    function naviga(path: string) {
      $router.push(path)
    }

    function setCmd(cmd: number, myusername: string, value: any = '') {
      emit('setCmd', cmd, myusername, value)
    }

    onMounted(mounted)

    return {
      grp,
      costanti,
      getImgGroup,
      naviga,
      setCmd,
      shared_consts,
      userStore,
      tools,
      $q,
    }
  },
})
