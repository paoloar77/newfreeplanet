import { defineComponent, ref, PropType, watch, onMounted } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useQuasar } from 'quasar'
import { IGallery, IImgGallery } from 'model'
import { CMyPage } from '@/components/CMyPage'
import { tools } from '@store/Modules/tools'
import { useGlobalStore } from '@store/globalStore'

export default defineComponent({
  name: 'CGallery',
  props: {
    edit: {
      type: Boolean,
      required: true,
    },
    single: {
      type: Boolean,
      required: false,
      default: false,
    },
    title: String,
    directory: {
      type: String,
      required: true,
    },
    imgGall: {
      type: Object as PropType<IImgGallery | string | undefined>,
      required: true,
    },
  },
  emits: ['showandsave'],
  components: { CMyPage },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()
    const globalStore = useGlobalStore()

    const displayGall = ref(false)

    const gallerylist = ref(<IImgGallery[]>[])
    const maximizedToggle = ref(true)


    function isValid(myobj: any): boolean {
      return (myobj && typeof myobj !== 'string' && typeof myobj !== 'undefined')
    }

    watch(() => props.imgGall, (newval, oldval) => {
      if (isValid(props.imgGall)) {
        // @ts-ignore
        gallerylist.value = props.imgGall
      }
    })

    function created() {
      console.log('created cgallery')
      if (isValid(props.imgGall)) {
        // @ts-ignore
        let myarr: any = props.imgGall
        gallerylist.value = []
        if (myarr) {
          myarr.forEach((pic: any) => {
            if (pic.imagefile)
              gallerylist.value.push(pic)
          })
        }
      } else {
        gallerylist.value = [
            ]
      }
    }

    function showandsave(value: any) {
      console.log('EMIT: showandsave')
      emit('showandsave', value)
    }

    function getnumimages() {
      if (gallerylist.value)
        return gallerylist.value.length
      else
        return 0
    }

    function getlistimages() {
      if (gallerylist.value)
        return gallerylist.value.slice().sort((a: any, b: any) => a.order! - b.order!)
      else
        return null
    }

    function onDragStart(e: any) {
      console.log('onDragStart')
      e.dataTransfer.setData('text', e.target.id)
      e.dataTransfer.dropEffect = 'move'
    }

    function onDragEnter(e: any) {
      // don't drop on other draggables
      if (e.target.draggable !== true) {
        e.target.classList.add('drag-enter')
      }
    }

    function onDragLeave(e: any) {
      e.target.classList.remove('drag-enter')
    }

    function onDragOver(e: any) {
      e.preventDefault()
    }

    function onDrop(e: any) {
      console.log('onDrop', e)
      e.preventDefault()

      // don't drop on other draggables
      if (e.target.draggable === true) {
        return
      }

      if (gallerylist.value) {

        const draggedId = e.dataTransfer.getData('text')
        let dragout = ''
        try {
          dragout = e.target.parentNode.parentNode.id
        } catch (e) {
          dragout = ''
        }
        const draggedEl = document.getElementById(draggedId)
        console.log('draggedId', draggedId, 'draggedEl', draggedEl)
        console.log('dragout', dragout)

        // check if original parent node
        if (draggedEl!.parentNode === e.target) {
          e.target.classList.remove('drag-enter')
          return
        }

        const myindex = gallerylist.value.findIndex((rec: any) => rec._id === draggedId)
        const myrec: IImgGallery = gallerylist.value[myindex]

        let myrecprec: IImgGallery
        let myrecout: IImgGallery
        const myindexout = gallerylist.value.findIndex((rec: any) => rec._id === dragout)
        myrecout = gallerylist.value[myindexout]
        let myindexprec = myindexout - 1

        if (myindexprec < 0)
          myindexprec = 0

        if (myindex === myindexout)
          return

        myrecprec = gallerylist.value[myindexprec]

        console.log('myrec', myrec, 'myrecprec', myrecout)

        if (myrec && myrecout)
          console.log('myrec', myrec, 'myrecprec', myrecout, 'ord1', myrec.order, 'myrecout', myrecout.order)

        if (myrecout) {
          let diff = 0
          const ord2 = myrecprec.order
          const ord1 = myrecout.order
          diff = Math.round((ord1! - ord2!) / 2)
          if (diff <= 0)
            diff++
          console.log('diff', diff)
          let mynum = 0
          mynum = myrecprec.order! + diff
          console.log('mynum', mynum)
          myrec.order = mynum
        } else {
          myrec.order = Math.round(myrec.order!) - 1
        }

        console.log('myrec.order', myrec.order)

        // make the exchange
        // draggedEl.parentNode.removeChild(draggedEl)
        // e.target.appendChild(draggedEl)
        e.target.classList.remove('drag-enter')


        save()
      }
    }

    function getclass() {
      return (props.edit || displayGall.value) ? 'my-card-gallery' : 'my-card-gallery-view' + ' text-center'
    }

    function getclimg() {
      return (props.edit || displayGall.value) ? 'myimg' : 'myimg-view'
    }

    function getlastord() {
      if (gallerylist.value) {
        let myord = 0
        for (const file of gallerylist.value) {
          if (file.order! > myord)
            myord = file.order!
        }

        return myord + 10
      }
    }

    function uploaded(info: any) {
      console.log('uploaded', info)
      if (gallerylist.value) {
        for (const file of info.files) {
          gallerylist.value.push({ imagefile: file.name, order: getlastord() })
        }

        if (!props.single)
          save()

        console.log('gallerylist', gallerylist.value)
      }
    }

    function apri() {
      displayGall.value = true
    }

    function deleted(rec: any) {
      console.log('deleted', rec.imagefile)
      // console.table(mylistimages)

      if (gallerylist.value) {
        const index = gallerylist.value.findIndex((elem: any) => elem.imagefile === rec.imagefile)
        if (index > -1) {
          gallerylist.value.splice(index, 1)
        }

        // mylistimages = mylistimages.pop((elem) => elem.imagefile !== rec.imagefile)

        // console.table(mylistimages)

        console.log('single', props.single)

        if (!props.single) {
          save()
        }
      }
    }

    function getfullname(rec: any) {
      return 'upload/' + props.directory + '/' + rec.imagefile
    }

    function copytoclipboard(rec: any) {
      const filename = getfullname(rec)
      tools.copyStringToClipboard($q, filename, true)
    }

    async function deleteFile(rec: any)
    {
      console.log('deleteFile....')
      const filename = getfullname(rec)

      // Delete File on server:
      const ris = await globalStore.DeleteFile({ filename })
      console.log('ris', ris)
      if (ris)
        deleted(rec)

    }

    function save() {
      console.log('CGallery save')
      if (gallerylist.value.length > 0) {
        if (!props.single) {
          emit('showandsave', gallerylist.value)
        } else {
          emit('showandsave', gallerylist.value[0].imagefile)
        }
      } else {
        emit('showandsave', '')
      }
    }

    function close() {
      return ''
    }

    function getsrcimg(gallerylistery: any) {

      if (!gallerylistery.imagefile) {
        return 'images/noimg.png';
      }
      if (gallerylistery) {
        if (tools.getextfile(gallerylistery.imagefile) === 'pdf')
          return 'images/images/pdf.jpg'
        else
          return 'upload/' + props.directory + '/' + gallerylistery.imagefile
      } else {
        return 'images/noimg.png';
      }
    }

    function getParamDir() {
      return tools.escapeslash(props.directory)
    }

    function getUrl() {
      const myurl = tools.geturlupload() + getParamDir()
      // console.log('myurl', myurl)
      return myurl
    }

    onMounted(created)

    return {
      getlistimages,
      onDragStart,
      onDragEnter,
      onDragLeave,
      onDragOver,
      onDrop,
      getclass,
      getclimg,
      getlastord,
      copytoclipboard,
      deleteFile,
      getsrcimg,
      tools,
      uploaded,
      gallerylist,
      getnumimages,
      apri,
      displayGall,
      save,
      maximizedToggle,
      getUrl,
      close,
    }
  }
})
