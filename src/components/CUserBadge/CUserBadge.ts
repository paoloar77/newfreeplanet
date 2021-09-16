import { defineComponent, ref, computed, PropType } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useQuasar } from 'quasar'
import CCardState from '@/components/CCardState/CCardState'
import { IOperators, IUserFields } from 'model'
import { tools } from '@store/Modules/tools'

export default defineComponent({
  name: 'CUserBadge',
  props: {
    index: {
      type: Number,
      required: true,
      default: 0,
    },
    yourinvite: {
      type: Boolean,
      required: false,
      default: false,
    },
    mycolor: {
      type: String,
      required: true,
    },
    mydisabled: {
      type: String,
      required: false,
      default: '',
    },
    showsteps: {
      type: Boolean,
      required: false,
      default: true,
    },
    showregalainv: {
      type: Boolean,
      required: false,
      default: true,
    },
    ind_order_ingr: {
      type: Number,
      required: false,
      default: -1,
    },
    id_listaingr: {
      type: Number,
      required: false,
      default: -1,
    },
    user: {
      type: Object as PropType<IUserFields>,
      required: true,
    }
  },
  components: { CCardState },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()

    function getletter(user: IUserFields) {
      if (!user)
        return ''
      if (!!user.name[0])
        return user.name[0].toUpperCase()
      else
        return ''
    }

    function getnumber(user: IUserFields, index: number) {
      return index
    }

    function getstatecolor(user: IUserFields) {
      if (user.profile)
        return (user.profile.teleg_id) ? 'green' : 'grey'
      else
        return 'grey'
    }

    function getindorder(user: any) {
      if (!!user.index)
        return ' (n°' + user.index + ')'
      return ''
    }

    function getquanti(user: any) {
      if (!!user.quanti) {
        if (user.quanti > 1) {
          return ' (' + user.quanti + ' ' + t('reg.volte') + ')'
        }
      }
      return ''
    }

    function getmoneycolor(user: IUserFields) {
      return (user.made_gift) ? 'green' : 'grey'
    }

    function madegift()
    {
      return userStore.my.made_gift
    }

    function getzoomcolor(user: IUserFields) {
      if (user.profile)
        return (user.profile.saw_zoom_presentation) ? 'green' : 'grey'
      else
        return 'grey'
    }

    function get2peoplecolor(user: IUserFields) {
      return (getnumpeople(user) >= 2) ? 'green' : 'grey'
    }

    function getnumpeople(user: IUserFields): any {
      return user.numinvitati
    }

    function getusername(user: IUserFields) {
      return user.username
    }

    function execclick(user: IUserFields) {
      emit('myclick', user, props.showregalainv, props.ind_order_ingr, props.id_listaingr, props.mydisabled)
    }

    function getnumreq(user: IUserFields) {
      let val = tools.getnumrequisiti(user)

      if (val === 7) {
        val += user.numinvitati! >= 2 ? 1 : 0
        val += user.numinvitatiattivi! >= 2 ? 1 : 0
      }

      return val
    }

    function getnumperc(user: IUserFields) {
      let perc = (getnumreq(user) / 9) * 100

      // console.log('numperc', perc)
      return perc
    }

    function getnumpercpeople(user: IUserFields) {
      if (user.numinvitati! > 2)
        return 100
      else
        return (user.numinvitati! / 2) * 100
    }

    function getcolorpeople(user: IUserFields) {
      if (user.numinvitati === 1)
        return 'blue'
      else if (user.numinvitati === 2)
        return 'green'
      else if (user.numinvitati! > 2)
        return 'green'

    }

    function getcolor(user: IUserFields) {
      let mycol = getnumreq(user) === 7 ? 'orange' : 'red'

      if (user.numinvitati! >= 2) {
        mycol = 'blue'
      }
      if (user.numinvitatiattivi! >= 2) {
        mycol = 'green'
      }

      return mycol
    }

    return {
      getletter,
      getnumber,
      getstatecolor,
      getindorder,
      getquanti,
      getmoneycolor,
      madegift,
      getzoomcolor,
      get2peoplecolor,
      getnumpeople,
      getusername,
      execclick,
      getnumreq,
      getnumperc,
      getnumpercpeople,
      getcolorpeople,
      getcolor,
      tools,
    }
  }
})
