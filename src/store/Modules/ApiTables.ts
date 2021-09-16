import { Api } from '@api'
import { ITodo } from '@src/model'
import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { useUserStore } from '@store/UserStore'
import { serv_constants } from '@store/Modules/serv_constants'
import { costanti } from '@store/Modules/costanti'
import { useGlobalStore } from '@store/globalStore'
import globalroutines from '../../globalroutines/index'
import { useProjectStore } from '@store/Projects'
import { useTodoStore } from '@store/Todos'

export function getLinkByTableName(nametable: string) {
  if (nametable === 'todos') {
    return 'todos'
  }
  if (nametable === 'projects') {
    return 'projects'
  }
  return ''
}

export const LIST_START = null

export const DB = {
  CMD_SYNC: 'sync',
  CMD_SYNC_NEW: 'sync-new',
  CMD_DELETE: 'sync-delete',
  CMD_HIDE: 'sync-hide',
  TABLE_SYNC_POST: 'sync_post_',
  TABLE_SYNC_PATCH: 'sync_patch_',
  TABLE_DELETE: 'delete_',
  TABLE_HIDE: 'hide_',
}

export function allTables() {
  /* const myarr = OtherTables
   for (const tab of costanti.MainTables) {
    for (const method of costanti.allMethod) {
      myarr.push(method + tab)
    }
  } */
  return costanti.OtherTables
}

async function updatefromIndexedDbToState(nametab: string) {
  await globalroutines('updatefromIndexedDbToState', nametab, null)
    .then(() => {
      console.log('updatefromIndexedDbToState! ')
      return true
    })
}

async function checkPendingMsg() {
  // console.log('checkPendingMsg')
  const globalStore = useGlobalStore()

  const config = await globalroutines('read', 'config', null, '1')
  // console.log('config', config)

  try {
    if (config) {
      if (config[1].stateconn) {
        console.log('config.stateconn', config[1].stateconn)

        if (config[1].stateconn !== globalStore.stateConnection) {
          globalStore.setStateConnection(config[1].stateconn)
        }
      }
    }
  } catch (e) {
    // ...
  }

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return new Promise((resolve, reject) => globalroutines('count', 'swmsg')
    .then((count) => {
      if (count > 0) {
        return resolve(true)
      }
      return resolve(false)
    }).catch(() => reject()))
}

function useServiceWorker() {
  return false // return 'serviceWorker' in navigator
}

// If something in the call of Service Worker went wrong (Network or Server Down), then retry !
async function sendSwMsgIfAvailable() {
  const something = false

  if (useServiceWorker()) {
    console.log(' -------- sendSwMsgIfAvailable')

    const count = await checkPendingMsg()
    if (count) {
      return navigator.serviceWorker.ready
        .then(() => globalroutines('readall', 'swmsg')
          .then((arr_recmsg) => {
            if (arr_recmsg.length > 0) {
              // console.log('----------------------  2)    navigator (2) .serviceWorker.ready')
              let promiseChain = Promise.resolve()

              for (const rec of arr_recmsg) {
                // #Alternative to SyncManager
                promiseChain = promiseChain.then(() => Api.syncAlternative(rec._id)
                  .then(() => {
                    //++Todo conv:   something = true
                  }))
              }
              return promiseChain
            }
            return null
          }))
    }
  }

  return new Promise((resolve, reject) => {
    resolve(something)
  })
}

export async function waitAndRefreshData() {
  // ++Todo: conv
  const projects = useProjectStore()
  const todos = useTodoStore()

  await projects.dbLoad({ checkPending: false, onlyiffirsttime: false })
  return await todos.dbLoad({ checkPending: false })
}

export async function waitAndcheckPendingMsg() {
  // await aspettansec(1000)
  const globalStore = useGlobalStore()

  return checkPendingMsg()
    .then((ris) => {
      if (ris) {
        if (!globalStore.isOnline()) { // If is Offline, then check

        }

        return sendSwMsgIfAvailable()
          .then((something) => {
            if (something) {
              if (process.env.DEBUG === '1') {
                console.log('something')
              }
              // Refresh data
              return waitAndRefreshData()
            }
            return null
          })
      }
      return null
    })
}

async function dbInsertSave(call: string, item: any, method: string) {
  let ret = true
  const userStore = useUserStore()
  if (!useServiceWorker()) {
    console.log('dbInsertSave', item, method)

    if (userStore.isUserInvalid) {
      return false
    } // Login not made

    call = `/${call}`
    if (method !== 'POST') {
      call += `/${item._id}`
    }

    console.log('SAVE: ', item)

    ret = await Api.SendReq(call, method, item)
      .then((res: any) => {
        console.log('dbInsertSave ', call, 'to the Server', res.data)

        return (res.status === 200)
      })
      .catch((error: any) => {
        userStore.setErrorCatch(error)
        return false
      })
  }

  return ret
}

