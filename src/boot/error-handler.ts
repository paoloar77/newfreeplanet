import { boot } from 'quasar/wrappers'
// import something here
import errorHandler from '../error-handler'

// leave the export, even if you don't use it
export default boot(({ app, router }) => {
  // something to do
  app.config.globalProperties.$errorHandler = errorHandler
})
