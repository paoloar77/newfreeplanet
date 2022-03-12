import axios, { AxiosInstance, AxiosResponse } from 'axios'
// import LoginModule from '../Modules/Auth/LoginStore'
import { toolsext } from '@src/store/Modules/toolsext'
import { serv_constants } from '@src/store/Modules/serv_constants'
import { useGlobalStore } from '@store/globalStore'
import { useUserStore } from '@store/UserStore'
import { tools } from '@src/store/Modules/tools'
import * as Types from './ApiTypes'

export let API_URL = process.env.MONGODB_HOST
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
  },
})

axiosInstance.interceptors.response.use(

  (response) => {
    if (process.env.DEBUG === '1') console.log(response)
    return response
  },
  (error) => {
    const globalStore = useGlobalStore()
    // console.log('error', error)
    if (error.response) {
      if (process.env.DEBUG === '1') console.log('Status = ', error.response.status)
      console.log('Request Error: ', error.response)
      if (error.response.status !== 0) {
        globalStore.setStateConnection('online')
      } else {
        globalStore.setStateConnection('offline')
      }
    } else {
      globalStore.setStateConnection('offline')
    }
    return Promise.reject(error)
  },
)

export const addAuthHeaders = () => {
  // axiosInstance.defaults.headers.Authorization = `Bearer ${LoginModule.userInfos.userToken}`
}

//export const removeAuthHeaders = () => {
//  delete axiosInstance.defaults.headers.Authorization
//}

async function Request(type: string, path: string, payload: any): Promise<Types.AxiosSuccess | Types.AxiosError | undefined> {

  let ricevuto = false
  const userStore = useUserStore()
  const globalStore = useGlobalStore()


  try {
    if (tools.isDebug()) console.log('Axios Request', path, type, tools.notshowPwd(payload))
    let response: AxiosResponse
    if (type === 'post' || type === 'put' || type === 'patch') {
      response = await axiosInstance[type](path, payload, {
        baseURL: globalStore.getServerHost(),
        headers: {
          'Content-Type': 'application/json',
          'x-auth': userStore.x_auth_token,
        },
      })
      ricevuto = true
      // console.log('Request Response: ', response)
      // console.log(new Types.AxiosSuccess(response.data, response.status))

      const setAuthToken = (path === '/updatepwd')

      // console.log('--------- 0 ')

      if (response && (response.status === 200)) {
        let x_auth_token = ''
        try {
          if (setAuthToken || (path === '/users/login')) {
            x_auth_token = String(response.headers['x-auth'])

            if (x_auth_token === '') {
              userStore.setServerCode(toolsext.ERR_AUTHENTICATION)
            }
            if (setAuthToken) {
              userStore.UpdatePwd(x_auth_token)
              tools.localStSetItem(toolsext.localStorage.token, x_auth_token)
            }

            userStore.setAuth(x_auth_token)
            tools.localStSetItem(toolsext.localStorage.token, x_auth_token)
          }

          globalStore.setStateConnection(ricevuto ? 'online' : 'offline')
          userStore.setServerCode(tools.OK)
        } catch (e) {
          if (setAuthToken) {
            userStore.setServerCode(toolsext.ERR_AUTHENTICATION)
            userStore.setAuth('')
          }
          globalStore.setStateConnection(ricevuto ? 'online' : 'offline')
          return Promise.reject(new Types.AxiosError(serv_constants.RIS_CODE__HTTP_FORBIDDEN_INVALID_TOKEN, null, toolsext.ERR_AUTHENTICATION))
        }
      }

      return new Types.AxiosSuccess(response.data, response.status)
    } else if (type === 'get' || type === 'delete') {
      // @ts-ignore
      response = await axiosInstance[type](path, {
        baseURL: globalStore.getServerHost(),
        params: payload,
        headers: {
          'Content-Type': 'application/json',
          'x-auth': userStore.x_auth_token,
        },
      })
      ricevuto = true
      return new Types.AxiosSuccess(response.data, response.status)
    } else if (type === 'postFormData') {
      response = await axiosInstance.post(path, payload, {
        baseURL: globalStore.getServerHost(),
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth': userStore.x_auth_token,
        },
      })
      ricevuto = true
      return new Types.AxiosSuccess(response.data, response.status)
    }
  } catch (error: any) {
    setTimeout(() => {
      globalStore.connData.uploading_server = (globalStore.connData.uploading_server === 1) ? -1 : globalStore.connData.uploading_server
      globalStore.connData.downloading_server = (globalStore.connData.downloading_server === 1) ? -1 : globalStore.connData.downloading_server
    }, 1000)

    if (process.env.DEV) {
      console.log('ERROR using', path)
      // console.log('Error received: ', error)
      // console.log('ricevuto=', ricevuto)
      console.log('error.response=', error.response)
    }
    let mycode = 0
    if (!ricevuto) {
      mycode = toolsext.ERR_SERVERFETCH
      userStore.setServerCode(toolsext.ERR_SERVERFETCH)
    } else {
      mycode = toolsext.ERR_GENERICO
      userStore.setServerCode(toolsext.ERR_GENERICO)
    }

    if (error.response) {
      if (error.response.data && error.response.data.code) {
        mycode = error.response.data.code
        userStore.setServerCode(mycode)
      }
      return Promise.reject(new Types.AxiosError(error.response.status, error.response.data, error.response.data.code))
    }
    return Promise.reject(new Types.AxiosError(0, null, mycode, error))
  }
}

export default Request
