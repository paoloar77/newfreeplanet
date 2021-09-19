import {
  defineComponent, ref,
} from 'vue'
import { IMetaTags } from '@model'
import { tools } from '@store/Modules/tools'
import { useQuasar } from 'quasar'
import { useMeta } from 'quasar'


// You can declare a mixin as the same style as components.
export default function () {

  function setmeta(mym: IMetaTags) {

    //++Todo META TAGS!
    /*
    useMeta(() => {
      return {
        title: mym.title,
        description: mym.description,
        keywords: mym.keywords,
      }
    })

     */
  }

  function getsrcbyimg(myimg: string) {
    // return src
    const filefull = tools.getimgFullpathbysize(myimg)

    return tools.getimgbysize(filefull.path, filefull.file)
  }

  return {
    setmeta,
    getsrcbyimg,
  }
}
