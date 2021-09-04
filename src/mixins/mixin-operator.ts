import { useCalendarStore } from '@store/CalendarStore'

export default function () {
  function isEstate(){
    const now = new Date()
    return (now.getMonth() === 5) || (now.getMonth() === 6) || (now.getMonth() === 7) || (now.getMonth() === 8)
  }

  function isEstateRiprenderanno(){
    const now = new Date()
    return (now.getMonth() === 9)
  }

  function getOperators() {
    const calendarStore = useCalendarStore()
    return calendarStore.operators
  }

  function getOperatorByUsername(username: string) {
    const calendarStore = useCalendarStore()
    return calendarStore.getOperatorByUsername(username)
  }

  function getImgTeacherByUsername(username: string) {
    const calendarStore = useCalendarStore()
    return 'statics/images/' + calendarStore.getImgTeacherByUsername(username)
  }

  function getTeacherByUsername(username: string) {
    const op = getOperatorByUsername(username)
    if (!!op) {
      return op.name + ' ' + op.surname
    } else {
      return ''
    }
  }

  return {
    isEstate,
    isEstateRiprenderanno,
    getOperators,
    getOperatorByUsername,
    getImgTeacherByUsername,
    getTeacherByUsername,
  }
}
