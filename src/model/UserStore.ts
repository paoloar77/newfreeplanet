import { IToken } from '@model/other'
import { ICart, IOrderCart, IShareWithUs } from '@src/model/Products'
import { IGallery, IImgGallery } from '@model/GlobalStore'

const enum ESexType {
  None = 0,
  Male = 1,
  Female = 2,
}

export interface IFriends {
  username: string
  date?: Date
}

export interface IMyGroup {
  _id: string
  groupname: string
  title?: string
  descr?: string
  photos: IImgGallery[]
  visibility?: number
  date_created?: Date
  admins?: IFriends[]
  req_users?: IFriends[]
  blocked?: boolean
  website?: string
  link_telegram?: string
  username_who_block?: string
  date_blocked?: Date
}

export interface ICalcStat {
  numUsersReg: number
  numMySkills: number
  numMyBachecas: number
  numGroups: number
}

export interface IUserProfile {
  img?: string
  nationality?: string
  intcode_cell?: string
  iso2_cell?: string
  cell?: string
  country_pay?: string
  email_paypal?: string
  payeer_id?: string
  advcash_id?: string
  revolut?: string
  link_payment?: string
  note_payment?: string
  username_telegram?: string
  website?: string
  teleg_id?: number
  teleg_checkcode?: number
  paymenttypes?: IPaymentType[]
  manage_telegram?: boolean
  resplist?: any
  workerslist?: any
  dateofbirth?: Date|null
  born_city_id?: number
  born_city_str?: string
  born_province?: string
  born_country?: string
  my_dream?: string
  saw_and_accepted?: boolean
  saw_zoom_presentation?: boolean
  ask_zoom_partecipato?: boolean
  qualified?: boolean
  qualified_2invitati?: boolean
  special_req?: boolean
  sex?: ESexType
  biografia?: string
  socio?: boolean
  socioresidente?: boolean
  consiglio?: boolean
  myshares: IShareWithUs[]
  friends: IFriends[]
  req_friends: IFriends[]
  mygroups: IMyGroup[]
  manage_mygroups: IMyGroup[]

  // in memory
  asked_friends: any[]
  asked_groups: any[]
  list_usersgroup?: IFriends[]
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
  verified_by_aportador?: boolean
  notask_verif?: boolean
  trust_modified?: Date
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
  calcstat?: ICalcStat|null
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
