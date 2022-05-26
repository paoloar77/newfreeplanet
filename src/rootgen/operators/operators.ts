import { defineComponent, ref, onMounted } from 'vue'

import { CMyPage } from '@/components/CMyPage'
import { CTitleBanner } from '@/components/CTitleBanner'
import { COperators } from '@/components/COperators'
import { fieldsTable } from '@store/Modules/fieldsTable'

import MixinOperator from '../../mixins/mixin-operator'

export default defineComponent({
  name: 'PageOperators',
  components: { CMyPage, CTitleBanner, COperators },
  setup() {

    const { getOperatorsInHome } = MixinOperator()

    return {
      fieldsTable,
      getOperatorsInHome,
    }
  }
})
