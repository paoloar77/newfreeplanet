import { boot } from 'quasar/wrappers'
import globalroutines from '../globalroutines'

// @ts-ignore
export default boot(({ app, router, store }) => {
  // something to do
  app.config.globalProperties.$globalroutines = globalroutines
})
