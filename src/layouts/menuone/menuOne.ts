import { IListRoutes } from '@src/model'
import { useGlobalStore } from '@store/globalStore'
import { tools } from '@store/Modules/tools'
import { computed, defineComponent, watch } from 'vue'
import { useRoute } from 'vue-router'
import { static_data } from '@/db/static_data'

export default defineComponent({
  name: 'MenuOne',
  props: {
    clBase: {
      type: String,
      required: false,
      default: 'my-menu',
    },
  },

  setup(props) {
    const route = useRoute()
    const globalStore = useGlobalStore()

    const finishLoading = computed(() => globalStore.finishLoading)

    const path = computed(() => route.path)

    function getmenu(): any {
      console.log('getmenu menuOne!')
      return globalStore.getmenu
    }

    function setParentVisibilityBasedOnRoute(parent: any) {
      parent.routes.forEach((item: any) => {
        if (path.value === item.path) {
          parent.show = true
        }
      })
    }

    watch(path, (to: string, from: string) => {
      const mymenu = globalStore.getmenu
      console.log('watch:', mymenu)
      Object.keys(mymenu).forEach((parentName: any) => {
        console.log('parentName', parentName)
        // @ts-ignore
        setParentVisibilityBasedOnRoute(mymenu[parentName])
      })
    })

    /* function replaceUnderlineToSpace(text: string) {
      while (text.indexOf('_') !== -1) {
        text = text.replace('_', ' ')
      }
      return text
    } */

    function getroute(elem: IListRoutes) {
      if (elem.idelem) {
        return tools.getUrlByTipoProj(elem.urlroute ? elem.urlroute : '') + elem.idelem
      }
      return elem.path
    }

    function getmymenuclass(elem: IListRoutes) {
      let menu: string = props.clBase

      if (elem.color) {
        menu += ` ${elem.color}`
      } else {
        if (elem.onlyAdmin) menu += ' isAdmin'
        if (elem.onlyManager) menu += ' isManager'
        if (elem.onlySocioResidente) menu += ' isSocioResidente'
        if (elem.onlyConsiglio) menu += ' isConsiglio'
        if (elem.onlyDepartment) menu += ' isDepartment'
        if (elem.onlyTutor) menu += ' isTutor'
        if (elem.onlyEditor) menu += ' isEditor'
      }

      if (elem.extraclass) menu += ` ${elem.extraclass}`

      return menu
    }

    return {
      getmenu,
      finishLoading,
      getmymenuclass,
      getroute,
      static_data,
      tools,
    }
  },
})
