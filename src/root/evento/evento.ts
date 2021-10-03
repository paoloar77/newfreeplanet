import { defineComponent, watch, onMounted, ref } from 'vue'


import { tools } from '../../store/Modules/tools'

import { CImgText } from '../../components/CImgText/index'

import MixinOperator from '@src/mixins/mixin-operator'
import MixinEvents from '../../mixins/mixin-events'
import { IEvents } from '@src/model'
import MixinBase from '@src/mixins/mixin-base'
import MixinUsers from '@src/mixins/mixin-users'

import { Logo } from '../../components/logo/index'
import { CCard } from '@/components/CCard'
import { CMyPage } from '@/components/CMyPage'
import { CMyAvatar } from '@/components/CMyAvatar'
import { CEventsCalendar } from '@/components/CEventsCalendar'
import { useRoute } from 'vue-router'
import { useCalendarStore } from '@store/CalendarStore'
import MixinMetaTags from '@/mixins/mixin-metatags'


export default defineComponent({
  name: 'Evento',
  components: { Logo, CImgText, CCard, CMyPage, CMyAvatar, CEventsCalendar },
  setup() {
    const myevent = ref(<IEvents | null | undefined> null)
    const mylastevtypol = ref(<IEvents[]>[])
    const selected = ref(false)

    const calendarStore = useCalendarStore()

    const { setmeta } = MixinMetaTags()

    const $route = useRoute()

    function changetypol() {
      // mytypetransgroup = ''
      const datenow = tools.addDays(tools.getDateNow(), -1)
      mylastevtypol.value = calendarStore.eventlist.filter((rec: any) => ((rec.typol === $route.params.typol) && (new Date(rec.dateTimeEnd) >= datenow))).slice(-5)
      console.log('[1] mylastevtypol.value', mylastevtypol.value)
      if (mylastevtypol.value.length === 0) {
        mylastevtypol.value = calendarStore.eventlist.filter((rec: any) => (rec.typol === $route.params.typol)).slice(-1)
      }
      // console.log('myevent', myevent, 'eventid=', $route.params.eventid)
    }

    watch(() => $route.params.typol, (value, oldval) => {
      changetypol()
    })

    function nextevents() {
      if (!!mylastevtypol.value && mylastevtypol.value.length > 1) {
        return mylastevtypol.value
      } else {
        return []
      }
    }

    function isnotmyevent(ev: any) {
      if (!!$route.params.eventid)
        return ev._id !== $route.params.eventid
      else
        return true
    }

    function changeevent() {
      let eventid: any = null
      if (!!$route.params.eventid)
        eventid = $route.params.eventid
      if (!!$route.query.eventid)
        eventid = $route.query.eventid

      console.log('changeevent', eventid)

      // mytypetransgroup = ''
      if (!!eventid) {
        myevent.value = calendarStore.eventlist.find((rec) => rec._id === eventid)
      } else {
        if (!!mylastevtypol.value)
          myevent.value = mylastevtypol.value[0]
      }
    }

    watch(() => $route.params.eventid, (value, oldval) => {
      changeevent()
    })


    function changeeventquery() {
      // console.log('changeevent QUERY', $route.query.eventid)
      // mytypetransgroup = ''
      if (!!$route.query.eventid) {
        myevent.value = calendarStore.eventlist.find((rec: any) => rec._id === $route.query.eventid)
      } else {
        if (!!mylastevtypol.value)
          myevent.value = mylastevtypol.value[0]
      }
    }

    watch(() => $route.query.eventid, (value, oldval) => {
      changeeventquery()
    })


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

    function mounted() {
      changetypol()
      changeevent()
      // console.log('myevent', myevent)
    }

    function gettitle() {
      if (!!myevent.value && (!!myevent.value.title))
        return myevent.value.title
      else
        return ''
    }

    onMounted(mounted)

    return {
      gettitle,
      nextevents,
      getTextEvent,
      selectEvent,
      isnotmyevent,
      setmeta,
      myevent,
    }

  }
})
