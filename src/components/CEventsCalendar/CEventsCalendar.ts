import { defineComponent, ref, onMounted, onBeforeMount, computed, PropType, reactive, watch } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'
import { colors, Screen, Platform, date } from 'quasar'
import { EState, IBookedEvent, IBookedEventPage, IEvents, IMessage, IMessagePage } from '@model'
import { Logo } from '../logo'
import { Footer } from '../Footer'
import { CTitle } from '../CTitle'
import { CImgText } from '../CImgText'
import { CMyEditor } from '../CMyEditor'
import { CDateTime } from '@/components/CDateTime'
import { CMyAvatar } from '../CMyAvatar'
import { CMySingleEvent } from '@/components/CMySingleEvent'
import { CMyTeacher } from '@/components/CMyTeacher'
import { CMySelect } from '../CMySelect'
import { tools } from '@store/Modules/tools'
import { costanti } from '@costanti'

// import { stop, prevent, stopAndPrevent } from 'quasar/src/utils/event'

import MixinEvents from '../../mixins/mixin-events'
import { useCalendarStore } from '@store/CalendarStore'
import { func_tools, toolsext } from '@store/Modules/toolsext'
import { useMessageStore } from '@store/MessageStore'
import { static_data } from '@/db/static_data'

export default defineComponent({
  name: 'CEventsCalendar',
  props: {
    mysingleevent: {
      type: Object as PropType<IEvents>,
      required: false,
      default: null,
    },
    showfirstN: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  components: {
    Logo,
    Footer,
    CTitle,
    CImgText,
    CMySelect,
    CMyEditor,
    CDateTime,
    CMyAvatar,
    CMySingleEvent,
    CMyTeacher,
  },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()
    const globalStore = useGlobalStore()
    const calendarStore = useCalendarStore()
    const messageStore = useMessageStore()

    const resources = ref([])

    const calendar = ref(null)

    const calendarView = ref('month')
    const selectedDate = ref('')
    const tabeditor = ref('details')
    const showPrev = ref(false)
    const formDefault = ref(<IEvents>{
      title: '',
      details: '',
      bodytext: '',
      dateTimeStart: tools.getstrYYMMDDDateTime(tools.getDateNow()),
      dateTimeEnd: tools.getstrYYMMDDDateTime(tools.getDateNow()),
      icon: '',
      bgcolor: '#839ff2'
    })

    const formbookEventDefault = ref(<IBookedEvent>{
      userId: '',
      msgbooking: '',
      infoevent: '',
      numpeople: 1,
      numpeopleLunch: 0,
      numpeopleDinner: 0,
      numpeopleDinnerShared: 0,
      datebooked: tools.getDateNow(),
      booked: false,
      modified: false
    })

    const formAskForDefault = ref(<IMessage>{
      dest: {
        idapp: process.env.APP_ID,
        username: ''
      },
      origin: {
        idapp: process.env.APP_ID,
        username: ''
      },
      message: ''
    })

    const dateFormatter = ref(<any>void 0)
    const titleFormatter: any = ref(null)

    const keyValue = ref(0)
    const direction = ref('forward')
    const weekdays = reactive([1, 2, 3, 4, 5, 6, 0])
    const viewOptions = reactive([
      { label: 'Day', value: 'day' },
      { label: '5 Day', value: '5day' },
      { label: 'Week', value: 'week' },
      { label: 'Month', value: 'month' }
    ])
    const addEvent = ref(false)
    const bookEventpage = ref(<IBookedEventPage>{
      show: false,
      bookedevent: {
        userId: '',
        numpeople: 0,
        infoevent: '',
        msgbooking: '',
        modified: false,
        booked: false
      },
      state: EState.None
    })

    const askInfopage = ref(<IMessagePage>{
      show: false,
      msg: {
        message: ''
      },
      state: EState.None
    })

    const contextDay = ref(<any>null)
    const eventForm = ref(<IEvents>{
      title: '',
      details: '',
      bodytext: '',
      dateTimeStart: tools.getstrYYMMDDDateTime(tools.getDateNow()),
      dateTimeEnd: tools.getstrYYMMDDDateTime(tools.getDateNow()),
      icon: '',
      bgcolor: '#839ff2'
    })
    const bookEventForm = ref({ ...formbookEventDefault.value })
    const askInfoForm = ref(<IMessage>{
      dest: {
        idapp: process.env.APP_ID,
        username: ''
      },
      origin: {
        idapp: process.env.APP_ID,
        username: ''
      },
      message: ''
    })
    const displayEvent = ref(false)
    const myevent = ref({})
    // const events = []
    const gmt = ''
    const dragging = ref(false)
    const draggedEvent = ref(<IEvents>{})
    const ignoreNextSwipe = ref(false)

    const locale = computed(() => calendarStore.locale)

    const { isShowPrice, getImgEvent, getStyleByEvent, isAlreadyBooked, getWhereIcon, getWhereName,
      editable, getContribtypeById, getPrice, isEventEnabled, findEventIndex, UpdateDbByFields,
    } = MixinEvents()

    function visuAllCal() {
      return props.mysingleevent === null
    }

    function title_cal() {
      if (titleFormatter.value && locale) {
        const mydate = new Date(selectedDate.value)
        return titleFormatter.value.format(mydate)
      }
      return ''
    }

    function dayHeight() {
      if (Screen.height < 410)
        return 80
      else if (Screen.height < 500)
        return 100
      if (Screen.height < 700)
        return 110
      else if (Screen.height < 800)
        return 120
      else
        return 140
    }

    function theme() {
      return calendarStore.theme
    }

    function containerStyle() {
      const styles = { height: '' }
      if (calendarView.value !== 'month' || (calendarView.value === 'month' && calendarStore.dayHeight === 0)) {
        styles.height = `calc(100vh - ${calendarStore.titlebarHeight}px)`
      }
      return styles
    }

    // convert the events into a map of lists keyed by date
    function eventsMap() {
      // console.log('eventsMap')
      const map: {} = {}
      calendarStore.eventlist.forEach((myevent: IEvents) => {

        const myind: string = tools.getstrDateTime(myevent.dateTimeStart)
        // @ts-ignore
        return (map[myind] = map[myind] || []).push(myevent)
      })
      return map
    }

    function addOrUpdateEvent() {
      if (contextDay.value) {
        if (contextDay.value && contextDay.value.bgcolor) {
          return t('dialog.update')
        }
      }
      return t('dialog.add')
    }

    function scrollerPopupStyle160() {
      if ($q.screen.lt.sm) {
        return {
          width: '100vw',
          height: '100vh'
        }
      } else {
        return {
          maxHeight: '400px',
          height: '400px',
          width: '160px'
        }
      }
    }

    function hasModifiedBooking() {
      return (bookEventpage.value.bookedevent.numpeople !== bookEventForm.value.numpeople) ||
        (bookEventpage.value.bookedevent.numpeopleLunch !== bookEventForm.value.numpeopleLunch) ||
        (bookEventpage.value.bookedevent.numpeopleDinner !== bookEventForm.value.numpeopleDinner) ||
        (bookEventpage.value.bookedevent.numpeopleDinnerShared !== bookEventForm.value.numpeopleDinnerShared) ||
        (bookEventpage.value.bookedevent.msgbooking !== bookEventForm.value.msgbooking) ||
        (bookEventpage.value.bookedevent.booked !== bookEventForm.value.booked)
    }

    function checkseinviaMsg() {
      return (bookEventpage.value.state === EState.Creating) && (!bookEventForm.value.booked)
    }

    function getTitleBtnBooking() {
      if (bookEventpage.value.state === EState.Creating) {
        return t('dialog.book')
      } else {
        return t('dialog.update')
      }
    }

    /*function $refs: {
      calendar: any
    }

     */

    watch(() => locale, (val, oldval) => {
      updateFormatters()
    })

    function mounted() {
      /*if (root) {
        root.$on('calendar:next', calendarNext)
        root.$on('calendar:prev', calendarPrev)
        root.$on('calendar:today', calendarToday)
      }*/

      SetToday()
      // calendarStore.eventlist = events
      updateFormatters()

    }

    function beforeMount() {
      // console.log('mounted')
      selectedDate.value = formatDate(tools.getDateNow())
      // console.log('selectedDate', selectedDate)

      calendarStore.locale = toolsext.getLocale()
      updateFormatters()
    }

    function beforeDestroy() {
      /*
      root.$off('calendar:next', calendarNext)
      root.$off('calendar:prev', calendarPrev)
      root.$off('calendar:today', calendarToday)

       */
    }

    function showEvent(eventparam: IEvents) {
      // console.log('showEvent - INIZIO')
      myevent.value = eventparam
      displayEvent.value = true
      // console.log('showEvent - FINE ' + myevent)
    }

    function selectEvent(eventparam: IEvents) {
      if (myevent.value === eventparam)
        myevent.value = {}
      else
        myevent.value = eventparam

    }

    function onDateChanged(mydate: any) {
      calendarView.value = 'day'
    }

    function resourceClicked(resource: any) {
      console.log('resource clicked:', resource)
    }

    function resourceDayClicked(resource: any) {
      console.log('resource:day clicked:', resource)
    }

    function resetForm() {
      eventForm.value = { ...formDefault.value }
    }

    function addEventMenu(day: any) {
      console.log('addeventmenu', day)
      if (calendarView.value === 'scheduler' || calendarView.value === 'week-scheduler' || calendarView.value === 'month-scheduler' || !editable) {
        return
      }
      resetForm()
      contextDay.value = { ...day.scope }

      if (eventForm.value) {
        eventForm.value.dateTimeStart = tools.getstrYYMMDDDateTime(day.scope.timestamp.date + ' 21:00:00')
        eventForm.value.dateTimeEnd = tools.getstrYYMMDDDateTime(day.scope.timestamp.date + ' 22:00:00')
      }

      console.log('eventForm', eventForm)

      addEvent.value = true // show dialog
    }

    function addBookEventMenu(eventparam: IEvents) {
      if (!userStore.isLogged || !userStore.my.verified_email) {
        // Visu right Toolbar to make SignIn
        globalStore.rightDrawerOpen = true
        tools.showNeutralNotif($q, t('login.needlogin'))
        tools.scrollToTop()
        // window.scrollTo(0, 0)

        // $router.push('/signin')
      } else {
        console.log('addBookEventMenu')
        resetForm()
        myevent.value = eventparam
        bookEventForm.value.msgbooking = ''
        bookEventForm.value.numpeople = 1
        bookEventForm.value.numpeopleLunch = 0
        bookEventForm.value.numpeopleDinner = 0
        bookEventForm.value.numpeopleDinnerShared = 0
        bookEventForm.value.booked = true
        bookEventpage.value.state = EState.Creating

        displayEvent.value = false
        bookEventpage.value.show = true // show dialog
      }
    }

    function askForInfoEventMenu(eventparam: any) {
      if (!userStore.isLogged || !userStore.my.verified_email) {
        // Visu right Toolbar to make SignIn
        globalStore.rightDrawerOpen = true

        tools.showNeutralNotif($q, t('login.needlogin'))
        tools.scrollToTop()

        // $router.push('/signin')
      } else {
        console.log('askForInfoEventMenu')
        askInfoForm.value = { ...formAskForDefault.value }

        myevent.value = eventparam

        askInfoForm.value = {
          message: ''
        }

        askInfopage.value.state = EState.Creating

        displayEvent.value = false
        askInfopage.value.show = true // show dialog
      }
    }

    function clEvent(event: IEvents) {
      return (isAlreadyBooked(event) ? 'text-left bg-light-green-1' : 'text-left')
    }

    function checkFieldUndef() {
      if (eventForm.value.bodytext === undefined)
        eventForm.value.bodytext = ''
      if (eventForm.value.details === undefined)
        eventForm.value.details = ''
    }

    function editEvent(eventparam: IEvents) {
      console.log('editEvent - INIZIO')
      resetForm()

      contextDay.value = { ...eventparam }

      eventForm.value = { ...eventparam }

      checkFieldUndef()

      eventForm.value.dateTimeStart = tools.getstrYYMMDDDateTime(eventparam.dateTimeStart)
      eventForm.value.dateTimeEnd = tools.getstrYYMMDDDateTime(eventparam.dateTimeEnd)

      addEvent.value = true // show dialog
    }

    function deleteEvent(eventparam: IEvents) {
      tools.CancelEvent($q, eventparam)
    }

    function duplicateEvent(eventparam: any, numgg: number, numev = 1) {
      for (let i = 0; i < numev; ++i) {
        globalStore.DuplicateRec({ table: costanti.TABEVENTS, id: eventparam._id }).then((rec) => {
          if (rec) {
            rec.dateTimeStart = tools.addDays(new Date(rec.dateTimeStart), numgg * (i + 1))
            rec.dateTimeEnd = tools.addDays(new Date(rec.dateTimeEnd), numgg * (i + 1))
            calendarStore.eventlist.push(rec)
            editEvent(rec)
          }
        })
      }
      // tools.ActionRecTable(this, lists.MenuAction.DUPLICATE_RECTABLE, costanti.TABEVENTS, eventparam._id, eventparam, 'db.duplicatedrecord')
    }


    function formatDate(mydate: any) {
      let d: any = void 0

      if (mydate !== void 0) {
        d = new Date(mydate)
      } else {
        d = new Date()
      }
      const month = '' + (d.getMonth() + 1)
      const day = '' + d.getDate()
      const year = d.getFullYear()

      return [year, tools.padTime(month), tools.padTime(day)].join('-')
    }

    function formatTime(mydate: any) {
      const d = mydate !== void 0 ? new Date(mydate) : new Date(),
        hours = '' + d.getHours(),
        minutes = '' + d.getMinutes()

      return [tools.padTime(hours), tools.padTime(minutes)].join(':')
    }

    function getDuration(dateTimeStart: Date, dateTimeEnd: Date, unit: any) {
      const start = new Date(dateTimeStart)
      const end = new Date(dateTimeEnd)
      const diff = date.getDateDiff(end, start, unit)
      return diff
    }

    function saveEvent() {

      // ++Todo VALIDATE $refs.myevent

      if (true) {
        // close the dialog
        addEvent.value = false
        const form = { ...eventForm.value }
        let update = false
        if (contextDay.value._id) {
          // an update
          update = true
        } else {
          // an add
        }
        const data: any = { ...form }

        // ++Save into the Database
        const mydatatosave = {
          id: data._id,
          table: costanti.TABEVENTS,
          fieldsvalue: data
        }

        if (update) {
          UpdateDbByFields($q, data, true, contextDay.value)
        } else {
          const mydataadd = {
            table: costanti.TABEVENTS,
            data
          }

          globalStore.saveTable(mydataadd).then((record) => {
            if (record) {
              tools.showPositiveNotif($q, t('db.recupdated'))

              if (update) {
                const index = findEventIndex(contextDay)
                if (index >= 0) {
                  // @ts-ignore
                  calendarStore.eventlist.splice(index, 1, { ...data })
                }
              } else {
                data._id = record._id
                // add to events array
                // @ts-ignore
                calendarStore.eventlist.push(data)
              }

            } else {
              tools.showNegativeNotif($q, t('db.recfailed'))
              // Undo...
              const index = findEventIndex(contextDay)
              if (index >= 0) {
                // @ts-ignore
                calendarStore.eventlist.splice(index, 1, { ...contextDay })
              }
            }
          })
        }

        contextDay.value = null
      }
    }

    function EditBookEvent(myevent: IEvents) {

      const bookedevent: any = calendarStore.findEventBooked(myevent, false)

      console.log('bookedevent', bookedevent)

      if (bookedevent) {
        bookEventForm.value._id = bookedevent._id
        bookEventForm.value.numpeople = bookedevent.numpeople
        bookEventForm.value.numpeopleLunch = bookedevent.numpeopleLunch
        bookEventForm.value.numpeopleDinner = bookedevent.numpeopleDinner
        bookEventForm.value.numpeopleDinnerShared = bookedevent.numpeopleDinnerShared
        bookEventForm.value.infoevent = bookedevent.infoevent
        bookEventForm.value.msgbooking = bookedevent.msgbooking
        bookEventForm.value.booked = bookedevent.booked
        bookEventForm.value.datebooked = bookedevent.datebooked
      }

      bookEventpage.value.state = EState.Modifying
      bookEventpage.value.bookedevent = bookedevent
      bookEventpage.value.show = true
    }

    function sendMsg(myevent: IEvents) {
      askInfopage.value.show = false

      const data: IMessage = {
        source: {
          event_id: myevent._id,
          infoevent: tools.gettextevent(myevent)
        },
        dest: {
          idapp: process.env.APP_ID,
          username: myevent.teacher
        },
        message: askInfoForm.value.message
      }

      messageStore.SendMsgEvent(data).then((ris) => {
        contextDay.value = null
        if (ris)
          tools.showPositiveNotif($q, t('cal.sendmsg_sent'))
        else
          tools.showNegativeNotif($q, t('cal.sendmsg_error'))
      })

    }

    function saveBookEvent(myevent: IEvents) {
      // ++Todo VALIDATE $refs.myevent

      if (true) {
        // close the dialog
        bookEventpage.value.show = false

        // bookEventForm.value.booked = bookEventForm.value.bookedcheck

        const data: IBookedEvent = {
          userId: userStore.my._id,
          id_bookedevent: myevent._id,
          numpeople: bookEventForm.value.numpeople,
          numpeopleLunch: bookEventForm.value.numpeopleLunch,
          numpeopleDinner: bookEventForm.value.numpeopleDinner,
          numpeopleDinnerShared: bookEventForm.value.numpeopleDinnerShared,
          infoevent: tools.gettextevent(myevent),
          msgbooking: bookEventForm.value.msgbooking,
          booked: bookEventForm.value.booked,
          datebooked: tools.getDateNow(),
          modified: (bookEventpage.value.state !== EState.Creating)
        }

        BookEvent(data).then((ris) => {
          console.log('ris uscita di BookEvent', ris)
          if (ris)
            tools.showPositiveNotif($q, t('cal.booked') + ' ' + t('cal.event') + ' "' + myevent.title + '"')
          else
            tools.showNegativeNotif($q, t('cal.booked_error'))
        })

        contextDay.value = null
      }
    }

    function adjustTimestamp(day: any) {
      day.minute = day.minute < 15 || day.minute >= 45 ? 0 : 30
      return day
    }

    // function getTimestamp(day) {
    //   return day.date + ' ' + tools.padTime(day.hour) + ':' + tools.padTime(day.minute) + ':00.000'
    // }

    function updateFormatters() {
      try {
        // console.log('tools.getLocale() =', tools.getLocale())
        // console.log('Calendar', calendarStore.locale)
        dateFormatter.value = new Intl.DateTimeFormat(tools.getLocale() || void 0, {
          weekday: calendarStore.shortWeekdayLabel ? 'short' : 'long',
          month: calendarStore.shortMonthLabel ? 'short' : 'long',
          day: 'numeric',
          year: 'numeric',
          timeZone: 'UTC'
        })
        titleFormatter.value = new Intl.DateTimeFormat(locale.value || void 0, {
          month: calendarStore.shortMonthLabel ? 'short' : 'long',
          year: 'numeric',
          timeZone: 'UTC'
        })

      } catch (e) {
        console.error('Intl.DateTimeFormat not supported')
        dateFormatter.value = void 0
      }
    }

    function onDragEnter(ev: any, eventparam: any) {
      /*
      prevent(ev)

       */
    }

    function onDragStart(ev: any, eventparam: any) {
      dragging.value = true
      draggedEvent.value = eventparam
      /*
      stop(ev)

       */
    }


    function onDragEnd(ev: any, eventparam: any) {
      /*
      stopAndPrevent(ev)
      resetDrag()

       */
    }

    function onDragOver(ev: any, day: any, type: any) {
      /*
      if (type === 'day') {
        stopAndPrevent(ev)
        return draggedEvent.value.dateTimeStart !== day.dateTimeStart
      } else if (type === 'interval') {
        stopAndPrevent(ev)
        // return draggedEvent.value.date !== day.date && draggedEvent.value.time !== day.time
        return draggedEvent.value.dateTimeStart !== day.dateTimeStart
      }*/

    }

    function onDrop(ev: any, day: any, type: any) {
      ev.preventDefault()
      ev.stopPropagation()
      console.log('day.dateTimeStart', day.dateTimeStart, day.date, 'day.time', day.time)
      if (type === 'day') {
        // @ts-ignore
        draggedEvent.value.dateTimeStart = day.date + ' ' + tools.getstrTime(draggedEvent.value.dateTimeStart)
        // @ts-ignore
        draggedEvent.value.dateTimeEnd = day.date + ' ' + tools.getstrTime(draggedEvent.value.dateTimeEnd)
        draggedEvent.value.side = void 0
      } else if (type === 'interval') {
        const mins = date.getDateDiff(draggedEvent.value.dateTimeEnd, draggedEvent.value.dateTimeStart, 'minutes')
        // @ts-ignore
        draggedEvent.value.dateTimeStart = day.date + ' ' + day.time
        // @ts-ignore
        const mystart = new Date(draggedEvent.value.dateTimeStart)
        draggedEvent.value.dateTimeEnd = tools.addMinutes(mystart, mins)
        // draggedEvent.value.dateTimeEnd = day.dateTimeEnd
        // draggedEvent.value.time = day.time
        draggedEvent.value.side = void 0
      }
// console.log('Start', draggedEvent.value.dateTimeStart, 'End', draggedEvent.value.dateTimeEnd)

// Save Date
      UpdateDbByFields($q, {
        _id: draggedEvent.value._id,
        dateTimeStart: draggedEvent.value.dateTimeStart,
        dateTimeEnd: draggedEvent.value.dateTimeEnd
      }, true, contextDay.value)

    }

    function resetDrag() {
// @ts-ignore
      draggedEvent.value = void 0
      dragging.value = false
      if (Platform.is.desktop) {
        ignoreNextSwipe.value = true
      }
    }

    async function BookEvent(eventparam: IBookedEvent) {
      return await calendarStore.BookEvent(eventparam)
    }

    function createContribType(value: any) {
      console.log('createContribType', value)
      tools.createNewRecord($q, 'contribtype', { label: value }).then((myrec) => {
        // console.log('myrec')
        calendarStore.contribtype.push(myrec)
      })
    }

    function getEventDate(eventparam: any) {
      const parts = eventparam.dateTimeStart.split('-')
      const mydate = new Date(parts[0], parts[1] - 1, parts[2])
      return dateFormatter.value.format(mydate)
    }

    function badgeClasses(eventparam: any, type: any) {
      const cssColor = tools.isCssColor(eventparam.bgcolor)
      const isHeader = type === 'header'
      return {
        [`text-white bg-${eventparam.bgcolor}`]: !cssColor,
        'full-width': !isHeader && (!eventparam.side || eventparam.side === 'full'),
        'left-side': !isHeader && eventparam.side === 'left',
        'right-side': !isHeader && eventparam.side === 'right'
      }
    }

    function badgeStyles(eventparam: any, type: any, timeStartPos: any, timeDurationHeight: any) {
      const s = { color: '', top: '', height: '', opacity: 1, 'background-color': 'black', 'align-items': '' }

      if (tools.isCssColor(eventparam.bgcolor)) {
        s['background-color'] = eventparam.bgcolor
        s.color = colors.luminosity(eventparam.bgcolor) > 0.5 ? 'black' : 'white'
      }
      if (timeStartPos) {
        s.top = timeStartPos(tools.getstrTime(eventparam.dateTimeStart)) + 'px'
      }
      if (timeDurationHeight) {
        s.height = timeDurationHeight(func_tools.getMinutesDuration(eventparam.dateTimeStart, eventparam.dateTimeEnd)) + 'px'
      }

      if (!isEventEnabled(eventparam)) {
        s.opacity = 0.5
      }

      s['align-items'] = 'flex-start'
      return s
    }

    function calendarNext() {
// @ts-ignore
      calendar.value.next()
    }

    function calendarPrev() {
// @ts-ignore
      calendar.value.prev()
    }

    function calendarToday(today: any) {
      selectedDate.value = today
    }

    function SetToday() {
// root.$emit('calendar:today', formatDate(tools.getDateNow()))
    }

    function onChanged(data: any) {
// uncomment to see data in console
// let { start, end } = data
// console.log('onChanged:', start, end)
    }

    function onMoved(moved: any) {
// uncomment to see data in console
// console.log('onMoved:', moved)
    }

    function getEventList() {
      const mylist = calendarStore.eventlist.filter((rec: IEvents) => (new Date(rec.dateTimeEnd!) >= tools.getDateNowEvent()))
      if (props.showfirstN > 0)
        return mylist.slice(0, props.showfirstN)
      else
        return mylist
    }

    function getEvents(dt: any) {
      const eventsloc = []

      for (let i = 0; i < calendarStore.eventlist.length; ++i) {
        let added = false
        if (tools.getstrYYMMDDDate(calendarStore.eventlist[i].dateTimeStart) === dt) {
          if (eventsloc.length > 0) {
            // check for overlapping times
            const startTime = calendarStore.eventlist[i].dateTimeStart
            const endTime = calendarStore.eventlist[i].dateTimeEnd
            for (const item of eventsloc) {
              const startTime2 = item.dateTimeStart
              const endTime2 = item.dateTimeEnd
              if (date.isBetweenDates(startTime, startTime2, endTime2) || date.isBetweenDates(endTime, startTime2, endTime2)) {
                item.side = 'left'
                eventsloc.push(calendarStore.eventlist[i])
                added = true
                break
              }
            }
          }
          // }
          if (!added) {
            // calendarStore.eventlist[i].side = void 0
            eventsloc.push(calendarStore.eventlist[i])
          }
        } else if (tools.hasManyDays(calendarStore.eventlist[i].dateTimeStart, calendarStore.eventlist[i].dateTimeEnd)) {
          // check for overlapping dates
          if (date.isBetweenDates(dt, calendarStore.eventlist[i].dateTimeStart, calendarStore.eventlist[i].dateTimeEnd)) {
            eventsloc.push(calendarStore.eventlist[i])
            added = true
          }
        }
      }
// if (eventsloc.length > 0)
// console.log('eventsloc', eventsloc)
      return eventsloc
    }

    function getTitleEv(event: IEvents) {
      return (!!event.short_tit) ? event.short_tit : event.title
    }

    function getLongTitleEv(event: IEvents) {
      return event.title
    }

    onMounted(mounted)
    onBeforeMount(beforeMount)

    return {
      calendarView,
      selectedDate,
      tabeditor,
      showPrev,
      keyValue,
      weekdays,
      addEvent,
      bookEventpage,
      askInfopage,
      contextDay,
      eventForm,
      bookEventForm,
      askInfoForm,
      displayEvent,
      myevent,
      dragging,
      UpdateDbByFields,
      visuAllCal,
      title_cal,
      calendarStore,
      eventsMap,
      addOrUpdateEvent,
      sendMsg,
      calendar,
      getEventList,
      getEvents,
      getTitleEv,
      getLongTitleEv,
      onChanged,
      onMoved,
      dayHeight,
      theme,
      containerStyle,
      scrollerPopupStyle160,
      hasModifiedBooking,
      checkseinviaMsg,
      getTitleBtnBooking,
      onDragOver,
      onDragEnd,
      onDragStart,
      onDragEnter,
      adjustTimestamp,
      saveBookEvent,
      EditBookEvent,
      saveEvent,
      onDrop,
      resourceDayClicked,
      resourceClicked,
      onDateChanged,
      selectEvent,
      showEvent,
      addEventMenu,
      addBookEventMenu,
      askForInfoEventMenu,
      clEvent,
      deleteEvent,
      duplicateEvent,
      resources,
      calendarPrev,
      calendarNext,
      badgeClasses,
      badgeStyles,
      tools,
      globalStore,
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
      createContribType,
      static_data,
      editEvent,
    }
  }
})
