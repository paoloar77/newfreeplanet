import { IBaseOrder, ICart, IOrder, IOrderCart, IProduct, IProductsState } from 'model'

import Api from '@api'
import { serv_constants } from '@src/store/Modules/serv_constants'
import * as Types from '@src/store/Api/ApiTypes'
import { static_data } from '@src/db/static_data'
import { shared_consts } from '@src/common/shared_vuejs'
import { tools } from '@store/Modules/tools'
import { defineStore } from 'pinia'
import { useUserStore } from '@store/UserStore'
import { toolsext } from '@store/Modules/toolsext'

export const useProducts = defineStore('Products', {
  state: (): IProductsState => ({
    products: [],
    cart: { items: [], totalPrice: 0, totalQty: 0, userId: '' },
    orders: [],
  }),

  getters: {
    getProducts: (state: IProductsState) => (): IProduct[] => {
      return state.products
    },

    getCart: (state: IProductsState) => (): ICart => {
      return state.cart
    },

    getOrdersAllCart: (state: IProductsState) => (): IOrderCart[] => {
      return state.orders
    },

    getOrdersCart: (state: IProductsState) => (tipoord: string): IOrderCart[] | undefined => {
      console.log('state.orders', state.orders)
      if (tipoord === 'incorso')
        return state.orders.filter((rec: IOrderCart) => (rec.status ? rec.status : 0) <= shared_consts.OrderStatus.CHECKOUT_SENT)
      else if (tipoord === 'confermati')
        return state.orders.filter((rec: IOrderCart) => rec.status === shared_consts.OrderStatus.ORDER_CONFIRMED)
      else if (tipoord === 'pagati')
        return state.orders.filter((rec: IOrderCart) => rec.status === shared_consts.OrderStatus.PAYED)
      else if (tipoord === 'completati')
        return state.orders.filter((rec: IOrderCart) => rec.status === shared_consts.OrderStatus.RECEIVED)
      else if (tipoord === 'cancellati')
        return state.orders.filter((rec: IOrderCart) => rec.status === shared_consts.OrderStatus.CANCELED)
    },

    existProductInCart: (state: IProductsState) => (idproduct: string): boolean => {
      // console.log('.cart.items', this.cart.items)
      if (state.cart.items) {
        const ris = state.cart.items.filter((item: IBaseOrder) => item.order.idProduct === idproduct).reduce((sum, rec) => sum + 1, 0)
        return ris > 0
      }
      return false
    },

    getRecordEmpty: (state: IProductsState) => (): IProduct => {

      const tomorrow = tools.getDateNow()
      tomorrow.setDate(tomorrow.getDate() + 1)

      return {
        // _id: tools.getDateNow().toISOString(),  // Create NEW
        active: false,
        idProducer: '',
        idStorehouses: [],
        producer: {},
        storehouses: [],
        code: '',
        name: '',
        description: '',
        department: '',
        category: '',
        price: 0.0,
        color: '',
        size: '',
        quantityAvailable: 0,
        canBeShipped: false,
        canBeBuyOnline: false,
        weight: 0,
        stars: 0,
        date: tools.getDateNow(),
        icon: '',
        img: '',
      }
    },

  },

  actions: {
    getProductsByCategory(category: string): any[] {
      return this.products.filter((rec) => rec.category === category)
    },

    createOrderByProduct(product: IProduct, order: IOrder): IOrder {
      const userStore = useUserStore()
      const myorder: IOrder = {
        userId: userStore.my._id,
        idapp: process.env.APP_ID,
        idProduct: product._id,
        idProducer: product.idProducer,
        status: shared_consts.OrderStatus.IN_CART,
        price: product.price,
        after_price: product.after_price,
        color: product.color,
        size: product.size,
        weight: product.weight,

        quantity: order.quantity,
        idStorehouse: order.idStorehouse,
      }

      if (product.storehouses.length === 1) {
        order.idStorehouse = product.storehouses[0]._id
      }

      return myorder
    },

    initcat() {

      // rec.userId = userStore.my._id

      return this.getRecordEmpty()

    },

    async loadProducts() {

      const userStore = useUserStore()
      console.log('loadProducts')

      if (!static_data.functionality.ENABLE_ECOMMERCE)
        return null

      console.log('getProducts', 'userid=', userStore.my._id)

      // if (userStore.my._id === '') {
      //   return new Types.AxiosError(0, null, 0, '')
      // }

      let ris = null

      ris = await Api.SendReq('/products', 'POST', null)
        .then((res) => {
          if (res.data.products) {  // console.log('RISULTANTE CATEGORIES DAL SERVER = ', res.data.categories)
            this.products = res.data.products
          } else {
            this.products = []
          }

          // console.log('ARRAY PRODUCTS = ', this.products)
          if (process.env.DEBUG === '1') {
            // console.log('dbLoad', 'this.products', this.products)
          }

          return res
        })
        .catch((error) => {
          console.log('error getProducts', error)
          userStore.setErrorCatch(error)
          return new Types.AxiosError(serv_constants.RIS_CODE_ERR, null, toolsext.ERR_GENERICO, error)
        })

      // ApiTables.aftercalling(ris, checkPending, 'categories')

      return ris
    },

    async loadProduct({ code }: { code: any }) {

      console.log('loadProduct', code)
      const userStore = useUserStore()

      if (!static_data.functionality.ENABLE_ECOMMERCE)
        return null

      console.log('getProduct', 'code', code)

      // if (userStore.my._id === '') {
      //   return new Types.AxiosError(0, null, 0, '')
      // }

      let ris = null

      ris = await Api.SendReq('/products/' + code, 'POST', { code })
        .then((res) => {
          console.log('product', res.data.product)
          if (res.data.product) {  // console.log('RISULTANTE CATEGORIES DAL SERVER = ', res.data.categories)
            return res.data.product
          } else {
            return null
          }
        })
        .catch((error) => {
          console.log('error getProduct', error)
          userStore.setErrorCatch(error)
          return new Types.AxiosError(serv_constants.RIS_CODE_ERR, null, toolsext.ERR_GENERICO, error)
        })

      return ris
    },

    async loadOrders() {

      console.log('loadOrders')
      const userStore = useUserStore()

      if (!static_data.functionality.ENABLE_ECOMMERCE)
        return null

      console.log('loadOrders', 'userid=', userStore.my._id)

      // if (userStore.my._id === '') {
      //   return new Types.AxiosError(0, null, 0, '')
      // }

      let ris = null

      ris = await Api.SendReq('/cart/' + userStore.my._id, 'GET', null)
        .then((res) => {
          if (res.data.cart) {  // console.log('RISULTANTE CATEGORIES DAL SERVER = ', res.data.categories)
            this.cart = res.data.cart
          } else {
            this.cart = { items: [], totalPrice: 0, totalQty: 0, userId: '' }
          }

          return res
        })
        .catch((error) => {
          console.log('error loadOrders', error)
          userStore.setErrorCatch(error)
          return new Types.AxiosError(serv_constants.RIS_CODE_ERR, null, toolsext.ERR_GENERICO, error)
        })

      // ApiTables.aftercalling(ris, checkPending, 'categories')

      return ris
    },

    async removeFromCart({ order }: { order: IOrder }) {

      const userStore = useUserStore()

      return Api.SendReq('/cart/' + userStore.my._id, 'DELETE', { orderId: order._id })
        .then((res) => {
          if (res.data.cart) {  // console.log('RISULTANTE CATEGORIES DAL SERVER = ', res.data.categories)
            this.cart = res.data.cart
          } else {
            this.cart = { items: [], totalPrice: 0, totalQty: 0, userId: '' }
          }

          return res
        })
    },

    async addToCart({ product, order }: { product: IProduct, order: IOrder }) {

      const userStore = useUserStore()

      if (!static_data.functionality.ENABLE_ECOMMERCE)
        return null

      const neworder = this.createOrderByProduct(product, order)

      if (!neworder.idStorehouse)
        return new Types.AxiosError(serv_constants.RIS_CODE_ERR, null, toolsext.ERR_GENERICO, 'Nessuno Store')

      console.log('addToCart', 'userid=', userStore.my._id, neworder)

      let ris = null

      ris = await Api.SendReq('/cart/' + userStore.my._id, 'POST', { order: neworder })
        .then((res) => {
          if (res.data.cart) {  // console.log('RISULTANTE CATEGORIES DAL SERVER = ', res.data.categories)
            this.cart = res.data.cart
          } else {
            this.cart = { items: [], totalPrice: 0, totalQty: 0, userId: '' }
          }

          return res
        })
        .catch((error) => {
          console.log('error addToCart', error)
          userStore.setErrorCatch(error)
          return new Types.AxiosError(serv_constants.RIS_CODE_ERR, null, toolsext.ERR_GENERICO, error)
        })

      // ApiTables.aftercalling(ris, checkPending, 'categories')

      return ris
    },

    async addSubQtyToItem({ addqty, subqty, order } : { addqty: boolean, subqty: boolean, order: IOrder }) {

      const userStore = useUserStore()
      if (!static_data.functionality.ENABLE_ECOMMERCE)
        return null

      // console.log('addSubQtyToItem', 'userid=', userStore.my._id, order)

      let ris = null

      ris = await Api.SendReq('/cart/' + userStore.my._id, 'POST', { addqty, subqty, order })
        .then((res) => {
          this.cart = res.data.cart
          if (!!res.data.qty) {
            // const ind = this.cart.items.findIndex((rec) => rec.order._id === order._id)
            // this.cart.items[ind].order.quantity = res.data.qty

            return res.data.qty
          }

          return 0
        })
        .catch((error) => {
          console.log('error addSubQtyToItem', error)
          userStore.setErrorCatch(error)
          return new Types.AxiosError(serv_constants.RIS_CODE_ERR, null, toolsext.ERR_GENERICO, error)
        })

      // ApiTables.aftercalling(ris, checkPending, 'categories')

      return ris
    },

    async UpdateStatusCart({ cart_id, status }: { cart_id:string, status: number }) {

      const userStore = useUserStore()

      if (!static_data.functionality.ENABLE_ECOMMERCE)
        return null

      // console.log('addSubQtyToItem', 'userid=', userStore.my._id, order)

      let ris = null

      ris = await Api.SendReq('/cart/' + userStore.my._id + '/cartstatus', 'POST', { cart_id, status })
        .then((res) => {

          if (res.data.status === shared_consts.OrderStatus.CHECKOUT_SENT) {
            this.cart = {}
            if (res.data.orders)
              this.orders = res.data.orders
          }
          return res.data.status
        })
        .catch((error) => {
          console.log('error UpdateStatusCart', error)
          userStore.setErrorCatch(error)
          return new Types.AxiosError(serv_constants.RIS_CODE_ERR, null, toolsext.ERR_GENERICO, error)
        })

      return ris
    },

    async UpdateOrderStatus({ order_id, status }: { order_id: string, status: number }) {

      const userStore = useUserStore()

      if (!static_data.functionality.ENABLE_ECOMMERCE)
        return null

      // console.log('addSubQtyToItem', 'userid=', userStore.my._id, order)

      let ris = null

      ris = await Api.SendReq('/cart/' + userStore.my._id + '/orderstatus', 'POST', { order_id, status })
        .then((res) => {
          return res.data.status
        })
        .catch((error) => {
          console.log('error UpdateOrderStatus', error)
          userStore.setErrorCatch(error)
          return new Types.AxiosError(serv_constants.RIS_CODE_ERR, null, toolsext.ERR_GENERICO, error)
        })

      return ris
    },
  },

})

