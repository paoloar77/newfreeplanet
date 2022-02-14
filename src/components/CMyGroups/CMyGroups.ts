import { CMyGroup } from '@/components/CMyGroup'
import { computed, defineComponent, onMounted, PropType, ref, toRef } from 'vue'
import { useUserStore } from '@store/UserStore'
import { useI18n } from '@/boot/i18n'
import { useQuasar } from 'quasar'
import { costanti } from '@costanti'
import { IMyGroup, ISearchList, IUserFields } from 'model'
import { shared_consts } from '@/common/shared_vuejs'
import { tools } from '@store/Modules/tools'
import { CUserNonVerif } from '@/components/CUserNonVerif'


export default defineComponent({
  name: 'CMyGroups',
  components: { CMyGroup, CUserNonVerif },
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Number,
      required: false,
      default: 0,
    },
    finder: {
      type: Boolean,
      required: true,
    },
    mygrp: {
      type: Object as PropType<IMyGroup | null>,
      required: false,
      default: null,
    },
    mygroupname: {
      type: String,
      required: false,
      default: null,
    },
    visu: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const userStore = useUserStore()
    const $q = useQuasar()
    const { t } = useI18n()

    const username = ref('')

    const filtroutente = ref(<any[]>[])

    const listgroupsfiltered = computed(() => {
      let arr: any[] = []
      try {
        if (props.modelValue === costanti.GROUPS) {
          arr = userStore.my.profile.mygroups
        } else if (props.modelValue === costanti.MY_GROUPS) {
          arr = userStore.my.profile.mygroups
        } else if (props.modelValue === costanti.MANAGE_GROUPS) {
          arr = userStore.my.profile.manage_mygroups
        } else if (props.modelValue === costanti.ASK_SENT_GROUP) {
          arr = userStore.my.profile.asked_groups
        }
      } catch (e) {
        arr = []
      }

      return arr
    })

    const myoptions = computed(() => {
      const mybutt = []
      mybutt.push({ label: t('mypages.find_group'), value: costanti.FIND_GROUP })
      mybutt.push({ label: t('mypages.manage_my_groups') + ' (' + numManageGroups.value + ')', value: costanti.MANAGE_GROUPS })
      mybutt.push({ label: t('mypages.follow_groups') + ' (' + numMyGroups.value + ')', value: costanti.MY_GROUPS })

      if (numAskSentGroups.value > 0 || props.modelValue === costanti.ASK_SENT_GROUP)
        mybutt.push({
          label: t('mypages.request_sent_groups') + ' (' + numAskSentGroups.value + ')',
          value: costanti.ASK_SENT_GROUP
        })

      return mybutt
    })

    const numManageGroups = computed(() => {
      const arr = userStore.my.profile.manage_mygroups
      return (arr) ? arr.length : 0
    })

    const numMyGroups = computed(() => {
      const arr = userStore.my.profile.mygroups
      return (arr) ? arr.length : 0
    })

    const numAskSentGroups = computed(() => {
      const arr = userStore.my.profile.asked_groups
      return (arr) ? arr.length : 0
    })

    function loadGroups() {
      // Carica il profilo di quest'utente
      if (username.value) {
        userStore.loadGroups(username.value).then((ris) => {
          // console.log('ris', ris)
          if (ris) {
            userStore.my.profile.mygroups = ris.mygroups ? ris.mygroups : []
            userStore.my.profile.list_usersgroup = ris.listUsersGroup ? ris.listUsersGroup : []
            userStore.groups = ris.listgroups ? ris.listgroups : []
            userStore.my.profile.asked_groups = ris.listSentRequestGroups ? ris.listSentRequestGroups : []
            filtroutente.value = [{ userId: userStore.my._id }]
          }
        })

      }
    }

    function mounted() {
      username.value = userStore.my.username
      loadGroups()

    }

    function updateValue(val: number) {
      emit('update:modelValue', val)
    }

    onMounted(mounted)

    return {
      tools,
      costanti,
      shared_consts,
      filtroutente,
      listgroupsfiltered,
      updateValue,
      myoptions,
    }
  }
})
