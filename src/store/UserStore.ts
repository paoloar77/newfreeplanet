import { defineStore } from 'pinia'

import {
  IFriends, IMsgGlobParam,
  ISigninOptions,
  ISignupOptions, IUserFields, IUserProfile, IUserState,
} from '@src/model'
import { tools } from '@store/Modules/tools'
import translate from '@src/globalroutines/util'
import { ICallResult, ILinkReg, IResult, IToken } from '@model/other'

import * as Types from '@src/store/Api/ApiTypes'
import { useGlobalStore } from '@store/globalStore'
import { serv_constants } from '@store/Modules/serv_constants'
import { Api } from '@api'
import { toolsext } from '@store/Modules/toolsext'
import { static_data } from '@src/db/static_data'


import bcrypt from 'bcryptjs'
import { useTodoStore } from '@store/Todos'
import { Router } from 'vue-router'
import { useProjectStore } from '@store/Projects'
import { shared_consts } from '@/common/shared_vuejs'
import { costanti } from '@costanti'
import { IMyGroup } from '@model/UserStore'

export const DefaultUser: IUserFields = {
  _id: '',
  email: '',
  username: '',
  name: '',
  surname: '',
  password: '',
  tokens: [],
  verified_email: false,
  verified_by_aportador: false,
  aportador_solidario: '',
  made_gift: false,
  profile: {
    img: '',
    teleg_id: 0,
    saw_zoom_presentation: false,
    ask_zoom_partecipato: false,
    saw_and_accepted: false,
    qualified: false,
    qualified_2invitati: false,
    socio: false,
    socioresidente: false,
    myshares: [],
    friends: [],
    req_friends: [],
    mygroups: [],
    manage_mygroups: [],
    asked_friends: [],
    asked_groups: [],
  },
  cart: {
    userId: '',
    items: [],
    totalPrice: 0,
    department: '',
    totalQty: 0,
    note: '',
  },
}

export const DefaultProfile: IUserProfile = {
  img: '',
  nationality: '',
  intcode_cell: '',
  cell: process.env.TEST_CELL || '',
  dateofbirth: null,
  sex: 0,
  country_pay: '',
  email_paypal: '',
  payeer_id: '',
  advcash_id: '',
  revolut: '',
  link_payment: '',
  note_payment: '',
  username_telegram: '',
  teleg_id: 0,
  teleg_checkcode: 0,
  my_dream: '',
  manage_telegram: false,
  saw_zoom_presentation: false,
  ask_zoom_partecipato: false,
  saw_and_accepted: false,
  socio: false,
  socioresidente: false,
  paymenttypes: [],
  qualified: false,
  qualified_2invitati: false,
  myshares: [],
  friends: [],
  req_friends: [],
  mygroups: [],
  manage_mygroups: [],
  asked_friends: [],
  asked_groups: [],
}

