
import { LMap, LIcon, LTileLayer, LMarker, LControlLayers, LTooltip, LPopup, LPolyline, LPolygon, LRectangle,  } from '@vue-leaflet/vue-leaflet'

import 'leaflet/dist/leaflet.css'

import {
  defineComponent, ref, computed,
} from 'vue'
import { tools } from '@src/store/Modules/tools'


export default defineComponent({
  name: 'Home',
  components: {
    LMap,
    LIcon,
    LTileLayer,
    LMarker,
    LControlLayers,
    LTooltip,
    LPopup,
    LPolyline,
    LPolygon,
    LRectangle,
  },

  setup() {

    const zoom = ref(2)
    const iconWidth = ref(25)
    const iconHeight = ref(40)

    const iconUrl = computed(() => `https://placekitten.com/${iconWidth.value}/${iconHeight.value}`)
    const iconSize = computed(() => [iconWidth.value, iconHeight.value])

    function log(a: any) {
      console.log(a)
    }

    function changeIcon() {
      iconWidth.value += 2
      if (iconWidth.value > iconHeight.value) {
        iconWidth.value = Math.floor(iconHeight.value / 2)
      }
    }

    return {
      tools,
      zoom,
      iconWidth,
      iconHeight,
      iconUrl,
      iconSize,
      changeIcon,
      log,
    }
  },
})
