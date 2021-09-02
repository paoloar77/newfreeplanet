import Api from '@api'
import { IBookedEvent, ICalendarState, IEvents } from 'model'

import { serv_constants } from './Modules/serv_constants'
import { tools } from './Modules/tools'
import { defineStore } from 'pinia'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { costanti } from '@costanti'

export const useCalendarStore = defineStore('CalendarStore', {
  state: (): ICalendarState => ({
    editable: false,
    eventlist: [],
    bookedevent: [],
    operators: [],
    internalpages: [],
    wheres: [],
    contribtype: [],
    // ---------------
    titlebarHeight: 0,
    locale: 'it-IT',
    maxDays: 1,
    fiveDayWorkWeek: false,
    shortMonthLabel: false,
    showDayOfYearLabel: false,
    shortWeekdayLabel: true,
    shortIntervalLabel: false,
    hour24Format: true,
    hideHeader: false,
    noScroll: false,
    showMonthLabel: false,
    showWorkWeeks: false,
    intervalRange: { min: 9, max: 23 },
    intervalRangeStep: 1,
    intervalHeight: 35, // 35
    resourceHeight: 80, // 60
    resourceWidth: 100,
    dayHeight: 150,
    enableThemes: false,
    theme: {},
  }),
  getters: {

    findEventBooked: (mystate: ICalendarState) => (myevent: IEvents, isconfirmed: boolean) => {
      const userStore = useUserStore()
      return mystate.bookedevent.find((bookedevent) => (bookedevent.id_bookedevent === myevent._id) && (bookedevent.userId === userStore.my._id) && ((isconfirmed && bookedevent.booked) || (!isconfirmed)))
    },

    getNumParticipants: (mystate: ICalendarState) => (myevent: IEvents, showall: boolean, tipo = 0): number => {
      const userStore = useUserStore()
      const myarr = mystate.bookedevent.filter((bookedevent) => (bookedevent.id_bookedevent === myevent._id) && (bookedevent.booked) && (showall || (!showall && bookedevent.userId === userStore.my._id)) && (((tipo === tools.peopleWhere.participants) && bookedevent.numpeople > 0) || ((tipo === tools.peopleWhere.lunch && bookedevent.numpeopleLunch! > 0) || (tipo === tools.peopleWhere.dinner && bookedevent.numpeopleDinner! > 0) || (tipo === tools.peopleWhere.dinnerShared && bookedevent.numpeopleDinnerShared! > 0))))
      if (myarr.length > 0) {
        let ris = null
        if (tipo === tools.peopleWhere.participants) {
          ris = myarr.reduce((sum, bookedevent) => sum + bookedevent.numpeople, 0)
        } else if (tipo === tools.peopleWhere.lunch) {
          ris = myarr.reduce((sum, bookedevent) => sum + bookedevent.numpeopleLunch!, 0)
        } else if (tipo === tools.peopleWhere.dinner) {
          ris = myarr.reduce((sum, bookedevent) => sum + bookedevent.numpeopleDinner!, 0)
        } else if (tipo === tools.peopleWhere.dinnerShared) {
          ris = myarr.reduce((sum, bookedevent) => sum + bookedevent.numpeopleDinnerShared!, 0)
        }

        return ris!
      } else {
        return 0
      }
    },

    getEventsBookedByIdEvent: (mystate: ICalendarState) => (idevent: string, showall: boolean) => {
      const userStore = useUserStore()
      return mystate.bookedevent.filter((bookedevent) => (bookedevent.id_bookedevent === idevent) && (bookedevent.booked) && (showall || (!showall && bookedevent.userId === userStore.my._id)))
    },

    getWhereRec: (mystate: ICalendarState) => (wherecode: string) => {
      return mystate.wheres.find((mywhere) => mywhere.code === wherecode)

    },

    getContribtypeRec: (mystate: ICalendarState) => (id: string) => {
      const ctrec = mystate.contribtype.find((mycontr) => mycontr._id === id)
      return (ctrec)

    },

    getOperatorByUsername: (mystate: ICalendarState) => (username: string) => {
      const ctrec = mystate.operators.find((rec) => rec.username === username)
      return (ctrec)

    },

    getImgTeacherByUsername: (mystate: ICalendarState) => (username: string): string => {
      if (username === '')
        return ''
      // Check if is this User!
      // @ts-ignore
      const myop = this.getOperatorByUsername(username)
      if (myop && !!myop.img && myop.img !== '' && myop.img !== 'undefined') {
        return myop.img
      } else {
        return ''
      }
    },

    getContribtypeById: (mystate: ICalendarState) => (id: string) => {
      const ctrec = mystate.contribtype.find((mycontr) => mycontr._id === id)
      return (ctrec) ? ctrec.label : ''

    },
    getContribtypeRecByLabel: (mystate: ICalendarState) => (label: string) => {
      const ctrec = mystate.contribtype.find((mycontr) => mycontr.label === label)
      return (ctrec)

    },

  },
  actions: {

    getparambyevent(bookevent: IBookedEvent) {
      const userStore = useUserStore()
      return {
        _id: bookevent._id,
        id_bookedevent: bookevent.id_bookedevent,
        infoevent: bookevent.infoevent,
        numpeople: bookevent.numpeople,
        numpeopleLunch: bookevent.numpeopleLunch,
        numpeopleDinner: bookevent.numpeopleDinner,
        numpeopleDinnerShared: bookevent.numpeopleDinnerShared,
        msgbooking: bookevent.msgbooking,
        datebooked: bookevent.datebooked,
        userId: userStore.my._id,
        booked: bookevent.booked,
        modified: bookevent.modified,
      }
    },

    async BookEvent( bookevent: IBookedEvent) {
      console.log('BookEvent', bookevent)

      const param = this.getparambyevent(bookevent)

      return Api.SendReq('/booking', 'POST', param)
        .then((res) => {
          if (res.status === 200) {
            console.log('datares', res.data)
            if (res.data.code === serv_constants.RIS_CODE_OK) {
              bookevent._id = res.data.id
              if (bookevent.modified) {

                const foundIndex = this.bookedevent.findIndex((x) => x.id_bookedevent === bookevent.id_bookedevent)
                if (foundIndex >= 0)
                  this.bookedevent[foundIndex] = bookevent

              } else {
                this.bookedevent.push(bookevent)
              }
              return true
            }
          }
          return false
        })
        .catch((error) => {
          console.error(error)
          return false
        })

    },

    async CancelEvent( { id }: { id: string }) {
      const globalStore = useGlobalStore()
      return globalStore.DeleteRec({ table: costanti.TABEVENTS, id })
    },

    async CancelBookingEvent( { ideventbook, notify }: { ideventbook: string, notify: string }) {
      console.log('CALSTORE: CancelBookingEvent', ideventbook, notify)

      return Api.SendReq('/booking/' + ideventbook + '/' + notify + '/' + process.env.APP_ID, 'DELETE', null)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === serv_constants.RIS_CODE_OK) {

              // Remove this record from my list
              this.bookedevent = this.bookedevent.filter((eventbooked) => (eventbooked._id !== ideventbook))

              return true
            }
          }
          return false

        })
        .catch((error) => {
          console.error(error)
          // userStore.mutations.setErrorCatch(error)
          return false
        })
    },

  },
})
