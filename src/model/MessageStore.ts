import { shared_consts } from '@src/common/shared_vuejs'
import { EState } from './Calendar'

export interface IMessagePage {
  show: boolean
  msg: IMessage
  state: EState
}

export interface ISource {
  page?: string
  event_id?: string
  infoevent?: string
}

export interface IIdentity {
  idapp?: string
  username?: string
}

export const enum StatusMessage {
  None = 0,
  WaitingToSend = 1,
  Sending = 2,
  Sent = 3,
  Received = 4,
  Readit = 5,
}

export const MsgDefault: IMessage = {
  _id: '',
  idapp: '',
  source: {
    event_id: '',
    infoevent: '',
    page: '',
  },
  origin: {
    username: '',
    idapp: '',
  },
  dest: {
    idapp: '',
    username: '',
  },
  message: '',
  datemsg: new Date(),
  read: false,
  deleted: false,
  status: StatusMessage.None,
}

export const NotifDefault: INotif = {
  _id: '',
  idapp: '',
  type: 0,
  sender: '',
  dest: '',
  descr: '',
  datenotif: new Date(),
  read: false,
  deleted: false,
  status: StatusMessage.None,
}

export interface IMessage {
  _id?: any
  idapp?: string
  source?: ISource
  origin?: IIdentity
  dest?: IIdentity
  message: string
  datemsg?: Date
  read?: boolean
  deleted?: boolean
  status?: StatusMessage
  options?: number
}

export interface INotif {
  _id?: any
  idapp?: string
  type: number
  sender: string,
  dest: string,
  descr: string
  datenotif?: Date
  status?: StatusMessage
  link?: string
  read?: boolean
  deleted?: boolean
}

export interface IChat {
  username: string
  lasttimeActive?: Date
}

export interface IMsgUsers {
  username: string
  msgs: IMessage[]
  lastdataread?: Date
}

export interface IMessageState {
  last_msgs: IMessage[]
  users_msg: IMsgUsers[]
}

export interface INotifState {
  last_notifs: INotif[]
  show_all: boolean
}
