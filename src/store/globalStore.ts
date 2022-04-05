import { defineStore } from 'pinia'
import {
  ICfgServer, ICity,
  IColGridTable,
  IConfig,
  IDataToSet,
  IGlobalState,
  IListRoutes,
  IMyPage, IParamsPickup,
  IParamsQuery,
  ISettings,
  StateConnection,
} from '@model'
import { static_data } from '@src/db/static_data'
import * as Types from '@src/store/Api/ApiTypes'
import { useUserStore } from '@store/UserStore'
import { serv_constants } from '@store/Modules/serv_constants'
import * as ApiTables from '@src/store/Modules/ApiTables'
import { Router, useRouter } from 'vue-router'
import { cfgrouter } from '@src/router/route-config'
import { Api } from '@api'
import { toolsext } from '@store/Modules/toolsext'
import { costanti } from '@costanti'
import { fieldsTable } from '@store/Modules/fieldsTable'
import { tools } from '@store/Modules/tools'
import { shared_consts } from '@src/common/shared_vuejs'
import globalroutines from '../globalroutines/index'
import { useCalendarStore } from '@store/CalendarStore'
import urlBase64ToUint8Array from '@src/js/utility'
import translate from '@src/globalroutines/util'
import { useTodoStore } from '@store/Todos'
import { useMessageStore } from './MessageStore'


const stateConnDefault = 'online'

async function getConfig(id: any) {
  return globalroutines('read', 'config', null, id)
}

