import { colTableHours } from '@src/store/Modules/fieldsTable'

import { shared_consts } from '@src/common/shared_vuejs'
import { defineComponent, ref } from 'vue'
import { IPagination } from 'model'
import { CImgText } from '@/components/CImgText'
import { CCard } from '../CCard'
import { CMyPage } from '@/components/CMyPage'
import { CTitleBanner } from '@/components/CTitleBanner'
import { CGridTableRec } from '@/components/CGridTableRec'
import { useUserStore } from '@store/UserStore'


export default defineComponent({
  name: 'CHours',
  components: { CImgText, CCard, CMyPage, CTitleBanner, CGridTableRec },
  props: {
    todoId: {
      type: String,
      required: true,
    },
  },
  setup(props){
    const userStore = useUserStore()

    const pagination = ref(<IPagination> {
      sortBy: 'descr',
      descending: false,
      page: 2,
      rowsPerPage: 5
      // rowsNumber: xx if getting data from a server
    })

    function extraparams() {
      return {
        lk_tab: 'users',
        lk_LF: 'userId',
        lk_FF: '_id',
        lk_as: 'user',
        af_objId_tab: 'myId',
        lk_proj: {
          todoId: 1, userId: 1, descr: 1, date: 1, time_start: 1, time_end: 1, hours: 1,
          username: 1, name: 1, surname: 1
        }
      }
    }

    const arrfilterand = [
      {
        label: 'Tutte le ore',
        value: shared_consts.FILTER_HOURS_ALL
      }
    ]

    function myfilterdef() {
      return [shared_consts.FILTER_HOURS_MYLIST]
    }

    function myarrfilterand() {
      const myfiltrodef = {
        label: 'Mie Ore',
        value: shared_consts.FILTER_HOURS_MYLIST,
        hide: true,
        default: true
      }
      let myarr = []
      myarr.push(myfiltrodef)
      if (arrfilterand)
        myarr = [...myarr, ...arrfilterand]

      return myarr
    }

    // const selected = []

    function getcolHours() {
      return colTableHours
    }

    function getdefaultnewrec() {
      const myrec: any = {
        todoId: props.todoId,
        userId: userStore.my._id,
        descr: ''
      }

      return myrec
    }


    return {
      myfilterdef,
      myarrfilterand,
      extraparams,
      getcolHours,
      getdefaultnewrec,
      pagination,
    }
  },
})
