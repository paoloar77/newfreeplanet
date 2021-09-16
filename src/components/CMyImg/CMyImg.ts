import { defineComponent, ref, onMounted } from 'vue'
import { tools } from '@store/Modules/tools'

export default defineComponent({
  name: 'CMyImg',
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
      default: '',
    },
    width: {
      type: String,
      required: true,
      default: '',
    },
  },
  components: {},
  setup(props) {
    const mystyle = ref('')

    function mounted() {
      console.log('mounted')
      console.log(props.src)

      if (props.width)
        mystyle.value = 'max-width: ' + props.width + 'px; '
      else
        mystyle.value = ''
    }

    function getalt() {
      if (props.alt) {
        return props.alt
      } else {
        return tools.getimgFullpathbysize(props.src)
      }
    }

    onMounted(mounted)

    return {
      mystyle,
      getalt,
    }
  }
})

