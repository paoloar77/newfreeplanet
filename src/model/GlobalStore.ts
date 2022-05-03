import { IAction } from '@src/model/Projects'
import { IMyGroup, IPaymentType } from '@src/model/UserStore'
import {
  IDepartment, IProducer, IShareWithUs, IStorehouse,
} from '@src/model/Products'

import { IUserFields, IUserProfile } from '@src/model/UserStore'

export interface IPost {
  title: string
}

export interface ICheckUser {
  verified_email?: boolean
  teleg_id?: number
  profile?: IUserProfile
}


export interface INotData {
  num_reg?: number
  online_today?: number
  num_passeggeri?: number
  num_imbarcati?: number
  email_non_verif?: number
  num_teleg_attivo?: number
  num_autorizzare?: number
  num_autorizzati?: number
  num_teleg_pending?: number
  num_part_zoom?: number
  num_part_accepted?: number
  num_modalita_pagamento?: number
  arr_nations?: string
  lastsreg?: IUserFields[]
  checkuser?: ICheckUser | any
  numreg_untilday?: number
  reg_daily?: string
  imbarcati_daily?: string
  imbarcati_weekly?: string
  reg_weekly?: string
}


export interface IConnData {
  downloading_server: number
  downloading_indexeddb: number
  uploading_server: number
  uploading_indexeddb: number
}

export interface ICfgServer {
  chiave: string
  idapp: string
  userId: string
  valore: string
}

export interface ICfgData {
  _id?: string
  lang?: string
  token?: string
  userId?: string
}

export interface ITemplEmail {
  _id?: string
  subject?: string
  content?: string
  options?: ISettings[]
}

export interface ISettings {
  _id?: string
  idapp?: string
  key?: string
  type?: number
  value_str?: string
  value_date?: Date,
  value_num?: number
  value_bool?: boolean
  serv?: boolean
  crypted?: boolean
}

export interface ITeachUname {
  username?: string
}

export interface IInternalPage {
  path?: string
}

export interface IResp {
  _id?: string
  username?: string
  name?: string
  surname?: string
}

export interface IMyBot {
  _id?: string
  page?: number
  index?: number
  riga?: number
  active?: boolean
  main?: boolean
  label?: string
  type?: number
  value?: string
  visibility?: number
  date_updated?: Date
}

export interface IMyPage {
  _id?: string
  author_username?: string
  lang?: string
  title?: string
  icon?: string
  order?: number
  path?: string
  keywords?: string
  description?: string
  img1?: string
  content?: string
  video1?: string
  ratio1?: string
  img2?: string
  content2?: string
  video2?: string
  ratio2?: string
  img3?: string
  content3?: string
  video3?: string
  ratio3?: string
  content4?: string
  active?: boolean
  inmenu?: boolean
  color?: string
  onlyif_logged?: boolean
  only_residenti?: boolean
  only_consiglio?: boolean
  submenu?: boolean
  l_par?: number,
  l_child?: number,
  infooter?: boolean
  internalpage?: boolean
}

export interface ISites {
  _id?: string
  attiva?: boolean
  idapp?: string
  name?: string
  adminemail?: string
  manageremail?: string
  replyTo?: string
  host?: string
  host_test?: string
  portapp?: string
  dir?: string
  email_from?: string
  email_pwd?: string
  telegram_key?: string
  telegram_bot_name?: string
  telegram_key_test?: string
  telegram_bot_name_test?: string
  pathreg_add?: string
}

export interface INewsToSent {
  _id: string
  idapp?: string
  label?: string
  templemail_str?: string
  numemail_tot?: number
  numemail_sent?: number
  datetoSent?: Date
  datestartJob?: Date
  datefinishJob?: Date
  lastemailsent_Job?: Date
  starting_job?: boolean
  finish_job?: boolean
  error_job?: string
}

export interface ICalZoom {
  lang?: string
  title?: string
  typeconf?: string
  date_start?: string
  date_end?: Date
  id_conf_zoom?: number
  note?: string
}

export interface IGroup {
  _id?: any
  descr?: string
}

export interface IMailinglist {
  name?: string
  surname?: string
  email: string
  lastid_newstosent?: string
}

export interface IDiscipline {
  typol_code?: string
  order?: number
  label?: string
  description?: string
  linkpage?: string
  color?: string
  icon?: string
  img_small?: string
  showinhome?: boolean
  showinnewsletter?: boolean
  img?: string
  teachers?: ITeachUname[]
}