export const useUserStore = defineStore('UserStore', {
  state: () => ({
    my: { ...DefaultUser },
    groups: [],
    lang: process.env.LANG_DEFAULT ? process.env.LANG_DEFAULT : 'it',
    repeatPassword: '',
    categorySel: 'personal',
    servercode: 0,
    resStatus: 0,
    x_auth_token: '',
    isLogged: false,
    isAdmin: false,
    isManager: false,
    isDepartment: false,
    isTutor: false,
    isZoomeri: false,
    isTratuttrici: false,
    isEditor: false,
    isTeacher: false,
    usersList: [],
    countusers: 0,
    lastparamquery: {},
  }),

  getters: {

    isServerError(): boolean {
      return (this.servercode === toolsext.ERR_SERVERFETCH)
    },

    getServerCode: (state: IUserState): number => (state.servercode ? state.servercode : 0),
    getMsg: (state: IUserState): string => (state.msg ? state.msg : ''),

    getUsersList: (mystate: IUserState) => {
      return mystate.usersList
    },

    IsMyFriend: (mystate: IUserState) => (userIdOwner: string): boolean => {
      // ++TODO Check if userIdOwner is my friend
      // userIdOwner is my friend ?
      return true
    },


    IsMyGroup: (mystate: IUserState) => (userIdOwner: string): boolean => {
      // ++TODO Check if userIdOwner is on my groups
      // userIdOwner is on my groups ?
      return true
    },


    isTokenInvalid: (state: IUserState) => {
      try {
        return (state.my.tokens!.length <= 0)
      } catch (e) {
        return true
      }
    },

    isUserInvalid: (state: IUserState): boolean => {
      try {
        return (state.my._id === undefined) || (state.my._id.trim() === '')
      } catch (e) {
        return true
      }
    },

  },

  actions: {
    IsMyFriendByUsername(username: string): boolean {
      if (this.my.profile.friends)
        return this.my.profile.friends.findIndex((rec) => rec.username === username) >= 0
      else
        return false
    },

    IsMyGroupByGroupname(groupname: string): boolean {
      if (this.my.profile.mygroups)
        return this.my.profile.mygroups.findIndex((rec) => rec.groupname === groupname) >= 0
      else
        return false
    },

    IsAskedFriendByUsername(username: string): boolean {
      if (this.my.profile.asked_friends)
        return this.my.profile.asked_friends.findIndex((rec) => rec.username === username) >= 0
      else
        return false
    },

    IsReqFriendByUsername(username: string): boolean {
      if (this.my.profile.req_friends)
        return this.my.profile.req_friends.findIndex((rec) => rec.username === username) >= 0
      else
        return false
    },

    IsAskedGroupByGroupname(groupname: string): boolean {
      if (this.my.profile.asked_groups)
        return this.my.profile.asked_groups.findIndex((rec: IMyGroup) => rec.groupname === groupname) >= 0
      else
        return false
    },

    getUserByUsername(username: string): IUserFields | null {
      // Check if is this User!
      if (this.my.username === username) return this.my

      let trovato = null
      if (this.usersList) trovato = this.usersList.find((item: any) => item.username === username)

      return (trovato) || null
    },


    getImgByUsername(username: string): string {
      if (username === '') return ''
      // Check if is this User!
      const myrec = this.getUserByUsername(username)
      // console.log('myrec', myrec)
      if (myrec && myrec.profile && !!myrec.profile.img && myrec.profile.img !== '' && myrec.profile.img !== 'undefined') {
        return costanti.DIR_UPLOAD + 'profile/' + this.my.username + '/' + myrec.profile.img
      }
      return ''
    },

    getImgUserByUsername(username: string): string {
      let img = this.getImgByUsername(username)
      return img ? img : 'images/noimg-user.svg'
    },

    getImgByProfile(userparam: IUserFields, reale: any = false): string {
      try {
        if (userparam.profile && userparam.profile.img) {
          return costanti.DIR_UPLOAD + 'profile/' + userparam.username + '/' + userparam.profile.img
        }
      } catch (e) {
      }
      if (!reale)
        return 'images/noimg.png'
      else
        return ''
    },

    getImgByGroup(group: IMyGroup): string {

      try {
        //++Todo: Sistemare!
        return costanti.DIR_UPLOAD + 'mygroups/' + group.groupname + '/' + group.photos[0].imagefile
      } catch (e) {
      }
      return 'images/noimg.png'
    },

    getRefLink(username: string): string {
      if (username === '')
        username = this.my.username
      return tools.getUrlSite() + '/signup/' + username
    },

    isUserOk(): boolean {
      return this.my.profile.teleg_id! > 0 && this.my.verified_by_aportador! && this.isUsernameTelegOk()
      // return this.my.verified_email! && this.my.profile.teleg_id! > 0 && this.my.verified_by_aportador!
    },

    isTelegOk(): boolean {
      return this.my.profile.teleg_id! > 0
      // return this.my.verified_email! && this.my.profile.teleg_id! > 0 && this.my.verified_by_aportador!
    },

    isUsernameTelegOk(): boolean {
      return !!this.my.profile.username_telegram
      // return this.my.verified_email! && this.my.profile.teleg_id! > 0 && this.my.verified_by_aportador!
    },

    getNameSurnameByUserId(userId: string): string {

      const user = this.getUserByUserId(userId)
      if (user) return `${user.name} ${user.surname}`
      return `(${userId})`
    },

    getNameSurnameByUsername(username: string): string {
      const user = this.getUserByUsername(username)
      if (user) return `${user.name} ${user.surname}`
      return `(${username})`
    },

    getUserByUserId(userId: string): IUserFields | null {
      // Check if is this User!
      if (this.my._id === userId) return this.my

      let trovato = null

      if (this.usersList) trovato = this.usersList.find((item: any) => item._id === userId)

      return (trovato) || null
    },

    getMsgError(err: number): string {
      let msgerrore = ''
      if (err !== tools.OK) {
        msgerrore = `Error [${this.servercode}]: `
        if (this.servercode === toolsext.ERR_SERVERFETCH) {
          msgerrore = translate('fetch.errore_server')
        } else {
          msgerrore = translate('fetch.errore_generico')
        }

        if (process.env.DEV) {
          console.log('ERROREEEEEEEEE: ', msgerrore, ' (', err, ')')
        }
      }

      // return { code: this.servercode, msg: msgerrore }
      return msgerrore
    },


    clearAuthData() {
      this.my = DefaultUser
      // resetArrToken(mystate.my.tokens)

      this.categorySel = 'personal'

      this.servercode = 0
      this.resStatus = 0
      this.isLogged = false
      this.x_auth_token = ''

      return true
    },

    async resetpwd(paramquery: any) {

      const mydata = { ...paramquery }

      return bcrypt.hash(mydata.password, bcrypt.genSaltSync(12))
        .then((hashedPassword: string) => {
          mydata.repeatPassword = ''
          mydata.password = String(hashedPassword)

          return Api.SendReq('/updatepwd', 'POST', mydata, true)
            .then((res) => {
              return { code: res.data.code, msg: res.data.msg }
            })
            .catch((error: Types.AxiosError) => {
              this.setErrorCatch(error)
              return { code: this.getServerCode, msg: error.getMsgError() }
            })
        })

    },

    setErrorCatch(axerr: Types.AxiosError) {
      try {
        if (this.servercode !== toolsext.ERR_SERVERFETCH) {
          this.servercode = axerr.getCode()
        }
        // this.msg = axerr.getMsg()
        console.log('Err catch: (servercode:', axerr.getCode(), axerr.getMsgError(), ')')
      } catch (e) {
        console.log('Err catch:', axerr)
      }
    },

    async setLangServer() {
      const mydata = {
        username: this.my.username,
        lang: this.lang,
      }

      return Api.SendReq('/setlang', 'PATCH', { data: mydata })
        .then((res) => {
          if (res) {
            return (res.data.code === serv_constants.RIS_CODE_OK)
          }
          return false
        })
        .catch((error: any) => false)
    },

    async requestpwd(paramquery: any) {
      const usertosend = {
        email: paramquery.email,
      }
      console.log(usertosend)

      this.setServerCode(tools.CALLING)

      return Api.SendReq('/requestnewpwd', 'POST', usertosend)
        .then((res) => ({ code: res.data.code, msg: res.data.msg })).catch((error) => {
          this.setErrorCatch(error)
          return this.getServerCode
        })
    },

    async vreg(paramquery: ILinkReg) {
      const usertosend = {
        idlink: paramquery.idlink,
      }
      console.log(usertosend)

      this.setServerCode(tools.CALLING)

      return Api.SendReq('/vreg', 'POST', usertosend)
        .then((res) => {
          // console.log("RITORNO 2 ");
          // mutations.setServerCode(myres);
          if (res.data.code === serv_constants.RIS_CODE_EMAIL_VERIFIED) {
            console.log('VERIFICATO !!')
            localStorage.setItem(toolsext.localStorage.verified_email, String(true))
          } else {
            console.log('Risultato di vreg: ', res.data.code)
          }
          return { code: res.data.code, msg: res.data.msg }
        }).catch((error) => {
          this.setErrorCatch(error)
          return { code: this.getServerCode, msg: error.getMsgError() }
        })
    },

    async unsubscribe(paramquery: any) {
      return Api.SendReq('/news/unsubscribe', 'POST', paramquery)
        .then((res) => {
          // console.log("RITORNO 2 ");
          // mutations.setServerCode(myres);
          if (res.data.code === serv_constants.RIS_UNSUBSCRIBED_OK) {
            console.log('DESOTTOSCRITTO ALLA NEWSLETTER !!')
          } else {
            console.log('Risultato di unsubscribe: ', res.data.code)
          }
          return { code: res.data.code, msg: res.data.msg }
        }).catch((error) => this.getServerCode)
    },

    async importemail(paramquery: any) {
      return Api.SendReq('/news/import', 'POST', paramquery)
        .then((res) => res).catch((error) => ({ numtot: 0, numadded: 0, numalreadyexisted: 0 }))
    },

    async importExtraList(paramquery: any) {

      return Api.SendReq('/users/import_extralist', 'POST', paramquery)
        .then((res) => {
          return res
        }).catch((error) => {
          return { numtot: 0, numadded: 0, numalreadyexisted: 0 }
        })
    },

    async execDbOp(paramquery: any) {
      return Api.SendReq('/users/dbop', 'POST', paramquery)
        .then((res) => {
          return res.data
        }).catch((error) => {
          return false
        })
    },

    async newsletterload(paramquery: any) {

      return Api.SendReq('/news/load', 'POST', paramquery)
        .then((res) => {
          // console.log('res', res)
          return res.data
        }).catch((error) => {
          return null
        })
    },

    async reportload(paramquery: any) {

      return Api.SendReq('/report/load', 'POST', paramquery)
        .then((res) => {
          // console.log('res', res)
          return res.data
        }).catch((error) => {
          return null
        })
    },

    async newsletter_setactivate(paramquery: any) {

      return Api.SendReq('/news/setactivate', 'POST', paramquery)
        .then((res) => {
          // console.log('res', res)
          return res.data
        }).catch((error) => {
          return null
        })
    },

    authUser(data: IUserFields) {
      try {
        this.my = { ...data }
        if (!this.my.profile) {
          this.my.profile = DefaultProfile

          // Memory
          this.my.profile.manage_mygroups = []
          this.my.profile.asked_friends = []
          this.my.profile.asked_groups = []
        }

        this.isAdmin = tools.isBitActive(this.my.perm, shared_consts.Permissions.Admin.value)
        this.isManager = tools.isBitActive(this.my.perm, shared_consts.Permissions.Manager.value)
        this.isTutor = tools.isBitActive(this.my.perm, shared_consts.Permissions.Tutor.value)
        this.isZoomeri = tools.isBitActive(this.my.perm, shared_consts.Permissions.Zoomeri.value)
        this.isDepartment = tools.isBitActive(this.my.perm, shared_consts.Permissions.Department.value)
        this.isTeacher = tools.isBitActive(this.my.perm, shared_consts.Permissions.Teacher.value)
        this.isEditor = tools.isBitActive(this.my.perm, shared_consts.Permissions.Editor.value)

        this.my.tokens = []
        this.resetArrToken(this.my.tokens)
        this.my.tokens.push({ access: 'auth', token: this.x_auth_token, data_login: tools.getDateNow() })

      } catch (e) {
        console.log('Error authUser: ' + e)
      }

    },

    updateLocalStorage(myuser: IUserFields) {
      const globalStore = useGlobalStore()

      const now = tools.getDateNow()

      // const expirationDate = new Date(now.getTime() + myres.data.expiresIn * 1000);
      const expirationDate = new Date(now.getTime() * 1000)
      localStorage.setItem(toolsext.localStorage.lang, this.lang)
      localStorage.setItem(toolsext.localStorage.userId, myuser._id)
      localStorage.setItem(toolsext.localStorage.username, myuser.username)
      localStorage.setItem(toolsext.localStorage.name, myuser.name)
      localStorage.setItem(toolsext.localStorage.surname, myuser.surname)
      localStorage.setItem(toolsext.localStorage.perm, String(myuser.perm) || '')
      if (myuser.profile !== undefined) localStorage.setItem(toolsext.localStorage.img, (myuser.profile.img) ? String(myuser.profile.img) || '' : '')
      else localStorage.setItem(toolsext.localStorage.img, '')
      localStorage.setItem(toolsext.localStorage.token, this.x_auth_token)
      localStorage.setItem(toolsext.localStorage.expirationDate, expirationDate.toString())
      localStorage.setItem(toolsext.localStorage.isLogged, String(true))
      localStorage.setItem(toolsext.localStorage.verified_email, String(myuser.verified_email))
      localStorage.setItem(toolsext.localStorage.verified_by_aportador, String(myuser.verified_by_aportador))
      localStorage.setItem(toolsext.localStorage.teleg_id, String(myuser.profile.teleg_id))
      localStorage.setItem(toolsext.localStorage.made_gift, String(myuser.made_gift))
      localStorage.setItem(toolsext.localStorage.wasAlreadySubOnDb, String(globalStore.wasAlreadySubOnDb))
    },

    setusersList(usersList: IUserFields[]) {
      // console.log('setusersList', usersList)
      // @ts-ignore
      this.usersList = [...usersList]
    },

    setlang($router: Router, newstr: string) {
      console.log('SETLANG', newstr)
      this.lang = newstr
      toolsext.setLangAtt($router, newstr)
      localStorage.setItem(toolsext.localStorage.lang, this.lang)
    },

    signup(authData: ISignupOptions) {
      console.log('SIGNUP')
      const mylang = this.lang
      console.log('MYLANG: ' + mylang)

      return bcrypt.hash(authData.password!, bcrypt.genSaltSync(12))
        .then((hashedPassword: string) => {
          authData.lang = mylang
          authData.password = String(hashedPassword)

          this.setServerCode(tools.CALLING)

          return Api.SendReq('/users', 'POST', authData)
            .then((res) => {

              const newuser = res.data

              // console.log('newuser', newuser)

              this.setServerCode(res.status)

              if (res.status === 200) {
                if (process.env.DEV) {
                  console.log('USERNAME = ' + newuser.username)
                  console.log('IDUSER= ' + newuser._id)
                }

                this.authUser(newuser)

                const now = tools.getDateNow()
                // const expirationDate = new Date(now.getTime() + myres.data.expiresIn * 1000);
                const expirationDate = new Date(now.getTime() * 1000)
                localStorage.setItem(toolsext.localStorage.lang, this.lang)
                localStorage.setItem(toolsext.localStorage.userId, newuser._id)
                localStorage.setItem(toolsext.localStorage.username, newuser.username)
                localStorage.setItem(toolsext.localStorage.name, newuser.name)
                localStorage.setItem(toolsext.localStorage.surname, newuser.surname)
                localStorage.setItem(toolsext.localStorage.token, this.x_auth_token)
                localStorage.setItem(toolsext.localStorage.expirationDate, expirationDate.toString())
                localStorage.setItem(toolsext.localStorage.verified_email, String(false))
                localStorage.setItem(toolsext.localStorage.verified_by_aportador, String(false))

                // Even if you has registered, you have to SignIn first
                this.isLogged = false
                // dispatch('storeUser', authData);
                // dispatch('setLogoutTimer', myres.data.expiresIn);
                console.log('OK')
                return { code: tools.OK, msg: '' }
              } else {
                console.log('ERR GENERICO')
                return { code: toolsext.ERR_GENERICO, msg: '' }
              }
            })
            .catch((error) => {
              console.log('Err', error)
              this.setErrorCatch(error)
              return { code: this.getServerCode, msg: this.getMsg }
            })
        })
    },

    UpdatePwd(x_auth_token: string) {
      this.x_auth_token = x_auth_token
      if (!this.my.tokens) {
        this.my.tokens = []
      }
      this.my.tokens.push({ access: 'auth', token: x_auth_token, data_login: tools.getDateNow() })
    },

    setServerCode(num: number) {
      this.servercode = num
    },

    setResStatus(status: number) {
      this.resStatus = status
    },

    setAuth(x_auth_token: string) {
      this.x_auth_token = x_auth_token
    },

    resetArrToken(arrtokens: IToken[]) {
      if (!arrtokens) {
        arrtokens = []
      }

      // Take only the others access (from others Browser)
      return arrtokens.filter((token: IToken) => token.access !== 'auth')
    },

    async signin($router: Router, authData: ISigninOptions) {
      console.log('LOGIN signin')
      const globalStore = useGlobalStore()

      // console.log('MYLANG = ' + this.lang)

      let sub = null

      try {
        if (static_data.functionality.PWA) {
          if ('serviceWorker' in navigator) {
            console.log('serviceWorker')
            sub = await navigator.serviceWorker.ready
              .then((swreg) => {
                console.log('swreg')
                sub = swreg.pushManager.getSubscription()
                return sub
              })
              .catch((e) => {
                console.log('  ERROR ')
                sub = null
              })
          }
        }
      } catch (e) {
        console.log('Err navigator.serviceWorker.ready ... GetSubscription:', e)
      }

      const options = {
        title: tools.translate('notification.title_subscribed', [{
          strin: 'sitename',
          strout: translate('ws.sitename'),
        }]),
        content: translate('notification.subscribed'),
        openUrl: '/',
      }

      console.log('2')

      const usertosend = {
        username: authData.username.trim(),
        password: authData.password.trim(),
        lang: this.lang,
        subs: sub,
        options,
      }

      if (process.env.DEBUG === '1') {
        console.log(usertosend)
      }

      this.setServerCode(tools.CALLING)

      let myres: any

      return Api.SendReq('/users/login', 'POST', usertosend, true)
        .then((res) => {

          myres = res

          if (myres.status !== 200) {
            return Promise.reject(toolsext.ERR_GENERICO)
          }
          return myres

        }).then((res) => {
          console.log(' Login res', res)

          if (res.success) {
            globalStore.SetwasAlreadySubOnDb(res.data.subsExistonDb)

            const myuser: IUserFields = res.data.usertosend
            if (myuser) {
              // console.table(myuser)

              this.authUser(myuser)

              this.updateLocalStorage(myuser)

              globalStore.loadSite()

            }
          }

          return tools.OK

        }).then((code) => {
          if (code === tools.OK) {
            return this.setGlobal($router, true)
              .then(() => {
                return code
              })
          } else {
            return code
          }
        })
        .catch((error) => {
          console.log('error', error)
          this.setErrorCatch(error)
          return this.getServerCode
        })
    },

    async logout() {
      const globalStore = useGlobalStore()
      // const $router = useRouter()

      console.log('logout')

      localStorage.removeItem(toolsext.localStorage.expirationDate)
      localStorage.removeItem(toolsext.localStorage.token)
      localStorage.removeItem(toolsext.localStorage.userId)
      localStorage.removeItem(toolsext.localStorage.username)
      localStorage.removeItem(toolsext.localStorage.name)
      localStorage.removeItem(toolsext.localStorage.surname)
      localStorage.removeItem(toolsext.localStorage.img)
      localStorage.removeItem(toolsext.localStorage.perm)
      localStorage.removeItem(toolsext.localStorage.isLogged)
      // localStorage.removeItem(rescodes.localStorage.leftDrawerOpen)
      localStorage.removeItem(toolsext.localStorage.verified_email)
      localStorage.removeItem(toolsext.localStorage.verified_by_aportador)
      localStorage.removeItem(toolsext.localStorage.teleg_id)
      localStorage.removeItem(toolsext.localStorage.made_gift)
      localStorage.removeItem(toolsext.localStorage.categorySel)
      localStorage.removeItem(toolsext.localStorage.wasAlreadySubOnDb)

      this.isLogged = false
      this.my = { ...DefaultUser }

      await globalStore.clearDataAfterLogout()

      return Api.SendReq('/users/me/token', 'DELETE', null)
        .then((res) => {
          console.log(res)
        }).then(() => this.clearAuthData()).catch((error) => {
          this.setErrorCatch(error)
          return this.getServerCode
        })
    },

    async setGlobal($router: Router, isLogged: boolean) {
      console.log('setGlobal', isLogged)

      const globalStore = useGlobalStore()
      const todos = useTodoStore()
      const projects = useProjectStore()
      try {
        // this.isLogged = true
        if (isLogged) {
          // console.log('this.isLogged', this.isLogged)

          // globalStore.setleftDrawerOpen(localStorage.getItem(toolsext.localStorage.leftDrawerOpen) === 'true')
          globalStore.setCategorySel(localStorage.getItem(toolsext.localStorage.categorySel))

          globalStore.checkUpdates()
        }


        const isok = await globalStore.loadAfterLogin()

        this.isLogged = isok && isLogged

        if (static_data.functionality.ENABLE_TODOS_LOADING)
          await todos.dbLoad({ checkPending: true })

        if (static_data.functionality.ENABLE_PROJECTS_LOADING)
          await projects.dbLoad({ checkPending: true, onlyiffirsttime: true })

        globalStore.addDynamicPages($router)

        // console.log('$router', $router)

        globalStore.finishLoading = true
        if (tools.isDebug()) console.log('finishLoading', globalStore.finishLoading)

        // document.dispatchEvent(new Event('custom-post-render-event'))
      } catch (e) {
        console.error('Error', e)
        globalStore.finishLoading = true
      }

      return true
      // console.log('setGlobal: END')
    },

    async autologin_FromLocalStorage($router: Router, $q: any) {
      try {
        const globalStore = useGlobalStore()

        // console.log('*** autologin_FromLocalStorage ***')
        // INIT

        let isLogged = false

        this.lang = tools.getItemLS(toolsext.localStorage.lang)

        const token = localStorage.getItem(toolsext.localStorage.token)
        if (token) {
          const expirationDateStr = localStorage.getItem(toolsext.localStorage.expirationDate)
          const expirationDate = new Date(String(expirationDateStr))
          const now = tools.getDateNow()
          if (now < expirationDate) {
            const _id = String(localStorage.getItem(toolsext.localStorage.userId))
            const username = String(localStorage.getItem(toolsext.localStorage.username))
            const name = String(localStorage.getItem(toolsext.localStorage.name))
            const surname = String(localStorage.getItem(toolsext.localStorage.surname))
            const verified_email = localStorage.getItem(toolsext.localStorage.verified_email) === 'true'
            const verified_by_aportador = localStorage.getItem(toolsext.localStorage.verified_by_aportador) === 'true'
            const made_gift = localStorage.getItem(toolsext.localStorage.made_gift) === 'true'
            const myperm = localStorage.getItem(toolsext.localStorage.perm)
            let perm = 0
            if (myperm) perm = parseInt(myperm, 10)
            const img = String(localStorage.getItem(toolsext.localStorage.img))
            let teleg_id = 0
            const telegid = localStorage.getItem(toolsext.localStorage.teleg_id)
            if (telegid) teleg_id = parseInt(telegid, 10)

            globalStore.wasAlreadySubOnDb = localStorage.getItem(toolsext.localStorage.wasAlreadySubOnDb) === 'true'

            console.log('*************  autologin _id', _id)

            this.setAuth(token)

            this.authUser({
              _id,
              username,
              name,
              surname,
              verified_email,
              verified_by_aportador,
              made_gift,
              perm,
              profile: {
                img,
                teleg_id,
                myshares: [],
                friends: [],
                req_friends: [],
                asked_friends: [],
                mygroups: [],
                asked_groups: [],
                manage_mygroups: []
              },
            })

            isLogged = true
          }
        }

        return await this.setGlobal($router, isLogged)
          .then((loadstorage: any) => {
            if (loadstorage) {

              if ($q.screen.gt.sm) {
                globalStore.setleftDrawerOpen(true)
              }

              /*if (toolsext.getLocale() !== '') {
                // console.log('SETLOCALE :', this.$i18n.locale)
                $i18n.locale = toolsext.getLocale()    // Set Lang
              } else {
                userStore.setlang($router, this.$i18n.locale)
              }*/


              //++Todo PWA:  globalroutines('loadapp', '')

              // Create Subscription to Push Notification
              globalStore.createPushSubscription()
            }
          })

        // console.log('autologin _id STATE ', this._id)

        // return true
      } catch (e: any) {
        console.error('ERR autologin ', e.message)
        return false
      }
    },

    async loadUserProfile(username: string) {
      const data = {
        username
      }

      return Api.SendReq('/users/profile', 'POST', data)
        .then((ris) => {
          this.my.profile.friends = ris.data.friends.listFriends ? ris.data.friends.listFriends : []
          this.my.profile.req_friends = ris.data.friends.listRequestFriends ? ris.data.friends.listRequestFriends : []
          this.my.profile.asked_friends = ris.data.friends.listSentRequestFriends ? ris.data.friends.listSentRequestFriends : []

          return ris.data.user
        }).catch((error) => {
          return {}
        })

    },

    async loadGroup(groupname: string) {
      const data = {
        groupname
      }

      return Api.SendReq('/mygroup/load', 'POST', data)
        .then((res) => {
          return res.data
        }).catch((error) => {
          return {}
        })

    },

    async loadSkill(idSkill: string) {
      const data = {
        idSkill
      }

      return Api.SendReq('/myskills/page', 'POST', data)
        .then((res) => {
          return res.data
        }).catch((error) => {
          return {}
        })

    },

    async loadGeneric(table: string, id: number) {
      const data = {
        table,
        id
      }

      return Api.SendReq('/mygen/page', 'POST', data)
        .then((res) => {
          return res.data
        }).catch((error) => {
          return {}
        })

    },

    async loadFriends(username: string) {
      return Api.SendReq('/users/friends', 'POST', null)
        .then((ris) => {
          this.my.profile.friends = ris.data.listFriends ? ris.data.listFriends : []
          this.my.profile.req_friends = ris.data.listRequestFriends ? ris.data.listRequestFriends : []
          this.my.profile.asked_friends = ris.data.listSentRequestFriends ? ris.data.listSentRequestFriends : []
          return ris.data
        }).catch((error) => {
          return {}
        })

    },

    async loadGroups(username: string) {
      return Api.SendReq('/users/groups', 'POST', null)
        .then((res) => {
          return res.data
        }).catch((error) => {
          return {}
        })

    },

    async setFriendsCmd($q: any, t: any, usernameOrig: string, usernameDest: string, cmd: number, value: any) {
      return Api.SendReq('/users/friends/cmd', 'POST', { usernameOrig, usernameDest, cmd, value })
        .then((res) => {
          return res.data
        }).catch((error) => {
          tools.showNegativeNotif($q, t('db.recfailed'))
          return {}
        })

    },

    async setGroupsCmd($q: any, t: any, usernameOrig: string, groupnameDest: string, cmd: number, value: any) {
      return Api.SendReq('/users/groups/cmd', 'POST', { usernameOrig, groupnameDest, cmd, value })
        .then((res) => {
          return res.data
        }).catch((error) => {
          tools.showNegativeNotif($q, t('db.recfailed'))
          return {}
        })

    },

    async sendMsgToBotTelegram($q: any, t: any, mydata: IMsgGlobParam) {
      return Api.SendReq('/users/mgt', 'POST', { mydata })
        .then((res) => {
          console.log('res', res)
          let msgok = (res.data.nummsgsent === 1) ? res.data.nummsgsent + ' ' + t('cal.sendmsg_sent') : res.data.nummsgsent + ' ' + t('cal.sendmsgs_sent')
          if (mydata.cmd === shared_consts.MsgTeleg.SHARE_MSGREG) {
            msgok = t('cal.sendmsg_sent_sharedlink') + ' ' + tools.getBotName()
          }
          if (res.data.nummsgsent >= 0) {
            tools.showPositiveNotif($q, msgok)
            return true
          }
          return false
        }).catch((error) => {
          tools.showNegativeNotif($q, t('cal.err_sendmsg'))
          return {}
        })
    },

    async importToServerCmd($q: any, t: any, cmd: number, data: any) {
      return Api.SendReq('/admin/import', 'POST', { cmd, data })
        .then((res) => {
          if (res) {
            tools.showPositiveNotif($q, t('db.recupdated'))
          }
        }).catch((error) => {
          tools.showNegativeNotif($q, t('db.recfailed'))
          return {}
        })

    }
  },
})
