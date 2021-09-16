// import { useGlobalStore } from '@store/globalStore'
// import indexdb from './indexdb'

import indexdb from './indexdb'

import { idbKeyval as storage } from '@src/js/storage'

export default async (cmd: string, table: string, data: any = null, id = '') => {
  // const globalStore = useGlobalStore()

  // const descr = data !== null ? data.descr : ''
  // console.log('globalroutines', cmd, table, descr, id)

  // return storage.setdata(table,  data)

  return indexdb( cmd, table, data, id)
    .then((ris) => {
      // console.log('globalStore.state.connData', globalStore.state.connData)

      setTimeout(() => {
        // globalStore.connData.uploading_indexeddb = 0
        // globalStore.connData.downloading_indexeddb = 0
      }, 1000)
      return ris
    }).catch((err) => {
      setTimeout(() => {
        // globalStore.connData.uploading_indexeddb = (globalStore.connData.uploading_indexeddb === 1) ? -1 : globalStore.connData.uploading_indexeddb
        // globalStore.connData.downloading_indexeddb = (globalStore.connData.downloading_indexeddb === 1) ? -1 : globalStore.connData.downloading_indexeddb
      }, 1000)

      console.log('ERROR INDEXEDDB: ', err)
    })

}
