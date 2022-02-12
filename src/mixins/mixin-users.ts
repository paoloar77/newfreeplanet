import { IMessage } from '@src/model'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useProducts } from '@store/Products'
import { serv_constants } from '@store/Modules/serv_constants'
import { tools } from '@store/Modules/tools'

// You can declare a mixin as the same style as components.
export default function () {
  function getUserByUsername(username: string) {
    const userStore = useUserStore()
    return userStore.getNameSurnameByUsername(username)
  }

  function getImgByUsername(username: string) {
    const userStore = useUserStore()
    return `${userStore.getImgByUsername(username)}`
  }

  function getRefLink(username: string) {
    const userStore = useUserStore()
    return `${userStore.getRefLink(username)}`
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
    const products = useProducts()
    const arrcart = products.cart
    if (!!arrcart) {
      if (!!arrcart.items) {
        // @ts-ignore
        const total = arrcart.items.reduce((sum, item) => sum + item.order.quantity, 0)
        return total
      }
    }
    return 0
  }

  function getImgByMsg(msg: IMessage) {
    const userStore = useUserStore()
    // @ts-ignore
    return `${userStore.getImgByUsername(this.getUsernameChatByMsg(msg))}`
  }

  function getMyImg() {
    const userStore = useUserStore()
    const ris = userStore.getImgByUsername(userStore.my.username)
    const out = (ris !== '') ? `${ris}` : 'images/noimg-user.svg'
    // console.log('getMyImg = ', out)
    return out
  }

  function getMyImgforIcon() {
    const userStore = useUserStore()
    const mypath = userStore.getImgByUsername(userStore.my.username)
    const filename = tools.getLastItem(mypath)
    let img_small = tools.baseurl(mypath) + '/' + serv_constants.PREFIX_IMG_SMALL + filename
    console.log('img_small', img_small)
    return (filename !== '') ? `img:${img_small}` : 'fas fa-user'
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
    return isVerified() && userStore.my.verified_by_aportador
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

  function isEmailVerified() {
    const userStore = useUserStore()
    return userStore.my.verified_email
  }

  function TelegVerificato(): boolean {
    const userStore = useUserStore()
    return userStore.my.profile ? userStore.my.profile.teleg_id! > 0 : false
  }

  function isVerified() {
    return TelegVerificato()
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
    isEmailVerified,
    TelegVerificato,
    isVerified,
    paotest,
  }
}
