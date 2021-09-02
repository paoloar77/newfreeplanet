import { defineStore } from 'pinia'
import {
  ICfgServer, IColGridTable, IConfig, IDataPass, IGlobalState, IListRoutes, ISettings, StateConnection,
} from '@model'
import { static_data } from '@src/db/static_data'
import * as Types from '@src/store/Api/ApiTypes'
import { useUserStore } from '@store/UserStore'
import { serv_constants } from '@store/Modules/serv_constants'
import * as ApiTables from '@src/store/Modules/ApiTables'
import globalroutines from '@src/boot/globalroutines'
import { useRouter } from 'vue-router'
import { cfgrouter } from '@src/router/route-config'
import Api from './Api'
import { toolsext } from '@store/Modules/toolsext'
import { costanti } from '@costanti'
import { fieldsTable } from '@store/Modules/fieldsTable'
import { tools } from '@store/Modules/tools'
import { shared_consts } from '@src/common/shared_vuejs'

const stateConnDefault = 'online'

export const useGlobalStore = defineStore('GlobalStore', {
  state: (): IGlobalState => ({
    finishLoading: false,
    conta: 0,
    wasAlreadySubscribed: false,
    wasAlreadySubOnDb: false,
    isLoginPage: false,
    layoutNeeded: true,
    mobileMode: false,
    menuCollapse: true,
    leftDrawerOpen: true,
    rightDrawerOpen: false,
    rightCartOpen: false,
    stateConnection: stateConnDefault,
    networkDataReceived: false,
    clickcmd: '',
    cfgServer: [],
    testp1: { contatore: 0, mioarray: [] },
    category: 'personal',
    posts: [],
    menulinks: {},
    listatodo: [
      { nametranslate: 'personal', description: 'personal' },
      { nametranslate: 'work', description: 'work' },
      { nametranslate: 'shopping', description: 'shopping' },
    ],
    connData: {
      uploading_server: 0,
      uploading_indexeddb: 0,
      downloading_server: 0,
      downloading_indexeddb: 0,
    },
    arrConfig: [],
    lastaction: {
      table: '',
      type: 0,
      _id: 0,
    },
    serv_settings: [],
    templemail: [],
    opzemail: [],
    settings: [],
    disciplines: [],
    paymenttypes: [],
    autoplaydisc: 8000,
    newstosent: [],
    gallery: [],
    mailinglist: [],
    mypage: [],
    calzoom: [],
    producers: [],
    groups: [],
    resps: [],
    workers: [],
    storehouses: [],
    departments: [],
    sharewithus: [],
    TIMER: null,
    TIMEOUT: null,
    CUT: null,
    TIMER_STATE: 0,
    URL_RITORNA: '',
    URL_RESTORE: '',
  }),

  getters: {
    // conta: (state: IGlobalState) => { state.conta },
    // listatodo: (state: IGlobalState) => { state.listatodo },
    // category: (state: IGlobalState) => { state.category },

    testpao1_getter_contatore: (state: IGlobalState) => (param1: number) => state.testp1.contatore + 100 + param1,
    testpao1_getter_array: (state: IGlobalState) => (param1: number) => state.testp1.mioarray.filter((item) => item).map((item) => item.valore),

    getConfigbyId: (state: IGlobalState) => (id: string) => state.arrConfig.find((item) => item._id === id),
    getConfigStringbyId: (state: IGlobalState) => (params: any) => {
      const config = state.arrConfig.find((item) => item._id === params.id)
      if (config) {
        return config.value
      } else {
        return params.default
      }
    },
    isNewVersionAvailable: (state: IGlobalState) => {
      // console.log('cfgServer', cfgServer)
      const serversrec = state.cfgServer.find((x) => (x.chiave === toolsext.SERVKEY_VERS) && (x.idapp === process.env.APP_ID))
      // console.log('Record ', serversrec)
      if (serversrec) {
        console.log('Vers Server ', serversrec.valore, 'Vers locale:', process.env.APP_VERSION)
        return serversrec.valore !== process.env.APP_VERSION
      }
      return false
    },

    isMyLang: (state: IGlobalState) => (rec: any) => {
      if (!rec.lang) return true

      return (rec.lang === toolsext.getLocale(false) || toolsext.getLocale() === '')
    },

    getPage: (state: IGlobalState) => (path: string) => state.mypage.find((page) => (`/${page.path}`) === path),

    getmenu: (state: IGlobalState): any => {
      // console.log('getmenu', cfgrouter.getmenu())
      /*
        const mystate = state

        mystate.menulinks = {
          Dashboard: {
            routes: cfgrouter.getmenu(),
            show: true,
          },
        }
        */

      // return mystate.menulinks
      cfgrouter.getmenu()
    },

    getListByTable: (state: IGlobalState) => (table: string): any => {
      /* if (table === costanti.TABEVENTS)
        return CalendarStore.eventlist
      else if (table === 'operators')
        return CalendarStore.operators
      else if (table === 'internalpages')
        return CalendarStore.internalpages
      else if (table === 'wheres')
        return CalendarStore.wheres
      else if (table === 'contribtype')
        return CalendarStore.contribtype */

      let ris = null

      if (table === 'disciplines') ris = state.disciplines
      else if (table === toolsext.TABNEWSLETTER) ris = state.newstosent
      else if (table === toolsext.TABGALLERY) ris = state.gallery
      else if (table === toolsext.TABTEMPLEMAIL) ris = state.templemail
      else if (table === toolsext.TABOPZEMAIL) ris = state.opzemail
      else if (table === toolsext.TABMAILINGLIST) ris = state.mailinglist
      else if (table === toolsext.TABMYPAGE) ris = state.mypage
      else if (table === toolsext.TABCALZOOM) ris = state.calzoom
      else if (table === 'producers') ris = state.producers
      else if (table === 'storehouses') ris = state.storehouses
      else if (table === 'groups') ris = state.groups
      else if (table === 'resps') ris = state.resps
      else if (table === 'workers') ris = state.workers
      else if (table === 'departments') ris = state.departments
      else if (table === 'sharewithus') ris = state.sharewithus
      else if (table === 'paymenttypes') ris = state.paymenttypes
      /* else if (table === 'bookings')
        return CalendarStore.bookedevent
      else if (table === 'users')
        return userStore.usersList
      else if (table === 'sendmsgs')
        return MessageStore.last_msgs
      else if (table === 'settings')
        return userStore.settings */
      else return ris

      return ris || null
    },

    getrecSettingsByKey: (state: IGlobalState) => (key: any, serv: any): ISettings | undefined => {
      if (serv) return state.serv_settings.find((rec) => rec.key === key)
      return state.settings.find((rec) => rec.key === key)
    },

    getCmdClick: (state: IGlobalState): string => (state.clickcmd ? state.clickcmd : ''),

    getValueSettingsByKey: (state: IGlobalState) => (key: any, serv: any): any | undefined => {
      // @ts-ignore
      const myrec = getrecSettingsByKey(key, serv)

      if (myrec) {
        if ((myrec.type === costanti.FieldType.date) || (myrec.type === costanti.FieldType.onlydate)) return myrec.value_date
        if ((myrec.type === costanti.FieldType.number) || (myrec.type === costanti.FieldType.hours)) return myrec.value_num
        if (myrec.type === costanti.FieldType.boolean) return myrec.value_bool
        return myrec.value_str
      }
      return ''
    },

    // @ts-ignore
    setValueSettingsByKey: (state: IGlobalState) => ({ key, value, serv }): any => {
      // Update the Server

      // Update in Memory
      let myrec = null
      if (serv) myrec = state.serv_settings.find((rec: any) => rec.key === key)
      else myrec = state.settings.find((rec: any) => rec.key === key)

      if (myrec) {
        if ((myrec.type === costanti.FieldType.date) || (myrec.type === costanti.FieldType.onlydate)) myrec.value_date = value
        else if ((myrec.type === costanti.FieldType.number) || (myrec.type === costanti.FieldType.hours)) myrec.value_num = value
        else if (myrec.type === costanti.FieldType.boolean) myrec.value_bool = value
        else myrec.value_str = value

        console.log('setValueSettingsByKey value', value, 'myrec', myrec)
      }
    },
  },

  actions: {
    changeCmdClick(value: string) {
      console.log('changeCmdClick', value)
      this.clickcmd = value
    },

    isOnline(): boolean {
      return this.stateConnection === 'online'
    },

    async addDynamicPages() {
      const arrpagesroute: IListRoutes[] = []

      for (const page of this.mypage) {
        if (page.active) {
          // console.log('page', page.lang)
          if (this.isMyLang(page)) {
            // console.log('page', page.lang, 'OK')
            arrpagesroute.push({
              active: true,
              order: page.order ? page.order : 1000,
              lang: page.lang,
              path: `/${page.path}`,
              name: '',
              text: page.title,
              materialIcon: page.icon,
              component: () => import('@src/root/mypage/mypage.vue'),
              inmenu: page.inmenu,
              onlySocioResidente: page.only_residenti,
              onlyConsiglio: page.only_consiglio,
              color: page.color,
              infooter: page.infooter,
              onlyif_logged: page.onlyif_logged,
              level_child: page.l_child,
              level_parent: page.l_par,
              submenu: page.submenu,
            })
          }
        }
      }

      const last = {
        active: true,
        order: 10000,
        path: '*',
        materialIcon: 'fas fa-calendar-plus',
        name: 'otherpages.error404def',
        component: () => import('@src/root/My404page/My404page.vue'),
        inmenu: false,
        infooter: false,
      }

      const sito_offline = {
        active: true,
        order: 20,
        path: '/sito_offline',
        materialIcon: 'home',
        name: 'otherpages.sito_offline',
        component: () => import('@src/rootgen/sito_offline/sito_offline.vue'),
        inmenu: true,
        infooter: true,
      }

      if (!toolsext.sito_online(false)) {
        static_data.routes = [sito_offline, last]
      } else {
        static_data.routes = [...static_data.baseroutes, ...arrpagesroute, last]
      }

      // Sort array
      static_data.routes = static_data.routes.sort((a, myb) => a.order - myb.order)

      /*
      if (tools.sito_online(false)) {
        router.addRoutes([...arrpagesroute, last])
      } else {
        router.addRoutes([sito_offline, last])
        router.replace('/sito_offline')
      }

       */
    },

    async loadPage(path: string) {
      const userStore = useUserStore()

      path = path.substring(1)
      const mypage = this.getPage(`/${path}`)

      // Controlla se l'ho già caricato
      if (!!mypage && !!mypage.content) {
        return mypage
      }

      console.log('loadPage', path)

      return Api.SendReq('/getpage', 'POST', { path })
        .then((res) => {
          // console.table(res)
          if (res) {
            const index = this.mypage.findIndex((rec) => rec.path === path)
            if (index >= 0) {
              this.mypage[index] = res.data.mypage
            }
            return res.data.mypage
          }
          return null
        })
        .catch((error) => {
          console.log('error loadTable', error)
          userStore.setErrorCatch(error)
          return null
        })
    },
    async saveTable(mydata: object) {
      // console.log('saveTable', mydata)
      const userStore = useUserStore()

      return Api.SendReq('/settable', 'POST', mydata)
        .then((res) => res.data)
        .catch((error) => {
          console.log('error saveTable', error)
          userStore.setErrorCatch(error)
          return null
        })
    },

    async saveFieldValue(mydata: IDataPass) {
      // const userStore = useUserStore()
      return Api.SendReq('/chval', 'PATCH', { data: mydata })
        .then((res) => {
          if (res) {
            this.UpdateValuesInMemory(mydata)
            return (res.data.code === serv_constants.RIS_CODE_OK)
          }
          return false
        })
        .catch((error) => false)
    },

    setPaoArray_Delete(state: IGlobalState) {
      state.testp1.mioarray.pop()
    },

    setConta(num: number) {
      this.conta = num
    },

    setleftDrawerOpen(bool: boolean) {
      this.leftDrawerOpen = bool
      localStorage.setItem(toolsext.localStorage.leftDrawerOpen, bool.toString())
    },

    setCategorySel(cat: string | null) {
      this.category = cat || ''
    },

    setStateConnection(stateconn: StateConnection) {
      if (this.stateConnection !== stateconn) {
        console.log('INTERNET ', stateconn)
        this.stateConnection = stateconn
      }
    },

    saveConfig(data: IConfig) {
      let dataout
      // this.$set(dataout, data.value, {'value': 'default value'})
      // @ts-ignore
      return globalroutines(null, 'write', 'config', { _id: data._id, value: data.value })
    },

    UpdateValuesInMemory(mydata: IDataPass): void {
      const { id } = mydata
      const { table } = mydata

      try {
        const mylist = this.getListByTable(table)
        const mykey = fieldsTable.getKeyByTable(table)

        if (mylist) {
          const myrec = mylist.find((event: any) => event[mykey] === id)
          // console.log('myrec', myrec)
          if (myrec) {
            // console.log('key', value, myrec[key])
            for (const [key, value] of Object.entries(mydata.fieldsvalue)) {
              myrec[key] = value
            }
          }
        }
      } catch (e) {
        console.error(e)
      }
    },

    async deleteSubscriptionToServer() {
      console.log('DeleteSubscriptionToServer: ')

      return Api.SendReq('/subscribe/del', 'DELETE', null)
        .then((res) => {

        })
    },

    async clearDataAfterLogout() {
      console.log('clearDataAfterLogout')

      // Clear all data from the IndexedDB
      // for (const table of ApiTables.allTables()) {
      // ++Todo conv: await globalroutines(null, 'clearalldata', table, null)
      // }

      if (static_data.functionality.PWA) {
        if ('serviceWorker' in navigator) {
          // REMOVE ALL SUBSCRIPTION
          console.log('REMOVE ALL SUBSCRIPTION...')
          await navigator.serviceWorker.ready.then((reg) => {
            console.log('... Ready')
            reg.pushManager.getSubscription().then((subscription) => {
              console.log('    Found Subscription...')
              if (subscription) {
                subscription.unsubscribe().then((successful) => {
                  // You've successfully unsubscribed
                  console.log('You\'ve successfully unsubscribed')
                }).catch((e) => {
                  // Unsubscription failed
                })
              }
            })
          })
        }
      }

      await this.deleteSubscriptionToServer()
    },

    async clearDataAfterLoginOnlyIfActiveConnection() {
      const prova = 1
      return prova
    },

    async loadAfterLogin() {
      // console.log('loadAfterLogin')
      this.clearDataAfterLoginOnlyIfActiveConnection()

      let isok = false

      const $router = useRouter()

      if (!await this.loadSite()) {
        $router.push('/signin')
      } else {
        isok = true
      }

      // ++Todo conv: this.arrConfig = await globalroutines(null, 'readall', 'config', null)

      return isok
    },

    async saveCfgServerKey(dataval: ICfgServer) {
      console.log('saveCfgServerKey dataval', dataval)

      const ris = await Api.SendReq('/admin/updateval', 'POST', { pairval: dataval })
        .then((res) => {

        })
    },

    async checkUpdates() {
      console.log('checkUpdates')

      const userStore = useUserStore()

      // if (userStore.my._id === '')
      //   return false // Login not made

      this.networkDataReceived = false

      const ris = await Api.SendReq('/checkupdates', 'GET', null)
        .then((res) => {
          this.networkDataReceived = true

          // console.log('******* checkUpdates RES :', res.data.cfgServer)
          if (res.data.cfgServer) {
            this.cfgServer = [...res.data.cfgServer]
            // console.log('res.data.cfgServer', res.data.cfgServer)
          }

          // console.log('res.data.userslist', res.data.usersList)
          if (res.data.usersList) {
            userStore.setusersList(res.data.usersList)
          }

          if (res.data.last_msgs) {
            // ++Todo conv: MessageStore.last_msgs = [...res.data.last_msgs]
          }

          // console.log('MessageStore.last_msgs', MessageStore.last_msgs)

          // console.log('**********  res', 'todos', todos, 'checkPending', checkPending)
          // After Login will store into the indexedDb...

          return res
        })
        .catch((error) => {
          console.log('error checkUpdates', error)
          userStore.setErrorCatch(error)
          return error
        })
    },

    async loadSite() {
      const userStore = useUserStore()
      // console.log('CalendarStore: loadAfterLogin')
      // Load local data
      const showall = userStore.isAdmin || userStore.isManager ? '1' : '0'

      const myuserid = (userStore.my._id) ? userStore.my._id : '0'

      // CalendarStore.editable = false

      return Api.SendReq(`/loadsite/${myuserid}/${process.env.APP_ID}/${process.env.APP_VERSION}`, 'GET', null)
        .then((res) => {
          // console.log('____________________________  res', res)
          if (res.status === 200) {
            /* CalendarStore.bookedevent = (res.data.bookedevent) ? res.data.bookedevent : []
            CalendarStore.eventlist = (res.data.eventlist) ? res.data.eventlist : []
            CalendarStore.operators = (res.data.operators) ? res.data.operators : []
            CalendarStore.internalpages = (res.data.internalpages) ? res.data.internalpages : []
            CalendarStore.wheres = (res.data.wheres) ? res.data.wheres : []
            CalendarStore.contribtype = (res.data.contribtype) ? res.data.contribtype : []

             */
            this.settings = (res.data.settings) ? [...res.data.settings] : []
            this.disciplines = (res.data.disciplines) ? [...res.data.disciplines] : []
            this.paymenttypes = (res.data.paymenttypes) ? [...res.data.paymenttypes] : []
            this.gallery = (res.data.gallery) ? [...res.data.gallery] : []
            this.calzoom = (res.data.calzoom) ? [...res.data.calzoom] : []
            this.producers = (res.data.producers) ? [...res.data.producers] : []
            this.storehouses = (res.data.storehouses) ? [...res.data.storehouses] : []
            this.groups = (res.data.groups) ? [...res.data.groups] : []
            this.resps = (res.data.resps) ? [...res.data.resps] : []
            this.workers = (res.data.workers) ? [...res.data.workers] : []
            // @ts-ignore
            this.departments = (res.data.departments) ? [...res.data.departments] : []

            // console.log('res.data.cart', res.data.cart)

            /* if (res.data.cart)
              Products.cart = (res.data.cart) ? { ...res.data.cart } : {}
            else
              Products.cart = { items: [], totalPrice: 0, totalQty: 0, userId: '' }

            Products.orders = (res.data.orders) ? [...res.data.orders] : []
            */

            if (showall) {
              this.newstosent = (res.data.newstosent) ? [...res.data.newstosent] : []
              this.mailinglist = (res.data.mailinglist) ? [...res.data.mailinglist] : []
              this.mypage = (res.data.mypage) ? [...res.data.mypage] : []
            }

            // console.log('res.data.myuser', res.data.myuser)
            if (res.data.myuser) {
              userStore.authUser(res.data.myuser)

              userStore.updateLocalStorage(res.data.myuser)
            } else {
              // User not exist !!

            }

            const islogged = localStorage.getItem(toolsext.localStorage.username)
            console.log('islogged', islogged)

            // CalendarStore.editable = userStore.isAdmin || userStore.isManager || userStore.isTutor
            if (res.data.myuser === null) {
              if (islogged) {
                // Fai Logout
                console.log('Fai Logout', 'islogged', islogged)
                userStore.logout()
                this.rightDrawerOpen = true
                return false
              }
            }
          }

          return true
        }).then((res) => res).catch((error) => {
          console.log('error dbLoad', error)
          // userStore.setErrorCatch(error)
          return new Types.AxiosError(serv_constants.RIS_CODE_ERR, null, toolsext.ERR_GENERICO, error)
        })
    },

    getArrStrByValueBinary(mythis: any, col: IColGridTable, val: any) {
      const arr = this.getArrByValueBinary(mythis, col, val)
      if (arr.length > 0) return arr.join(' - ')
      return '[---]'
    },

    getArrByValueBinary(mythis: any, col: IColGridTable, val: any) {
      if (col.jointable) {
        const mylist = this.getTableJoinByName(col.jointable)
        const key = fieldsTable.getKeyByTable(col.jointable)
        const myres: any = []
        mylist.forEach((myrec: any) => {
          if (tools.isBitActive(val, myrec[key])) myres.push(mythis.t(myrec.label))
        })

        return myres
      }
      return []
    },

    getValueByTable(col: IColGridTable, val: any) {
      if (col.jointable) {
        const mylist = this.getTableJoinByName(col.jointable)
        const key = fieldsTable.getKeyByTable(col.jointable)
        const collab = fieldsTable.getLabelByTable(col.jointable)

        // console.table(mylist)
        let risultato = ''

        if (tools.isObject(collab)) {
          risultato = mylist.filter((myrec: any) => myrec.username === val).map(collab)
        } else {
          const myris = mylist.find((myrec: any) => myrec[key] === val)
          risultato = myris[collab]
        }

        if (key === 'username') {
          console.log('key=', key, 'collab', collab, 'val', val)
          console.log('myris', risultato)
        }

        return risultato
      }
      return ''
    },

    getMultiValueByTable(col: IColGridTable, arrval: any) {
      // console.log('getMultiValueByTable')
      if (col.jointable) {
        const mylist = this.getTableJoinByName(col.jointable)
        const key = fieldsTable.getKeyByTable(col.jointable)
        const collab = fieldsTable.getLabelByTable(col.jointable)

        // console.table(mylist)
        // console.log('key=', key, 'collab', collab, 'val', collab)

        const myris = mylist.filter((myrec: any) => arrval.includes(myrec[key]))
        // console.log('myris', myris)
        if (myris) {
          console.log('collab', collab)
          if (tools.isObject(collab)) return myris.map(collab)
          return myris.map((rec: any) => rec[collab])
        }
        return ''
      }
      return ''
    },

    getTableJoinByName(table: string) {
      if (table === 'permissions') return [shared_consts.Permissions.Admin, shared_consts.Permissions.Manager, shared_consts.Permissions.Teacher, shared_consts.Permissions.Tutor, shared_consts.Permissions.Editor, shared_consts.Permissions.Zoomeri, shared_consts.Permissions.Department]
      if (table === 'accepted') return [shared_consts.Accepted.CHECK_READ_GUIDELINES, shared_consts.Accepted.CHECK_SEE_VIDEO_PRINCIPI]
      if (table === 'fieldstype') return costanti.FieldTypeArr
      if (table === 'metodo_pagamento') return tools.SelectMetodiPagamento
      return this.getListByTable(table)
    },

  },
})
