import { CGridTableRec } from '@/components/CGridTableRec'
import { CMyFriends } from '@/components/CMyFriends'
import { CMyUser } from '@/components/CMyUser'
import { CTitleBanner } from '@/components/CTitleBanner'
import { CProfile } from '@/components/CProfile'
import { CCheckIfIsLogged } from '@/components/CCheckIfIsLogged'
import { CMyFieldRec } from '@/components/CMyFieldRec'
import { CSkill } from '@/components/CSkill'
import { CDateTime } from '@/components/CDateTime'
import { tools } from '@store/Modules/tools'
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useUserStore } from '@store/UserStore'
import { useRoute, useRouter } from 'vue-router'
import { useGlobalStore } from '@store/globalStore'
import { useI18n } from '@/boot/i18n'
import { toolsext } from '@store/Modules/toolsext'
import { useQuasar } from 'quasar'
import { costanti } from '@costanti'
import { IFriends, IMyGroup, ISearchList, IUserFields } from 'model'
import { shared_consts } from '@/common/shared_vuejs'
import { colmyUserPeople, colmyUserGroup } from '@store/Modules/fieldsTable'


export default defineComponent({
  name: 'mygroup',
  components: { CProfile, CTitleBanner, CMyFieldRec, CSkill, CDateTime, CMyFriends, CGridTableRec, CMyUser, CCheckIfIsLogged },
  props: {},
  setup() {
    const userStore = useUserStore()
    const $route = useRoute()
    const $q = useQuasar()
    const { t } = useI18n()

    const animation = ref('fade')

    const groupname = computed(() => $route.params.groupname ? $route.params.groupname.toString() : '')

    const filtroutente = ref(<any[]>[])
    const showPic = ref(false)

    const mygrp = ref(<IMyGroup|null>{})
    const users_in_group = ref(<IFriends[]>[])

    const tabgrp = ref('info')
    const tab = ref('membri')

    const arrfilterand: any = ref([])
    const filtercustom: any = ref([])
    const filtercustom_rich: any = ref([])
    const searchList = ref(<ISearchList[]>[])

    function profile() {
      return userStore.my.profile
    }

    function mygrpname() {
      return userStore.my.username
    }

    async function loadGroup() {
      // Carica il profilo di quest'utente
      if (groupname.value) {
        await userStore.loadGroup(groupname.value).then((ris) => {
          if (ris) {
            mygrp.value = ris.mygroup
            users_in_group.value = ris.users_in_group
          } else {
            mygrp.value = null
            users_in_group.value = []
          }
          // filtroutente.value = [{ userId: userStore.my._id }]
        })

      }
    }

    watch(() => groupname.value, (to: any, from: any) => {
      loadGroup()
    })

    async function mounted() {
      await loadGroup()

      searchList.value = []
      filtercustom.value = [{ 'profile.mygroups': { $elemMatch: {groupname: {$eq: groupname.value }} } } ]

      arrfilterand.value = []
      filtercustom_rich.value = []
      //++TODO: sistemare la filtercustom ... richieste...
    }

    function getImgGrp() {
      if (mygrp.value)
        return userStore.getImgByGroup(mygrp.value)
      else
        return ''
    }

    function checkifShow(col: string) {
      //++Todo: checkifShow Permessi !
      return true
    }

    function getLinkGrpTelegram() {

      if (mygrp.value) {
        if (!!mygrp.value.link_telegram) {
          return (!mygrp.value.link_telegram.startsWith('http') ? 'https://' : '') + mygrp.value.link_telegram
        }
      } else {
        return ''
      }

    }

    function getLinkWebSite() {
      if (!mygrp.value) {
        return ''
      }

      let site = mygrp.value.website!
      if (site) {
        if (!site.startsWith('http')) {
          site = 'https://' + site
        }
      }
      return site
    }

    function extraparams() {
      let lk_tab = ''
      let lk_LF = ''
      let lk_FF = ''
      let lk_as = ''
      let af_objId_tab = ''

      return {
        lookup1: {
          lk_tab,
          lk_LF,
          lk_FF,
          lk_as,
          af_objId_tab,
          lk_proj: {
            'username': 1,
            'profile.img': 1,
            'profile.qualifica': 1,
          }
        },
      }
    }

    function extraparams_rich() {
      return {
        querytype: shared_consts.QUERYTYPE_MYGROUP,
        myid: mygrp.value ? mygrp.value._id : '',
      }
    }

    function numUsers() {
      return users_in_group.value ? users_in_group.value.length : 0
    }
    function numAdmins() {
      return (mygrp.value && mygrp.value.admins) ? mygrp.value.admins.length : 0
    }
    function listaAdmins() {
      return (mygrp.value && mygrp.value.admins) ? mygrp.value.admins.map((rec) => rec.username).join(', ') : ''
    }


    onMounted(mounted)

    return {
      groupname,
      profile,
      tools,
      costanti,
      mygrp,
      shared_consts,
      getImgGrp,
      checkifShow,
      getLinkGrpTelegram,
      getLinkWebSite,
      filtroutente,
      showPic,
      mygrpname,
      userStore,
      t,
      animation,
      arrfilterand,
      filtercustom,
      filtercustom_rich,
      searchList,
      colmyUserPeople,
      colmyUserGroup,
      extraparams,
      extraparams_rich,
      tab,
      tabgrp,
      numUsers,
      numAdmins,
      listaAdmins,
      users_in_group,
    }
  }
})