export interface ITestp1 {
  contatore: number
  mioarray: ICfgServer[]
}

export type StateConnection = 'online' | 'offline'

export interface IConfig {
  _id: string,
  key?: string,
  value: string
}

export interface IMetaTags {
  title?: string
  keywords?: string
  description?: string
}

export interface IGlobalState {
  finishLoading: boolean
  conta: number
  wasAlreadySubOnDb: boolean
  wasAlreadySubscribed: boolean
  isLoginPage: boolean
  layoutNeeded: boolean
  mobileMode: boolean
  menuCollapse: boolean
  leftDrawerOpen: boolean
  rightDrawerOpen: boolean
  rightCartOpen: boolean
  category: string
  stateConnection: string
  serverError: boolean
  serverMsgError: any
  networkDataReceived: boolean
  clickcmd?: string
  cfgServer: ICfgServer[]
  testp1: ITestp1
  connData: IConnData
  posts: IPost[]
  menulinks: {}
  listatodo: IMenuList[]
  arrConfig: IConfig[]
  lastaction: IAction
  serv_settings: ISettings[],
  settings: ISettings[],
  disciplines: IDiscipline[],
  paymenttypes: IPaymentType[],
  newstosent: INewsToSent[],
  gallery: IGallery[],
  mypage: IMyPage[],
  templemail: ITemplEmail[],
  opzemail: ISettings[],
  mailinglist: IMailinglist[],
  calzoom: ICalZoom[],
  producers: IProducer[],
  storehouses: IStorehouse[],
  departments: IDepartment[],
  sharewithus: IShareWithUs[],
  groups: IGroup[],
  resps: IResp[],
  workers: IResp[],
  autoplaydisc: number
  TIMER: any
  TIMEOUT: any
  CUT: any
  TIMER_STATE: number
  URL_RITORNA: string
  URL_RESTORE: string
  serverHost?: string
  levels: ILevel[],
  adtypes: IAdType[],
  adtypegoods: IAdType[],
  skills: ISkill[],
  goods: IGood[],
  // subSkills: ISubSkill[],
  statusSkills: IStatusSkill[],
  sectors: ISector[],
  sectorgoods: ISectorGood[],
  catgrps: ICatGrp[],
  provinces: IProvince[],
  datastat?: INotData
}

export interface IMenuList {
  nametranslate: string
  description?: string
  idelem?: string
  icon?: string
  name?: string
  level_parent?: number
  level_child?: number
  urlroute?: string
  routes2?: IMenuList[]
}

export interface IPathFile {
  path: string
  file: string
}

export interface IListRoutes {
  active?: boolean
  order: number
  path: string
  name: string
  lang?: string
  materialIcon?: string
  component?: any
  children?: any
  reqauth?: boolean
  isseparator?: boolean
  inmenu?: boolean
  solotitle?: boolean
  infooter?: boolean
  submenu?: boolean
  onlyAdmin?: boolean
  onlyif_logged?: boolean
  onlyManager?: boolean
  onlySocioResidente?: boolean
  onlyConsiglio?: boolean
  onlyNotSoci?: boolean
  onlyDepartment?: boolean
  onlyTutor?: boolean
  color?: string
  onlyEditor?: boolean
  extraclass?: string
  meta?: any
  idelem?: string
  urlroute?: string
  img?: string
  // ------------------------
  faIcon?: string
  text?: string
  routes2?: IListRoutes[]
  level_parent?: number
  level_child?: number
  separator?: boolean
}

export interface IOperators {
  username: string
  name: string
  surname: string
  email?: string
  qualification?: string
  disciplines?: string
  certifications?: string
  img?: string
  cell?: string
  usertelegram?: string
  paginaweb?: string
  paginafb?: string
  intro?: string
  info?: string
  vario?: string
  tab?: string
}

export interface IPreloadImages {
  imgname: string
  alt: string
  mobile: boolean
}

export interface ILang {
  label: string
  icon: string
  value: string
  image: string
  short: string
}

export interface IAllLang {
  es?: string
  enUs?: string
  fr?: string
  de?: string
  it?: string
}

export interface ITimeLineEntry {
  date: string
  title: string
  description: IAllLang
  description2?: IAllLang
  description3?: IAllLang
  icon: string
  image: string
  image2?: string
  image3?: string
  image4?: string
  video?: string
  side: string
  link_url?: string
  link_url_lang?: IAllLang
  link_text?: IAllLang
  ingallery?: boolean
}

