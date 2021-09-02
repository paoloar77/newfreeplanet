import { IMessage } from '@src/model'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'

// You can declare a mixin as the same style as components.
export default function () {
  function getUserByUsername(username: string) {
    const userStore = useUserStore()
    return userStore.getNameSurnameByUsername(username)
  }

  function getImgByUsername(username: string) {
    const userStore = useUserStore()
    return `public/${userStore.getImgByUsername(username)}`
  }

  function isValidUsername(username: string) {
    return username && username !== 'nessuno' && username !== 'none'
  }

  function getMyUsername() {
    const userStore = useUserStore()
    return userStore.my.username
  }

  function getUsernameChatByMsg(msg: IMessage) {
    if (msg) {
      if (msg.dest) {
        if (msg.dest.username !== getMyUsername()) return msg.dest.username
        return msg.origin ? msg.origin.username : {}
      }
    } else {
      return ''
    }
    return ''
  }

  function getnumItemsCart(): any {
    // ++Todo: conv
    /* const arrcart = Products.cart
    if (!!arrcart) {
      if (!!arrcart.items) {
        // @ts-ignore
        const total = arrcart.items.reduce((sum, item) => sum + item.order.quantity, 0)
        return total
      }
    } */
    return 0
  }

  function getImgByMsg(msg: IMessage) {
    const userStore = useUserStore()
    // @ts-ignore
    return `public/${userStore.getImgByUsername(this.getUsernameChatByMsg(msg))}`
  }

  function getMyImg() {
    const userStore = useUserStore()
    const ris = userStore.getImgByUsername(userStore.my.username)
    return (ris !== '') ? `public/${ris}` : ''
  }

  function getMyImgforIcon() {
    const userStore = useUserStore()
    const ris = userStore.getImgByUsername(userStore.my.username)
    return (ris !== '') ? `img:public/${ris}` : 'fas fa-user'
  }

  function getIconCart() {
    const iconcart = 'fas fa-shopping-cart'

    return iconcart
  }

  function MenuCollapse() {
    const globalStore = useGlobalStore()
    return globalStore.menuCollapse
    // return true
  }

  function Username() {
    const userStore = useUserStore()
    return userStore.my.username
  }

  function myName() {
    const userStore = useUserStore()
    return userStore.my.name
  }

  function mySurname() {
    const userStore = useUserStore()
    return userStore.my.surname
  }

  function myCell() {
    const userStore = useUserStore()
    return userStore.my.profile.cell
  }

  function Verificato() {
    const userStore = useUserStore()
    return userStore.my.verified_email
  }

  function paotest() {
    return 'Ciaoooooooooooooooo!'
  }

  function MadeGift() {
    const userStore = useUserStore()
    return userStore.my.made_gift
  }

  function Email() {
    const userStore = useUserStore()
    return userStore.my.email
  }

  function getNumMsg() {
    // ++Todo: conv
    /*
    return MessageStore.getlasts_messages().length
    */

    return 0
  }

  function getNumMsgUnread() {
    // return userStore.getlasts_messages().length
    // ++Todo: conv
    // return MessageStore.getnumMsgUnread()
    return 0
  }

  function getMsgText(msg: IMessage, inarray: boolean) {
    let add = ''
    if (msg.origin && msg.origin.username === getMyUsername()) add = 'Tu: '

    const ris = add + msg.message
    if (inarray) return [ris]
    return ris
  }

  return {
    getUsernameChatByMsg,
    getMyUsername,
    Username,
    myName,
    mySurname,
    myCell,
    Verificato,
    MadeGift,
    Email,
    getMyImg,
    getMyImgforIcon,
    getImgByMsg,
    getnumItemsCart,
    getUserByUsername,
    getImgByUsername,
    isValidUsername,
    getNumMsg,
    getNumMsgUnread,
    getMsgText,
    paotest,
  }
}
