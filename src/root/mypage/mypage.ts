import { defineComponent } from 'vue'

/*
import { Component, Prop, Watch } from 'vue-property-decorator'
import { GlobalStore, UserStore } from '@store'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '../../store/Modules/toolsext'
import { static_data } from '../../db/static_data'
import { Screen } from 'quasar'

import { colmypage } from '@src/store/Modules/fieldsTable'

import { CImgText } from '../../components/CImgText/index'
import { CCard, CGridTableRec, CMyPage, CTitleBanner } from '@components'
import MixinMetaTags from '../../mixins/mixin-metatags'
import MixinBase from '@src/mixins/mixin-base'
import { IMyPage } from '@src/model/GlobalStore'

@Component({
  mixins: [MixinBase],
  components: { CImgText, CCard, CMyPage, CTitleBanner }
})*/

export default defineComponent({
  name: 'Mypage',
  setup() {
    return {}
  },
})
/*
export default class Mypage extends MixinMetaTags {
  public heightimg
  public imgback
  public rec: IMyPage = {}

  public async mounted() {
    // console.log('this.$route.path', this.$route.path)
    this.rec = await GlobalStore.actions.loadPage(this.$route.path)
    // console.log('mounted', this.rec)
  }

  @Watch('$route.path')
  public async changepage() {
    // console.log('changepage')
    this.rec = await GlobalStore.actions.loadPage(this.$route.path)
  }

  public meta() {
    return tools.metafunc(this)
  }

  get static_data() {
    return static_data
  }
}
*/
