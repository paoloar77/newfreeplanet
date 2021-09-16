import { defineComponent, ref, toRef, computed, PropType, watch } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'

import { CTitleBanner } from '@components'
import { CCardState } from '../CCardState'
import { CCopyBtn } from '../CCopyBtn'

import { IOrder, IProduct } from '@src/model'
import { tools } from '@store/Modules/tools'
import { useProducts } from '@store/Products'


export default defineComponent({
  name: 'CProductCard',
  props: {
    product: {
      type: Object as PropType<IProduct | null>,
      required: false,
      default: null,
    },
    code: {
      type: String,
      required: false,
      default: '',
    },
    complete: {
      type: Boolean,
      required: false,
      default: false,
    },
    order: {
      type: Object as PropType<IOrder>,
      required: false,
      default: () => {
        return {
          idapp: process.env.APP_ID,
          quantity: 1,
          idStorehouse: ''
        }
      },
    },
  },
  components: { CTitleBanner, CCardState, CCopyBtn },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()
    const globalStore = useGlobalStore()
    const products = useProducts()

    const myorder = toRef(props, 'order')

    const myproduct = ref(<IProduct> {})

    function iconWhishlist(order: IProduct) {
      if (true) {
        return 'far fa-heart'
      } else {
        return 'fas fa-heart'
      }
    }

    function decqty() {
      if (myorder.value.quantity) {
        if (myorder.value.quantity > 0)
          myorder.value.quantity--
      }
    }

    function addqty() {
      if (myorder.value.quantity) {
        if (myorder.value.quantity < 10)
          myorder.value.quantity++
      }
    }

    function addtoCart() {

      if (!userStore.isLogged) {
        tools.showNeutralNotif($q, 'Devi prima accedere alla tua Area Personale')
        globalStore.rightDrawerOpen = true
        return false
      }

      // Controlla se esiste già nel carrello il prodotto
      if (products.existProductInCart(myproduct.value._id)) {
        tools.showNegativeNotif($q, 'Questo prodotto è stato già aggiunto al Carrello')
      } else {
        products.addToCart({ product: myproduct.value, order: props.order }).then((ris) => {
          let strprod = 'prodotto'
          if (myorder.value.quantity! > 1)
            strprod = 'prodotti'
          if (ris)
            tools.showPositiveNotif($q, 'Hai Aggiunto ' + myorder.value.quantity + ' ' + strprod + ' al Carrello')
          else
            tools.showNegativeNotif($q, 'Errore durante l\'inserimento del prodotto sul carrello, riprovare.')
        })
      }
    }

    function getnumstore() {
      if (myproduct.value.storehouses)
        return myproduct.value.storehouses.length
      else
        return 0
    }

    function getSingleStorehouse() {
      const mystore = myproduct.value.storehouses[0]
      return mystore.name + ' (' + mystore.city + ')'
    }

    function getStorehouses() {

      const myarr: any = []
      let ind = 1
      myproduct.value.storehouses.forEach((store) => {
        myarr.push(
          {
            id: ind,
            label: store.name + ' (' + store.city + ')',
            value: store._id
          })

        ind++
      })

      // console.log('arraystore', myarr)
      return myarr
    }

    function checkifCartDisable() {
      return !myorder.value.idStorehouse
    }

    watch(() => props.code, (newval, oldval) => {
      console.log('change code')
      load()
    })

    async function load() {
      // console.log('created Cproductcard', code)
      if (props.code) {
        myproduct.value = await products.loadProduct({ code: props.code })
      } else {
        // @ts-ignore
        myproduct.value = props.product
      }

      console.log('myproduct', myproduct, 'product', props.product)

      if (!!myproduct.value) {
        if (myproduct.value.storehouses.length === 1) {
          myorder.value.idStorehouse = myproduct.value.storehouses[0]._id
        }
      }
    }

    function getmycardcl() {
      return (props.complete) ? 'my-card-big' : 'my-card'
    }

    function getclimg() {
      return (props.complete) ? 'myimgtitle centermydiv' : 'centermydiv'
    }

    load()

    return {
      decqty,
      addqty,
      addtoCart,
      iconWhishlist,
      getmycardcl,
      getclimg,
      getnumstore,
      getSingleStorehouse,
      getStorehouses,
      checkifCartDisable,
      myproduct,
      myorder,
    }
  }
})
