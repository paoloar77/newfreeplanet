import { CMyFieldDb } from '@/components/CMyFieldDb'
import { CTitleBanner } from '@/components/CTitleBanner'
import { CProfile } from '@/components/CProfile'
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
import { IMyGroup, IUserFields } from 'model'
import { shared_consts } from '@/common/shared_vuejs'


export default defineComponent({
  name: 'mygroup',
  components: { CProfile, CTitleBanner, CMyFieldDb, CSkill, CDateTime },
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

    const mygrp = ref(<IMyGroup>{})

    function profile() {
      return userStore.my.profile
    }

    function mygrpname() {
      return userStore.my.username
    }

    function loadGroup() {
      // Carica il profilo di quest'utente
      if (groupname.value) {
        userStore.loadGroup(groupname.value).then((ris) => {
          mygrp.value = ris
          // filtroutente.value = [{ userId: userStore.my._id }]
        })

      }
    }

    watch(() => groupname.value, (to: any, from: any) => {
      loadGroup()
    })

    function mounted() {
      loadGroup()
    }

    function getImgGrp() {
      return userStore.getImgByGroup(mygrp.value)
    }

    function checkifShow(col: string) {
      //++Todo: checkifShow Permessi !
      return true
    }

    function getLinkGrpTelegram() {

      if (!!mygrp.value.link_telegram) {
        return 'https://t.me/' + mygrp.value.link_telegram
      }
    }

    function getLinkWebSite() {

      let site = mygrp.value.website!
      if (site) {
        if (!site.startsWith('http')) {
          site = 'https://' + site
        }
      }
      return site
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
    }
  }
})
