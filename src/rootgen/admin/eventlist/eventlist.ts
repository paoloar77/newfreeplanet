import { defineComponent, onMounted, ref } from 'vue'
import { tools } from '@src/store/Modules/tools'
import { func_tools } from '@src/store/Modules/toolsext'
import { CTitle } from '../../../components/CTitle/index'
import { CMyPage } from '../../../components/CMyPage/index'
import {
  IBookedEvent,
  ICalendarState,
  IEvents,
  ITodo,
  ITodosState,
  IUserState,
  IUserFields,
  IParamDialog
} from '@src/model'
import { lists } from '@src/store/Modules/lists'

import MixinUsers from '@src/mixins/mixin-users'
import MixinOperator from '@src/mixins/mixin-operator'
import MixinEvents from '@src/mixins/mixin-events'
import { useRoute } from 'vue-router'
import { useCalendarStore } from '@store/CalendarStore'
import { useUserStore } from '@store/UserStore'
import { useQuasar } from 'quasar'
import { useI18n } from '@/boot/i18n'
import translate from '@/globalroutines/util'

export default defineComponent({
  name: 'Eventlist',
  components: { CTitle, CMyPage },

  setup() {

    const showpeople = ref(false)
    const shownote = ref(false)
    const eventsel = ref(null)
    const showPrev = ref(false)
    const numrec = ref(0)
    const $q = useQuasar()
    const { t } = useI18n()

    const calendarStore = useCalendarStore()
    const userStore = useUserStore()
    const $route = useRoute()

    const { getTeacherByUsername } = MixinOperator()

    const { UpdateDbByFields } = MixinEvents()

    const { isValidUsername } = MixinUsers()

    function getEventList() {
      const eventsloc: IEvents[] = []

      const datenow = tools.addDays(tools.getDateNow(), -1)

      let numevent = 0

      calendarStore.eventlist.forEach((myevent: IEvents) => {
        // console.log('  ciclo i = ', i, calendarStore.eventlist[i])
        // let dateEvent = new Date(myevent.date + ' 00:00:00')
        const dateEvent = new Date(myevent.dateTimeEnd!)

        let add = true

        if (!showall) {
          add = calendarStore.getNumParticipants(myevent, showall(), tools.peopleWhere.participants) > 0
        }

        if (add) {

          if (showPrev.value) {
            if (dateEvent < datenow) {
              eventsloc.push(myevent)
              numevent++
            }
          } else {
            if (dateEvent >= datenow) {
              eventsloc.push(myevent)
              numevent++
            }
          }

        }

      })

      numrec.value = numevent

      if (showPrev.value) {
        eventsloc.reverse()
      }

      return eventsloc.filter((rec) => rec.title !== '')
    }

    function getNumEvent() {
      const eventsloc: IEvents[] = []

      const datenow = tools.addDays(tools.getDateNow(), -1)

      let numevent = 0

      calendarStore.eventlist.forEach((myevent: IEvents) => {
        // console.log('  ciclo i = ', i, calendarStore.eventlist[i])
        // let dateEvent = new Date(myevent.date + ' 00:00:00')
        const dateEvent = new Date(myevent.dateTimeEnd!)

        let add = true

        if (!showall) {
          add = calendarStore.getNumParticipants(myevent, showall(), tools.peopleWhere.participants) > 0
        }

        if (add) {
          if (showPrev.value) {
            if (dateEvent < datenow)
              numevent++
          } else {
            if (dateEvent >= datenow)
              numevent++
          }
        }
      })

      numrec.value = numevent

      return eventsloc
    }

    function showall() {
      return $route.name === 'otherpages.admin.usereventlist'
    }

    function gettitle() {
      if (showall())
        return t('otherpages.admin.usereventlist')
      else
        return t('otherpages.admin.eventlist')
    }

    function mounted() {
      getNumEvent()
    }


    function change_rec(eventparam: any) {
      console.log('change_rec')
      UpdateDbByFields($q, eventparam)
    }

    onMounted(mounted)

    return {
      getEventList,
      tools,
      func_tools,
      lists,
      showall,
      calendarStore,
      userStore,
      getTeacherByUsername,
      numrec,
      shownote,
      showpeople,
      eventsel,
      isValidUsername,
      gettitle,
      change_rec,
      $q,
    }
  }
})
