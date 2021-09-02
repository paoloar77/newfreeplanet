import { defineStore } from 'pinia'
import Api from '@api'

import { serv_constants } from './Modules/serv_constants'

import { IMessage, IMessageState, IMsgUsers, StatusMessage } from '../model'
import { tools } from '@src/store/Modules/tools'
import { MsgDefault } from '@src/model'
import { shared_consts } from '@src/common/shared_vuejs'
import { useUserStore } from '@store/UserStore'

export const useMessageStore = defineStore('MessageStore', {
  state: (): IMessageState => ({
    last_msgs: [],
    users_msg: [],
  }),

  getters: {

    getlasts_messages: (mystate: IMessageState) => (): IMessage[] => {
      const ctrec = (mystate.last_msgs) ? mystate.last_msgs.slice(0, 5) : []
      // const ctrec = (mystate.msgs) ? mystate.msgs.slice().reverse().slice(0, 5) : []
      return (ctrec)

    },

    getnumMsgUnread: (mystate: IMessageState) => () => {
      return mystate.last_msgs.filter((msg) => !msg.read).length
    },

  },
  actions: {

    setMsg(arrmsg: IMessage[], username: string) {
      // console.log('arrmsg', arrmsg)
      const userStore = useUserStore()

      if (arrmsg.length > 0) {
        let users_msg: any = this.users_msg.find((rec: IMsgUsers) => rec.username === username)
        if (!users_msg) {
          this.users_msg.push({ username, msgs: [] })
          users_msg = this.users_msg.find((rec) => rec.username === username)
        }
        users_msg.msgs.push(...arrmsg)
        // console.table(users_msg.msgs)

        // users_msg.msgs = tools.getUnique(users_msg.msgs, '_id')
        // console.table(users_msg.msgs)

        if (users_msg.msgs) {
          let userother = users_msg.msgs.slice(-1)[0].dest.username
          if (userother === userStore.my.username)
            userother = users_msg.msgs.slice(-1)[0].origin.username

          let index = this.last_msgs.findIndex((rec: IMessage) => (rec.dest!.username === userother) || (rec.origin!.username === userother))
          if (index >= 0) {
            // Update last message
            this.last_msgs[index] = users_msg.msgs.slice(-1)[0]
          } else {
            this.last_msgs.push(users_msg.msgs.slice(-1)[0])
            index = this.last_msgs.findIndex((rec: IMessage) => (rec.dest!.username === userother) || (rec.origin!.username === userother))
          }
          if (this.last_msgs[index])
            users_msg.lastdataread = this.last_msgs[index].datemsg
          else
            users_msg.lastdataread = tools.getLastDateReadReset()

        } else {
          users_msg.lastdataread = tools.getLastDateReadReset()
        }

        // console.log('RICeVUTO', arrmsg, 'lastdataread', users_msg.lastdataread)
        // console.log('this.users_msg', users_msg)
      }
    },

    async updateMsgDataFromServer({ username, lastdataread }: {username: string, lastdataread: Date}) {
      // console.log('updateMsgDataFromServer', username, lastdataread)

      return Api.SendReq(`/sendmsg/${username}/${lastdataread}/${process.env.APP_ID}`, 'GET', null)
        .then((res) => {
          // console.log('res', res)
          if (res.status === 200) {
            this.setMsg(res.data.arrmsg, username)
            return true
          }
          return false
        })
        .catch((error) => {
          console.error(error)
          return false
        })
    },

    async SendMsgEvent(msg: IMessage) {
      console.log('SendMsgEvent', msg)

      const data: IMessage = { ...MsgDefault, ...msg }

      const userStore = useUserStore()

      data.source!.page = ''
      data.idapp = process.env.APP_ID
      data.origin!.idapp = process.env.APP_ID
      data.origin!.username = userStore.my.username
      data.datemsg = tools.getDateNow()
      data.status = StatusMessage.WaitingToSend
      // Options
      data.options = tools.SetBit(data.options, shared_consts.MessageOptions.Notify_ByEmail)
      data.options = tools.SetBit(data.options, shared_consts.MessageOptions.Notify_ByPushNotification)

      // console.log('DOPO:')
      // console.table(data)

      return Api.SendReq('/sendmsg', 'POST', data)
        .then((res) => {
          // console.log('res', res)
          if (res.status === 200) {
            if (res.data.code === serv_constants.RIS_CODE_OK) {
              data._id = res.data.id

              const myarr = []
              myarr.push(data)

              this.setMsg(myarr, data.dest!.username!)
              return true
            }
          }
          return false
        })
        .catch((error) => {
          console.error(error)
          return false
        })
    },
  },
})
