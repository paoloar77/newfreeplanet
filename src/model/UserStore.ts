import { IToken } from '@model/other'
import { ICart, IOrderCart, IShareWithUs } from '@src/model/Products'

const enum ESexType {
  None = 0,
  Male = 1,
  Female = 2,
}

export interface IUserProfile {
  img?: string
  nationality?: string
  intcode_cell?: string
  iso2_cell?: string
  cell?: string
  dateofbirth?: Date
  sex?: ESexType
  country_pay?: string
  email_paypal?: string
  payeer_id?: string
  advcash_id?: string
  revolut?: string
  link_payment?: string
  note_payment?: string
  username_telegram?: string
  teleg_id?: number
  teleg_checkcode?: number
  my_dream?: string
  paymenttypes?: IPaymentType[]
  manage_telegram?: boolean
  saw_zoom_presentation?: boolean
  ask_zoom_partecipato?: boolean
  saw_and_accepted?: boolean
  qualified?: boolean
  qualified_2invitati?: boolean
  myshares?: IShareWithUs[]
  socio?: boolean
  socioresidente?: boolean
  consiglio?: boolean
}

export interface IPaymentType {
  key: string
  label: string
}

export interface IUserFields {
  _id: string
  ind_order?: number
  email?: string
  username: string
  name: string
  surname: string
  password?: string
  ipaddr?: string
  perm?: number
  verified_email?: boolean
  aportador_solidario?: string

  made_gift?: boolean
  tokens?: IToken[]
  lasttimeonline?: Date
  profile: IUserProfile
  qualified?: boolean
  numNaviEntrato?: number
  numinvitati?: number
  numinvitatiattivi?: number
  cart?: ICart
  ordercart?: IOrderCart
}

/*
password?: string
 lang
 */

export interface IPerm {
  _id: number
  label: string
}

export interface IUserState {
  my: IUserFields
  lang: string
  repeatPassword?: string

  categorySel?: string

  tokenforgot?: string

  servercode?: number
  msg?: string
  resStatus?: number
  x_auth_token: string
  isLogged?: boolean
  isAdmin?: boolean
  isManager?: boolean
  isDepartment?: boolean
  isTutor?: boolean
  isZoomeri?: boolean
  isTratuttrici?: boolean
  isEditor?: boolean
  isTeacher?: boolean
  usersList?: IUserFields[]
  countusers?: number
  lastparamquery?: any
}