async function dbDeleteItem(call: string, item: any) {
  let res = true
  const userStore = useUserStore()
  if (!useServiceWorker()) {
    // console.log('dbdeleteItem', item)
    if (userStore.isUserInvalid) {
      return false
    } // Login not made

    call = `/${call}`

    res = await Api.SendReq(`${call}/${item._id}`, 'DELETE', null)
      .then((myres: any) => {
        console.log('dbdeleteItem to the Server')
        // tools.showPositiveNotif(this.$q, 'Riga cancellata')
        return myres
      })
      .catch((error: any) => {
        userStore.setErrorCatch(error)
        return userStore.getServerCode
      })

    return res
  }

  return res
}

async function dbHideItem(call: string, item: any) {
  const userStore = useUserStore()

  if (!useServiceWorker()) {
    // console.log('dbdeleteItem', item)
    if (userStore.isUserInvalid) {
      return false
    } // Login not made

    item = {
      ...item,
      hide: true,
    }

    console.log('dbHideItem', item)

    call = `/${call}`

    return Api.SendReq(`${call + item._id}/true`, 'DELETE', null)
      .then((myres: any) => {
        console.log('dbHideItem to the Server')
        return myres
      })
      .catch((error: any) => {
        userStore.setErrorCatch(error)
        return userStore.getServerCode
      })
  }
  return null
}

async function Sync_Execute(cmd: string, tablesync: string, nametab: string, method: string, item: ITodo, id: string, msg: string) {
  // Send to Server to Sync

  const userStore = useUserStore()

  console.log('Sync_Execute', cmd, tablesync, nametab, method, id, msg)
  if (nametab === 'todos') {
    console.log('   TODO: ', item.descr)
  }

  let cmdSw = cmd
  if ((cmd === DB.CMD_SYNC_NEW) || (cmd === DB.CMD_DELETE) || (cmd === DB.CMD_HIDE)) {
    cmdSw = DB.CMD_SYNC
  }

  // console.log('cmdSw', cmdSw)

  // if ('serviceWorker' in navigator) {
  //   console.log('serviceWorker PRESENTE')
  // } else {
  //   console.log('serviceWorker NON PRESENTE !')
  // }
  // console.log('----------------------      navigator.serviceWorker.ready')

  if (useServiceWorker()) {
    return navigator.serviceWorker.ready
      .then((sw) => {
        globalroutines('write', tablesync, item, id)
          .then((ris) => {
            console.log('ris write:', ris)
            const sep = '|'

            const multiparams = cmdSw + sep + tablesync + sep + nametab + sep + method + sep + userStore.x_auth_token + sep + toolsext.getLocale()
            const mymsgkey = {
              _id: multiparams,
              value: multiparams,
            }
            /* console.log('*** swmsg')
            // if ('SyncManager' in window) {
            //   console.log('   SENDING... sw.sync.register', multiparams)
            //   return sw.sync.register(multiparams)
            // } else {
            */
            return globalroutines('write', 'swmsg', mymsgkey, multiparams)
              .then((ris2) => Api.syncAlternative(multiparams))
              .then(() => {
                let data = null
                if (msg !== '') {
                  data = { message: msg, position: 'bottom', timeout: 3000 }
                }
                return data
              })
              .catch((err) => {
                console.error('Errore in globalroutines', tablesync, nametab, err)
              })
          })
          .catch((err) => {
            console.error('Errore catch in globalroutines write', tablesync, nametab, err)
          })
      })
  }
}

async function Sync_ExecuteCmd(cmd: string, nametab: string, method: string, item: ITodo, id: string, msg: string) {
  // Send to Server to Sync

  let tablesync = ''
  if (method === 'POST') {
    tablesync = DB.TABLE_SYNC_POST + nametab
  } else if (method === 'PATCH') {
    tablesync = DB.TABLE_SYNC_PATCH + nametab
  } else if (method === 'DELETE') {
    tablesync = DB.TABLE_DELETE + nametab
  } else if (method === 'HIDE') {
    tablesync = DB.TABLE_HIDE + nametab
  }

  const risdata = await Sync_Execute(cmd, tablesync, nametab, method, item, id, msg)

  let ris = false
  if (cmd === DB.CMD_SYNC_NEW) {
    if ((method === 'POST') || (method === 'PATCH')) {
      ris = await dbInsertSave(nametab, item, method)
    }
  } else if (cmd === DB.CMD_DELETE) {
    ris = await dbDeleteItem(nametab, item)
  } else if (cmd === DB.CMD_HIDE) {
    ris = await dbHideItem(nametab, item)
  }

  return ris
}

export async function Sync_SaveItem(nametab: string, method: string, item: any) {
  return Sync_ExecuteCmd(DB.CMD_SYNC_NEW, nametab, method, item, '0', '')
}

export function Sync_DeleteItem(nametab: string, item: any, id: string) {
  Sync_ExecuteCmd(DB.CMD_DELETE, nametab, 'DELETE', item, id, '')
}

export function Sync_HideItem(nametab: string, item: any, id: string) {
  Sync_ExecuteCmd(DB.CMD_HIDE, nametab, 'HIDE', item, id, '')
}

