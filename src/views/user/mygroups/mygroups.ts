import { CMyGroups } from '@/components/CMyGroups'
import { CFinder } from '@/components/CFinder'
import { CGridTableRec } from '@/components/CGridTableRec'
import { tools } from '@store/Modules/tools'
import { toolsext } from '@store/Modules/toolsext'
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useUserStore } from '@store/UserStore'
import { useRoute, useRouter } from 'vue-router'
import { useGlobalStore } from '@store/globalStore'
import { useI18n } from '@/boot/i18n'
import { colmyUserGroup } from '@store/Modules/fieldsTable'
import { ISearchList } from 'model'
import { costanti } from '@costanti'
import { shared_consts } from '@/common/shared_vuejs'

export default defineComponent({
  name: 'mygroups',
  components: { CMyGroups, CGridTableRec, CFinder },
  props: {},
  setup() {
    const userStore = useUserStore()
    const { t } = useI18n()

    const filter = ref(costanti.FIND_GROUP)

    function mounted() {

      const filt_loaded = tools.getCookie(tools.COOK_SEARCH + tools.GROUP_SEARCH)
      filter.value = filt_loaded ? filt_loaded : costanti.FIND_GROUP
    }

    watch(() => filter.value, (newval: any, oldval) => {
      tools.setCookie(tools.COOK_SEARCH + tools.GROUP_SEARCH, newval)

    })
    onMounted(mounted)

    return {
      filter,
      costanti,
      shared_consts,
      colmyUserGroup,
      toolsext,
    }
  }
})
