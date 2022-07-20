import { defineComponent, onMounted, PropType, ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from '@/boot/i18n'
import { useGlobalStore } from '@store/globalStore'
import { fieldsTable } from '@store/Modules/fieldsTable'
import { tools } from '@store/Modules/tools'
import { costanti } from '@costanti'
import { shared_consts } from '@/common/shared_vuejs'
import { CMyFieldDb } from '@/components/CMyFieldDb'
import { CDateTime } from '@/components/CDateTime'


export default defineComponent({
  name: 'CNotifSettings',
  props: {
  },
  components: { CMyFieldDb },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const globalStore = useGlobalStore()


    function mounted() {
      //
    }

    onMounted(mounted)

    return {
      t,
      tools,
      costanti,
      shared_consts,
      fieldsTable,
      globalStore,
    }
  },
})

