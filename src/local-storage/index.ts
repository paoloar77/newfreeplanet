import { LocalStorage } from 'quasar'

let authorized = false

export default () => Promise.resolve(true)

// #Todo: Fix localStorage security ...
/*
  if (config.localStorage.enableListener) {
    window.addEventListener('storage', (e) => {
      if (!authorized) {
        console.warn('Unauthorized local storage change')
        switch (config.localStorage.unauthChange) {
          case 'block':
            if (e.key === 'null' || e.key === null) {
              reload()
            } else {
              _LocalStorage.setNative(e.key, e.oldValue)
            }
            break
          case 'clear':
            reload()
            break
          default:
            reload()
            break
        }
      }
    }, false)
  }
 */
const reload = () => {
  // onFail().then(success => appSetup())
}

export const _LocalStorage = {
  setNative(key: any, value: any) {
    authorized = true
    localStorage.setItem(key, value)
    authorized = false
  },
  set(key: any, value: any) {
    authorized = true
    LocalStorage.set(key, value)
    authorized = false
  },
  remove(key: any) {
    authorized = true
    LocalStorage.remove(key)
    authorized = false
  },
  clear() {
    authorized = true
    LocalStorage.clear()
    authorized = false
  },
  get(key: any) {
    return LocalStorage.get.item(key)
  },
}
