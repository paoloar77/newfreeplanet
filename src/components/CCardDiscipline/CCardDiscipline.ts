import { computed, defineComponent, PropType, ref, toRef, watch } from 'vue'

import { tools } from '@store/Modules/tools'
import { IDiscipline, IEvents } from 'model'

import { useCalendarStore } from '@store/CalendarStore'

import CMyTeacher from '@/components/CMyTeacher/CMyTeacher'

// @ts-ignore
import MixinOperator from '../../mixins/mixin-operator'
import MixinUsers from '@/mixins/mixin-users'

export default defineComponent({
  name: 'CCardDiscipline',
  components: { CMyTeacher },
  props: {
    discipline: {
      Type: Object as PropType<IDiscipline>,
      required: true,
    },
    mystyle: {
      type: String,
      required: false,
      default: '',
    },
    autoplay: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  setup(props) {

    const nextlesson = ref()
    const calendarStore = useCalendarStore()

    const { getImgTeacherByUsername } = MixinOperator()
    const { isValidUsername } = MixinUsers()

    // const mydiscipline = toRef(props, 'discipline');

    const getLinkEvent = computed(() => `event/${nextlesson.value.typol}/${nextlesson.value._id}`)

    function getNextLesson(typol: any): IEvents | undefined {
      // Get next lesson
      const datenow = tools.addDays(tools.getDateNow(), -1)
      return calendarStore.eventlist.find((myevent: IEvents) => (myevent.typol === typol) && (new Date(myevent.dateTimeEnd!) >= datenow))
    }

    function disciplinechanged(myrec: IDiscipline | any) {
      nextlesson.value = getNextLesson(myrec.typol_code)
      // console.log('nextlesson', this.nextlesson)
    }

    watch(() => props.discipline, (value: any, oldval: any) => {
      nextlesson.value = getNextLesson(value.typol_code)
    },
    )

    function ExistLesson() {
      return !!nextlesson.value
    }

    function NextEventDate() {
      return tools.getstrDateTimeEventSimple(nextlesson.value)
    }

    function created() {
      disciplinechanged(props.discipline)
    }

    created()

    return {
      ExistLesson,
      NextEventDate,
      tools,
      getImgTeacherByUsername,
      getLinkEvent,
      isValidUsername,
    }
  },
})
