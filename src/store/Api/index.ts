import { useGlobalStore } from '@store/globalStore'
import { useUserStore } from '@store/UserStore'

export * from './ApiTypes'
import axios from 'axios'

export { addAuthHeaders, removeAuthHeaders, API_URL } from './Instance'
// import {AlgoliaSearch} from './AlgoliaController'
import Paths from '@paths'
import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

import { serv_constants } from '@src/store/Modules/serv_constants'
import router from '@router'
import * as Types from '@src/store/Api/ApiTypes'
import { costanti } from '@src/store/Modules/costanti'
import * as ApiTables from '@src/store/Modules/ApiTables'
import sendRequest from './Inst-Pao'
import Request from './Instance'
import globalroutines from '../../globalroutines/index'

function ReceiveResponsefromServer(tablesync: string, nametab: string, method: string, risdata: any) {
  // console.log('ReceiveResponsefromServer', nametab, method, risdata)
  if (risdata) {
    // Updated somw data after Server arrived data.
    if (method === 'PATCH') {
      if (nametab === 'projects') {
        if (risdata.projectris) {
          const copyrec = tools.jsonCopy(risdata.projectris)
          // +*Todo conv: Projects.updateProject({ objproj: copyrec })
        }
      }
    }
  }
}

// const algoliaApi = new AlgoliaSearch()
export const Api = {
  async post(path: string, payload?: any) {
    const globalStore = useGlobalStore()
    globalStore.connData.downloading_server = 1
    globalStore.connData.uploading_server = 1
    return Request('post', path, payload)
  },

  async postFormData(path: string, payload?: any) {
    const globalStore = useGlobalStore()
    globalStore.connData.uploading_server = 1
    globalStore.connData.downloading_server = 1
    return Request('postFormData', path, payload)
  },

  async get(path: string, payload?: any) {
    const globalStore = useGlobalStore()
    globalStore.connData.downloading_server = 1
    globalStore.connData.uploading_server = 0
    return Request('get', path, payload)
  },

  async put(path: string, payload?: any) {
    const globalStore = useGlobalStore()
    globalStore.connData.uploading_server = 1
    return Request('put', path, payload)
  },

  async patch(path: string, payload?: any) {
    const globalStore = useGlobalStore()
    globalStore.connData.uploading_server = 1
    return Request('patch', path, payload)
  },

  async Delete(path: string, payload: any) {
    const globalStore = useGlobalStore()
    globalStore.connData.uploading_server = 1
    return Request('delete', path, payload)
  },

  async checkSession({ token, refresh_token }: any) {
    return axios.post(process.env.API_URL + Paths.TOKEN_REFRESH, {
      refresh_token,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },

  async SendReq(url: string, method: string, mydata: any, setAuthToken = false): Promise<Types.AxiosSuccess | Types.AxiosError> {
    const mydataout = {
      ...mydata,
      keyappid: process.env.PAO_APP_ID,
      idapp: process.env.APP_ID,
    }

    // console.log('mydata', mydata)

    const userStore = useUserStore()
    const globalStore = useGlobalStore()
    // const $router = useRouter()

    userStore.setServerCode(tools.EMPTY)
    userStore.setResStatus(0)
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return new Promise((resolve, reject) => sendRequest(url, method, mydataout)
      .then((res) => {
        console.log('status:', res.status)

        setTimeout(() => {
          if (method === 'get') {
            globalStore.connData.downloading_server = 0
          } else {
            globalStore.connData.uploading_server = 0
            globalStore.connData.downloading_server = 0
          }
        }, 1000)

        if (res.status) {
          userStore.setResStatus(res.status)
          if (res.status === serv_constants.RIS_CODE__HTTP_FORBIDDEN_INVALID_TOKEN) {
            // Forbidden
            // You probably is connectiong with other page...
            userStore.setServerCode(toolsext.ERR_AUTHENTICATION)
            userStore.setAuth('')
            // $router.push('/signin')
            return reject({ code: toolsext.ERR_AUTHENTICATION })
          }
        }

        return resolve(res)
      })
      .catch((error) => {
        setTimeout(() => {
          if (method === 'get') {
            globalStore.connData.downloading_server = -1
          } else {
            globalStore.connData.uploading_server = -1
            globalStore.connData.downloading_server = -1
          }
        }, 1000)

        console.log('error', error)
        return reject(error)
      }))
  },

  async syncAlternative(mystrparam: string) {
    // console.log('[ALTERNATIVE Background syncing', mystrparam)

    const multiparams = mystrparam.split('|')
    if (multiparams) {
      if (multiparams.length > 3) {
        const cmd = multiparams[0]
        const tablesync = multiparams[1]
        const nametab = multiparams[2]
        const method = multiparams[3]
        // const token = multiparams[3]

        if (cmd === ApiTables.DB.CMD_SYNC) {
          let errorfromserver = false
          let lettoqualcosa = false

          // console.log('A1) INIZIO.............................................................')
          return globalroutines( 'readall', tablesync, null)
            .then((alldata) => {
              if (alldata === undefined) {
                console.log('alldata NON DEFINITA')
                return true
              }
              const myrecs = [...alldata]

              const promises = myrecs.map((rec) => {
                let link = `/${ApiTables.getLinkByTableName(nametab)}`

                if (method !== 'POST') {
                  link += `/${rec._id}`
                }

                console.log('----------------------- LEGGO QUALCOSA ', link)

                // Insert/Delete/Update table to the server
                return this.SendReq(link, method, rec)
                  .then((ris) => {
                    ReceiveResponsefromServer(tablesync, nametab, method, ris.data)
                    lettoqualcosa = true
                    return globalroutines( 'delete', tablesync, null, rec._id)
                  })
                  .then(() => {
                    return globalroutines( 'delete', 'swmsg', null, mystrparam)
                  }).catch((err) => {
                    if (err.msgerr) {
                      if (err.msgerr.message.includes('Failed to fetch') || err.msgerr.message.includes('Network Error')) {
                        errorfromserver = true
                      }
                    }
                    console.log(' [Alternative] !!!!!!!!!!!!!!!   Error while sending data', err, errorfromserver, 'lettoqualcosa', lettoqualcosa)
                    if (!errorfromserver) {
                      return globalroutines( 'delete', 'swmsg', null, mystrparam)
                    }
                  })
              })

              // CALL ALL THE PROMISES
              return Promise.all(promises).then(() => (errorfromserver && !lettoqualcosa)).catch((err) => (errorfromserver && !lettoqualcosa))
            }).catch((error) => {
              console.log('¨¨¨¨¨¨¨¨¨¨¨¨¨¨  errorfromserver:', errorfromserver, error)
              return (errorfromserver && !lettoqualcosa)
            })
            .then((error) => {
              const mystate = (error || errorfromserver) ? 'offline' : 'online'

              const globalStore = useGlobalStore()
              globalStore.setStateConnection(mystate)
              globalStore.saveConfig({ _id: costanti.CONFIG_ID_STATE_CONN, value: mystate })
            })
        }
      }
    }
    return null
  },
}
