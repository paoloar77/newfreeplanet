import { defineComponent, onMounted, ref } from 'vue'
import { CTitleBanner } from '@/components/CTitleBanner'
import { useGlobalStore } from '@store/globalStore'

interface IPagination {
  page: number,
  rowsNumber: number // specifying this determines pagination is server-side
}

export default defineComponent({
  name: 'TableOnlyView',
  components: {},
  props: {},
  setup(props) {
    const globalStore = useGlobalStore()

    const loading = ref(false)

    const serverPagination = ref(<IPagination> { page: 1, rowsNumber: 10 })

    const serverData = ref(<any>[])

    const columns = ref([
      {
        name: 'chiave',
        required: true,
        label: 'Chiave',
        align: 'left',
        field: 'chiave',
        sortable: true,
      },
      { name: 'valore', label: 'Valore', field: 'valore', sortable: false },
    ])

    const filter = ''

    const selected: any[] = []

    function request(myprops: any) {
      loading.value = true
      setTimeout(() => {
        serverPagination.value = myprops.pagination

        let rows = globalStore.cfgServer.slice(),
          { page, rowsPerPage, sortBy, descending } = myprops.pagination

        // if (props.filter) {
        //   rows = table.filterMethod(rows, props.filter)
        // }
        // if (sortBy) {
        //   rows = table.sortMethod(rows, sortBy, descending)
        // }

        serverPagination.value.rowsNumber = rows.length
        if (rowsPerPage) {
          rows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage)
        }
        serverData.value = rows
        loading.value = false
      }, 1500)
    }

    function mounted() {
      request({
        pagination: serverPagination,
        filter: filter,
      })
    }

    onMounted(mounted)

    return {
      columns,
      selected,
      serverPagination,
      serverData,
      filter,
    }
  },
})
