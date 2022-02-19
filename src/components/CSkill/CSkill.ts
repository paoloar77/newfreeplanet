import {
  defineComponent, onBeforeMount, onBeforeUnmount, onMounted, ref, toRef, toRefs, watch, computed,
} from 'vue'

import { tools } from '@store/Modules/tools'
import { CMyFieldDb } from '@/components/CMyFieldDb'
import { costanti } from '@costanti'
import { useGlobalStore } from '@store/globalStore'
import { useUserStore } from '@store/UserStore'
import { CGridTableRec } from '@/components/CGridTableRec'
import { IColGridTable, IMySkill, ISkill } from 'model'
import { toolsext } from '@store/Modules/toolsext'
import { fieldsTable } from '@store/Modules/fieldsTable'

export default defineComponent({
  name: 'CSkill',
  props: {
    table: {
      type: String,
      required: true,
    },
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
    const globalStore = useGlobalStore()
    const userStore = useUserStore()

    const table = ref(toolsext.TABMYSKILLS)

    const col = ref(<IColGridTable>{})

    const prop_colkey = ref('')
    const col_title = ref('')
    const col_footer = ref('')
    const col_tabfooter = ref('')

    const extraparams = computed(() =>{
      if (props.table === 'goods')
        return extraparams_Goods()
      else
        return extraparams_Servizi()
    })

    function mounted() {

      let obj = tools.getParamsByTable(props.table)

      col.value = fieldsTable.getArrColsByTable(props.table)

      prop_colkey.value = obj.prop_colkey
      col_title.value = obj.col_title
      col_footer.value = obj.col_footer
      col_tabfooter.value = obj.col_tabfooter

    }


    function extraparams_Servizi() {
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
            myskill: 1,
            idStatusSkill: 1,
            idContribType: 1,
            idCity: 1,
            numLevel: 1,
            adType: 1,
            photos: 1,
            note: 1,
            //**ADDFIELD_MYSKILL
            website: 1,
            descr: 1,
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
            myskill: 1,
            idStatusSkill: 1,
            idContribType: 1,
            idCity: 1,
            numLevel: 1,
            adType: 1,
            photos: 1,
            note: 1,
            //**ADDFIELD_MYSKILL
            website: 1,
            descr: 1,
            date_created: 1,
            date_updated: 1,
            comune: 1,
            userId: 1,
            username: 1,
            name: 1,
            surname: 1,
            mycities: 1,
            'profile.img': 1,
            'profile.qualifica': 1,
          }
        },
        lookup3: {
          lk_tab: 'skills',
          lk_LF: 'idSkill',
          lk_FF: '_id',
          lk_as: 'recSkill',
          af_objId_tab: '',
          lk_proj: {
            recSkill: 1,
            sector: 1,
            idSector: 1,
            idSkill: 1,
            myskill: 1,
            idStatusSkill: 1,
            idContribType: 1,
            idCity: 1,
            numLevel: 1,
            adType: 1,
            photos: 1,
            note: 1,
            //**ADDFIELD_MYSKILL
            website: 1,
            descr: 1,
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
        lookup4: {
          lk_tab: 'cities',
          lk_LF: 'idCity',
          lk_FF: '_id',
          lk_as: 'mycities',
          af_objId_tab: '',
        },

      }
    }

    function extraparams_Goods() {
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
            idShipping: 1,
            myskill: 1,
            idStatusSkill: 1,
            idContribType: 1,
            idCity: 1,
            numLevel: 1,
            adType: 1,
            photos: 1,
            note: 1,
            //**ADDFIELD_MYSKILL
            website: 1,
            descr: 1,
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
            idShipping: 1,
            myskill: 1,
            idStatusSkill: 1,
            idContribType: 1,
            idCity: 1,
            numLevel: 1,
            adType: 1,
            photos: 1,
            note: 1,
            //**ADDFIELD_MYSKILL
            website: 1,
            descr: 1,
            date_created: 1,
            date_updated: 1,
            comune: 1,
            userId: 1,
            username: 1,
            name: 1,
            surname: 1,
            mycities: 1,
            'profile.img': 1,
            'profile.qualifica': 1,
          }
        },
        lookup3: {
          lk_tab: 'skills',
          lk_LF: 'idSkill',
          lk_FF: '_id',
          lk_as: 'recSkill',
          af_objId_tab: '',
          lk_proj: {
            recSkill: 1,
            sector: 1,
            idSector: 1,
            idSkill: 1,
            idShipping: 1,
            myskill: 1,
            idStatusSkill: 1,
            idContribType: 1,
            idCity: 1,
            numLevel: 1,
            adType: 1,
            photos: 1,
            note: 1,
            //**ADDFIELD_MYSKILL
            website: 1,
            descr: 1,
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
        lookup4: {
          lk_tab: 'cities',
          lk_LF: 'idCity',
          lk_FF: '_id',
          lk_as: 'mycities',
          af_objId_tab: '',
        },

      }
    }

    function getdefaultnewrec(): any {
      if (props.table === toolsext.TABMYSKILLS) {
        return tools.getdefaultnewrec_MySkill()
      } else if (props.table === toolsext.TABMYBACHECAS) {
        return tools.getdefaultnewrec_MyBacheca()
      } else if (props.table === toolsext.TABMYGOODS) {
        return tools.getdefaultnewrec_MyGoods()
      }
      return null
    }

    onMounted(mounted)

    return {
      tools,
      costanti,
      extraparams,
      fieldsTable,
      col,
      prop_colkey,
      col_title,
      col_footer,
      col_tabfooter,
      getdefaultnewrec,
    }
  },
})
