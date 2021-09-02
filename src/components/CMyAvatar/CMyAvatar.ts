import { defineComponent, onMounted, ref, watch } from 'vue'
import { useUserStore } from '@store/UserStore'

export default defineComponent({
  name: 'CMyAvatar',
  props: {
    myimg: {
      type: String,
      required: false,
      default: '',
    },
    size: {
      type: String,
      required: false,
      default: '40px',
    },
  },

  setup(props) {

    const myicon = ref('')
    const myimgint = ref('')

    const userStore = useUserStore()
    const imgprofile = ref(userStore.my.profile.img)

    function refresh() {
      if (!props.myimg) {
        myicon.value = 'fas fa-user-circle'
      } else {
        myimgint.value = props.myimg
      }
      // console.log('myimgint', this.myimgint)
    }

    watch(
      imgprofile,
      // @ts-ignore
      (value: string, oldValue: string) => {
        userStore.my.profile.img = value
        refresh()
      },
    )


    watch(
      // @ts-ignore
      props.myimg,
      // @ts-ignore
      (value: string, oldValue: string) => {
        myimgint.value = ''
        refresh()
      },
    )

    onMounted(refresh)

    return {
      myimgint,
    }
  },
})
