import { defineComponent, ref, PropType, watch } from 'vue'
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
    gall: {
      type: Object as PropType<IGallery>,
      required: true,
    },
    listimages: {
      type: Object as PropType<IImgGallery[]>,
      required: true,
    },
  },
  components: { CMyPage },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()
    const globalStore = useGlobalStore()

    const mygall = ref(<IGallery>{})
    const mylistimages = ref(<IImgGallery[]>[])

    watch(() => props.gall, (newval, oldval) => {
      mygall.value = props.gall
    })

    watch(() => props.listimages, (newval, oldval) => {
      mylistimages.value = props.listimages
    })

    function created() {
      mygall.value = props.gall
      mylistimages.value = props.listimages
    }

    function getlistimages() {
      if (mylistimages.value)
        return mylistimages.value.slice().sort((a, b) => a.order! - b.order!)
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

      const myindex = mylistimages.value.findIndex((rec) => rec._id === draggedId)
      const myrec: IImgGallery = mylistimages.value[myindex]

      let myrecprec: IImgGallery
      let myrecout: IImgGallery
      const myindexout = mylistimages.value.findIndex((rec) => rec._id === dragout)
      myrecout = mylistimages.value[myindexout]
      let myindexprec = myindexout - 1

      if (myindexprec < 0)
        myindexprec = 0

      if (myindex === myindexout)
        return

      myrecprec = mylistimages.value[myindexprec]

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

    function getclass() {
      return (props.edit) ? 'my-card-gallery' : 'my-card-gallery-view' + ' text-center'
    }

    function getclimg() {
      return (props.edit) ? 'myimg' : 'myimg-view'
    }

    function getlastord() {
      let myord = 0
      for (const file of mylistimages.value) {
        if (file.order! > myord)
          myord = file.order!
      }

      return myord + 10
    }

    function uploaded(info: any) {
      console.log(info)
      for (const file of info.files) {
        mylistimages.value.push({ imagefile: file.name, order: getlastord() })
      }

      save()
    }

    function deleted(rec: any) {
      // console.table(mylistimages)

      const index = mylistimages.value.findIndex((elem) => elem.imagefile === rec.imagefile)
      if (index > -1) {
        mylistimages.value.splice(index, 1)
      }

      // mylistimages = mylistimages.pop((elem) => elem.imagefile !== rec.imagefile)

      // console.table(mylistimages)

      save()
    }

    function getfullname(rec: any) {
      return 'statics/upload/' + mygall.value.directory + '/' + rec.imagefile
    }

    function copytoclipboard(rec: any) {
      const filename = getfullname(rec)
      tools.copyStringToClipboard(filename, true)
    }

    async function deleteFile(rec: any)
    {
      const filename = getfullname(rec)

      // Delete File on server:
      const ris = await globalStore.DeleteFile({ filename })
      if (ris)
        deleted(rec)

    }

    function save() {
      emit('showandsave', mylistimages.value)
    }

    function getsrcimg(mygallery: any) {

      if (tools.getextfile(mygallery.imagefile) === 'pdf')
        return 'statics/images/images/pdf.jpg'
      else
        return 'statics/upload/' + mygall.value.directory + '/' + mygallery.imagefile
    }

    created()

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
    }
  }
})
