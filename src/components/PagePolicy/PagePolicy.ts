import { defineComponent } from 'vue'
import { LandingFooter } from '@/components/LandingFooter'
import { toolsext } from '@store/Modules/toolsext'

export default defineComponent({
  name: 'PagePolicy',
  props: {
    owneremail: [String],
    SiteName: [String],
    ownerDataName: [String],
    managerData: [String],
    includeData: [String],
    url: [String],
    lastdataupdate: [String],
    country: [String],
  },
  components: { LandingFooter },
  setup(props, { emit }) {

    return {
      toolsext,
    }
  }
})

