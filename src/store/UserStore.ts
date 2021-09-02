import { defineStore } from 'pinia'

import {
  ISignupOptions, IUserFields, IUserProfile, IUserState,
} from '@src/model'
import { tools } from '@store/Modules/tools'
import translate from '@src/globalroutines/util'
import { ILinkReg, IToken } from '@model/other'

import * as Types from '@src/store/Api/ApiTypes'
import { useGlobalStore } from '@store/globalStore'
import { useRouter } from 'vue-router'
import { serv_constants } from '@store/Modules/serv_constants'
import Api from './Api'
import { toolsext } from '@store/Modules/toolsext'

export const DefaultUser: IUserFields = {
  _id: '',
  email: '',
  username: '',
  name: '',
  surname: '',
  password: '',
  tokens: [],
  verified_email: false,
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
  dateofbirth: new Date(),
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
  myshares: [],
  paymenttypes: [],
  qualified: false,
  qualified_2invitati: false,
}

export const useUserStore = defineStore('UserStore', {
  state: () => ({
    my: { ...DefaultUser },
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
    usersList: [],
    countusers: 0,
    lastparamquery: {},
  }),

  getters: {

    getUserByUsername: (state: IUserState) => (username: string): IUserFields | null => {
      // Check if is this User!
      if (state.my.username === username) return state.my

      let trovato = null
      if (state.usersList) trovato = state.usersList.find((item) => item.username === username)

      return (trovato) || null
    },

    getImgByUsername: (state: IUserState) => (username: string): string => {
      if (username === '') return ''
      // Check if is this User!
      // @ts-ignore
      const myrec = this.getUserByUsername(username)
      // console.log('myrec', myrec)
      if (myrec && myrec.profile && !!myrec.profile.img && myrec.profile.img !== '' && myrec.profile.img !== 'undefined') {
        return myrec.profile.img
      }
      return ''
    },

    isServerError(): boolean {
      return (this.servercode === toolsext.ERR_SERVERFETCH)
    },

    getServerCode: (state: IUserState): number => (state.servercode ? state.servercode : 0),

    getNameSurnameByUserId: (state: IUserState) => (userId: string): string => {
      // @ts-ignore
      const prova: number = this.getServerCode(state)

      // @ts-ignore
      const user = this.getUserByUserId(state, userId)
      if (user) return `${user.name} ${user.surname}`
      return `(${userId})`
    },

    getNameSurnameByUsername: (state: IUserState) => (username: string): string => {
      // @ts-ignore
      const user = this.getUserByUsername(state, username)
      if (user) return `${user.name} ${user.surname}`
      return `(${username})`
    },

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


    getUserByUserId: (state: IUserState) => (userId: string): IUserFields | null => {
      // Check if is this User!
      if (state.my._id === userId) return state.my

      let trovato = null

      if (state.usersList) trovato = state.usersList.find((item) => item._id === userId)

      return (trovato) || null
    },

    isUserInvalid: (state: IUserState): boolean => {
      try {
        return (state.my._id === undefined) || (state.my._id.trim() === '')
      } catch (e) {
        return true
      }
    },

    getMsgError: (state: IUserState) => (err: number): string => {
      let msgerrore = ''
      if (err !== tools.OK) {
        msgerrore = `Error [${state.servercode}]: `
        if (state.servercode === toolsext.ERR_SERVERFETCH) {
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

  },

  actions: {
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
          } return false
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
          return this.getServerCode
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

    authUser(data: IUserFields) {
      this.my = { ...data }
      if (!this.my.profile) {
        this.my.profile = DefaultProfile
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
      localStorage.setItem(toolsext.localStorage.teleg_id, String(myuser.profile.teleg_id))
      localStorage.setItem(toolsext.localStorage.made_gift, String(myuser.made_gift))
      localStorage.setItem(toolsext.localStorage.wasAlreadySubOnDb, String(globalStore.wasAlreadySubOnDb))
    },

    setusersList(usersList: IUserFields[]) {
      // console.log('setusersList', usersList)
      // @ts-ignore
      this.usersList = [...usersList]
    },

    setlang(newstr: string) {
      console.log('SETLANG', newstr)
      this.lang = newstr
      toolsext.setLangAtt(newstr)
      localStorage.setItem(toolsext.localStorage.lang, this.lang)
    },

    async signup(authData: ISignupOptions) {
      console.log('SIGNUP')
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

    async logout() {
      const globalStore = useGlobalStore()
      const $router = useRouter()

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
      localStorage.removeItem(toolsext.localStorage.teleg_id)
      localStorage.removeItem(toolsext.localStorage.made_gift)
      localStorage.removeItem(toolsext.localStorage.categorySel)
      localStorage.removeItem(toolsext.localStorage.wasAlreadySubOnDb)

      this.isLogged = false
      this.my = { ...DefaultUser }

      await globalStore.clearDataAfterLogout()

      const riscall = await Api.SendReq('/users/me/token', 'DELETE', null)
        .then((res) => {
          console.log(res)
        }).then(() => this.clearAuthData()).catch((error) => {
          this.setErrorCatch(error)
          return this.getServerCode
        })

      return riscall

      // $router.push('/signin')
    },

    async setGlobal(isLogged: boolean) {
      // console.log('setGlobal', isLogged)

      const globalStore = useGlobalStore()
      try {
        // this.isLogged = true
        if (isLogged) {
          // console.log('this.isLogged', this.isLogged)

          globalStore.setleftDrawerOpen(localStorage.getItem(toolsext.localStorage.leftDrawerOpen) === 'true')
          globalStore.setCategorySel(localStorage.getItem(toolsext.localStorage.categorySel))

          globalStore.checkUpdates()
        }

        const isok = await globalStore.loadAfterLogin()

        this.isLogged = isok && isLogged

        // ++Todo conv if (static_data.functionality.ENABLE_TODOS_LOADING)
        //  await Todos.dbLoad({ checkPending: true })

        // if (static_data.functionality.ENABLE_PROJECTS_LOADING)
        //   await Projects.dbLoad({ checkPending: true, onlyiffirsttime: true })

        // console.log('add routes')

        globalStore.addDynamicPages()

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

    async autologin_FromLocalStorage() {
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
              made_gift,
              perm,
              profile: { img, teleg_id },
            })

            isLogged = true
          }
        }

        return await this.setGlobal(isLogged)

        // console.log('autologin _id STATE ', this._id)

        // return true
      } catch (e: any) {
        console.error('ERR autologin ', e.message)
        return false
      }
    },

  },
})