export interface ITimeLineMain {
  titlemain: IAllLang | any
  body: ITimeLineEntry[]
}

export interface IImgGallery {
  _id?: string
  imagefile: string
  // order?: number
  alt?: string
  description?: string
}

export interface IGallery {
  _id?: string
  author_username?: string
  title?: string
  directory?: string
  list?: IImgGallery[]
}

export interface IColl {
  title: IAllLang | any
  date?: string
  subtitle?: IAllLang | any
  img: string
  img2?: string
  linkagg?: string
  linkagg_type?: number
  width?: number
  height?: number
  ingallery?: boolean
  inexibitions?: boolean
}

export interface ICollaborations {
  withwhom_title: IAllLang | any
  list: IColl[]
}

export interface IParamDialog {
  param1?: any
  param2?: any
  param3?: any
}

export interface IFunctionality {
  PWA?: boolean
  ENABLE_REGISTRATION?: boolean
  SHOW_REG_BUTTON?: boolean
  SHOW_PROFILE?: boolean
  SHOW_USER_MENU?: boolean
  SHOW_IF_IS_SERVER_CONNECTION?: boolean
  ENABLE_TODOS_LOADING?: boolean
  ENABLE_PROJECTS_LOADING?: boolean
  ENABLE_ECOMMERCE?: boolean
  SHOW_NEWSLETTER?: boolean
  SHOW_ONLY_POLICY?: boolean
  SHOW_MESSAGES?: boolean
  BOOKING_EVENTS?: boolean
  ENABLE_REG_AYNI?: boolean
  ENABLE_REG_CNM?: boolean
  ENABLE_REG_ISP?: boolean
  SHOW_NAMESURNAME?: boolean
  ENABLE_GROUPS?: boolean
}

export interface IParLookup {
  lk_tab?: string,
  af_objId_tab?: string,
  lk_LF?: string,
  lk_FF?: string,
  lk_as?: string,
  lk_proj?: string,
}

export interface IParamsPickup {
  table: string
  search: string
  filter: string
}
export interface IParamsQuery {
  table: string
  startRow: number
  endRow: number
  filter: string
  filterand: string
  sortBy: string
  descending: number
  userId: string
  codeId?: string
  filtersearch: string
  filtersearch2: string
  filtercustom: string
  lookup1?: IParLookup
  lookup2?: IParLookup
  lookup3?: IParLookup
  lookup4?: IParLookup
  options?: number
  extrapar?: string
}

export interface IColGridTable {
  name: string
  subfield?: string
  required?: boolean
  label?: string
  label_trans?: string
  visibleif?: number
  visib_field?: string
  visib_value?: any
  align?: string
  field?: string
  sortable?: boolean
  disable?: boolean
  titlepopupedit?: string
  visible?: boolean
  icon?: string
  action?: any
  askaction?: string
  foredit?: boolean
  fieldtype?: number
  fieldtype_real?: number
  field_outtype?: number
  noshowlabel?: boolean
  tipovisu?: number
  link?: string
  jointable?: string
  addall?: boolean
  addnone?: boolean
  filter?: any
  resultjoin?: string[]
  tablesel?: string
  notsave?: boolean
  isadvanced_field?: boolean
  showWhen?: number
  maxlength?: number
  allowchar?: number
  filter_table?: string
  filter_field?: string
  remote_table?: string
  remote_key?: string
  remote_field?: string
  field_extra1?: string
  subfield_extra1?: string
  allowNewValue?: boolean
  showpicprofile_ifnotset?: boolean
}

export interface ITableRec {
  label: string
  value: string
  columns: IColGridTable[]
  colkey: string
  collabel: string
  colicon?: string
  onlyAdmin?: boolean
  noshow: boolean
  remote?: boolean
}

export interface ISearchList {
  label: string
  table: string
  key: string
  arrvalue: any[]
  value: any
  type: number
  filter: any
  param1?: any
  useinput: boolean
  notinsearch?: boolean
  addall?: boolean
  showcount?: boolean
  tablesel?: string
  icon?: string
  filteradv?: boolean
  filter_extra?: object
}

export interface IFilter {
  label: string
  value: string
  hide?: boolean
  default?: boolean
}

