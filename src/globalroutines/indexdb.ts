import { costanti } from '@store/Modules/costanti'
import { ICfgData } from '@src/model'
import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { idbKeyval as storage } from '../js/storage.js'

function writeConfigIndexDb(context: any, data: any) {
  // console.log('writeConfigIndexDb', data)

  storage.setdata('config', data)
}

function saveConfigIndexDb(context: any) {
  const userStore = useUserStore()

  const data: ICfgData = {
    _id: costanti.CONFIG_ID_CFG,
    lang: toolsext.getLocale(),
    token: userStore.x_auth_token,
    userId: userStore.my._id,
  }

  writeConfigIndexDb('config', data)
}

async function readfromIndexDbToState(context: any, table: string) {
  console.log('*** readfromIndexDbToState ***', table)

  return storage.getalldata(table)
    .then((reccat) => {
      // console.log('&&&&&&& readfromIndexDbToState OK: Num RECORD: ', records.length)
      if (table === 'categories') {
        console.log('reccat', reccat)
        /* Todos.categories = []
        for (const elem of reccat) {
          Todos.categories.push(elem.valore)
        }

        console.log('ARRAY Categories', Todos.categories)
        table = 'todos'

        return storage.getalldata(table)
          .then((records) => {
            console.log(table + ' records', records)
            // console.log('&&&&&&& readfromIndexDbToState OK: Num RECORD: ', records.length)

            const arrinit = []

            for (const mytodo of records) {
              const cat = mytodo.category
              const indcat = Todos.categories.indexOf(cat)
              if (arrinit.indexOf(indcat) < 0) {
                Todos.todos[indcat] = []
                arrinit.push(indcat)
              }

              Todos.todos[indcat].push(mytodo)

            }

            console.log('************  ARRAYS SALVATI IN MEMORIA ', table, records)
          })

         */
      } else {
        // ++Todo conv : const arrris = tools.setArrayMainByTable(table, reccat)
        // console.log('************  ARRAYS SALVATI IN MEMORIA ', table, arrris)

      }
    }).catch((error) => {
      console.log('err readfromIndexDbToState: ', error)
    })
}

function consolelogpao(str: string, str2 = '', str3 = '') {
  console.log(str, str2, str3)
  // Todos.mutations.setTestpao(str + str2 + str3)
}

export default async (context: any, cmd: string, table: string, datakey: any = null, id = '') => {
  const globalStore = useGlobalStore()
  try {
    // console.log('TABLE', table, 'cmd', cmd)
    if (cmd === 'loadapp') {
      // ****** LOAD APP AL CARICAMENTO ! *******
      return saveConfigIndexDb(context)
    }
    if (cmd === 'write') {
      if (globalStore) {
        globalStore.connData.uploading_indexeddb = 1
      }
      return await storage.setdata(table, datakey)
    }
    if (cmd === 'updatefromIndexedDbToState') {
      return await readfromIndexDbToState(context, table)
    }
    if (cmd === 'readall') {
      if (globalStore) {
        globalStore.connData.downloading_indexeddb = 1
        console.log('getalldata table', table)
      }
      return await storage.getalldata(table)
    }
    if (cmd === 'count') {
      return await storage.count(table)
    }
    if (cmd === 'read') {
      if (globalStore) {
        globalStore.connData.downloading_indexeddb = 1
      }
      return await storage.getdata(table, id)
    }
    if (cmd === 'delete') {
      if (globalStore) {
        globalStore.connData.uploading_indexeddb = 1
      }
      return await storage.deletedata(table, id)
    }
    if (cmd === 'clearalldata') {
      if (globalStore) {
        globalStore.connData.uploading_indexeddb = 1
      }
      return await storage.clearalldata(table)
    }
    if (cmd === 'log') {
      consolelogpao(table)
    }
  } catch (e) {
    console.error('error INDEXdb', e)
  }
  return null
}
