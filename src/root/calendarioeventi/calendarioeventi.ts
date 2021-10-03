import { defineComponent } from 'vue'
import { CEventsCalendar } from '@/components/CEventsCalendar'
import { CMyPage } from '@/components/CMyPage'
import MixinMetaTags from '@/mixins/mixin-metatags'
import MixinBase from '@/mixins/mixin-base'

export default defineComponent({
  name: 'Calendarioeventi',
  components: { CEventsCalendar, CMyPage },

  setup() {

    const { setmeta } = MixinMetaTags()
    const { getarrValDb } = MixinBase()

    return {
      setmeta,
      getarrValDb
    }
  }
})
