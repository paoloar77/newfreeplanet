import { computed, defineComponent, PropType, ref } from 'vue'

import { useQuasar } from 'quasar'
import { useI18n } from '@/boot/i18n'
import { useGlobalStore } from '@store/globalStore'
import { ICfgServer } from 'model'

interface IPageSrv {
  page: number,
  rowsPerPage: number // specifying this determines pagination is server-side
}
interface IPageS {
  page: number,
}

export default defineComponent({
  name: 'CfgServer',
  props: {
    loading: {
      type: Boolean,
      default: false,
      required: true,
    },
    paginationControl: {
      type: Object as PropType<IPageSrv>,
      required: true,
      default() {
        return { page: 1, rowsPerPage: 20 }
      },
    },
    pagination: {
      type: Object as PropType<IPageS>,
      required: true,
      default() {
        return { page: 1 }
      },
    },
  },

  setup() {
    const $q = useQuasar()
    const { t } = useI18n()
    const globalStore = useGlobalStore()

    const serverData = computed(() => globalStore.cfgServer.slice()) // [{ chiave: 'chiave1', valore: 'valore 1' }]
    const columns = ref([
      {
        name: 'chiave',
        required: true,
        label: 'Chiave',
        align: 'left',
        field: 'chiave',
        sortable: true,
      },
      { name: 'idapp', label: 'idapp', field: 'idapp', sortable: true },
      { name: 'userid', label: 'UserId', field: 'userid', sortable: false },
      { name: 'valore', label: 'Valore', field: 'valore', sortable: false },
    ])

    const colVisib = ref(['chiave', 'idapp', 'userid', 'valore'])
    const separator = ref('horizontal')
    const filter = ref('')
    const selected = ref([])
    const dark = ref(true)

    const keysel = ref('')
    const userIdsel = ref('')

    function tableClass() {
      if (dark.value) {
        return 'bg-black'
      }
    }

    function selItem(item: any) {
      console.log('item', item)
      keysel.value = item.chiave
      userIdsel.value = item.userId
      console.log('this.keysel', keysel.value)
    }

    function SaveValue(newVal: any, valinitial: any) {
      // console.log('SaveValue', newVal, 'selected', this.selected)

      const mydata: ICfgServer = {
        chiave: keysel.value,
        userId: userIdsel.value,
        valore: newVal,
        idapp: process.env.APP_ID!,
      }

      // Save on Server
      globalStore.saveCfgServerKey(mydata)
    }

    return {
      selItem,
      SaveValue,
      serverData,
      columns,
      filter,
    }
  },
})
