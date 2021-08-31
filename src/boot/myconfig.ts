// import something here
import { boot } from 'quasar/wrappers'
import myconfig from '../myconfig'

// leave the export, even if you don't use it
export default boot(({ app }) => {
  // Vue.use(myconfig);
  // something to do
  app.config.globalProperties.$myconfig = myconfig
})
