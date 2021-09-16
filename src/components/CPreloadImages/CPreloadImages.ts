import { defineComponent, ref, computed, PropType } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useQuasar } from 'quasar'
import { IPreloadImages } from 'model'
import { tools } from '@store/Modules/tools'

export default defineComponent({
  name: 'CPreloadImages',
  props: {
    arrimg: {
      type: Object as PropType<IPreloadImages[]>,
      required: true,
    },
  },
  components: {},
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()

    function getimg(recimg: IPreloadImages) {
      if (recimg.mobile) {
        const filefull = tools.getimgFullpathbysize(recimg.imgname)

        return tools.getimgbysize(filefull.path, filefull.file)
      } else {
        return recimg.imgname
      }
    }

    function getaltimg(recimg: IPreloadImages) {
      return recimg.alt
    }

    return {
      tools,
      getimg,
      getaltimg,

    }
  }
})
