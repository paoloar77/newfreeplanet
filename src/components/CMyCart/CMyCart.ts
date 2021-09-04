import { CCardState } from '../CCardState'

import { computed, defineComponent } from 'vue'
import { useGlobalStore } from '@store/globalStore'
import { useProducts } from '@store/Products'
import CCopyBtn from '@/components/CCopyBtn/CCopyBtn'
import CSingleCart from '@/components/CSingleCart/CSingleCart'
import CTitleBanner from '@/components/CTitleBanner/CTitleBanner'

export default defineComponent({
  name: 'CMyCart',
  props: {},
  components: { CTitleBanner, CCardState, CCopyBtn, CSingleCart },

  setup() {
    const globalStore = useGlobalStore()
    const products = useProducts()

    const myCart = computed(() => products.cart)
    const myTotalPrice = computed(() => {
      if (products.cart) {
        return products.cart.totalPrice
      } else {
        return 0
      }
    })

    const ordersCart = computed(() => {
      if (!!products.cart) {
        return products.cart.items
      } else {
        return null
      }
    })

    const numOrders = computed(() => {
      if (!!products.cart) {
        return products.cart.items!.length
      } else {
        return 0
      }
    })


    function closecart() {
      globalStore.rightCartOpen = false
    }

    return {
      myCart,
      myTotalPrice,
      ordersCart,
      numOrders,
      closecart,
    }
  },
})
