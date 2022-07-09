import { defineComponent, PropType, ref } from 'vue'

import { Logo } from '../../components/logo/index'

import { LandingFooter } from '../../components/LandingFooter/index'

import { tools } from '../../store/Modules/tools'
import { static_data } from '@src/db/static_data'

import { CImgText } from '../../components/CImgText/index'
import { CCard, CMyAvatar, CMyTeacher, CMyPage } from '@components'
import { IEvents, IOperators } from '@src/model'
import MixinEvents from '@/mixins/mixin-events'

export default defineComponent({
  name: 'CMySingleEvent',
  components: { Logo, LandingFooter, CImgText, CCard, CMyPage, CMyAvatar, CMyTeacher },
  props: {
    myevent: {
      type: Object as PropType<IEvents>,
      required: true,
    },
  },

  setup(props, { emit }) {

    const selected = ref(false)

    const { isShowPrice, getImgEvent, getStyleByEvent, isAlreadyBooked, getWhereIcon, getWhereName,
      editable, getContribtypeById, getPrice, isEventEnabled, findEventIndex, UpdateDbByFields,
    } = MixinEvents()

    function selectEvent(eventparam: IEvents) {
      selected.value = !selected.value
    }

    function getTextEvent(myevent: IEvents) {
      if (myevent.bodytext === '') {
        return myevent.details
      } else {
        return myevent.bodytext
      }
    }

    function duplicateEvent(event: any, numgg: number) {
      emit('duplicateEvent', event, numgg)
    }

    function askForInfoEventMenu(event: any) {
      emit('askForInfoEventMenu', event)
    }

    function deleteEvent(event: any) {
      emit('deleteEvent', event)
    }

    function editEvent(event: any) {
      emit('editEvent', event)
    }

    function addBookEventMenu(event: any) {
      emit('addBookEventMenu', event)
    }

    function EditBookEvent(event: any) {
      emit('EditBookEvent', event)
    }

    return {
      EditBookEvent,
      addBookEventMenu,
      editEvent,
      deleteEvent,
      askForInfoEventMenu,
      duplicateEvent,
      getTextEvent,
      tools,
      static_data,
      selectEvent,
      getImgEvent,
      getStyleByEvent,
      isAlreadyBooked,
      getWhereIcon,
      getWhereName,
      editable,
      getContribtypeById,
      getPrice,
      isShowPrice,
      isEventEnabled,
      findEventIndex,
      UpdateDbByFields,
      selected,
    }

  }
})
