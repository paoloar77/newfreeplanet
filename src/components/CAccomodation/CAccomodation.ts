import { defineComponent, ref, PropType, watch, onMounted, computed } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useQuasar } from 'quasar'
import { IAccomodation, IGallery, IImgGallery } from 'model'
import { CMyPage } from '@/components/CMyPage'
import { tools } from '@store/Modules/tools'
import { shared_consts } from '@src/common/shared_vuejs'
import { useGlobalStore } from '@store/globalStore'
import { costanti } from '@costanti'

export default defineComponent({
  name: 'CAccomodation',
  props: {
    edit: {
      type: Boolean,
      required: true,
    },
    canModify: {
      type: Boolean,
      required: true,
    },
    isInModif: {
      type: Boolean,
      required: false,
      default: false,
    },
    title: String,
    mylist: {
      type: Object as PropType<IAccomodation[] | string | undefined | null>,
      required: true,
    },
  },
  emits: ['showandsave'],
  components: {  },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()
    const globalStore = useGlobalStore()

    const displayGall = ref(false)

    const listobj = ref(<IImgGallery[]>[])
    const maximizedToggle = ref(true)


    function isValid(myobj: any): boolean {
      return (myobj && typeof myobj !== 'string' && typeof myobj !== 'undefined')
    }

    const isListImgValid = computed(() => {
      const arr = getlist()
      if (arr && tools.isArray(arr)) {
        return arr.length > 0
      } else {
        return !!arr
      }
    })

    watch(() => props.mylist, (newval, oldval) => {
      if (isValid(props.mylist)) {
        // @ts-ignore
        listobj.value = props.mylist
      }
    })

    function created() {
      // console.log('created cgallery')
      if (isValid(props.mylist)) {
        // @ts-ignore
        let myarr: any = props.mylist
        listobj.value = []
        if (Array.isArray(myarr)) {
          myarr.forEach((pic: any) => {
            if (pic.imagefile) {
              listobj.value.push(pic)
            }
          })
        }
      } else {
        listobj.value = [
            ]
      }

    }

    function showandsave(value: any) {
      console.log('EMIT: showandsave')
      emit('showandsave', value)
    }

    function getnumimages() {
      if (listobj.value)
        return listobj.value.length
      else
        return 0
    }

    function getlist() {
      if (listobj.value)
        // return listobj.value.slice().sort((a: any, b: any) => a.order! - b.order!)
        return listobj.value
      else
        return null
    }

    function getclass() {
      return (props.edit || displayGall.value) ? (props.isInModif ? 'my-card-gallery' : 'my-card-gallery-noModif') : 'my-card-gallery-view' + ' text-center'
    }

    function getclimg() {
      let mycl = (props.edit || displayGall.value) ? 'myimg' : 'myimg-view'
      if (props.canModify && props.edit)
        mycl = mycl + ' myimg-modify'
      return mycl
    }

    function apri() {
      displayGall.value = true
    }

    function deleted(rec: any) {
      console.log('deleted', rec.imagefile)
      // console.table(mylistimages)

      if (listobj.value) {
        const index = listobj.value.findIndex((elem: any) => elem.imagefile === rec.imagefile)
        if (index > -1) {
          listobj.value.splice(index, 1)
        }

        // mylistimages = mylistimages.pop((elem) => elem.imagefile !== rec.imagefile)

        // console.table(mylistimages)

        save()
      }
    }

    function deleteRec(rec: any)
    {
      deleted(rec)
    }

    function save() {
      console.log('CGallery save', listobj.value)
      if (listobj.value.length > 0) {
        emit('showandsave', listobj.value)
      } else {
        emit('showandsave', [])
      }
    }

    function close() {
      return ''
    }

    onMounted(created)

    return {
      getlist,
      getclass,
      getclimg,
      deleteRec,
      tools,
      listobj,
      getnumimages,
      apri,
      displayGall,
      save,
      maximizedToggle,
      close,
      isListImgValid,
      costanti,
      shared_consts,
    }
  }
})
