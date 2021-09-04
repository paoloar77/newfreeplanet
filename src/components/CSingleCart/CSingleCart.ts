import { tools } from '../../store/Modules/tools'
import { CCardState } from '../CCardState'
import { CCopyBtn } from '../CCopyBtn'

import { IOperators, IOrder, IProduct } from '@src/model'
import { defineComponent, PropType, toRef } from 'vue'
import CTitleBanner from '@/components/CTitleBanner/CTitleBanner'
import { useProducts } from '@store/Products'


export default defineComponent({
  name: 'CSingleCart',
  props: {
    order: {
      type: Object as PropType<IOrder>,
      required: true,
    },
    showall: {
      type: Boolean,
      required: false,
      default: false,
    },
    nomodif: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: { CTitleBanner, CCardState, CCopyBtn },
  setup(props) {
    const products = useProducts()
    const order = toRef(props, 'order')

    function myimgclass() {
      if (props.showall) {
        return 'imgNormal'
      } else {
        return 'imgSmall'
      }
    }

    function addsubqty(addqty: boolean, subqty: boolean) {
      if (addqty) {
        if (props.order.quantity! >= 10)
          return false
      }

      if (subqty) {
        if (props.order.quantity === 0)
          return false
      }

      products.addSubQtyToItem({
        addqty,
        subqty,
        order: props.order,
      }).then((newqty) => {
        order.value.quantity = newqty
      })
    }

    function removeFromCard() {
      products.removeFromCart({ order: order.value })
    }

    return {
      myimgclass,
      addsubqty,
      removeFromCard,
    }
  },
})
