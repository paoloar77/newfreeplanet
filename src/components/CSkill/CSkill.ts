import {
  defineComponent, onBeforeMount, onBeforeUnmount, onMounted, ref, toRef, toRefs, watch,
} from 'vue'

import { tools } from '@store/Modules/tools'
import { CMyFieldDb } from '@/components/CMyFieldDb'
import { costanti } from '@costanti'
import { useGlobalStore } from '@store/globalStore'
import { useUserStore } from '@store/UserStore'
import { colmySkills } from '@store/Modules/fieldsTable'
import { CGridTableRec } from '@/components/CGridTableRec'
import { IMySkill, ISkill } from 'model'

export default defineComponent({
  name: 'CSkill',
  props: {
    defaultnewrec: {
      type: Function,
      required: false,
    },
    filtercustom: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },
    visuinpage: {
      type: Boolean,
      required: false,
      default: false,
    },
    username: {
      type: String,
      required: false,
      default: ''
    }
  },
  components: {
    CMyFieldDb, CGridTableRec,
  },
  setup(props, { attrs, slots, emit }) {
    const mytable = 'users'
    const globalStore = useGlobalStore()
    const userStore = useUserStore()

    async function createNewRecordInUserTable() {
      console.log('createNewRecordInUserTable')

      let mydata = {
        table: mytable,
        data: {
          userId: userStore.my._id,
          data: {},
          field: 'myskills'
        }
      }

      if (props.defaultnewrec) {

        mydata.data.data = props.defaultnewrec
      }

      console.log('mydata', mydata)
      const data = await globalStore.saveSubRec(mydata)
    }

    function getdefaultnewrec(): IMySkill {
      return {
        _id: 0,
        idSector: 0,
        idSkill: 0,
        idSubSkill: [],
        idStatusSkill: [],
        idContribType: [],
        idCity: [],
        NumLevel: 0,
        photos: [],
        note: '',
        subTitle: '',
      }
    }


    function extraparams() {
      let lk_tab = 'users'
      let lk_LF = 'userId'
      let lk_FF = '_id'
      let lk_as = 'user'
      let af_objId_tab = 'myId'

      if (props.username) {
        // lk_LF = 'username'
      }

      return {
        lookup1: {
          lk_tab,
          lk_LF,
          lk_FF,
          lk_as,
          af_objId_tab,
          lk_proj: {
            recSkill: 1,
            sector: 1,
            idSector: 1,
            idSkill: 1,
            idSubSkill: 1,
            idStatusSkill: 1,
            idContribType: 1,
            idCity: 1,
            numLevel: 1,
            photos: 1,
            note: 1,
            subTitle: 1,
            date_created: 1,
            date_updated: 1,
            userId: 1,
            username: 1,
            name: 1,
            surname: 1,
            comune: 1,
            mycities: 1,
            'profile.img': 1,
            'profile.qualifica': 1,
          }
        },
        lookup2: {
          lk_tab: 'cities',
          lk_LF: 'idCity',
          lk_FF: '_id',
          lk_as: 'comune',
          af_objId_tab: '',
          lk_proj: {
            recSkill: 1,
            sector: 1,
            idSector: 1,
            idSkill: 1,
            idSubSkill: 1,
            idStatusSkill: 1,
            idContribType: 1,
            idCity: 1,
            numLevel: 1,
            photos: 1,
            note: 1,
            subTitle: 1,
            date_created: 1,
            date_updated: 1,
            comune: 1,
            userId: 1,
            username: 1,
            name: 1,
            surname: 1,
            'profile.img': 1,
            'profile.qualifica': 1,
          }
        },
      }
    }

    return {
      tools,
      costanti,
      colmySkills,
      getdefaultnewrec,
      extraparams,
    }
  },
})
