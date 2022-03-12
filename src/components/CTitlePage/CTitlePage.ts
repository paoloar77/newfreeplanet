import { computed, defineComponent, onMounted, PropType, ref } from 'vue'
import { costanti } from '@costanti'
import { tools } from '@store/Modules/tools'

export default defineComponent({
  name: 'CTitlePage',
  props: {
    ind: {
      type: Number,
      required: false,
      default: -1,
    },
    title: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: false
    },
    color: {
      type: String,
      required: false
    },
  },
  setup(props) {

    const mytitle = ref('')
    const myicon = ref('')
    const mycolor = ref('')

    function mount() {
      if (props.ind === -1) {
        mytitle.value = props.title!
        myicon.value = props.icon!
        mycolor.value = props.color!
      } else {
        mytitle.value = costanti.MAINCARDS[props.ind].title
        myicon.value = costanti.MAINCARDS[props.ind].icon
        mycolor.value = tools.colourNameToHex(costanti.MAINCARDS[props.ind].color)
      }
    }

    onMounted(mount)

    return {
      mytitle,
      myicon,
      mycolor,
    }
  },
})
