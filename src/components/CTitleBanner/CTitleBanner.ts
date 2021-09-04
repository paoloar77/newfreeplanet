import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CTitleBanner',
  props: {
    title: {
      type: String,
      required: true,
    },
    bgcolor: {
      type: String,
      required: false,
      default: 'bg-primary',
    },
    clcolor: {
      type: String,
      required: false,
      default: 'text-white',
    },
    mystyle: {
      type: String,
      required: false,
      default: '',
    },
    myclass: {
      type: String,
      required: false,
      default: '',
    },
    myclasstext: {
      type: String,
      required: false,
      default: '',
    },
    icon: {
      type: String,
      required: false,
      default: '',
    },
    visible: {
      type: Boolean,
      required: false,
      default: true,
    },
    canopen: {
      type: Boolean,
      required: false,
      default: false,
    },
    imgpreview: {
      type: String,
      required: false,
      default: '',
    },
  },
  components: {},
  emits: ['apri'],
  setup(props, { emit }) {
    const myvisible = ref(false)

    function created() {
      myvisible.value = props.visible
    }

    function iconopen() {
      if (!myvisible.value)
        return 'fas fa-chevron-down q-icon q-expansion-item__toggle-icon q-focusable '
      else
        return 'fas fa-chevron-down q-icon q-expansion-item__toggle-icon q-focusable rotate-180'
    }

    function apri() {
      myvisible.value = !myvisible.value
      if (myvisible.value)
        emit('apri')
    }

    function getclass() {
      if (myvisible.value)
        return 'isvisibile'
      else
        return 'nonvisibile glossy'
    }

    created()

    return {
      iconopen,
      apri,
      getclass,
    }
  },
})