export interface IDataPass {
  id: string
  table: string
  fieldsvalue: any
}

export interface IMsgGlobParam {
  typemsg: number,
  title?: string,
  content?: string,
  openUrl?: string,
  openUrl2?: string,
  tag?: string,
  actions?: any[],
  cmd?: number
  usernameOrig?: string
  usernameDest?: string
  groupnameDest?: string
  text?: string
  typesend: number
  sendreally?: boolean
}

export interface IDataToSet {
  id?: string | null
  username?: string
  table?: string
  fieldsvalue?: any
  unset?: any,
  notifBot?: any | null
  tipomsg?: number
  invitante_username?: string
  ind_order?: any
  num_tess?: number
  data?: any
  myfunc?: any
  inviaemail?: any
}

export interface INewsState {
  lastnewstosent: INewsToSent | null
  nextnewstosent: INewsToSent | null
  totemail: number
  totsubscribed: number
  totunsubscribed: number
  totsentlastid: number
}

export const DefaultNewsState: INewsState = {
  lastnewstosent: null,
  nextnewstosent: null,
  totemail: 0,
  totsubscribed: 0,
  totunsubscribed: 0,
  totsentlastid: 0,
}

export interface IPagination {
  sortBy: string,
  descending: boolean
  rowsNumber: number
  page: number,
  rowsPerPage: number // specifying this determines pagination is server-side
}

export interface ISkill {
  _id: number
  descr: string
  idSector: number[]
  icon?: string
  img?: string
}
export interface IGood {
  _id: number
  descr: string
  idSectorGood: number[]
  icon?: string
  img?: string
}

/*
export interface ISubSkill {
  _id: number
  descr: string
  idSkill: number
  icon?: string
  img?: string
}

 */


export interface IStatusSkill {
  _id: number
  descr: string
  color: string
  icon: string
  theme: string
}


export interface ISector {
  _id: number
  descr: string
  idSector?: number
  icon?: string
  img?: string
  color: string
  theme: string
}

export interface ISectorGood {
  _id: number
  descr: string
  idSectorGood?: number
  icon?: string
  img?: string
  color: string
  theme: string
}

export interface ICatGrp {
  _id: number
  descr: string
  idCatGrp?: number
  icon?: string
  img?: string
  color: string
  theme: string
}

export interface ILevel {
  _id: number
  descr: string
  color: string
  theme: string
  years_of_exp: number
}

export interface IAdType {
  _id: number
  descr: string
}

export interface ICity {
  _id: number
  istat: string
  comune: string
  prov: string
}

export interface IProvince {
  _id: number
  prov: string
  reg: string
  descr: string
  link_grp: string
}

export interface IMySkill {
  _id: number
  idSector: number
  idSkill: number
  // idSubSkill: number[]
  idStatusSkill: number[]
  idContribType: string[]
  idCity: number[]
  photos: IGallery[]
  NumLevel: number
  adType: number
  note: string
  //**ADDFIELD_MYSKILL
  website: string
  descr: string
  date_created?: Date,
  date_updated?: Date,

  username?: string
}

export interface IMyGoods {
  _id: number
  idSector: number
  idSkill: number
  idShipping: number[]
  idStatusSkill: number[]
  idContribType: string[]
  otherfilters: number[]
  idCity: number[]
  photos: IGallery[]
  NumLevel: number
  adType: number
  note: string
  //**ADDFIELD_MYSKILL
  website: string
  descr: string
  date_created?: Date,
  date_updated?: Date,
}

export interface IMyBacheca {
  _id: number
  idSector: number
  idSkill: number
  // idSubSkill: number[]
  idStatusSkill: number[]
  idContribType: string[]
  dateTimeStart: Date
  dateTimeEnd: Date
  idCity: number[]
  photos: IGallery[]
  NumLevel: number
  adType: number
  note: string
  //**ADDFIELD_MYBACHECAS
  website: string
  descr: string
  date_created?: Date,
  date_updated?: Date,
}


export interface IMyHosp {
  _id: number
  idSector: number
  idSkill: number
  // idSubSkill: number[]
  idStatusSkill: number[]
  idContribType: string[]
  dateTimeStart: Date
  dateTimeEnd: Date
  idCity: number[]
  photos: IGallery[]
  NumLevel: number
  adType: number
  note: string
  website: string
  descr: string
  date_created?: Date,
  date_updated?: Date,
}


