import {
  defineComponent, ref,
} from 'vue'
import { IMetaTags } from '@model'
import { tools } from '@store/Modules/tools'
import { useQuasar } from 'quasar'

// You can declare a mixin as the same style as components.
export default defineComponent({
  name: 'MixinMetaTags',
  setup() {
    const mymeta = ref<IMetaTags>({ title: '', description: '', keywords: '' })

    const $q = useQuasar()

    function setmeta(mym: IMetaTags) {
      mymeta.value = mym
    }

    function getsrcbyimg(myimg: string) {
      // return src
      const filefull = tools.getimgFullpathbysize(myimg)

      return tools.getimgbysize(filefull.path, filefull.file)
    }

    return {
      $q,
      setmeta,
      getsrcbyimg,
    }
  },

})
