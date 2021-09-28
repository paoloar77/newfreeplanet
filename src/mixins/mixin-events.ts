import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'
import { IDataPass, IEvents } from '@model'
import { tools } from '../store/Modules/tools'
import { costanti } from '@costanti'
import translate from '@src/globalroutines/util'
import { useCalendarStore } from '@store/CalendarStore'
import { useI18n } from '@/boot/i18n'

// You can declare a mixin as the same style as components.
export default function () {
  function getImgEvent(event: IEvents) {
    if (!!event.img)
      return 'public/' + event.img
    else
      return 'public/images/noimg.png'
  }

  function getStyleByEvent(event: IEvents, visu: boolean) {
    let myst = 'border: inset; border-color: darkblue; border-width: 3px; padding: 5px !important; '

    if (!isEventEnabled(event)) {
      myst += ' opacity: 0.5'
    }

    return myst
  }

  function isAlreadyBooked(eventparam: IEvents) {
    const calendarStore = useCalendarStore()
    return calendarStore.findEventBooked(eventparam, true)
  }

  function getWhereIcon(where: string) {
    const calendarStore = useCalendarStore()
    const whererec = calendarStore.getWhereRec(where)
    return (whererec) ? whererec.whereicon : ''
  }

  function getWhereName(where: string) {
    const calendarStore = useCalendarStore()
    const whererec = calendarStore.getWhereRec(where)
    return (whererec) ? whererec.placename : ''
  }

  function editable() {
    const calendarStore = useCalendarStore()
    return calendarStore.editable
  }

  function getContribtypeById(id: string) {
    const calendarStore = useCalendarStore()
    return calendarStore.getContribtypeById(id)
  }

  function getPrice(event: IEvents) {
    let myprice = event.price ? ((event.price > 0) ? event.price + ' €' : '') : ''
    myprice = (event.price === -1) ? translate('event.askinfo') : myprice

    if (event.infoafterprice)
      myprice += ' ' + event.infoafterprice

    return myprice
  }

  function isShowPrice(event: IEvents) {
    const calendarStore = useCalendarStore()
    const rec = calendarStore.getContribtypeRec(event.contribtype!)
    return (rec) ? rec.showprice : true
  }

  function isEventEnabled(myevent: IEvents) {
    // check if event is in the past
    const datenow = tools.addDays(tools.getDateNow(), -1)

    // console.log('datenow', datenow, 'end', myevent.dateTimeEnd)

    if (myevent.dateTimeEnd)
      return (new Date(myevent.dateTimeEnd) >= datenow)
    else
      return false
  }

  function findEventIndex(eventparam: IEvents): number {
    const calendarStore = useCalendarStore()
    for (let i = 0; i < calendarStore.eventlist.length; ++i) {
      if (eventparam) {
        if (eventparam.title === calendarStore.eventlist[i].title &&
          eventparam.details === calendarStore.eventlist[i].details &&
          eventparam.dateTimeStart === calendarStore.eventlist[i].dateTimeStart &&
          eventparam.dateTimeEnd === calendarStore.eventlist[i].dateTimeEnd) {
          return i
        }
      }
    }
    return -1
  }

  function UpdateDbByFields(thisq: any, myrec: any, undo?: boolean, contextDay?: any) {
    const calendarStore = useCalendarStore()
    const globalStore = useGlobalStore()
    const { t } = useI18n()

    const mydatatosave = {
      id: myrec._id,
      table: costanti.TABEVENTS,
      fieldsvalue: myrec
    }

    globalStore.saveFieldValue(mydatatosave).then((esito) => {
      if (esito) {
        tools.showPositiveNotif(thisq, t('db.recupdated'))
      } else {
        tools.showNegativeNotif(thisq, t('db.recfailed'))
        // Undo...
        if (undo) {
          const index = findEventIndex(contextDay)
          if (index >= 0) {
            // @ts-ignore
            calendarStore.eventlist.splice(index, 1, { ...self.contextDay })
          }
        }
      }
    })
  }

  return {
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
  }
}
