// import something here
import { boot } from 'quasar/wrappers'
import { _LocalStorage } from '../local-storage'
// leave the export, even if you don't use it
export default boot(({ app, router }) => {
  // something to do
  app.config.globalProperties.$_localStorage = _LocalStorage
})