export async function aftercalling(ris: any, checkPending: boolean, nametabindex: string) {
  const userStore = useUserStore()
  if (ris.status !== 200) {
    if (process.env.DEBUG === '1') {
      console.log('ris.status', ris.status)
    }
    if (ris.status === serv_constants.RIS_CODE__HTTP_FORBIDDEN_INVALID_TOKEN) {
      tools.consolelogpao('UNAUTHORIZING... TOKEN EXPIRED... !! ')
    } else {
      tools.consolelogpao('NETWORK UNREACHABLE ! (Error in fetch)', userStore.getServerCode, ris.status)
    }
    if (useServiceWorker()) {
      // Read all data from IndexedDB Store into Memory
      await updatefromIndexedDbToState(nametabindex)
    }
  } else if (ris.status === tools.OK && checkPending) {
    waitAndcheckPendingMsg()
  }
}

export function removeitemfromarray(myarray: any, ind: any) {
  // console.log('PRIMA todos', todos)
  // Delete Item in to Array
  if (ind >= 0) {
    myarray.splice(ind, 1)
  }
  // console.log('DOPO todos', todos, 'ind', ind)
}

/*
export async functionfunction testfunc() {
  while (true) {
    tools.consolelogpao('testfunc')
    // console.log('Todos.todos_changed:', Todos.todos_changed)
    await tools.aspettansec(5000)
  }
}
*/

/*
sendMessageToSW(recdata, method) {

  navigator.serviceWorker.controller.postMessage({
    type: 'sync',
    recdata,
    method,
    cmd: 'sync-new-todos',
    token: userStore.idToken,
    lang: userStore.lang
  })
}
*/

function setmodifiedIfchanged(recOut: any, recIn: any, field: string) {
  if (String(recOut[field]) !== String(recIn[field])) {
    console.log('***************  CAMPO ', field, 'MODIFICATO!', recOut[field], recIn[field])
    recOut.modified = true
    recOut[field] = recIn[field]
    return true
  }
  return false
}

export async function table_ModifyRecord(nametable: string, myitem: any, listFieldsToChange: any, field: string) {
  // console.log('table_ModifyRecord ... ', nametable)
  if (myitem === null) {
    return new Promise<void>((resolve, reject) => {
      resolve()
    })
  }

  console.log('--> table_ModifyRecord', nametable, myitem)

  if ((field === 'status') && (nametable === 'todos') && (myitem.status === tools.Status.COMPLETED)) {
    myitem.completed_at = tools.getDateNow()
  }

  const myobjsaved = tools.jsonCopy(myitem)

  let miorec: any = null
  if (useServiceWorker()) {
    // get record from IndexedDb
    miorec = await globalroutines('read', nametable, null, myobjsaved._id)
    if (miorec === undefined) {
      console.log('~~~~~~~~~~~~~~~~~~~~ !!!!!!!!!!!!!!!!!!  Record not Found !!!!!! id=', myobjsaved._id)

      // Prova cmq a salvarlo sul server
      return Sync_SaveItem(nametable, 'PATCH', miorec)
    }
    listFieldsToChange.forEach((myfield: any) => {
      setmodifiedIfchanged(miorec, myobjsaved, myfield)
    })
  } else {
    miorec = myitem
    miorec.modified = true
  }

  console.log(' ... 4 ')

  if (miorec.modified) {
    console.log(`    ${nametable} MODIFICATO! `, miorec.descr, miorec.pos, 'SALVALO SULLA IndexedDB')
    miorec.modify_at = tools.getDateNow()
    miorec.modified = false

    // 1) Permit to Update the Views
    tools.notifyarraychanged(miorec)

    if (useServiceWorker()) {
      // 2) Modify on IndexedDb
      console.log('// 2) Modify on IndexedDb', miorec)
      return globalroutines('write', nametable, miorec)
        .then((ris) => Sync_SaveItem(nametable, 'PATCH', miorec)) // 3) Modify on the Server (call)
    }
    return Sync_SaveItem(nametable, 'PATCH', miorec)
  }
  return null
}

export function table_DeleteRecord(nametable: string, myobjtrov: any, id: any) {
  const mymodule: any = tools.getModulesByTable(nametable)

  // 1) Delete from the Todos Array
  mymodule.deletemyitem(myobjtrov)

  // 2) Delete from the IndexedDb
  globalroutines('delete', nametable, null, id)

  // 3) Delete from the Server (call)
  Sync_DeleteItem(nametable, myobjtrov, id)
}

export function table_HideRecord(nametable: string, myobjtrov: any, id: any) {
  const mymodule: any = tools.getModulesByTable(nametable)

  // 1) Delete from the Todos Array
  mymodule.deletemyitem(myobjtrov)

  // 2) Delete from the IndexedDb
  globalroutines('delete', nametable, null, id)

  // 3) Hide  from the Server (call)
  Sync_DeleteItem(nametable, myobjtrov, id)
}