async function getstateConnSaved() {
  const config = await getConfig(costanti.CONFIG_ID_CFG)
  // console.log('config', config)
  if (config) {
    if (config.length > 1) {
      const cfgstateconn = config[1]
      return cfgstateconn.stateconn
    } else {
      return 'online'
    }
  } else {
    return 'offline'
  }
}

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
    leftDrawerOpen: false,
    rightDrawerOpen: false,
    rightCartOpen: false,
    stateConnection: stateConnDefault,
    serverError: false,
    serverMsgError: {},
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
    levels: [],
    adtypes: [],
    adtypegoods: [],
    skills: [],
    goods: [],
    // subSkills: [],
    statusSkills: [],
    sectors: [],
    sectorgoods: [],
    catgrps: [],
    provinces: [],
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

    getPage: (state: IGlobalState) => (path: string): IMyPage | undefined => state.mypage.find((page) => (`/${page.path}`) === path),

    getmenu: (state: IGlobalState): any => {
      // console.log('getmenu', cfgrouter.getmenu())

      const mystate = state

      mystate.menulinks = {
        Dashboard: {
          routes: cfgrouter.getmenu(),
          show: true,
        },
      }

      return mystate.menulinks

      //return cfgrouter.getmenu()
    },

    getRespByUsername: (state: IGlobalState) => (username: string) => {
      const rec = state.resps.find((recin: any) => recin.username === username)
      return !!rec ? rec.name + ' ' + rec.surname : ''
    },

    getListByTable: (state: IGlobalState) => (table: string): any => {
      let ris: any = []

      const calendarStore = useCalendarStore()
      const userStore = useUserStore()
      const messageStore = useMessageStore()

      if (table === costanti.TABEVENTS)
        return calendarStore.eventlist
      else if (table === 'operators')
        return calendarStore.operators
      else if (table === 'internalpages')
        return calendarStore.internalpages
      else if (table === 'wheres')
        return calendarStore.wheres
      else if (table === 'contribtypes')
        return calendarStore.contribtype
      else if (table === 'disciplines') ris = state.disciplines
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
      else if (table === 'bookings')
        return calendarStore.bookedevent
      else if (table === 'users')
        return userStore.usersList
      else if (table === 'friends')
        return userStore.my.profile.friends
      else if (table === 'friendsandme')
        return [{ username: userStore.my.username }, ...userStore.my.profile.friends]
      else if (table === 'mygroups')
        return userStore.groups
      else if (table === 'sendmsgs')
        return messageStore.last_msgs
      else if (table === 'settings')
        return state.settings
      else if (table === 'levels')
        return state.levels
      else if (table === 'adtypes')
        return state.adtypes
      else if (table === 'adtypegoods')
        return state.adtypegoods
      else if (table === 'skills')
        return state.skills
      else if (table === 'goods')
        return state.goods
        // else if (table === 'subskills')
      //   return state.subSkills
      else if (table === 'statusSkills')
        return state.statusSkills
      else if (table === toolsext.TABSECTORS)
        return state.sectors
      else if (table === 'sectorgoods')
        return state.sectorgoods
      else if (table === 'catgrps')
        return state.catgrps
      else if (table === 'provinces')
        return state.provinces
      else {
        return ris
      }

      return ris
    },

    getrecSettingsByKey: (state: IGlobalState) => (key: any, serv: any): ISettings | undefined => {
      if (serv) return state.serv_settings.find((rec) => rec.key === key)
      const ris = state.settings.find((rec) => rec.key === key)
      // console.log('getrecSettingsByKey=', ris)
      return ris
    },

    getCmdClick: (state: IGlobalState): string => (state.clickcmd ? state.clickcmd : ''),

    gettemplemailbyId: (mystate: IGlobalState) => (templid: string): string => {
      const myrec = mystate.templemail.find((rec) => rec._id === templid)
      return (!!myrec) ? myrec.subject! : ''
    },

  },

  actions: {
    setValueSettingsByKey({ key, value, serv }: {key: string, value: any, serv: boolean}): any {
      // Update the Server

      // Update in Memory
      let myrec = null
      if (serv) myrec = this.serv_settings.find((rec: any) => rec.key === key)
      else myrec = this.settings.find((rec: any) => rec.key === key)

      if (myrec) {
        if ((myrec.type === costanti.FieldType.date) || (myrec.type === costanti.FieldType.onlydate)) myrec.value_date = value
        else if ((myrec.type === costanti.FieldType.number) || (myrec.type === costanti.FieldType.hours)) myrec.value_num = value
        else if (myrec.type === costanti.FieldType.boolean) myrec.value_bool = value
        else myrec.value_str = value

        // console.log('setValueSettingsByKey value', value, 'myrec', myrec)
      }
    },

    getValueSettingsByKey(key: any, serv: any): any | undefined {
      const myrec = this.getrecSettingsByKey(key, serv)
      // console.log('getValueSettingsByKey', myrec, 'key=', key, 'srv=', serv)
      if (myrec) {
        if ((myrec.type === costanti.FieldType.date) || (myrec.type === costanti.FieldType.onlydate)) return myrec.value_date
        if ((myrec.type === costanti.FieldType.number) || (myrec.type === costanti.FieldType.hours)) return myrec.value_num
        if (myrec.type === costanti.FieldType.boolean) return myrec.value_bool
        else if (myrec.type === costanti.FieldType.crypted)
          return '***********'
        else if (myrec.value_str === undefined) {
          return ''
        } else {
          return myrec.value_str
        }
      }
      return ''
    },

    changeCmdClick(value: string) {
      console.log('changeCmdClick', value)
      this.clickcmd = value
    },

    isOnline(): boolean {
      return this.stateConnection === 'online'
    },

    addDynamicPages($router: Router | null) {
      // console.log('addDynamicPages')
      const arrpagesroute: IListRoutes[] = []

      for (const page of this.mypage) {
        if (page.active) {
          // console.log('page', page.lang)
          if (this.isMyLang(page)) {
            // console.log('page', page.title, 'OK')
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
        path: '/:catchAll(.*)*',
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

      // console.log('static_data.routes', static_data.routes)

      // console.log('$router', $router)

      if ($router) {
        if (tools.sito_online(false)) {
          arrpagesroute.forEach(function (route: any) {
            $router.addRoute(route)
          })

          $router.addRoute(last)
        } else {
          $router.addRoute(sito_offline)
          $router.addRoute(last)
          $router.replace('/sito_offline')
        }

        const mypathsel = $router.currentRoute.value.fullPath
        if (mypathsel !== '/') {
          // console.log('mypathsel', mypathsel)

          const trovato = this.mypage.filter((rec: IMyPage) => (rec.path === mypathsel) && (rec.active))

          //if ($router.currentRoute.value.fullPath in ) {
          if (trovato) {
            $router.replace(mypathsel)
          }
        }

      }
    },

    setPaoArray_Delete(state: IGlobalState) {
      state.testp1.mioarray.pop()
    },

    setConta(num: number) {
      this.conta = num
    },

    setleftDrawerOpen(bool: boolean) {
      this.leftDrawerOpen = bool
      tools.localStSetItem(toolsext.localStorage.leftDrawerOpen, bool.toString())
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
      return globalroutines('write', 'config', { _id: data._id, value: data.value })
    },

    SetwasAlreadySubOnDb(subscrib: boolean) {
      this.wasAlreadySubOnDb = subscrib
    },

    setShowType(showtype: number) {
      const todos = useTodoStore()
      console.log('setShowType', showtype)
      const config = this.getConfigbyId(costanti.CONFIG_ID_SHOW_TYPE_TODOS)
      console.log('config', config)
      if (config) {
        config.value = String(showtype)
        todos.showtype = parseInt(config.value, 10)
      } else {
        todos.showtype = showtype
      }
      console.log('Todos.state.showtype', todos.showtype)
      this.saveConfig({ _id: costanti.CONFIG_ID_SHOW_TYPE_TODOS, value: String(showtype) })

    },

    UpdateValuesInMemory(mydata: IDataToSet): void {
      const { id } = mydata
      const { table } = mydata

      try {
        const mylist = this.getListByTable(table!)
        const mykey = fieldsTable.getKeyByTable(table!)

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

    UpdateValuesInMemoryByTable(mydata: any, table: string): void {

      try {
        const mylist = this.getListByTable(table)
        const mykey = fieldsTable.getKeyByTable(table)
        const id = mydata[mykey]

        console.log('mylist', mylist)
        console.log('mykey', mykey)
        console.log('id', id)

        if (mylist) {
          const myrec = mylist.find((event: any) => event[mykey] === id)
          // console.log('myrec', myrec)
          if (myrec) {
            // console.log('key', value, myrec[key])
            for (const [key, value] of Object.entries(mydata)) {
              myrec[key] = value
            }
          }

          console.log('update: ', myrec)
        }
      } catch (e) {
        console.error(e)
      }
    },

    newValueInMemoryByTable(mydata: any, table: string): void {

      try {
        const mylist = this.getListByTable(table)

        if (mylist) {
          mylist.push(mydata)

        }
      } catch (e) {
        console.error(e)
      }
    },

    async createPushSubscription() {

      // If Already subscribed, don't send to the Server DB
      // if (state.wasAlreadySubOnDb) {
      //   // console.log('wasAlreadySubOnDb!')
      //   return
      // }

      if (!static_data.functionality.PWA)
        return

      if (!('serviceWorker' in navigator)) {
        return
      }

      if (!('PushManager' in window)) {
        return
      }

      console.log('createPushSubscription')

      let reg: any
      const mykey = process.env.PUBLICKEY_PUSH
      return navigator.serviceWorker.ready
        .then((swreg) => {
          reg = swreg
          return swreg.pushManager.getSubscription()
        })
        .then((subscription) => {
          console.log('!!!!!!!!  subscription = ', subscription)

          this.wasAlreadySubscribed = !(subscription === null)

          if (this.wasAlreadySubscribed) {
            // console.log('User is already SAVED Subscribe on DB!')
            // return null
            return subscription
          } else {
            // Create a new subscription
            console.log('Create a new subscription')
            const convertedVapidPublicKey = urlBase64ToUint8Array(mykey)
            return reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: convertedVapidPublicKey,
            })
          }
        })
        .then((newSub) => {
          this.saveNewSubscriptionToServer(newSub)
        })
        .catch((err) => {
          console.log('ERR createPushSubscription:', err)
        })
    },

    // Calling the Server to Save in the MongoDB the Subscriber
    saveNewSubscriptionToServer(newSub: any) {
      console.log('saveNewSubscriptionToServer')

      const userStore = useUserStore()


      if (!newSub) {
        return
      }

      if (userStore.isUserInvalid) {
        return
      }

      // console.log('saveSubscriptionToServer: ', newSub)
      // console.log('context', context)

      let options = null
      let notreg = false

      if (userStore.isTokenInvalid) {
        notreg = true
      }

      // If is not already stored in DB, then show the message to the user.
      if (!this.wasAlreadySubscribed || notreg) {
        options = {
          title: tools.translate('notification.title_subscribed', [{
            strin: 'sitename',
            strout: translate('ws.sitename'),
          }]),
          content: translate('notification.subscribed'),
          openUrl: '/',
        }
      }

      const myres = {
        options,
        subs: newSub,
        others: {
          userId: userStore.my._id,
          access: userStore.my.tokens![0].access,
        },
      }

      return Api.SendReq('/subscribe', 'POST', myres)
        .then((res) => {
          this.wasAlreadySubscribed = true
          this.wasAlreadySubOnDb = true

          if (res)
            console.log('saveNewSubscriptionToServer: OK')

          tools.localStSetItem(toolsext.localStorage.wasAlreadySubOnDb, String(this.wasAlreadySubOnDb))
        })
        .catch((e) => {
          console.log('Error during Subscription!', e)
        })
    },

    async deleteSubscriptionToServer() {
      console.log('DeleteSubscriptionToServer: ')

      return Api.SendReq('/subscribe/del', 'DELETE', null)
    },

    async clearDataAfterLogout() {
      // console.log('clearDataAfterLogout')

      for (const table of ApiTables.allTables()) {
        await globalroutines('clearalldata', table, null)
      }

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

    clearDataAfterLoginOnlyIfActiveConnection() {
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

      await globalroutines('readall', 'config', null)

      return isok
    },

    async saveCfgServerKey(dataval: ICfgServer) {
      console.log('saveCfgServerKey dataval', dataval)

      const ris = await Api.SendReq('/admin/updateval', 'POST', { pairval: dataval })
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

    async sendPushNotif({ params }: {params: any}) {

      return Api.SendReq('/push/send', 'POST', { params })
        .then((res) => {
          // console.table(res)
          return res.data
        })
        .catch((error) => {
          console.log('error sendPushNotif', error)
          return null
        })
    },

    async loadTable(params: IParamsQuery) {
      // console.log('loadTable', params)
      const userStore = useUserStore()

      return Api.SendReq('/gettable', 'POST', params)
        .then((res) => {
          this.serverError = false
          // console.table(res)
          return res.data
        })
        .catch((error) => {
          this.serverError = true
          this.serverMsgError = error
          console.log('error loadTable', error)
          userStore.setErrorCatch(error)
          return null
        })
    },

    loadPickup(params: IParamsPickup) {
      console.log('loadPickup', params)
      const userStore = useUserStore()

      return Api.SendReq('/pickup', 'POST', params)
        .then((res) => {
          // console.table(res)
          return res.data
        })
        .catch((error) => {
          console.log('error loadPickup', error)
          userStore.setErrorCatch(error)
          return null
        })
    },

    async caricaTabella(table: string, extrapar: string) {

      let myarr = []
      const sortBy = 'descr'
      const descending = 1
      const myobj: any = {}
      if (descending)
        myobj[sortBy] = -1
      else
        myobj[sortBy] = 1

      const params: IParamsQuery = {
        table: '',
        startRow: 0,
        endRow: 10000,
        filter: '',
        filterand: '',
        filtersearch: '',
        filtersearch2: '',
        filtercustom: '',
        sortBy: myobj,
        descending,
        userId: '',
        extrapar
      }

      params.table = table
      return this.loadTable(params).then((data) => {
        return data
      }).catch((e) => {
        return []
      })
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

    async loadPageTest() {

      console.log('loadPageTest')

      let obj = { test: 'OK! Versione Client: ' + tools.getvers() }

      return Api.SendReq('/testServer', 'POST', obj)
        .then((res) => {
          return res
        })
        .catch((error) => {
          return error
        })
    },

    async saveTable(mydata: any) {
      // console.log('saveTable', mydata)
      const userStore = useUserStore()

      return Api.SendReq('/settable', 'POST', mydata)
        .then((res) => {
          this.serverError = false
          return res.data
        })
        .catch((error) => {
          this.serverError = true
          this.serverMsgError = error
          console.log('error saveTable', error)
          userStore.setErrorCatch(error)
          return null
        })
    },

    isErroreDispositivoServer() {
      return this.serverMsgError.code === -2
    },

    async saveSubRec(mydata: any) {
      // console.log('saveTable', mydata)
      const userStore = useUserStore()

      return Api.SendReq('/setsubrec', 'POST', mydata)
        .then((res) => res.data)
        .catch((error) => {
          console.log('error saveSubRec', error)
          userStore.setErrorCatch(error)
          return null
        })
    },

    async saveNewRecord(mytable: string, myrec: any) {
      const userStore = useUserStore()
      console.log('saveNewRecord', mytable, myrec)

      const mydata: any = {
        table: mytable,
        data: myrec
      }

      mydata.data.userId = userStore.my._id

      const ris = await this.saveTable(mydata)

      if (ris) {
        this.newValueInMemoryByTable(ris, mytable)
      }

      console.log('saveNewRecord', ris)
      return ris
    },

    async saveFieldValue(mydata: IDataToSet) {
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

    async callFunz({ mydata }: {mydata: any}) {
      // console.log('saveFieldValue', mydata)

      return Api.SendReq('/callfunz', 'PATCH', { data: mydata })
        .then((res) => {
          if (res) {
            return (res.data.code === serv_constants.RIS_CODE_OK)
          } else
            return false
        })
        .catch((error) => {
          return false
        })
    },

    async askFunz({ mydata }: {mydata: any}) {
      // console.log('saveFieldValue', mydata)

      return Api.SendReq('/askfunz', 'PATCH', { data: mydata })
        .then((ris) => {
          return ris.data.out
        })
        .catch((error) => {
          return null
        })
    },

    async DeleteRec({ table, id }: {table: string, id: string}) {
      console.log('DeleteRec', table, id)

      return Api.SendReq('/delrec/' + table + '/' + id, 'DELETE', null)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === serv_constants.RIS_CODE_OK) {
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

    async DeleteFile({ filename }: {filename: string}) {
      console.log('DeleteFile', filename)

      return Api.SendReq(`/delfile/${tools.getvers()}/`, 'DELETE', { filename })
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === serv_constants.RIS_CODE_OK) {
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

    async DuplicateRec({ table, id }: {table: string, id: string}) {
      console.log('DuplicateRec', id)

      return Api.SendReq('/duprec/' + table + '/' + id, 'POST', null)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === serv_constants.RIS_CODE_OK) {
              return res.data.record
            }
          }
          return null
        })
        .catch((error) => {
          console.error(error)
          return null
        })
    },

    async InviaMsgADonatori({ msgobj, navemediatore, tipomsg }: {msgobj: any, navemediatore: any, tipomsg: any}) {
      console.log('InviaMsgADonatori', msgobj)

      const mydata = {
        idapp: process.env.APP_ID,
        msgextra: msgobj.msgextra,
        msgpar1: msgobj.msgpar1,
        username: msgobj.username,
        username_mitt: msgobj.username_mitt,
        tipomsg,
        inviareale: msgobj.inviareale,
        navemediatore,
      }

      return Api.SendReq('/dashboard/msgnave', 'POST', mydata)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === serv_constants.RIS_CODE_OK) {
              return res.data.ris
            }
          }
          return null
        })
        .catch((error) => {
          console.error(error)
          return null
        })
    },

    async InviaMsgAFlotta({ flotta, inviareale, inviaemail, tipomsg }: {flotta: any, inviareale: boolean, inviaemail: boolean, tipomsg: any}) {
      console.log('InviaMsgAFlotta')

      const mydata = {
        idapp: process.env.APP_ID,
        tipomsg,
        flotta,
        inviareale,
        inviaemail,
      }

      return Api.SendReq('/dashboard/msgflotta', 'POST', mydata)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === serv_constants.RIS_CODE_OK) {
              return res.data.ris
            }
          }
          return null
        })
        .catch((error) => {
          console.error(error)
          return null
        })
    },

    async GetArrNavi() {
      console.log('GetArrNavi')

      const mydata = {
        idapp: process.env.APP_ID,
      }

      return Api.SendReq('/dashboard/getnavi', 'POST', mydata)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === serv_constants.RIS_CODE_OK) {
              return res.data.ris
            }
          }
          return null
        })
        .catch((error) => {
          console.error(error)
          return null
        })
    },

    async GetMsgTemplates() {
      console.log('GetMsgTemplates')

      const mydata = {
        idapp: process.env.APP_ID,
      }

      return Api.SendReq('/dashboard/getmsg_templates', 'POST', mydata)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === serv_constants.RIS_CODE_OK) {
              return res.data.ris
            }
          }
          return null
        })
        .catch((error) => {
          console.error(error)
          return null
        })
    },

    async GetNave({ riga, col, riga1don, col1don, ind_order }: {riga: any, col: any, riga1don: any, col1don: any, ind_order: number}) {
      // console.log('GetNave')

      const mydata = {
        idapp: process.env.APP_ID,
        riga,
        col,
        riga1don,
        col1don,
        ind_order,
      }

      return Api.SendReq('/dashboard/getnave', 'POST', mydata)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === serv_constants.RIS_CODE_OK) {
              return res.data.ris
            }
          }
          return null
        })
        .catch((error) => {
          console.error(error)
          return null
        })
    },

    async GetData({ data }: {data: any}) {
      console.log('GetData')

      const mydata = {
        idapp: process.env.APP_ID,
        data,
      }

      return Api.SendReq('/dashboard/getdata', 'POST', mydata)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === serv_constants.RIS_CODE_OK) {
              return res.data.ris
            }
          }
          return null
        })
        .catch((error) => {
          console.error(error)
          return null
        })
    },

    async GetArrDoniNavi({ ricalcola, showall }: {ricalcola: boolean, showall: boolean}) {
      console.log('GetArrDoniNavi')

      const mydata = {
        idapp: process.env.APP_ID,
        ricalcola,
        showall,
      }

      return Api.SendReq('/dashboard/getdoninavi', 'POST', mydata)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === serv_constants.RIS_CODE_OK) {
              return res.data.ris
            }
          }
          return null
        })
        .catch((error) => {
          console.error(error)
          return null
        })
    },

    async GetFlotte({ ricalcola, showall }: {ricalcola: boolean, showall: boolean}) {
      console.log('GetFlotte')

      const mydata = {
        idapp: process.env.APP_ID,
        ricalcola,
        showall,
      }

      return Api.SendReq('/dashboard/getflotte', 'POST', mydata)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === serv_constants.RIS_CODE_OK) {
              return res.data.arrflotte
            }
          }
          return null
        })
        .catch((error) => {
          console.error(error)
          return null
        })
    },

    async GetFlotta({ riga, col_prima, col_ultima }: {riga: any, col_prima: any, col_ultima: any}) {
      console.log('GetFlotta')

      const mydata = {
        idapp: process.env.APP_ID,
        riga,
        col_prima,
        col_ultima,
      }

      return Api.SendReq('/dashboard/getflotta', 'POST', mydata)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === serv_constants.RIS_CODE_OK) {
              return res.data
            }
          }
          return null
        })
        .catch((error) => {
          console.error(error)
          return null
        })
    },

    async loadSite() {
      const userStore = useUserStore()
      const calendarStore = useCalendarStore()
      // console.log('calendarStore: loadAfterLogin')
      // Load local data
      const showall = userStore.isAdmin || userStore.isManager ? '1' : '0'

      const myuserid = (userStore.my._id) ? userStore.my._id : '0'

      // calendarStore.editable = false

      return Api.SendReq(`/loadsite/${myuserid}/${process.env.APP_ID}/${process.env.APP_VERSION}`, 'GET', null)
        .then((res) => {
          console.log('____________________________  res', res)
          this.serverError = false
          if (res.status === 200) {

            calendarStore.bookedevent = (res.data.bookedevent) ? res.data.bookedevent : []
            calendarStore.eventlist = (res.data.eventlist) ? res.data.eventlist : []
            calendarStore.operators = (res.data.operators) ? res.data.operators : []
            calendarStore.internalpages = (res.data.internalpages) ? res.data.internalpages : []
            calendarStore.wheres = (res.data.wheres) ? res.data.wheres : []
            calendarStore.contribtype = (res.data.contribtype) ? res.data.contribtype : []

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
            this.departments = (res.data.departments) ? [...res.data.departments] : []
            this.levels = (res.data.levels) ? [...res.data.levels] : []
            this.skills = (res.data.skills) ? [...res.data.skills] : []
            this.goods = (res.data.goods) ? [...res.data.goods] : []
            // this.subSkills = (res.data.subSkills) ? [...res.data.subSkills] : []
            this.statusSkills = (res.data.statusSkills) ? [...res.data.statusSkills] : []
            this.sectors = (res.data.sectors) ? [...res.data.sectors] : []
            this.sectorgoods = (res.data.sectorgoods) ? [...res.data.sectorgoods] : []
            this.provinces = (res.data.provinces) ? [...res.data.provinces] : []
            this.catgrps = (res.data.catgrps) ? [...res.data.catgrps] : []
            this.adtypes = (res.data.adtypes) ? [...res.data.adtypes] : []
            this.adtypegoods = (res.data.adtypegoods) ? [...res.data.adtypegoods] : []

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

            let isLogged = false

            // console.log('res.data.myuser', res.data.myuser)
            if (res.data.myuser) {
              userStore.authUser(res.data.myuser)

              userStore.updateLocalStorage(res.data.myuser)

              isLogged = !!res.data.myuser.username
            } else {
              // User not exist !!

            }

            // const isLogged = localStorage.getItem(toolsext.localStorage.username)
            console.log('isLogged', isLogged)

            // calendarStore.editable = userStore.isAdmin || userStore.isManager || userStore.isTutor
            if (res.data.myuser === null) {
              if (isLogged) {
                // Fai Logout
                console.log('Fai Logout', 'isLogged', isLogged)
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
          this.serverError = true
          this.serverMsgError = error
          return new Types.AxiosError(serv_constants.RIS_CODE_ERR, null, toolsext.ERR_GENERICO, error)
        })
    },

    async sendEmailTest({ previewonly }: {previewonly: any}) {
      const usertosend = {
        locale: tools.getLocale(),
        previewonly
      }
      console.log(usertosend)

      return Api.SendReq('/news/testemail', 'POST', usertosend)
        .then((res) => {
          return res
        })
    },


    getArrStrByValueBinary(col: IColGridTable, val: any) {
      const arr = this.getArrByValueBinary(null, col, val)
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

    getRecordByTableSingle(table: string, val: any) {
      if (table) {
        const mylist = this.getTableJoinByName(table)
        const key = fieldsTable.getKeyByTable(table)

        return mylist.find((myrec: any) => myrec[key] === val)
      }
    },

    getValueByTableSingle(table: string, val: any) {
      if (table) {
        const mylist = this.getTableJoinByName(table)
        const key = fieldsTable.getKeyByTable(table)
        const collab = fieldsTable.getLabelByTable(table)

        // console.table(mylist)
        let risultato = ''

        if (tools.isObject(collab)) {
          risultato = mylist.filter((myrec: any) => myrec.username === val).map(collab)
        } else {
          const myris = mylist.find((myrec: any) => myrec[key] === val)
          if (myris)
            risultato = myris[collab]
        }

        if (key === 'username') {
          // console.log('key=', key, 'collab', collab, 'val', val)
          // console.log('myris', risultato)
        }

        return risultato
      }
      return ''
    },


    getValueByTable(col: IColGridTable, val: any) {
      return this.getValueByTableSingle(col.jointable!, val)
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

    async getStatSite() {

      const userStore = useUserStore()

      const paramquery = {
        locale: tools.getLocale(),
        username: userStore.my.username
      }

      return Api.SendReq('/site/load', 'POST', paramquery)
        .then((res) => {
          // console.log('datastat', res)
          this.datastat = res.data.datastat
          return this.datastat
        }).catch((error) => {
          return {}
        })

    },

    getItemDate(num: number, day: number, numdays: number, mystr: string) {
      let mydate = tools.addDays(tools.getDateNow(), day)
      let mydateend = tools.addDays(mydate, numdays)
      mydate = tools.getstrYYMMDDDate(mydate)
      mydateend = tools.getstrYYMMDDDate(mydateend)
      let filter = { dateTimeStart: { $gte: mydate, $lte: mydateend } }
      let obj = { _id: num, datestr: mystr, filter }

      return obj
    },

    getArrDateEvent() {
      const arr = []

      let obj = {}

      arr.push(this.getItemDate(1, -30, 30,  'Eventi Passati'))
      arr.push(this.getItemDate(2, 0, 14, 'Da Oggi a 2 sett.'))
      arr.push(this.getItemDate(3, 14, 60, 'Eventi Futuri'))

      // console.log('Days', arr)

      return arr
    },

    getArrAllDateEvent() {
      const arr = []

      let obj = {}

      for (let i = 0; i < 120; i++) {
        let mydate = tools.addDays(tools.getDateNow(), i - 30)
        obj = { _id: mydate, datestr: tools.getstrVeryShortDate(mydate) }
        arr.push(obj)
      }

      // console.log('Days', arr)

      return arr
    },

    getTableJoinByName(table: string, addall?: boolean, addnone?: boolean, filter?: any) {

      let myarr: any = []
      if (table === 'permissions') myarr = [shared_consts.Permissions.Admin, shared_consts.Permissions.Manager, shared_consts.Permissions.Teacher, shared_consts.Permissions.Tutor, shared_consts.Permissions.Editor, shared_consts.Permissions.Zoomeri, shared_consts.Permissions.Department]
      else if (table === 'accepted') myarr = [shared_consts.Accepted.CHECK_READ_GUIDELINES, shared_consts.Accepted.CHECK_SEE_VIDEO_PRINCIPI]
      else if (table === 'fieldstype') myarr = costanti.FieldTypeArr
      else if (table === 'metodo_pagamento') myarr = tools.SelectMetodiPagamento
      else if (table === 'confsite_opt') myarr = tools.ConfSiteOpt
      else if (table === 'bottype') myarr = shared_consts.BotType
      else if (table === 'visibility') myarr = shared_consts.Visibility
      else if (table === 'visibilGroup') myarr = shared_consts.VisibilGroup
      else if (table === 'lang') myarr = shared_consts.Lang
      else if (table === 'regions') myarr = shared_consts.Regions
      else if (table === 'shippings') myarr = shared_consts.Shippings
      else if (table === 'otherfilters') myarr = shared_consts.OtherFilters
      else if (table === toolsext.TABCALDATE) myarr = this.getArrDateEvent()
      else if (table === toolsext.TABCALALLDATE) myarr = this.getArrAllDateEvent()
      else myarr = this.getListByTable(table)

      if (costanti.TABLES_ARRAY.includes(table)) {
        const newarr = []
        for (const value of myarr) {
          newarr.push({ value, label: value })
        }

        myarr = newarr
      }

      if (addall)
        myarr = [costanti.FILTER_TUTTI, ...myarr]


      if (addnone) {
        const mykey = fieldsTable.getKeyByTable(table)
        const collab = fieldsTable.getLabelByTable(table)
        let obj: any = {}
        obj[mykey] = costanti.FILTER_NESSUNO
        obj[collab] = '[Nessuno]'
        obj['idSector'] = []

        myarr = [obj, ...myarr]

      }

      if (filter) {
        // console.log('table', table, 'filter', filter, 'arrprima', myarr)
        myarr = myarr.filter(filter)
        // console.log('myarr', myarr)
      }

      return myarr
    },

    getMsgServerError() {
      if (this.serverError) {
        if (this.serverMsgError) {
          if (this.serverMsgError.status === 500) {
            return 'Errore Interno del Server'
          } else if (this.serverMsgError.msgerr === '') {
            return 'Codice Errore ' + this.serverMsgError.status
          }
          try {
            return this.serverMsgError.msgerr.message
          } catch (e) {
            return this.serverMsgError.msgerr
          }
        }
      }

      return ''
    },

    getServerHost() {

      if (this.serverHost) {
        return this.serverHost
      } else {
        return process.env.MONGODB_HOST
      }

    },


  },
})
