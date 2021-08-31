import { Dialog } from 'quasar'
import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  app.use(Dialog)
})
