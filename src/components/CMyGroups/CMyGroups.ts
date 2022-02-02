import { CMyGroup } from '@/components/CMyGroup'
import { computed, defineComponent, onMounted, PropType, ref, toRef } from 'vue'
import { useUserStore } from '@store/UserStore'
import { useI18n } from '@/boot/i18n'
import { useQuasar } from 'quasar'
import { costanti } from '@costanti'
import { IMyGroup, ISearchList, IUserFields } from 'model'
import { shared_consts } from '@/common/shared_vuejs'
import { tools } from '@store/Modules/tools'


export default defineComponent({
  name: 'CMyGroups',
  components: { CMyGroup },
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
          arr = userStore.my.profile.groups
        } else if (props.modelValue === costanti.MY_GROUPS) {
          arr = userStore.my.profile.groups
        // } else if (props.modelValue === costanti.REQ_GROUP) {
          //   arr = userStore.my.profile.req_groups
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
      mybutt.push({ label: t('mypages.my_groups') + ' (' + numGroups.value + ')', value: costanti.MY_GROUPS })

      if (numAskSentGroups.value > 0 || props.modelValue === costanti.ASK_SENT_GROUP)
        mybutt.push({
          label: t('mypages.request_sent_groups') + ' (' + numAskSentGroups.value + ')',
          value: costanti.ASK_SENT_GROUP
        })

      return mybutt
    })

    const numGroups = computed(() => {
      const arr = userStore.my.profile.groups
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
            userStore.my.profile.groups = ris.listUsersGroup ? ris.listUsersGroup : []
            userStore.groups = ris.listgroups ? ris.listgroups : []
            userStore.my.profile.asked_groups = ris.listSentRequestGroups ? ris.listSentRequestGroups : []
            filtroutente.value = [{ userId: userStore.my._id }]
          }
        })

      }
    }

    function removeFromMyGroups(groupnameDest: string) {
      $q.dialog({
        message: t('db.domanda_removegroup', { username: groupnameDest }),
        ok: { label: t('dialog.yes'), push: true },
        cancel: { label: t('dialog.cancel') },
        title: t('db.domanda')
      }).onOk(() => {

        userStore.setGroupsCmd($q, t, username.value, groupnameDest, shared_consts.GROUPSCMD.REMOVE_FROM_MYGROUP, null).then((res) => {
          if (res) {
            userStore.my.profile.groups = userStore.my.profile.groups.filter((rec: IMyGroup) => rec.groupname !== groupnameDest)
            tools.showPositiveNotif($q, t('db.removedgroup'))
          }
        })
      })
    }

    function blockGroup(usernameDest: string) {
      $q.dialog({
        message: t('db.domanda_blockgroup', { groupname: usernameDest }),
        ok: { label: t('dialog.yes'), push: true },
        cancel: { label: t('dialog.cancel') },
        title: t('db.domanda')
      }).onOk(() => {
        userStore.setGroupsCmd($q, t, username.value, usernameDest, shared_consts.GROUPSCMD.BLOCK_GROUP, null).then((res) => {
          if (res) {
            userStore.my.profile.groups = userStore.my.profile.groups.filter((rec: IMyGroup) => rec.groupname !== usernameDest)
            tools.showPositiveNotif($q, t('db.blockedgroup'))
          }
        })
      })
    }

    function setCmd(cmd: number, groupnameDest: string, value: any = '') {
      if (cmd === shared_consts.GROUPSCMD.REMOVE_FROM_MYGROUP) {
        removeFromMyGroups(groupnameDest)
      } else if (cmd === shared_consts.GROUPSCMD.BLOCK_GROUP) {
        blockGroup(groupnameDest)
      } else if (cmd === shared_consts.GROUPSCMD.SETGROUP) {
        tools.addToMyGroups($q, username.value, groupnameDest)
      } else if (cmd === shared_consts.GROUPSCMD.REQGROUP) {
        tools.setRequestGroup($q, username.value, groupnameDest, value)
      } else if (cmd === shared_consts.GROUPSCMD.CANCEL_REQ_GROUP) {
        tools.cancelReqGroups($q, username.value, groupnameDest)
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
      setCmd,
      updateValue,
      myoptions,
    }
  }
})
