import { defineStore } from 'pinia'
import { Api } from '@api'

import { serv_constants } from './Modules/serv_constants'

import { INotif, INotifState } from '../model'
import { tools } from '@src/store/Modules/tools'
import { NotifDefault } from '@src/model'
import { shared_consts } from '@src/common/shared_vuejs'
import { useUserStore } from '@store/UserStore'

export const useNotifStore = defineStore('NotifStore', {
  state: (): INotifState => ({
    last_notifs: [],
    show_all: true
  }),

  getters: {

    getlasts_notifs: (mystate: INotifState) => (): INotif[] => {
      const ctrec = (mystate.last_notifs) ? mystate.last_notifs.slice(0, 5).filter((rec) => mystate.show_all ? true : !rec.read) : []
      // const ctrec = (mystate.notifs) ? mystate.notifs.slice().reverse().slice(0, 5) : []
      return (ctrec)

    },

    getnumNotifUnread: (mystate: INotifState) => () => {
      const myarr = mystate.last_notifs.filter((notif) => !notif.read)
      return (tools.isArray(myarr) ? myarr.length : 0)
    },

  },
  actions: {

    setNotif(notif: INotif) {
      // console.log('arrnotif', arrnotif)
      if (notif) {
        this.last_notifs = [notif, ...this.last_notifs]
      }
    },

    setAsRead(idnotif: string) {
      const rec = this.last_notifs.find((rec: any) => rec._id === idnotif)
      if (rec) {
        rec.read = true
      }
    },

    setAllRead(username: string) {
      return Api.SendReq(`/sendnotif/setall/${username}/${process.env.APP_ID}`, 'GET', null)
        .then((res) => {
          // console.log('res', res)
          if (res) {
            for (const rec of this.last_notifs) {
              rec.read = true
            }
          }

        })
        .catch((error) => {
          console.error(error)
          return false
        })

    },

    deleteRec(id: string) {

    },

    deactivateRec(id: string) {

    },

    async updateNotifDataFromServer({ username, lastdataread }: {username: string, lastdataread: Date}) {
      // console.log('updateNotifDataFromServer', username, lastdataread)

      return Api.SendReq(`/sendnotif/${username}/${lastdataread}/${process.env.APP_ID}`, 'GET', null)
        .then((res) => {
          // console.log('res', res)
          if (!!res.data && !!res.data.arrnotif) {
            this.last_notifs = res.data.arrnotif
          } else {
            this.last_notifs = []
          }
          return true
        })
        .catch((error) => {
          console.error(error)
          return false
        })
    },

    async SendNotifEvent(notif: INotif) {
      console.log('SendNotifEvent', notif)

      const data: INotif = { ...NotifDefault, ...notif }

      data.idapp = process.env.APP_ID
      data.type = notif.type
      data.sender = notif.sender
      data.dest = notif.dest
      data.descr = notif.descr
      data.link = notif.link
      data.datenotif = tools.getDateNow()
      data.read = false

      // console.log('DOPO:')
      // console.table(data)

      return Api.SendReq('/sendnotif', 'POST', data)
        .then((res) => {
          // console.log('res', res)
          if (res.status === 200) {
            if (res.data.code === serv_constants.RIS_CODE_OK) {
              this.setNotif(res.data)
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
